import { useEffect, useRef, useState } from 'react';

export function WaterQualityChart() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [hoveredPoint, setHoveredPoint] = useState<{ x: number; y: number; value: number; label: string } | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = 250;
    canvas.height = 200;

    const padding = { top: 20, right: 20, bottom: 30, left: 40 };
    const chartWidth = canvas.width - padding.left - padding.right;
    const chartHeight = canvas.height - padding.top - padding.bottom;

    // Mock data for 7 time points
    const timeLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const doData = [7.2, 7.5, 7.3, 7.8, 7.6, 7.4, 7.7]; // Dissolved Oxygen
    const phData = [7.8, 7.9, 7.7, 8.0, 7.9, 7.8, 7.9]; // pH
    const turbidityData = [12, 15, 13, 10, 11, 14, 12]; // Turbidity

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw grid lines
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
    ctx.lineWidth = 1;
    for (let i = 0; i <= 4; i++) {
      const y = padding.top + (chartHeight / 4) * i;
      ctx.beginPath();
      ctx.moveTo(padding.left, y);
      ctx.lineTo(canvas.width - padding.right, y);
      ctx.stroke();
    }

    // Function to draw line
    const drawLine = (data: number[], color: string, maxValue: number) => {
      ctx.strokeStyle = color;
      ctx.lineWidth = 2;
      ctx.beginPath();

      data.forEach((value, index) => {
        const x = padding.left + (chartWidth / (data.length - 1)) * index;
        const y = padding.top + chartHeight - (value / maxValue) * chartHeight;

        if (index === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      });

      ctx.stroke();

      // Draw points
      data.forEach((value, index) => {
        const x = padding.left + (chartWidth / (data.length - 1)) * index;
        const y = padding.top + chartHeight - (value / maxValue) * chartHeight;

        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(x, y, 3, 0, Math.PI * 2);
        ctx.fill();
      });
    };

    // Draw lines
    drawLine(doData, '#00E6B8', 10); // Teal for DO
    drawLine(phData, '#3CFF9E', 10); // Cyan for pH
    drawLine(turbidityData, '#FFB020', 20); // Amber for Turbidity

    // Draw X-axis labels
    ctx.fillStyle = '#9CCFD8';
    ctx.font = '10px sans-serif';
    ctx.textAlign = 'center';
    timeLabels.forEach((label, index) => {
      const x = padding.left + (chartWidth / (timeLabels.length - 1)) * index;
      ctx.fillText(label, x, canvas.height - 10);
    });

    // Draw Y-axis label
    ctx.save();
    ctx.translate(15, canvas.height / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.textAlign = 'center';
    ctx.fillStyle = '#9CCFD8';
    ctx.font = '10px sans-serif';
    ctx.fillText('Value', 0, 0);
    ctx.restore();

  }, []);

  return (
    <div className="glass rounded-lg p-4">
      <h3 className="text-[14px] font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>
        Water Quality Trends
      </h3>
      <canvas ref={canvasRef} className="w-full" />
      
      {/* Legend */}
      <div className="mt-3 flex gap-4 text-[11px]">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#00E6B8' }} />
          <span style={{ color: 'var(--text-muted)' }}>DO (mg/L)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#3CFF9E' }} />
          <span style={{ color: 'var(--text-muted)' }}>pH</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#FFB020' }} />
          <span style={{ color: 'var(--text-muted)' }}>Turbidity</span>
        </div>
      </div>
    </div>
  );
}
