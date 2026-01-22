'use client';

import { useState } from 'react';
import { ChevronDown, ChevronRight, Eye, EyeOff } from 'lucide-react';
import { useAppStore } from '@/store/useAppStore';

export function LayerPanel() {
  const { layers, toggleLayer } = useAppStore();
  const [expandedSections, setExpandedSections] = useState<string[]>([
    'Hydrology', 'Water Quality', 'Biodiversity'
  ]);

  const toggleSection = (title: string) => {
    setExpandedSections(prev => 
      prev.includes(title) 
        ? prev.filter(t => t !== title)
        : [...prev, title]
    );
  };

  const sections = [
    {
      title: 'Hydrology',
      layers: layers.filter(l => l.category === 'hydrology')
    },
    {
      title: 'Water Quality',
      layers: layers.filter(l => l.category === 'water-quality')
    },
    {
      title: 'Biodiversity',
      layers: layers.filter(l => l.category === 'biodiversity')
    }
  ];

  return (
    <div 
      className="w-[280px] h-full glass-dark border-r overflow-y-auto"
      style={{ borderColor: 'rgba(255, 255, 255, 0.1)' }}
    >
      <div className="p-6">
        <h3 className="text-[18px] font-semibold mb-6" style={{ color: 'var(--text-primary)' }}>
          Layer Control
        </h3>
        
        {sections.map((section) => (
          <div key={section.title} className="mb-4">
            <button
              onClick={() => toggleSection(section.title)}
              className="w-full flex items-center justify-between mb-2 hover:opacity-80 transition-opacity"
            >
              <span className="text-[14px] font-semibold" style={{ color: 'var(--accent-teal)' }}>
                {section.title}
              </span>
              {expandedSections.includes(section.title) ? (
                <ChevronDown className="w-4 h-4" style={{ color: 'var(--text-muted)' }} />
              ) : (
                <ChevronRight className="w-4 h-4" style={{ color: 'var(--text-muted)' }} />
              )}
            </button>
            
            {expandedSections.includes(section.title) && (
              <div className="space-y-2 pl-2">
                {section.layers.map((layer) => (
                  <button
                    key={layer.id}
                    onClick={() => toggleLayer(layer.id)}
                    className="w-full flex items-center justify-between py-2 px-3 rounded-md hover:bg-white/5 transition-colors"
                  >
                    <span 
                      className="text-[13px]"
                      style={{ color: layer.enabled ? 'var(--text-primary)' : 'var(--text-muted)' }}
                    >
                      {layer.name}
                    </span>
                    {layer.enabled ? (
                      <Eye className="w-4 h-4" style={{ color: 'var(--accent-green)' }} />
                    ) : (
                      <EyeOff className="w-4 h-4" style={{ color: 'var(--text-muted)' }} />
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
