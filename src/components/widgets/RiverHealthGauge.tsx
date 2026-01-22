'use client';

import { useEffect, useRef, useState } from 'react';
import { useAppStore } from '@/store/useAppStore';

export function RiverHealthGauge() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { riverHealth, setRiverHealth } = useAppStore();
  const [lastUpdated, setLastUpdated] = useState<string>('');

  useEffect(() => {
    // Fetch data on mount
    fetch('/api/water-quality')
      .then(res => res.json())
      .then(data => {
        setRiverHealth(data.riverHealth);
        setLastUpdated(new Date().toLocaleTimeString());
      })
      .catch(err => console.error('Failed to fetch river health:', err));

    // Update every 5 minutes
    const interval = setInterval(() => {
      fetch('/api/water-quality')
        .then(res => res.json())
        .then(data => {
          setRiverHealth(data.riverHealth);
          setLastUpdated(new Date().toLocaleTimeString());
        })
        .catch(err => console.error('Failed to fetch river health:', err));
    }, 300000); // 5 minutes

    return () => clearInterval(interval);
  }, [setRiverHealth]);

  useEffect(() => {
    if (!canvasRef.current || !riverHealth) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = 250;
    canvas.height = 180;

    const centerX = 125;
    const centerY = 140;
    const radius = 90;
    
    const healthScore = riverHealth.overallScore;
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
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
      { label: 'DO', value: riverHealth.do, x: 30, y: 50 },
      { label: 'BOD', value: riverHealth.bod, x: 100, y: 30 },
      { label: 'Flow', value: riverHealth.flow, x: 170, y: 30 },
      { label: 'Bio', value: riverHealth.biodiversity, x: 220, y: 50 },
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

  }, [riverHealth]);

  const getLastUpdateText = () => {
    if (!lastUpdated) return 'Loading...';
    const minutes = Math.floor((Date.now() - new Date(`1970-01-01T${lastUpdated}`).getTime()) / 60000);
    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    const hours = Math.floor(minutes / 60);
    return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  };

  return (
    <div className="glass rounded-lg p-4">
      <h3 className="text-[14px] font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>
        River Health Index
      </h3>
      <canvas ref={canvasRef} className="w-full" />
      <div className="mt-2 text-[11px]" style={{ color: 'var(--text-muted)' }}>
        <p>Last updated: {getLastUpdateText()}</p>
        <p className="mt-1">Location: Varanasi Stretch</p>
      </div>
    </div>
  );
}
