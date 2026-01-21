import { useEffect, useRef } from 'react';

export function RiverHealthGauge() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = 250;
    canvas.height = 180;

    const centerX = 125;
    const centerY = 140;
    const radius = 90;
    
    // Calculate health score (weighted average)
    const DO = 75; // Dissolved Oxygen
    const BOD = 65; // BOD
    const Flow = 80; // Flow
    const Biodiversity = 70; // Biodiversity
    
    const healthScore = (DO * 0.3 + BOD * 0.25 + Flow * 0.2 + Biodiversity * 0.25);
    
    // Draw background arc
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, Math.PI, 2 * Math.PI);
    ctx.lineWidth = 20;
    ctx.strokeStyle = '#1a2a38';
    ctx.stroke();

    // Determine color based on score
    let gaugeColor = '#FF4D4F'; // Red < 40
    if (healthScore >= 70) gaugeColor = '#3CFF9E'; // Green > 70
    else if (healthScore >= 40) gaugeColor = '#FFB020'; // Amber 40-70

    // Draw health arc
    const startAngle = Math.PI;
    const endAngle = Math.PI + (Math.PI * (healthScore / 100));
    
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, startAngle, endAngle);
    ctx.lineWidth = 20;
    ctx.strokeStyle = gaugeColor;
    ctx.lineCap = 'round';
    ctx.stroke();

    // Draw score text
    ctx.fillStyle = '#EAF6F6';
    ctx.font = 'bold 36px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(`${Math.round(healthScore)}`, centerX, centerY - 10);
    
    ctx.fillStyle = '#9CCFD8';
    ctx.font = '13px sans-serif';
    ctx.fillText('Health Index', centerX, centerY + 15);

    // Draw parameter indicators
    const params = [
      { label: 'DO', value: DO, x: 30, y: 50 },
      { label: 'BOD', value: BOD, x: 100, y: 30 },
      { label: 'Flow', value: Flow, x: 170, y: 30 },
      { label: 'Bio', value: Biodiversity, x: 220, y: 50 },
    ];

    params.forEach(param => {
      ctx.fillStyle = '#9CCFD8';
      ctx.font = '10px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(param.label, param.x, param.y);
      
      ctx.fillStyle = param.value >= 70 ? '#3CFF9E' : param.value >= 40 ? '#FFB020' : '#FF4D4F';
      ctx.font = 'bold 12px sans-serif';
      ctx.fillText(`${param.value}`, param.x, param.y + 14);
    });

  }, []);

  return (
    <div className="glass rounded-lg p-4">
      <h3 className="text-[14px] font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>
        River Health Index
      </h3>
      <canvas ref={canvasRef} className="w-full" />
      <div className="mt-2 text-[11px]" style={{ color: 'var(--text-muted)' }}>
        <p>Last updated: 2 hours ago</p>
        <p className="mt-1">Location: Varanasi Stretch</p>
      </div>
    </div>
  );
}
