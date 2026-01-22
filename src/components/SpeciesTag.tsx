interface SpeciesTagProps {
  text: string;
  position: { top?: string; bottom?: string; left?: string; right?: string };
  onClick?: () => void;
}

export function SpeciesTag({ text, position, onClick }: SpeciesTagProps) {
  return (
    <div
      className="absolute glass rounded-lg px-4 py-2 pointer-events-auto cursor-pointer hover:opacity-80 transition-opacity"
      style={{
        width: '160px',
        height: '40px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        ...position,
        backgroundColor: 'rgba(255, 255, 255, 0.06)',
        backdropFilter: 'blur(24px)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        fontSize: '12px',
        color: 'var(--text-primary)',
        zIndex: 30
      }}
      onClick={onClick}
    >
      {text}
    </div>
  );
}
