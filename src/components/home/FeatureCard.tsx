interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  stat?: string;
}

export function FeatureCard({ icon, title, description, stat }: FeatureCardProps) {
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
