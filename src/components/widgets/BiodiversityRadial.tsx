import { useEffect, useRef } from 'react';

interface SpeciesData {
  name: string;
  value: number;
  color: string;
  risk: 'Critical' | 'Endangered' | 'Vulnerable' | 'Stable';
}

export function BiodiversityRadial() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = 250;
    canvas.height = 220;

    const centerX = 125;
    const centerY = 110;
    const radius = 70;
    const innerRadius = 45;

    const species: SpeciesData[] = [
      { name: 'Dolphin', value: 25, color: '#00E6B8', risk: 'Endangered' },
      { name: 'Gharial', value: 20, color: '#3CFF9E', risk: 'Critical' },
      { name: 'Turtle', value: 30, color: '#FFB020', risk: 'Vulnerable' },
      { name: 'Fish', value: 25, color: '#5a9fb5', risk: 'Stable' },
    ];

    const total = species.reduce((sum, s) => sum + s.value, 0);
    let currentAngle = -Math.PI / 2; // Start at top

    // Draw segments
    species.forEach((s) => {
      const sliceAngle = (s.value / total) * 2 * Math.PI;

      // Draw outer arc
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, currentAngle, currentAngle + sliceAngle);
      ctx.arc(centerX, centerY, innerRadius, currentAngle + sliceAngle, currentAngle, true);
      ctx.closePath();
      ctx.fillStyle = s.color;
      ctx.fill();

      // Draw border
      ctx.strokeStyle = '#07141E';
      ctx.lineWidth = 2;
      ctx.stroke();

      currentAngle += sliceAngle;
    });

    // Draw center circle
    ctx.beginPath();
    ctx.arc(centerX, centerY, innerRadius, 0, Math.PI * 2);
    ctx.fillStyle = '#0C1F2E';
    ctx.fill();

    // Draw center text
    ctx.fillStyle = '#EAF6F6';
    ctx.font = 'bold 20px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('Species', centerX, centerY - 8);
    
    ctx.font = '12px sans-serif';
    ctx.fillStyle = '#9CCFD8';
    ctx.fillText('Distribution', centerX, centerY + 10);

  }, []);

  const species: SpeciesData[] = [
    { name: 'Dolphin', value: 25, color: '#00E6B8', risk: 'Endangered' },
    { name: 'Gharial', value: 20, color: '#3CFF9E', risk: 'Critical' },
    { name: 'Turtle', value: 30, color: '#FFB020', risk: 'Vulnerable' },
    { name: 'Fish', value: 25, color: '#5a9fb5', risk: 'Stable' },
  ];

  return (
    <div className="glass rounded-lg p-4">
      <h3 className="text-[14px] font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>
        Biodiversity Status
      </h3>
      <canvas ref={canvasRef} className="w-full" />
      
      {/* Species List */}
      <div className="space-y-2">
        {species.map((s) => (
          <div key={s.name} className="flex items-center justify-between text-[11px]">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: s.color }} />
              <span style={{ color: 'var(--text-primary)' }}>{s.name}</span>
            </div>
            <span 
              className="px-2 py-0.5 rounded text-[10px]"
              style={{ 
                color: s.risk === 'Critical' ? '#FF4D4F' : 
                       s.risk === 'Endangered' ? '#FFB020' :
                       s.risk === 'Vulnerable' ? '#FFB020' : '#3CFF9E',
                backgroundColor: 'rgba(255, 255, 255, 0.1)'
              }}
            >
              {s.risk}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
