import React from 'react';
import { TeamId } from '../../types/game';

interface ShipProps {
  team: TeamId;
  isMoving?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const Ship: React.FC<ShipProps> = ({ 
  team, 
  isMoving = false, 
  size = 'md',
  className = '' 
}) => {
  const isRed = team === 'red';

  const sizeClasses = {
    sm: 'w-20 h-16',
    md: 'w-28 h-20 md:w-36 md:h-24',
    lg: 'w-44 h-32 md:w-56 md:h-40',
  }[size];

  // Colors
  const hullColor = isRed ? '#dc2626' : '#2563eb';
  const hullDark = isRed ? '#991b1b' : '#1e40af';
  const hullLight = isRed ? '#f87171' : '#60a5fa';
  const cabinColor = '#ffffff';
  const roofColor = isRed ? '#b91c1c' : '#1d4ed8';
  const flagColor = isRed ? '#ef4444' : '#3b82f6';
  const smokeColor = 'rgba(255, 255, 255, 0.7)';

  return (
    <div className={`relative inline-block select-none ${sizeClasses} ${className}`}>
      {/* Water ripple wake under the ship */}
      <div className="absolute -bottom-2 left-2 right-2 flex justify-center items-center pointer-events-none">
        <div className={`h-2.5 rounded-full bg-white/40 blur-xs transition-all duration-300 ${isMoving ? 'w-full scale-x-125 animate-pulse' : 'w-4/5'}`} />
      </div>

      {/* SVG Cartoon Nautical Ship */}
      <svg 
        viewBox="0 0 200 140" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className={`w-full h-full filter drop-shadow-md transition-transform duration-300 ${isMoving ? 'scale-105 rotate-1' : ''}`}
      >
        <defs>
          <linearGradient id={`hullGrad-${team}`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={hullLight} />
            <stop offset="60%" stopColor={hullColor} />
            <stop offset="100%" stopColor={hullDark} />
          </linearGradient>
          <linearGradient id={`cabinGrad-${team}`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#f1f5f9" />
          </linearGradient>
          <filter id={`glow-${team}`} x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="rgba(0,0,0,0.2)" />
          </filter>
        </defs>

        {/* Smoke Puffs from Funnel */}
        <g className={isMoving ? 'animate-bounce' : ''}>
          <circle cx="95" cy="20" r="6" fill={smokeColor} opacity="0.8" />
          <circle cx="90" cy="12" r="8" fill={smokeColor} opacity="0.6" />
          <circle cx="82" cy="6" r="10" fill={smokeColor} opacity="0.4" />
        </g>

        {/* Funnel / Smokestack */}
        <rect x="90" y="28" width="16" height="24" rx="2" fill="#334155" />
        <rect x="88" y="26" width="20" height="6" rx="2" fill={roofColor} />
        {/* Funnel stripe */}
        <rect x="90" y="36" width="16" height="6" fill="#f59e0b" />

        {/* Main Cabin / Wheelhouse */}
        <rect x="55" y="48" width="80" height="42" rx="6" fill={`url(#cabinGrad-${team})`} stroke="#cbd5e1" strokeWidth="2" filter={`url(#glow-${team})`} />
        {/* Upper Bridge */}
        <rect x="70" y="36" width="50" height="16" rx="4" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="2" />

        {/* Cabin Portholes / Windows */}
        <rect x="75" y="40" width="10" height="8" rx="2" fill="#38bdf8" />
        <rect x="90" y="40" width="10" height="8" rx="2" fill="#38bdf8" />
        <rect x="105" y="40" width="10" height="8" rx="2" fill="#38bdf8" />

        <circle cx="70" cy="66" r="6" fill="#0284c7" stroke="#e2e8f0" strokeWidth="2" />
        <circle cx="95" cy="66" r="6" fill="#0284c7" stroke="#e2e8f0" strokeWidth="2" />
        <circle cx="120" cy="66" r="6" fill="#0284c7" stroke="#e2e8f0" strokeWidth="2" />
        {/* Glass reflection */}
        <path d="M68 64 L72 68" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M93 64 L97 68" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M118 64 L122 68" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" />

        {/* Roof line */}
        <rect x="52" y="46" width="86" height="5" rx="2.5" fill={roofColor} />
        <rect x="67" y="34" width="56" height="4" rx="2" fill={roofColor} />

        {/* Mast & Team Flag */}
        <line x1="140" y1="20" x2="140" y2="70" stroke="#475569" strokeWidth="3" strokeLinecap="round" />
        <path 
          d="M140 22 L170 30 L140 38 Z" 
          fill={flagColor} 
          stroke="#ffffff" 
          strokeWidth="1.5" 
        />
        {/* Star / Symbol on Flag */}
        <circle cx="150" cy="30" r="2.5" fill="#ffffff" />

        {/* Main Boat Hull */}
        <path 
          d="M20 86 
             L168 86 
             C185 86, 192 98, 178 114 
             L160 124 
             C155 127, 45 127, 36 124 
             L18 108 
             C12 96, 14 86, 20 86 Z" 
          fill={`url(#hullGrad-${team})`} 
          stroke={hullDark} 
          strokeWidth="2.5" 
        />

        {/* Deck Railing */}
        <line x1="28" y1="84" x2="165" y2="84" stroke="#e2e8f0" strokeWidth="2" />
        <line x1="35" y1="84" x2="35" y2="88" stroke="#e2e8f0" strokeWidth="2" />
        <line x1="50" y1="84" x2="50" y2="88" stroke="#e2e8f0" strokeWidth="2" />
        <line x1="145" y1="84" x2="145" y2="88" stroke="#e2e8f0" strokeWidth="2" />
        <line x1="160" y1="84" x2="160" y2="88" stroke="#e2e8f0" strokeWidth="2" />

        {/* Hull waterline decorative strip */}
        <path 
          d="M24 100 Q 95 102 176 100" 
          stroke="#ffffff" 
          strokeWidth="3" 
          strokeLinecap="round" 
          opacity="0.85" 
        />

        {/* Bow Anchor Emblem */}
        <g transform="translate(155, 96) scale(0.65)">
          <circle cx="12" cy="8" r="4" stroke="#ffffff" strokeWidth="2.5" fill="none" />
          <line x1="12" y1="12" x2="12" y2="24" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="6" y1="16" x2="18" y2="16" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M4 20 C 6 27, 18 27, 20 20" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        </g>

        {/* Bow spray / waves if moving */}
        {isMoving && (
          <g className="animate-pulse">
            <path d="M178 116 Q 192 118 198 110" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" fill="none" />
            <circle cx="190" cy="112" r="2" fill="#ffffff" />
            <circle cx="195" cy="106" r="1.5" fill="#ffffff" />
          </g>
        )}
      </svg>
    </div>
  );
};
