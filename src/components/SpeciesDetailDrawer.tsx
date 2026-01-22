'use client';

import { useAppStore } from '@/store/useAppStore';
import { X, AlertTriangle } from 'lucide-react';

export function SpeciesDetailDrawer() {
  const { selectedSpecies, isDrawerOpen, drawerContent, closeDrawer } = useAppStore();

  if (!isDrawerOpen || drawerContent !== 'species' || !selectedSpecies) {
    return null;
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Critical':
        return '#FF4D4F';
      case 'Endangered':
        return '#FFB020';
      case 'Vulnerable':
        return '#FFB020';
      default:
        return '#3CFF9E';
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
      onClick={closeDrawer}
    >
      <div 
        className="glass-dark rounded-t-2xl sm:rounded-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto border border-white/10"
        style={{ backgroundColor: 'var(--bg-secondary)' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h2 className="text-[28px] font-bold" style={{ color: 'var(--text-primary)' }}>
                {selectedSpecies.name}
              </h2>
              <span
                className="px-3 py-1 rounded-full text-[12px] font-semibold"
                style={{
                  backgroundColor: `${getStatusColor(selectedSpecies.status)}20`,
                  color: getStatusColor(selectedSpecies.status),
                }}
              >
                {selectedSpecies.status}
              </span>
            </div>
            <p className="text-[14px] italic" style={{ color: 'var(--text-muted)' }}>
              {selectedSpecies.scientificName}
            </p>
          </div>
          <button
            onClick={closeDrawer}
            className="p-2 rounded-lg hover:bg-white/10 transition-colors"
            style={{ color: 'var(--text-primary)' }}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="space-y-6">
          {/* Population & Habitat */}
          <div className="grid grid-cols-2 gap-4">
            <div className="glass rounded-lg p-4">
              <div className="text-[12px] mb-1" style={{ color: 'var(--text-muted)' }}>
                Estimated Population
              </div>
              <div className="text-[24px] font-bold" style={{ color: 'var(--accent-green)' }}>
                {selectedSpecies.population.toLocaleString()}
              </div>
            </div>
            <div className="glass rounded-lg p-4">
              <div className="text-[12px] mb-1" style={{ color: 'var(--text-muted)' }}>
                Primary Habitat
              </div>
              <div className="text-[14px] font-medium" style={{ color: 'var(--text-primary)' }}>
                {selectedSpecies.habitat}
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className="text-[16px] font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
              Description
            </h3>
            <p className="text-[14px] leading-relaxed" style={{ color: 'var(--text-muted)' }}>
              {selectedSpecies.description}
            </p>
          </div>

          {/* Threats */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <AlertTriangle className="w-5 h-5" style={{ color: 'var(--warning-amber)' }} />
              <h3 className="text-[16px] font-semibold" style={{ color: 'var(--text-primary)' }}>
                Conservation Threats
              </h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {selectedSpecies.threats.map((threat, index) => (
                <span
                  key={index}
                  className="px-3 py-1 rounded-lg text-[12px]"
                  style={{
                    backgroundColor: 'rgba(255, 176, 32, 0.2)',
                    color: 'var(--warning-amber)',
                    border: '1px solid rgba(255, 176, 32, 0.3)',
                  }}
                >
                  {threat}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
