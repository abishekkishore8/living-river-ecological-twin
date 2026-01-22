'use client';

import { SpeciesTag } from './SpeciesTag';
import { WebGLCanvas } from './scenes/WebGLCanvas';
import Link from 'next/link';
import { useAppStore } from '@/store/useAppStore';
import { getSpeciesByName } from '@/data/speciesData';

export function HeroScene() {
  const { setSelectedSpecies, openDrawer } = useAppStore();

  const handleSpeciesTagClick = (speciesName: string) => {
    const species = getSpeciesByName(speciesName);
    if (species) {
      setSelectedSpecies(species);
      openDrawer('species');
    }
  };

  return (
    <div 
      className="relative w-full mx-auto overflow-hidden" 
      style={{ 
        backgroundColor: 'var(--bg-primary)',
        width: '100%',
        maxWidth: '1440px',
        height: '900px',
        maxHeight: '100vh'
      }}
    >
      {/* Layer Order: TOP → BOTTOM */}
      
      {/* Hero_WebGL_Canvas (Placeholder) */}
      <WebGLCanvas />
      
      {/* Atmosphere_Gradient */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, rgba(7, 20, 30, 0.3), rgba(12, 31, 46, 0.5))',
          zIndex: 2
        }}
      />

      {/* Hero_UI_Overlay - All UI elements */}
      <div className="absolute inset-0 z-10">
        {/* Top Navigation Bar */}
        <nav 
          className="absolute top-0 left-0 right-0 h-[72px] glass border-b border-white/10"
          style={{ backdropFilter: 'blur(24px)' }}
        >
        <div className="max-w-[1440px] mx-auto px-8 h-full flex items-center justify-between">
          {/* Logo */}
          <Link href="/home" className="flex items-center gap-3">
            <div 
              className="w-[140px] h-8 flex items-center justify-center rounded-lg"
              style={{ backgroundColor: 'var(--accent-teal)' }}
            >
              <span className="text-[14px] font-bold" style={{ color: '#07141E' }}>
                LIVING RIVER
              </span>
            </div>
          </Link>
          
          {/* Navigation Buttons */}
          <div className="flex items-center gap-4">
            <Link 
              href="/dashboard"
              className="text-[15px] hover:opacity-80 transition-opacity px-4 py-2"
              style={{ color: 'var(--text-primary)' }}
            >
              Spatial Portal
            </Link>
            <button 
              onClick={() => handleSpeciesTagClick('Gangetic Dolphin')}
              className="text-[15px] hover:opacity-80 transition-opacity px-4 py-2"
              style={{ color: 'var(--text-primary)' }}
            >
              Biodiversity
            </button>
            <Link 
              href="/community"
              className="text-[15px] hover:opacity-80 transition-opacity px-4 py-2"
              style={{ color: 'var(--text-primary)' }}
            >
              Community
            </Link>
            <Link 
              href="/research"
              className="text-[15px] hover:opacity-80 transition-opacity px-4 py-2"
              style={{ color: 'var(--text-primary)' }}
            >
              Research
            </Link>
            <Link 
              href="/login"
              className="text-[15px] hover:opacity-90 transition-opacity px-6 py-2 rounded-lg border-2"
              style={{ 
                borderColor: 'var(--accent-teal)', 
                color: 'var(--accent-teal)' 
              }}
            >
              Login
            </Link>
          </div>
        </div>
        </nav>

        {/* Hero Text Group - Centered, 800px width */}
        <div 
          className="absolute inset-0 flex items-center justify-center"
          style={{ paddingTop: '72px' }}
        >
          <div className="w-[800px] mx-auto text-center px-8">
            <h1 
              className="mb-4 font-semibold leading-tight"
              style={{ 
                fontSize: '64px',
                color: 'var(--text-primary)'
              }}
            >
              Living River
            </h1>
            
            <p 
              className="mb-8 font-medium"
              style={{ 
                fontSize: '28px',
                color: 'var(--text-muted)'
              }}
            >
              India's Ecological Digital Twin
            </p>
            
            <Link
              href="/dashboard"
              className="inline-flex items-center justify-center px-8 py-4 rounded-[14px] font-semibold hover:opacity-90 transition-opacity shadow-lg"
              style={{ 
                width: '260px',
                height: '56px',
                backgroundColor: 'var(--accent-teal)',
                color: '#07141E',
                fontSize: '16px'
              }}
            >
              Explore Digital Twin
            </Link>
          </div>
        </div>

        {/* Species Annotation Tags - UI Only, Component: SpeciesTag */}
        <div className="absolute inset-0 pointer-events-none" style={{ paddingTop: '72px' }}>
          <div className="pointer-events-auto">
            <SpeciesTag 
              text="Gangetic Dolphin – Explore"
              position={{ top: '30%', left: '20%' }}
              onClick={() => handleSpeciesTagClick('Gangetic Dolphin')}
            />
            <SpeciesTag 
              text="Gharial – Habitat Status"
              position={{ top: '50%', right: '25%' }}
              onClick={() => handleSpeciesTagClick('Gharial')}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
