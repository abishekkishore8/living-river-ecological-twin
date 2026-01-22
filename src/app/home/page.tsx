'use client';

import { HeroScene } from '@/components/HeroScene';
import { FeatureCard } from '@/components/home/FeatureCard';
import { BiodiversityCard } from '@/components/home/BiodiversityCard';
import { ImageWithFallback } from '@/components/figma/ImageWithFallback';
import { ArrowRight, TrendingUp, MapPin, Users } from 'lucide-react';
import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--bg-primary)' }}>
      {/* Hero Section with WebGL Canvas */}
      <HeroScene />

      {/* Additional Content Sections */}
      <section className="relative py-20 px-8 overflow-hidden">
        {/* Animated Background Grid */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(var(--accent-teal) 1px, transparent 1px),
              linear-gradient(90deg, var(--accent-teal) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
            opacity: 0.1
          }} />
        </div>

        {/* Gradient Orbs */}
        <div className="absolute top-20 right-20 w-96 h-96 rounded-full blur-3xl opacity-20"
          style={{ backgroundColor: 'var(--accent-teal)' }} />
        <div className="absolute bottom-20 left-20 w-96 h-96 rounded-full blur-3xl opacity-20"
          style={{ backgroundColor: 'var(--accent-green)' }} />

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Stats Bar */}
          <div className="glass rounded-2xl p-8 border border-white/10 grid grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-[36px] font-bold mb-2" style={{ color: 'var(--accent-green)' }}>
                2,525 km
              </div>
              <div className="text-[14px]" style={{ color: 'var(--text-muted)' }}>
                River Length Monitored
              </div>
            </div>
            <div className="text-center">
              <div className="text-[36px] font-bold mb-2" style={{ color: 'var(--accent-green)' }}>
                140+
              </div>
              <div className="text-[14px]" style={{ color: 'var(--text-muted)' }}>
                Species Tracked
              </div>
            </div>
            <div className="text-center">
              <div className="text-[36px] font-bold mb-2" style={{ color: 'var(--accent-green)' }}>
                500+
              </div>
              <div className="text-[14px]" style={{ color: 'var(--text-muted)' }}>
                Monitoring Stations
              </div>
            </div>
            <div className="text-center">
              <div className="text-[36px] font-bold mb-2" style={{ color: 'var(--accent-green)' }}>
                24/7
              </div>
              <div className="text-[14px]" style={{ color: 'var(--text-muted)' }}>
                Real-time Updates
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* River Landscape Showcase */}
      <section className="py-20 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-[48px] font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
              Sacred Rivers of India
            </h2>
            <p className="text-[18px]" style={{ color: 'var(--text-muted)' }}>
              Monitoring the lifelines of our nation
            </p>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="relative h-80 rounded-2xl overflow-hidden group">
              <ImageWithFallback 
                src="https://images.unsplash.com/photo-1576516816755-705b4b24df2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080"
                alt="Ganges River"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <h3 className="text-[28px] font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
                  Ganges River
                </h3>
                <p className="text-[14px]" style={{ color: 'var(--text-muted)' }}>
                  The sacred river supporting millions of lives and diverse ecosystems
                </p>
              </div>
            </div>

            <div className="relative h-80 rounded-2xl overflow-hidden group">
              <ImageWithFallback 
                src="https://images.unsplash.com/photo-1699630923504-9a24dbaab37c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080"
                alt="River Ghats"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <h3 className="text-[28px] font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
                  Cultural Heritage
                </h3>
                <p className="text-[14px]" style={{ color: 'var(--text-muted)' }}>
                  Ancient ghats and temples along the riverbanks
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* River Biodiversity */}
      <section className="py-20 px-8" style={{ backgroundColor: 'var(--bg-secondary)' }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-[48px] font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
              River Biodiversity
            </h2>
            <p className="text-[18px]" style={{ color: 'var(--text-muted)' }}>
              Protecting endangered species in river ecosystems
            </p>
          </div>

          <div className="grid grid-cols-3 gap-6">
            <BiodiversityCard 
              image="https://images.unsplash.com/photo-1760441790349-db8026cb8107?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080"
              species="Gangetic Dolphin"
              status="Endangered"
              description="Critically endangered freshwater dolphin, endemic to Indian river systems. Real-time habitat monitoring."
            />
            
            <BiodiversityCard 
              image="https://images.unsplash.com/photo-1649347173827-b817bbf0034e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080"
              species="River Ecosystem"
              status="Monitored"
              description="Complex aquatic ecosystems supporting diverse flora and fauna. Water quality tracking 24/7."
            />
            
            <BiodiversityCard 
              image="https://images.unsplash.com/photo-1576516816755-705b4b24df2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080"
              species="Gharial"
              status="Critical"
              description="Fish-eating crocodilian species with narrow snout. Nesting sites protected and monitored."
            />
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-[48px] font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
              Platform Capabilities
            </h2>
            <p className="text-[18px]" style={{ color: 'var(--text-muted)' }}>
              Advanced tools for ecological intelligence and conservation
            </p>
          </div>

          <div className="grid grid-cols-3 gap-6">
            <FeatureCard 
              icon={<MapPin className="w-6 h-6" style={{ color: '#07141E' }} />}
              title="GIS Mapping"
              description="High-resolution spatial data with real-time layer visualization"
              stat="500+ Layers"
            />
            
            <FeatureCard 
              icon={<TrendingUp className="w-6 h-6" style={{ color: '#07141E' }} />}
              title="Water Quality"
              description="Continuous monitoring of DO, pH, BOD, turbidity, and more"
              stat="98% Accuracy"
            />
            
            <FeatureCard 
              icon={<Users className="w-6 h-6" style={{ color: '#07141E' }} />}
              title="Community"
              description="Citizen science reports and collaborative conservation efforts"
              stat="10K+ Users"
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-8">
        <div className="max-w-4xl mx-auto">
          <div className="glass rounded-3xl p-12 border border-white/20 text-center">
            <h2 className="text-[48px] font-bold mb-6" style={{ color: 'var(--text-primary)' }}>
              Ready to Explore?
            </h2>
            <p className="text-[18px] mb-8" style={{ color: 'var(--text-muted)' }}>
              Access real-time ecological data and advanced spatial analytics
            </p>
            <Link 
              href="/dashboard"
              className="inline-flex items-center gap-3 px-10 py-5 rounded-xl hover:opacity-90 transition-all shadow-lg text-[18px]"
              style={{ backgroundColor: 'var(--accent-teal)', color: '#07141E' }}
            >
              <span className="font-semibold">Launch Advanced GIS Portal</span>
              <ArrowRight className="w-6 h-6" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
