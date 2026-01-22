import { ArrowRight, Waves, TrendingUp, MapPin, Users } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { HeroScene } from './HeroScene';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  stat?: string;
}

function FeatureCard({ icon, title, description, stat }: FeatureCardProps) {
  return (
    <div className="glass rounded-2xl p-6 border border-white/10 hover:border-white/30 transition-all group">
      <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform"
        style={{ backgroundColor: 'var(--accent-teal)' }}>
        {icon}
      </div>
      <h3 className="text-[20px] font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
        {title}
      </h3>
      <p className="text-[14px] mb-3" style={{ color: 'var(--text-muted)' }}>
        {description}
      </p>
      {stat && (
        <div className="text-[24px] font-bold" style={{ color: 'var(--accent-green)' }}>
          {stat}
        </div>
      )}
    </div>
  );
}

interface BiodiversityCardProps {
  image: string;
  species: string;
  status: string;
  description: string;
}

function BiodiversityCard({ image, species, status, description }: BiodiversityCardProps) {
  return (
    <div className="glass rounded-2xl overflow-hidden border border-white/10 hover:border-white/30 transition-all group">
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

interface HomepageProps {
  onNavigateToDashboard: () => void;
}

export function Homepage({ onNavigateToDashboard }: HomepageProps) {
  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--bg-primary)' }}>
      {/* Hero Section with WebGL Canvas */}
      <HeroScene onNavigateToDashboard={onNavigateToDashboard} />

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
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-2 rounded-full mb-6 border border-white/20"
              style={{ backgroundColor: 'rgba(0, 230, 184, 0.1)' }}>
              <span className="text-[13px] font-semibold" style={{ color: 'var(--accent-teal)' }}>
                🌊 India's Advanced Ecological Intelligence Platform
              </span>
            </div>
            
            <h1 className="text-[72px] font-bold mb-6 leading-tight" style={{ color: 'var(--text-primary)' }}>
              Living Rivers
            </h1>
            
            <p className="text-[28px] mb-4" style={{ color: 'var(--accent-teal)' }}>
              Digital Twin Ecosystem
            </p>
            
            <p className="text-[18px] max-w-3xl mx-auto leading-relaxed" style={{ color: 'var(--text-muted)' }}>
              Real-time monitoring and analysis of India's river ecosystems through advanced GIS,
              biodiversity intelligence, and community-driven conservation.
            </p>

            <div className="flex items-center justify-center gap-6 mt-10">
              <button 
                onClick={onNavigateToDashboard}
                className="px-8 py-4 rounded-xl flex items-center gap-3 hover:opacity-90 transition-all shadow-lg"
                style={{ backgroundColor: 'var(--accent-teal)', color: '#07141E' }}
              >
                <span className="font-semibold text-[16px]">Explore Dashboard</span>
                <ArrowRight className="w-5 h-5" />
              </button>
              
              <button 
                className="px-8 py-4 rounded-xl border-2 hover:bg-white/5 transition-all"
                style={{ borderColor: 'var(--accent-teal)', color: 'var(--accent-teal)' }}
              >
                <span className="font-semibold text-[16px]">Learn More</span>
              </button>
            </div>
          </div>

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
                src="https://images.unsplash.com/photo-1576516816755-705b4b24df2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYSUyMGdhbmdlcyUyMHJpdmVyJTIwbGFuZHNjYXBlfGVufDF8fHx8MTc2ODk3NTY1N3ww&ixlib=rb-4.1.0&q=80&w=1080"
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
                src="https://images.unsplash.com/photo-1699630923504-9a24dbaab37c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYSUyMHJpdmVyJTIwZ2hhdCUyMHRlbXBsZXxlbnwxfHx8fDE3Njg5NzU2NTh8MA&ixlib=rb-4.1.0&q=80&w=1080"
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
              image="https://images.unsplash.com/photo-1760441790349-db8026cb8107?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyaXZlciUyMGRvbHBoaW4lMjB3aWxkbGlmZXxlbnwxfHx8fDE3Njg5NzU2NTd8MA&ixlib=rb-4.1.0&q=80&w=1080"
              species="Gangetic Dolphin"
              status="Endangered"
              description="Critically endangered freshwater dolphin, endemic to Indian river systems. Real-time habitat monitoring."
            />
            
            <BiodiversityCard 
              image="https://images.unsplash.com/photo-1649347173827-b817bbf0034e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyaXZlciUyMGJpb2RpdmVyc2l0eSUyMGVjb3N5c3RlbXxlbnwxfHx8fDE3Njg5NzU2NTh8MA&ixlib=rb-4.1.0&q=80&w=1080"
              species="River Ecosystem"
              status="Monitored"
              description="Complex aquatic ecosystems supporting diverse flora and fauna. Water quality tracking 24/7."
            />
            
            <BiodiversityCard 
              image="https://images.unsplash.com/photo-1576516816755-705b4b24df2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYSUyMGdhbmdlcyUyMHJpdmVyJTIwbGFuZHNjYXBlfGVufDF8fHx8MTc2ODk3NTY1N3ww&ixlib=rb-4.1.0&q=80&w=1080"
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
            <button 
              onClick={onNavigateToDashboard}
              className="px-10 py-5 rounded-xl flex items-center gap-3 mx-auto hover:opacity-90 transition-all shadow-lg text-[18px]"
              style={{ backgroundColor: 'var(--accent-teal)', color: '#07141E' }}
            >
              <span className="font-semibold">Launch Advanced GIS Portal</span>
              <ArrowRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
