import { useEffect, useRef } from 'react';
import { MapPin, Layers } from 'lucide-react';

export function MapCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    canvas.width = 860;
    canvas.height = 900;

    // Draw base map (simplified representation)
    ctx.fillStyle = '#0a1f2e';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw river path (Ganges representation)
    ctx.strokeStyle = '#1a4d5e';
    ctx.lineWidth = 60;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    
    ctx.beginPath();
    ctx.moveTo(50, 100);
    ctx.quadraticCurveTo(200, 250, 400, 350);
    ctx.quadraticCurveTo(600, 450, 750, 600);
    ctx.quadraticCurveTo(700, 750, 800, 850);
    ctx.stroke();

    // Draw river flow (lighter blue)
    ctx.strokeStyle = '#2a6d7e';
    ctx.lineWidth = 40;
    ctx.beginPath();
    ctx.moveTo(50, 100);
    ctx.quadraticCurveTo(200, 250, 400, 350);
    ctx.quadraticCurveTo(600, 450, 750, 600);
    ctx.quadraticCurveTo(700, 750, 800, 850);
    ctx.stroke();

    // Draw habitat zones (semi-transparent circles)
    const zones = [
      { x: 150, y: 180, radius: 60, color: 'rgba(0, 230, 184, 0.2)' },
      { x: 420, y: 370, radius: 80, color: 'rgba(60, 255, 158, 0.2)' },
      { x: 730, y: 580, radius: 70, color: 'rgba(0, 230, 184, 0.2)' },
    ];

    zones.forEach(zone => {
      ctx.fillStyle = zone.color;
      ctx.beginPath();
      ctx.arc(zone.x, zone.y, zone.radius, 0, Math.PI * 2);
      ctx.fill();

      // Draw border
      ctx.strokeStyle = 'rgba(0, 230, 184, 0.5)';
      ctx.lineWidth = 2;
      ctx.stroke();
    });

    // Draw location markers
    const markers = [
      { x: 150, y: 180, label: 'Haridwar' },
      { x: 420, y: 370, label: 'Kanpur' },
      { x: 730, y: 580, label: 'Varanasi' },
    ];

    markers.forEach(marker => {
      // Draw pin
      ctx.fillStyle = '#00E6B8';
      ctx.beginPath();
      ctx.arc(marker.x, marker.y, 8, 0, Math.PI * 2);
      ctx.fill();

      // Draw label background
      ctx.fillStyle = 'rgba(12, 31, 46, 0.9)';
      ctx.fillRect(marker.x + 15, marker.y - 12, 80, 24);
      
      // Draw label text
      ctx.fillStyle = '#EAF6F6';
      ctx.font = '12px sans-serif';
      ctx.fillText(marker.label, marker.x + 20, marker.y + 4);
    });

  }, []);

  return (
    <div className="w-[860px] h-full relative flex-1" style={{ backgroundColor: '#0a1f2e' }}>
      <canvas ref={canvasRef} className="w-full h-full" />
      
      {/* Map Controls Overlay */}
      <div className="absolute top-4 right-4 flex flex-col gap-2">
        <button 
          className="w-10 h-10 glass rounded-lg flex items-center justify-center hover:bg-white/10 transition-colors"
          title="Zoom In"
        >
          <span className="text-[20px]" style={{ color: 'var(--text-primary)' }}>+</span>
        </button>
        <button 
          className="w-10 h-10 glass rounded-lg flex items-center justify-center hover:bg-white/10 transition-colors"
          title="Zoom Out"
        >
          <span className="text-[20px]" style={{ color: 'var(--text-primary)' }}>−</span>
        </button>
        <button 
          className="w-10 h-10 glass rounded-lg flex items-center justify-center hover:bg-white/10 transition-colors"
          title="Layers"
        >
          <Layers className="w-5 h-5" style={{ color: 'var(--text-primary)' }} />
        </button>
      </div>

      {/* Legend */}
      <div className="absolute bottom-4 left-4 glass-dark rounded-lg p-4 w-[200px]">
        <h4 className="text-[12px] font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
          Map Legend
        </h4>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full" style={{ backgroundColor: 'var(--accent-teal)' }} />
            <span className="text-[11px]" style={{ color: 'var(--text-muted)' }}>Dolphin Habitat</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full" style={{ backgroundColor: 'var(--accent-green)' }} />
            <span className="text-[11px]" style={{ color: 'var(--text-muted)' }}>Gharial Zone</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4" style={{ color: 'var(--accent-teal)' }} />
            <span className="text-[11px]" style={{ color: 'var(--text-muted)' }}>Monitoring Station</span>
          </div>
        </div>
      </div>
    </div>
  );
}