
import React, { useEffect, useRef } from 'react';

interface AudioVisualizerProps {
  stream: MediaStream | null;
  isActive: boolean;
}

const AudioVisualizer: React.FC<AudioVisualizerProps> = ({ stream, isActive }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const animationRef = useRef<number>(0);
  const volumeRef = useRef<number>(0);

  useEffect(() => {
    if (!stream) return;

    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const analyser = audioContext.createAnalyser();
    const source = audioContext.createMediaStreamSource(stream);
    
    analyser.fftSize = 256;
    source.connect(analyser);
    
    audioContextRef.current = audioContext;
    analyserRef.current = analyser;

    return () => {
      audioContext.close();
    };
  }, [stream]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let phase = 0;

    const render = () => {
      const width = canvas.width;
      const height = canvas.height;
      const analyser = analyserRef.current;

      // Get current volume
      if (analyser && isActive) {
        const dataArray = new Uint8Array(analyser.frequencyBinCount);
        analyser.getByteFrequencyData(dataArray);
        const sum = dataArray.reduce((a, b) => a + b, 0);
        const avg = sum / dataArray.length;
        // Smooth transition for volume
        volumeRef.current = volumeRef.current * 0.8 + (avg / 128) * 0.2;
      } else {
        // "Breathing" mode when not active
        volumeRef.current = volumeRef.current * 0.95 + 0.05 * (0.1 + Math.sin(Date.now() / 1000) * 0.05);
      }

      ctx.clearRect(0, 0, width, height);
      ctx.globalCompositeOperation = 'screen';

      const drawWave = (
        amplitude: number,
        frequency: number,
        phaseOffset: number,
        color: string,
        lineWidth: number
      ) => {
        ctx.beginPath();
        ctx.strokeStyle = color;
        ctx.lineWidth = lineWidth;
        
        const currentAmplitude = amplitude * volumeRef.current * (height / 3);

        for (let x = 0; x < width; x++) {
          const xNorm = x / width;
          // Apply a bell-curve mask to the edges so waves fade out at ends
          const mask = Math.pow(Math.sin(xNorm * Math.PI), 2);
          const y = (height / 2) + Math.sin(x * frequency + phase + phaseOffset) * currentAmplitude * mask;
          
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      };

      // Draw 3 layers of waves
      drawWave(1.2, 0.02, 0, 'rgba(34, 211, 238, 0.5)', 3); // Cyan
      drawWave(0.8, 0.015, Math.PI / 2, 'rgba(99, 102, 241, 0.5)', 2); // Indigo
      drawWave(1.0, 0.025, Math.PI, 'rgba(192, 132, 252, 0.5)', 2); // Fuchsia

      phase += 0.08;
      animationRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationRef.current);
    };
  }, [isActive]);

  return (
    <div className="relative w-full h-32 flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-[#020617] via-transparent to-[#020617] z-10 pointer-events-none" />
      <canvas
        ref={canvasRef}
        width={800}
        height={128}
        className="w-full h-full opacity-80"
      />
    </div>
  );
};

export default AudioVisualizer;
