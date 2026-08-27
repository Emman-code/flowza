import React from 'react';
import './GlassSurface.css';

export interface GlassSurfaceProps {
  children?: React.ReactNode;
  width?: number | string;
  height?: number | string;
  borderRadius?: number;
  borderWidth?: number;
  brightness?: number;
  opacity?: number;
  blur?: number;
  displace?: number;
  backgroundOpacity?: number;
  saturation?: number;
  distortionScale?: number;
  className?: string;
  style?: React.CSSProperties;
}

export default function GlassSurface({
  children,
  width = '100%',
  height = 'auto',
  borderRadius = 9999,
  className = '',
  style = {},
}: GlassSurfaceProps) {
  const containerStyle: React.CSSProperties = {
    ...style,
    width: typeof width === 'number' ? `${width}px` : width,
    height: typeof height === 'number' ? `${height}px` : height,
    borderRadius: `${borderRadius}px`,
  };

  return (
    <div className={`glass-surface ${className}`} style={containerStyle}>
      <div className="glass-surface__content">{children}</div>
    </div>
  );
}
