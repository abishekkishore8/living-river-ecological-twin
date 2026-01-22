import { WaterQualityData, RiverHealthData } from '@/store/useAppStore';

// Mock data based on real Ganges water quality parameters
// Based on CPCB (Central Pollution Control Board) data
export function generateWaterQualityData(days: number = 7): WaterQualityData[] {
  const data: WaterQualityData[] = [];
  const now = new Date();
  
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    
    // Realistic ranges based on Ganges water quality data
    // DO (Dissolved Oxygen): 4-8 mg/L (healthy: >5)
    // pH: 7.0-8.5 (healthy: 7-8.5)
    // Turbidity: 10-50 NTU (healthy: <25)
    // BOD: 2-8 mg/L (healthy: <3)
    // COD: 10-30 mg/L (healthy: <20)
    
    data.push({
      dissolvedOxygen: 5.2 + Math.random() * 1.5 + (Math.sin(i) * 0.5),
      ph: 7.6 + Math.random() * 0.4 + (Math.sin(i * 0.5) * 0.2),
      turbidity: 15 + Math.random() * 10 + (Math.sin(i * 0.7) * 5),
      bod: 3.5 + Math.random() * 2 + (Math.sin(i * 0.6) * 1),
      cod: 18 + Math.random() * 8 + (Math.sin(i * 0.5) * 3),
      timestamp: date.toISOString(),
    });
  }
  
  return data;
}

export function calculateRiverHealth(
  waterQuality: WaterQualityData[]
): RiverHealthData {
  const latest = waterQuality[waterQuality.length - 1];
  
  // Score calculations (0-100 scale)
  const doScore = Math.min(100, (latest.dissolvedOxygen / 8) * 100);
  const bodScore = Math.max(0, 100 - ((latest.bod - 2) / 6) * 100);
  const flowScore = 75 + Math.random() * 10; // Mock flow data
  const biodiversityScore = 70 + Math.random() * 15; // Mock biodiversity
  
  // Weighted average
  const overallScore = 
    doScore * 0.3 +
    bodScore * 0.25 +
    flowScore * 0.2 +
    biodiversityScore * 0.25;
  
  return {
    overallScore: Math.round(overallScore),
    do: Math.round(doScore),
    bod: Math.round(bodScore),
    flow: Math.round(flowScore),
    biodiversity: Math.round(biodiversityScore),
  };
}
