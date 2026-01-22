'use client';

import { MapCanvas } from './MapCanvas';
import { AdvancedGISPortal } from './AdvancedGISPortal';
import { SpatialEcology } from './SpatialEcology';
import { LayerPanel } from './LayerPanel';
import { DataPanel } from './DataPanel';
import { ArrowLeft, Waves, Download } from 'lucide-react';
import Link from 'next/link';
import { useAppStore } from '@/store/useAppStore';
import { useState } from 'react';

export function GISDashboard() {
  const { waterQualityData, riverHealth } = useAppStore();
  const [viewMode, setViewMode] = useState<'basic' | 'advanced' | 'spatial'>('basic');

  const handleExportReport = () => {
    // Generate report data
    const reportData = {
      timestamp: new Date().toISOString(),
      riverHealth: riverHealth,
      waterQuality: waterQualityData.slice(-7),
      generatedAt: new Date().toLocaleString(),
    };

    // Create and download JSON file
    const blob = new Blob([JSON.stringify(reportData, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `river-health-report-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="w-full min-h-screen flex flex-col" style={{ backgroundColor: 'var(--bg-primary)' }}>
      {/* Dashboard Header */}
      <header className="glass border-b border-white/10 h-20 flex items-center justify-between px-8 flex-shrink-0">
        <div className="flex items-center gap-6">
          <Link 
            href="/home"
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <ArrowLeft className="w-5 h-5" style={{ color: 'var(--accent-teal)' }} />
            <span className="text-[14px]" style={{ color: 'var(--text-primary)' }}>Back to Home</span>
          </Link>
          
          <div className="w-px h-8 bg-white/10" />
          
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: 'var(--accent-teal)' }}>
              <Waves className="w-6 h-6" style={{ color: '#07141E' }} />
            </div>
            <div>
              <h1 className="text-[20px] font-bold" style={{ color: 'var(--text-primary)' }}>
                Advanced GIS Portal
              </h1>
              <p className="text-[12px]" style={{ color: 'var(--text-muted)' }}>
                Living Rivers • Real-time Monitoring & Analysis
              </p>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 border-r pr-4">
            <button
              onClick={() => setViewMode('basic')}
              className={`px-3 py-2 rounded text-[13px] transition-colors ${viewMode === 'basic' ? 'bg-white/20' : 'hover:bg-white/5'}`}
              style={{ color: viewMode === 'basic' ? 'var(--accent-teal)' : 'var(--text-muted)' }}
            >
              Basic
            </button>
            <button
              onClick={() => setViewMode('advanced')}
              className={`px-3 py-2 rounded text-[13px] transition-colors ${viewMode === 'advanced' ? 'bg-white/20' : 'hover:bg-white/5'}`}
              style={{ color: viewMode === 'advanced' ? 'var(--accent-teal)' : 'var(--text-muted)' }}
            >
              Advanced
            </button>
            <button
              onClick={() => setViewMode('spatial')}
              className={`px-3 py-2 rounded text-[13px] transition-colors ${viewMode === 'spatial' ? 'bg-white/20' : 'hover:bg-white/5'}`}
              style={{ color: viewMode === 'spatial' ? 'var(--accent-teal)' : 'var(--text-muted)' }}
            >
              Spatial Ecology
            </button>
          </div>

          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: 'var(--accent-green)' }} />
            <span className="text-[13px]" style={{ color: 'var(--text-muted)' }}>Live Data</span>
          </div>
          
          <button 
            onClick={handleExportReport}
            className="px-4 py-2 rounded-lg border hover:bg-white/5 transition-colors text-[13px] flex items-center gap-2"
            style={{ borderColor: 'var(--accent-teal)', color: 'var(--accent-teal)' }}
          >
            <Download className="w-4 h-4" />
            Export Report
          </button>
        </div>
      </header>

      {/* Dashboard Content */}
      {viewMode === 'advanced' ? (
        <div className="flex-1 overflow-hidden">
          <AdvancedGISPortal />
        </div>
      ) : viewMode === 'spatial' ? (
        <div className="flex-1 overflow-hidden">
          <SpatialEcology />
        </div>
      ) : (
        <div className="flex-1 flex overflow-hidden" style={{ height: 'calc(100vh - 80px)' }}>
          {/* Left Panel - Layer Control */}
          <LayerPanel />
          
          {/* Center - Map Canvas */}
          <MapCanvas />
          
          {/* Right Panel - Data Widgets */}
          <DataPanel />
        </div>
      )}
    </div>
  );
}
