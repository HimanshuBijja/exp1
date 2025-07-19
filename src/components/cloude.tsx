import React from 'react';

export default function Cloud() {
  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-br from-purple-900 to-blue-900 relative overflow-hidden">
      {/* Method 1: SVG Filter Approach */}
      <div className="absolute inset-0 flex justify-center items-center">
        <svg width="400" height="400" className="absolute">
          <defs>
            <filter id="gooey" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
              <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="gooey" />
              <feComposite in="SourceGraphic" in2="gooey" operator="atop"/>
            </filter>
          </defs>
          <g filter="url(#gooey)">
            <circle cx="200" cy="200" r="80" fill="#1e1e1e" />
            <circle cx="150" cy="150" r="50" fill="#1e1e1e" />
          </g>
        </svg>
      </div>

    

      {/* Original blend modes */}
      <div className="absolute inset-0 bg-[#1e1e1e] mix-blend-color-burn z-50 opacity-30"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900 to-blue-900 mix-blend-color-dodge z-40 opacity-20"></div>
      
      {/* Controls */}
      <div className="absolute top-4 left-4 text-white text-sm">
        <p>Liquid Effect Techniques:</p>
        <p>1. SVG Gooey Filter (top layer)</p>
        <p>2. Layered Blur Reduction</p>
        <p>3. Radial Gradient + Contrast</p>
      </div>
    </div>
  );
}