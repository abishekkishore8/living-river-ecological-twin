import { MapCanvas } from './MapCanvas';
import { LayerPanel } from './LayerPanel';
import { DataPanel } from './DataPanel';
import { ArrowLeft, Waves } from 'lucide-react';

interface GISDashboardProps {
  onNavigateToHome: () => void;
}

export function GISDashboard({ onNavigateToHome }: GISDashboardProps) {
  return (
    <div className="w-full min-h-screen flex flex-col" style={{ backgroundColor: 'var(--bg-primary)' }}>
      {/* Dashboard Header */}
      <header className="glass border-b border-white/10 h-20 flex items-center justify-between px-8 flex-shrink-0">
        <div className="flex items-center gap-6">
          <button 
            onClick={onNavigateToHome}
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <ArrowLeft className="w-5 h-5" style={{ color: 'var(--accent-teal)' }} />
            <span className="text-[14px]" style={{ color: 'var(--text-primary)' }}>Back to Home</span>
          </button>
          
          <div className="w-px h-8 bg-white/10" />
          
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: 'var(--accent-teal)' }}>
              <Waves className="w-6 h-6" style={{ color: '#07141E' }} />
            </div>
            <div>
              <h1 className="text-[20px] font-bold" style={{ color: 'var(--text-primary)' }}>
                Spatial Ecology Dashboard
              </h1>
              <p className="text-[12px]" style={{ color: 'var(--text-muted)' }}>
                Living Rivers • Real-time Monitoring
              </p>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: 'var(--accent-green)' }} />
            <span className="text-[13px]" style={{ color: 'var(--text-muted)' }}>Live Data</span>
          </div>
          
          <button 
            className="px-4 py-2 rounded-lg border hover:bg-white/5 transition-colors text-[13px]"
            style={{ borderColor: 'var(--accent-teal)', color: 'var(--accent-teal)' }}
          >
            Export Report
          </button>
        </div>
      </header>

      {/* Dashboard Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Panel - Layer Control */}
        <LayerPanel />
        
        {/* Center - Map Canvas */}
        <MapCanvas />
        
        {/* Right Panel - Data Widgets */}
        <DataPanel />
      </div>
    </div>
  );
}