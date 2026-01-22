import { NextRequest, NextResponse } from 'next/server';
import shp from 'shpjs';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Process shapefile
    const geojson = await shp(buffer);

    return NextResponse.json({
      success: true,
      geojson: Array.isArray(geojson) ? geojson[0] : geojson,
      features: Array.isArray(geojson) 
        ? geojson[0]?.features?.length || 0 
        : geojson?.features?.length || 0
    });
  } catch (error: any) {
    console.error('Shapefile processing error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to process shapefile' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'Shapefile processing API endpoint',
    supportedFormats: ['.shp', '.geojson', '.json', '.zip']
  });
}
