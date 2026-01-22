import { NextResponse } from 'next/server';
import { generateWaterQualityData, calculateRiverHealth } from '@/data/waterQualityData';

export async function GET() {
  try {
    const data = generateWaterQualityData(30); // Last 30 days
    const health = calculateRiverHealth(data);
    
  return NextResponse.json({
    waterQuality: data,
    riverHealth: health,
  });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch water quality data' },
      { status: 500 }
    );
  }
}
