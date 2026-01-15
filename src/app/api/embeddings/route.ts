import { NextRequest, NextResponse } from 'next/server';
import { rag } from '@/lib/rag';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;
    const userId = formData.get('userId') as string;
    const cartridgeId = formData.get('cartridgeId') as string;
    
    if (!file || !userId || !cartridgeId) {
      return NextResponse.json(
        { error: 'Missing required fields: file, userId, cartridgeId' },
        { status: 400 }
      );
    }
    
    // Get file content
    const content = await file.text();
    const filename = file.name;
    
    console.log(`[Embeddings] Processing ${filename} for cartridge ${cartridgeId}`);
    
    // Process document with RAG
    await rag.ingestDocument(userId, cartridgeId, filename, content);
    
    return NextResponse.json({
      success: true,
      message: `Document ${filename} processed successfully`,
      filename,
      cartridgeId,
    });
  } catch (error) {
    console.error('[Embeddings] Error processing document:', error);
    return NextResponse.json(
      { error: 'Failed to process document' },
      { status: 500 }
    );
  }
}

// Get documents for a cartridge
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const cartridgeId = searchParams.get('cartridgeId');
  const query = searchParams.get('query');
  
  if (!cartridgeId || !query) {
    return NextResponse.json(
      { error: 'Missing cartridgeId or query' },
      { status: 400 }
    );
  }
  
  try {
    const context = await rag.getContext(cartridgeId, query, 10);
    return NextResponse.json({ context });
  } catch (error) {
    console.error('[Embeddings] Error searching:', error);
    return NextResponse.json(
      { error: 'Search failed' },
      { status: 500 }
    );
  }
}
