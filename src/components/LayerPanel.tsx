import { useState } from 'react';
import { ChevronDown, ChevronRight, Eye, EyeOff } from 'lucide-react';

interface LayerToggle {
  id: string;
  name: string;
  enabled: boolean;
}

interface LayerSection {
  title: string;
  layers: LayerToggle[];
}

export function LayerPanel() {
  const [sections, setSections] = useState<LayerSection[]>([
    {
      title: 'Hydrology',
      layers: [
        { id: 'river-network', name: 'River Network', enabled: true },
        { id: 'flow-direction', name: 'Flow Direction', enabled: false },
        { id: 'depth', name: 'Depth / Bathymetry', enabled: true },
      ]
    },
    {
      title: 'Water Quality',
      layers: [
        { id: 'dissolved-oxygen', name: 'Dissolved Oxygen', enabled: true },
        { id: 'ph', name: 'pH', enabled: false },
        { id: 'turbidity', name: 'Turbidity', enabled: false },
        { id: 'bod-cod', name: 'BOD / COD', enabled: false },
      ]
    },
    {
      title: 'Biodiversity',
      layers: [
        { id: 'dolphin-habitat', name: 'Dolphin Habitat', enabled: true },
        { id: 'gharial-habitat', name: 'Gharial Habitat', enabled: true },
        { id: 'turtle-nesting', name: 'Turtle Nesting', enabled: false },
        { id: 'fish-richness', name: 'Fish Richness', enabled: false },
      ]
    }
  ]);

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

  const toggleLayer = (sectionIndex: number, layerIndex: number) => {
    setSections(prev => {
      const newSections = [...prev];
      newSections[sectionIndex].layers[layerIndex].enabled = 
        !newSections[sectionIndex].layers[layerIndex].enabled;
      return newSections;
    });
  };

  return (
    <div 
      className="w-[280px] h-full glass-dark border-r overflow-y-auto"
      style={{ borderColor: 'rgba(255, 255, 255, 0.1)' }}
    >
      <div className="p-6">
        <h3 className="text-[18px] font-semibold mb-6" style={{ color: 'var(--text-primary)' }}>
          Layer Control
        </h3>
        
        {sections.map((section, sectionIndex) => (
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
                {section.layers.map((layer, layerIndex) => (
                  <button
                    key={layer.id}
                    onClick={() => toggleLayer(sectionIndex, layerIndex)}
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
