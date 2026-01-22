'use client';

import { ImageWithFallback } from '@/components/figma/ImageWithFallback';
import { useAppStore } from '@/store/useAppStore';
import { getSpeciesByName } from '@/data/speciesData';

interface BiodiversityCardProps {
  image: string;
  species: string;
  status: string;
  description: string;
}

export function BiodiversityCard({ image, species, status, description }: BiodiversityCardProps) {
  const { setSelectedSpecies, openDrawer } = useAppStore();

  const handleClick = () => {
    const speciesData = getSpeciesByName(species);
    if (speciesData) {
      setSelectedSpecies(speciesData);
      openDrawer('species');
    }
  };

  return (
    <div 
      className="glass rounded-2xl overflow-hidden border border-white/10 hover:border-white/30 transition-all group cursor-pointer"
      onClick={handleClick}
    >
      <div className="relative h-48 overflow-hidden">
        <ImageWithFallback 
          src={image}
          alt={species}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-4 right-4 px-3 py-1 rounded-full text-[11px] font-semibold"
          style={{ 
            backgroundColor: 'rgba(0, 230, 184, 0.9)',
            color: '#07141E'
          }}>
          {status}
        </div>
      </div>
      <div className="p-6">
        <h4 className="text-[18px] font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
          {species}
        </h4>
        <p className="text-[13px]" style={{ color: 'var(--text-muted)' }}>
          {description}
        </p>
      </div>
    </div>
  );
}
