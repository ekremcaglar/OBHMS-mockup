import React from 'react';
import Icon from '../Icon';

const Model3D: React.FC = () => {
  return (
    <div className="w-full h-full bg-gray-900 rounded-lg overflow-hidden flex items-center justify-center relative p-4">
      {/* Background Grid */}
      <svg width="100%" height="100%" className="absolute inset-0">
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(0, 180, 255, 0.1)" strokeWidth="1"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>

      {/* Aircraft Wireframe */}
      <div className="relative w-full max-w-lg animate-pulse-slow">
         <svg viewBox="0 0 800 400" className="w-full h-auto" style={{ filter: 'drop-shadow(0 0 10px rgba(0, 200, 255, 0.7))' }}>
            <g fill="none" stroke="#00d1ff" strokeWidth="1.5">
                {/* Main Fuselage */}
                <path d="M400 100 L450 150 L450 250 L400 300 L350 250 L350 150 Z" />
                <path d="M400 100 L650 180 L650 220 L400 300 Z" />
                <path d="M400 100 L150 180 L150 220 L400 300 Z" />
                {/* Wings */}
                <path d="M450 160 L750 100 L700 180 L450 210 Z" />
                <path d="M350 160 L50 100 L100 180 L350 210 Z" />
                {/* Tail */}
                <path d="M150 190 L100 180 L120 250 L150 210 Z" />
                <path d="M650 190 L700 180 L680 250 L650 210 Z" />
            </g>
        {/* FIX: Corrected closing tag from </Fix> to </svg> */}
        </svg>
      </div>
      
      <div className="absolute bottom-4 flex space-x-4">
        <button className="text-white/50 hover:text-white/80 transition-colors p-2 bg-black/20 rounded-full"><Icon name="ZoomIn" size={20} /></button>
        <button className="text-white/50 hover:text-white/80 transition-colors p-2 bg-black/20 rounded-full"><Icon name="ZoomOut" size={20} /></button>
        <button className="text-white/50 hover:text-white/80 transition-colors p-2 bg-black/20 rounded-full"><Icon name="Move3d" size={20} /></button>
      </div>
    </div>
  );
};

// FIX: Added missing default export.
export default Model3D;