import React from 'react';

export const ContinentsMapDecor: React.FC = () => {
  return (
    <div className="absolute inset-x-0 bottom-0 h-64 sm:h-80 pointer-events-none overflow-hidden z-15 select-none">
      
      {/* ---------------------------------------------------- */}
      {/* 1. AFRICA - Lower-Left Ocean Landmass */}
      {/* ---------------------------------------------------- */}
      <div 
        className="absolute left-2 sm:left-10 bottom-14 sm:bottom-20 z-20 flex flex-col items-center animate-bob-slow pointer-events-auto group cursor-pointer"
        style={{ animationDuration: '6s' }}
        title="Continent of Africa"
      >
        {/* Name Banner */}
        <div className="mb-1 px-2.5 py-0.5 rounded-full bg-amber-900/90 border border-amber-400/90 text-amber-200 text-[10px] sm:text-xs font-black tracking-wider uppercase shadow-md flex items-center gap-1 group-hover:scale-105 transition-transform">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          <span>AFRICA</span>
        </div>

        {/* Illustrated Africa Vector Silhouette */}
        <svg viewBox="0 0 120 140" className="w-20 sm:w-28 h-auto drop-shadow-xl overflow-visible">
          {/* Shallow coastal water glow */}
          <path
            d="M30,15 C55,8 95,12 105,30 C115,50 110,75 85,95 C75,115 65,135 55,135 C45,130 35,100 25,75 C10,65 5,45 15,25 Z"
            fill="#38bdf8"
            opacity="0.4"
            transform="scale(1.08) translate(-4, -4)"
          />
          {/* Sandy beach edge */}
          <path
            d="M30,15 C55,8 95,12 105,30 C115,50 110,75 85,95 C75,115 65,135 55,135 C45,130 35,100 25,75 C10,65 5,45 15,25 Z"
            fill="#f59e0b"
          />
          {/* Main green landmass */}
          <path
            d="M32,18 C54,12 90,15 100,32 C108,49 104,70 82,90 C72,108 62,126 53,127 C45,122 36,96 27,73 C14,63 10,45 19,27 Z"
            fill="url(#africa-grad)"
          />
          {/* Sahara Desert northern tint */}
          <path
            d="M32,18 C54,12 90,15 100,32 C102,42 85,50 65,50 C40,50 20,42 19,27 Z"
            fill="#fbbf24"
            opacity="0.85"
          />
          {/* Tropical palm tree accents */}
          <g transform="translate(60, 68) scale(0.7)">
            <path d="M5,15 Q7,5 12,0" stroke="#78350f" strokeWidth="2.5" fill="none" />
            <circle cx="12" cy="0" r="5" fill="#16a34a" />
            <circle cx="7" cy="-2" r="4" fill="#22c55e" />
            <circle cx="16" cy="2" r="3.5" fill="#15803d" />
          </g>

          <defs>
            <linearGradient id="africa-grad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#f59e0b" />
              <stop offset="35%" stopColor="#15803d" />
              <stop offset="100%" stopColor="#166534" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* ---------------------------------------------------- */}
      {/* 2. AUSTRALIA - Lower-Right Ocean Landmass */}
      {/* ---------------------------------------------------- */}
      <div 
        className="absolute right-3 sm:right-12 bottom-12 sm:bottom-18 z-20 flex flex-col items-center animate-bob-delayed pointer-events-auto group cursor-pointer"
        style={{ animationDuration: '6.5s' }}
        title="Continent of Australia"
      >
        {/* Name Banner */}
        <div className="mb-1 px-2.5 py-0.5 rounded-full bg-amber-900/90 border border-amber-400/90 text-amber-200 text-[10px] sm:text-xs font-black tracking-wider uppercase shadow-md flex items-center gap-1 group-hover:scale-105 transition-transform">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
          <span>AUSTRALIA</span>
        </div>

        {/* Illustrated Australia Vector Silhouette */}
        <svg viewBox="0 0 130 100" className="w-22 sm:w-32 h-auto drop-shadow-xl overflow-visible">
          {/* Great Barrier Reef turquoise glow */}
          <path
            d="M20,35 C35,15 75,10 95,20 C115,25 125,50 115,75 C100,85 75,90 55,85 C35,80 15,85 10,65 C5,45 10,40 20,35 Z"
            fill="#2dd4bf"
            opacity="0.4"
            transform="scale(1.1) translate(-5, -4)"
          />
          {/* Beach contour */}
          <path
            d="M20,35 C35,15 75,10 95,20 C115,25 125,50 115,75 C100,85 75,90 55,85 C35,80 15,85 10,65 C5,45 10,40 20,35 Z"
            fill="#f59e0b"
          />
          {/* Main Australia Terrain */}
          <path
            d="M23,37 C37,18 73,13 92,23 C110,28 119,50 110,72 C96,81 73,86 54,81 C36,77 17,81 13,63 C9,46 13,41 23,37 Z"
            fill="url(#aus-grad)"
          />
          {/* Red Centre (Outback) */}
          <ellipse cx="60" cy="52" rx="20" ry="14" fill="#b45309" opacity="0.6" />
          {/* Uluru rock dot */}
          <ellipse cx="62" cy="53" rx="5" ry="3" fill="#78350f" />
          {/* Tasmania island */}
          <circle cx="102" cy="94" r="5" fill="#15803d" stroke="#f59e0b" strokeWidth="1" />

          <defs>
            <linearGradient id="aus-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#15803d" />
              <stop offset="45%" stopColor="#d97706" />
              <stop offset="100%" stopColor="#166534" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* ---------------------------------------------------- */}
      {/* 3. SOUTH AMERICA - Far Left Horizon Landmass */}
      {/* ---------------------------------------------------- */}
      <div 
        className="hidden md:flex absolute left-28 sm:left-40 bottom-28 sm:bottom-36 z-10 flex-col items-center opacity-85 hover:opacity-100 transition-opacity animate-bob-slow pointer-events-auto"
        style={{ animationDuration: '7s' }}
        title="Continent of South America"
      >
        <div className="mb-0.5 px-2 py-0.5 rounded-full bg-emerald-950/80 border border-emerald-400/60 text-emerald-200 text-[9px] font-black uppercase shadow">
          S. AMERICA
        </div>

        <svg viewBox="0 0 90 120" className="w-14 sm:w-18 h-auto drop-shadow-md">
          {/* Beach */}
          <path
            d="M20,10 C45,5 75,18 80,35 C85,55 70,75 55,95 C45,110 40,118 35,115 C30,110 32,85 22,65 C12,45 10,25 20,10 Z"
            fill="#f59e0b"
          />
          {/* Amazon rainforest green */}
          <path
            d="M22,12 C44,7 72,19 77,35 C81,53 67,72 53,91 C43,105 39,112 35,110 C31,105 33,82 23,63 C14,44 12,25 22,12 Z"
            fill="#15803d"
          />
          {/* Andes Mountain spine on West */}
          <path
            d="M22,12 Q14,44 23,63 Q33,82 35,110"
            stroke="#e2e8f0"
            strokeWidth="3"
            strokeDasharray="3,3"
            fill="none"
          />
        </svg>
      </div>

      {/* ---------------------------------------------------- */}
      {/* 4. ASIA / EURASIA - Center-Right Distant Horizon Landmass */}
      {/* ---------------------------------------------------- */}
      <div 
        className="hidden lg:flex absolute right-44 sm:right-60 bottom-32 sm:bottom-40 z-10 flex-col items-center opacity-80 hover:opacity-100 transition-opacity animate-bob-delayed pointer-events-auto"
        style={{ animationDuration: '8s' }}
        title="Continent of Asia"
      >
        <div className="mb-0.5 px-2 py-0.5 rounded-full bg-sky-950/80 border border-sky-400/60 text-sky-200 text-[9px] font-black uppercase shadow">
          ASIA
        </div>

        <svg viewBox="0 0 140 70" className="w-24 sm:w-32 h-auto drop-shadow-md">
          {/* Beach */}
          <path
            d="M10,40 C25,20 60,15 90,20 C120,25 135,45 130,60 C110,65 80,60 50,65 C25,70 10,55 10,40 Z"
            fill="#f59e0b"
          />
          {/* Land */}
          <path
            d="M13,41 C27,22 60,18 88,22 C116,27 130,45 125,58 C107,62 78,58 49,62 C26,67 12,53 13,41 Z"
            fill="#166534"
          />
          {/* Himalayan snow caps */}
          <polygon points="45,35 55,22 65,35" fill="#f8fafc" />
          <polygon points="60,35 70,18 80,35" fill="#ffffff" />
          <polygon points="75,35 85,25 95,35" fill="#f8fafc" />
        </svg>
      </div>

      {/* ---------------------------------------------------- */}
      {/* 5. ANTARCTICA - Frosty Polar Ice Shelf Bottom Center */}
      {/* ---------------------------------------------------- */}
      <div 
        className="absolute left-1/2 -translate-x-1/2 -bottom-4 z-20 flex flex-col items-center animate-bob-slow pointer-events-auto group cursor-pointer"
        style={{ animationDuration: '9s' }}
        title="Continent of Antarctica"
      >
        <div className="mb-1 px-3 py-0.5 rounded-full bg-cyan-950/90 border border-cyan-400/80 text-cyan-200 text-[10px] sm:text-xs font-black tracking-wider uppercase shadow-lg flex items-center gap-1 group-hover:scale-105 transition-transform">
          <span className="w-2 h-2 rounded-full bg-cyan-300 animate-pulse" />
          <span>ANTARCTICA</span>
        </div>

        {/* Ice Shelf Glacier Vector */}
        <svg viewBox="0 0 200 60" className="w-36 sm:w-56 h-auto drop-shadow-2xl overflow-visible">
          {/* Ice Shelf Base */}
          <path
            d="M10,40 C30,25 70,20 100,22 C130,20 170,25 190,40 C195,50 180,60 100,60 C20,60 5,50 10,40 Z"
            fill="#38bdf8"
            opacity="0.5"
          />
          <path
            d="M12,38 C32,23 71,18 100,20 C129,18 168,23 188,38 C180,50 120,54 100,54 C80,54 20,50 12,38 Z"
            fill="#e0f2fe"
          />
          {/* Pure White Ice Pack Plateau */}
          <path
            d="M16,35 C35,21 72,16 100,18 C128,16 165,21 184,35 C175,44 125,48 100,48 C75,48 25,44 16,35 Z"
            fill="#ffffff"
          />
          {/* Ice Crevasses */}
          <path d="M45,26 L55,34 M90,24 L96,36 M140,25 L148,35" stroke="#7dd3fc" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </div>

    </div>
  );
};
