// components/NoiseEffect.tsx
import React from 'react';

interface NoiseEffectProps {
  size?: number; // 1-10 (smaller = larger noise)
  density?: number; // 0-100 (opacity percentage)
  color?: string; // hex color
  type?: 'mono' | 'color';
  className?: string;
  children?: React.ReactNode;
}

const NoiseEffect: React.FC<NoiseEffectProps> = ({
  size = 3,
  density = 5,
  color = '#000000',
  type = 'mono',
  className = '',
  children
}) => {
  // Convert size (1-10) to baseFrequency (0.1-2.0)
  const baseFrequency = (size * 0.2).toFixed(1);
  
  // Convert density (0-100) to opacity (0-1)
  const opacity = (density / 100).toFixed(2);
  
  // Generate unique ID for the filter
  const filterId = `noise-${Math.random().toString(36).substr(2, 9)}`;
  
  // Create the SVG noise filter
  const createNoiseFilter = () => {
    const colorMatrix = type === 'mono' 
      ? '0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0' // Convert to grayscale
      : '1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 1 0'; // Keep colors
    
    return `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Cfilter id='${filterId}'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='${baseFrequency}' numOctaves='1' seed='${Math.floor(Math.random() * 100)}'/%3E%3CfeColorMatrix values='${colorMatrix}'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23${filterId})' opacity='${opacity}'/%3E%3C/svg%3E`;
  };

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {children}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `url("${createNoiseFilter()}")`,
          mixBlendMode: type === 'mono' ? 'multiply' : 'normal'
        }}
      />
    </div>
  );
};

export default NoiseEffect;

// components/NoiseOverlay.tsx - Alternative approach for global noise
export const NoiseOverlay: React.FC<{
  size?: number;
  density?: number;
  fixed?: boolean;
}> = ({ 
  size = 3, 
  density = 5, 
  fixed = false 
}) => {
  const baseFrequency = (size * 0.2).toFixed(1);
  const opacity = (density / 100).toFixed(2);
  
  const noiseUrl = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='${baseFrequency}' numOctaves='1' seed='1'/%3E%3CfeColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='${opacity}'/%3E%3C/svg%3E`;

  return (
    <div 
      className={`${fixed ? 'fixed' : 'absolute'} inset-0 pointer-events-none z-50`}
      style={{
        backgroundImage: `url("${noiseUrl}")`,
        mixBlendMode: 'multiply'
      }}
    />
  );
};

// hooks/useNoise.ts - Custom hook for dynamic noise
import { useState, useCallback } from 'react';

export const useNoise = (initialSize = 3, initialDensity = 5) => {
  const [size, setSize] = useState(initialSize);
  const [density, setDensity] = useState(initialDensity);
  const [type, setType] = useState<'mono' | 'color'>('mono');

  const generateNoiseUrl = useCallback(() => {
    const baseFrequency = (size * 0.2).toFixed(1);
    const opacity = (density / 100).toFixed(2);
    const colorMatrix = type === 'mono' 
      ? '0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0'
      : '1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 1 0';
    
    return `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='${baseFrequency}' numOctaves='1' seed='${Math.floor(Math.random() * 100)}'/%3E%3CfeColorMatrix values='${colorMatrix}'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='${opacity}'/%3E%3C/svg%3E`;
  }, [size, density, type]);

  return {
    size,
    density,
    type,
    setSize,
    setDensity,
    setType,
    noiseUrl: generateNoiseUrl(),
    regenerate: generateNoiseUrl
  };
};

// styles/noise.css - CSS-only approach if you prefer
/*
.noise-mono-s3-d100 {
  position: relative;
}

.noise-mono-s3-d100::before {
  content: '';
  position: absolute;
  inset: 0;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='1' seed='1'/%3E%3CfeColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.05'/%3E%3C/svg%3E");
  pointer-events: none;
  mix-blend-mode: multiply;
}

.noise-fine {
  --noise-size: 1.2;
  --noise-density: 0.08;
}

.noise-fine::before {
  content: '';
  position: absolute;
  inset: 0;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.2' numOctaves='1' seed='2'/%3E%3CfeColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.08'/%3E%3C/svg%3E");
  pointer-events: none;
  mix-blend-mode: multiply;
}
*/