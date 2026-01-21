/**
 * WebGL Canvas Component
 * 
 * This component serves as a placeholder for the Three.js Digital Twin Canvas.
 * In production, this will be replaced with a full Three.js scene implementation.
 * 
 * IMPORTANT: Designers must not draw animals here. This is replaced at runtime by Three.js.
 */

import { ThreeScene } from './ThreeScene';

interface WebGLCanvasProps {
  className?: string;
}

export function WebGLCanvas({ className = '' }: WebGLCanvasProps) {
  return (
    <div 
      className={`absolute inset-0 ${className}`}
      style={{ 
        width: '100%',
        height: '100%',
        zIndex: 1
      }}
    >
      {/* External Three.js Canvas - This is replaced at runtime */}
      <ThreeScene />
      
      {/* Label for designers */}
      <div 
        className="absolute bottom-4 left-4 glass rounded-lg px-3 py-2 text-[11px] pointer-events-none"
        style={{ 
          backgroundColor: 'rgba(255, 255, 255, 0.06)',
          backdropFilter: 'blur(24px)',
          color: 'var(--text-muted)',
          zIndex: 10
        }}
      >
        EXTERNAL – Three.js Digital Twin Canvas
      </div>
    </div>
  );
}
