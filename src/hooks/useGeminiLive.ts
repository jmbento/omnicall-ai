import { useState, useRef, useCallback, useEffect } from 'react';
import { GoogleGenAI, Modality } from '@google/genai';
import { useOmniStore, useWidgetStore } from '@/store';
import { toolRegistry, functionDeclarations } from '@/lib/ai/toolRegistry';
import { chatPersistence } from '@/services/chatPersistence';
import { encodeAudio, decodeAudio, decodeAudioData } from '@/lib/audioUtils';

export interface UseGeminiLiveProps {
  cartridge: any;
  userId?: string;
}

export const useGeminiLive = ({ cartridge, userId = 'user-001' }: UseGeminiLiveProps) => {
  const [isLive, setIsLive] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [activeTool, setActiveTool] = useState<string | null>(null);
  const [activeStream, setActiveStream] = useState<MediaStream | null>(null);

  const { addMessage } = useOmniStore();
  const { setWidget, clearWidget } = useWidgetStore();

  const sessionRef = useRef<any>(null);
  const dbSessionIdRef = useRef<string | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const outAudioContextRef = useRef<AudioContext | null>(null);
  const nextStartTimeRef = useRef(0);
  const sourcesRef = useRef(new Set<AudioBufferSourceNode>());

  // Turn buffering to avoid database spamming with chunks
  const userTextBufferRef = useRef<string>("");
  const modelTextBufferRef = useRef<string>("");

  const stopLiveSession = useCallback(() => {
    if (sessionRef.current) {
      sessionRef.current.close();
      sessionRef.current = null;
    }
    
    // Cleanup audio context
    if (audioContextRef.current) audioContextRef.current.close();
    if (outAudioContextRef.current) outAudioContextRef.current.close();

    setIsLive(false);
    setIsConnecting(false);
    setActiveStream(null);
    dbSessionIdRef.current = null;
    userTextBufferRef.current = "";
    modelTextBufferRef.current = "";
    clearWidget();
  }, [clearWidget]);

  const startLiveSession = useCallback(async () => {
    if (!cartridge) return;
    setIsConnecting(true);
    clearWidget();
    
    userTextBufferRef.current = "";
    modelTextBufferRef.current = "";

    try {
      const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY });
      
      // Initialize Audio Contexts
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
      outAudioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      setActiveStream(stream);

      // 1. Persist Session Creation (Essential to get the ID for messages)
      const dbId = await chatPersistence.createNewSession(userId, cartridge.id);
      dbSessionIdRef.current = dbId;

      const sessionPromise = ai.live.connect({
        model: 'gemini-2.5-flash-native-audio-preview-09-2025',
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: {
            voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Zephyr' } },
          },
          systemInstruction: cartridge.systemInstruction,
          tools: [{ functionDeclarations }],
          inputAudioTranscription: {},
          outputAudioTranscription: {}
        },
        callbacks: {
          onopen: () => {
            setIsLive(true);
            setIsConnecting(false);
            
            if (!audioContextRef.current) return;

            const source = audioContextRef.current.createMediaStreamSource(stream);
            const scriptProcessor = audioContextRef.current.createScriptProcessor(4096, 1, 1);
            
            scriptProcessor.onaudioprocess = (e) => {
              const inputData = e.inputBuffer.getChannelData(0);
              const int16 = new Int16Array(inputData.length);
              for (let i = 0; i < inputData.length; i++) {
                int16[i] = inputData[i] * 32768;
              }
              const pcmBlob = {
                data: encodeAudio(new Uint8Array(int16.buffer)),
                mimeType: 'audio/pcm;rate=16000',
              };
              sessionPromise.then(s => s.sendRealtimeInput({ media: pcmBlob }));
            };
            
            source.connect(scriptProcessor);
            scriptProcessor.connect(audioContextRef.current.destination);
          },
          onmessage: async (message) => {
            // TOOL CALL HANDLING
            if (message.toolCall?.functionCalls) {
              for (const fc of message.toolCall.functionCalls) {
                if (!fc.name) continue;
                setActiveTool(fc.name);
                
                chatPersistence.persistMessage(dbSessionIdRef.current, 'system', `Executing tool: ${fc.name}`);

                const toolFn = toolRegistry[fc.name];
                const result = toolFn ? await toolFn(fc.args) : { error: "Function not found" };

                // Gen UI logic
                if (fc.name === 'checkRoomAvailability') setWidget('hotel', { ...result, ...fc.args });
                if (fc.name === 'lookupAccountBalance') setWidget('bank', { ...result, ...fc.args });
                if (fc.name === 'recoverAbandonedCart') setWidget('retail', { ...result, ...fc.args });

                sessionPromise.then(session => {
                  session.sendToolResponse({
                    functionResponses: [{
                        id: fc.id,
                        name: fc.name,
                        response: { result: result as object },
                    }]
                  });
                });
                setTimeout(() => setActiveTool(null), 1500);
              }
            }

            // TRANSCRIPTION HANDLING & BUFFERING
            if (message.serverContent?.inputTranscription) {
              const text = message.serverContent.inputTranscription.text;
              if (text) {
                userTextBufferRef.current += text;
                addMessage(cartridge.id, { id: Date.now().toString(), role: 'user', content: text, timestamp: new Date() });
              }
            }
            if (message.serverContent?.outputTranscription) {
              const text = message.serverContent.outputTranscription.text;
              if (text) {
                modelTextBufferRef.current += text;
                addMessage(cartridge.id, { id: (Date.now() + 1).toString(), role: 'model', content: text, timestamp: new Date() });
              }
            }

            // FLUSH BUFFERS ON TURN COMPLETE (Performance optimization for DB)
            if (message.serverContent?.turnComplete) {
              if (dbSessionIdRef.current) {
                if (userTextBufferRef.current) {
                  chatPersistence.persistMessage(dbSessionIdRef.current, 'user', userTextBufferRef.current);
                  userTextBufferRef.current = "";
                }
                if (modelTextBufferRef.current) {
                  chatPersistence.persistMessage(dbSessionIdRef.current, 'model', modelTextBufferRef.current);
                  modelTextBufferRef.current = "";
                }
              }
            }

            // AUDIO STREAMING
            const base64Audio = message.serverContent?.modelTurn?.parts?.[0]?.inlineData?.data;
            if (base64Audio && outAudioContextRef.current) {
              const ctx = outAudioContextRef.current;
              nextStartTimeRef.current = Math.max(nextStartTimeRef.current, ctx.currentTime);
              const buffer = await decodeAudioData(decodeAudio(base64Audio), ctx, 24000, 1);
              const source = ctx.createBufferSource();
              source.buffer = buffer;
              source.connect(ctx.destination);
              source.start(nextStartTimeRef.current);
              nextStartTimeRef.current += buffer.duration;
              sourcesRef.current.add(source);
              source.onended = () => sourcesRef.current.delete(source);
            }

            if (message.serverContent?.interrupted) {
              sourcesRef.current.forEach(s => s.stop());
              sourcesRef.current.clear();
              nextStartTimeRef.current = 0;
            }
          },
          onclose: () => stopLiveSession(),
          onerror: (err) => {
            console.error("[Live Hook] Connection Error:", err);
            stopLiveSession();
          }
        }
      });

      sessionRef.current = await sessionPromise;
    } catch (err) {
      console.error("[Live Hook] Initialization failed:", err);
      setIsConnecting(false);
    }
  }, [cartridge, userId, addMessage, clearWidget, stopLiveSession]);

  // Handle unmount
  useEffect(() => {
    return () => stopLiveSession();
  }, [stopLiveSession]);

  return {
    isLive,
    isConnecting,
    activeTool,
    activeStream,
    startLiveSession,
    stopLiveSession
  };
};