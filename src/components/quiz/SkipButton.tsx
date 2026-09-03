import React, { useState } from 'react';
import { FastForward } from 'lucide-react';

interface SkipButtonProps {
  skipsLeft: number;
  onSkip: () => void;
  disabled?: boolean;
}

export const SkipButton: React.FC<SkipButtonProps> = ({
  skipsLeft,
  onSkip,
  disabled = false,
}) => {
  const [showConfirm, setShowConfirm] = useState<boolean>(false);
  const isAvailable = skipsLeft > 0 && !disabled;

  const handleClick = () => {
    if (!isAvailable) return;
    if (!showConfirm) {
      setShowConfirm(true);
      // Auto-hide confirm prompt after 3.5s
      setTimeout(() => setShowConfirm(false), 3500);
    } else {
      setShowConfirm(false);
      onSkip();
    }
  };

  return (
    <div className="relative flex flex-col items-center justify-center select-none">
      {/* Confirmation tooltip if clicked once to prevent accidental skips */}
      {showConfirm && isAvailable && (
        <div className="absolute -top-10 z-30 bg-amber-500 text-slate-900 font-extrabold text-[11px] px-2.5 py-1 rounded-md shadow-xl border-2 border-white animate-bounce whitespace-nowrap">
          Click again to confirm SKIP!
        </div>
      )}

      {/* Circular Lifebuoy Button */}
      <button
        type="button"
        onClick={handleClick}
        disabled={!isAvailable}
        aria-label={`Skip question. ${skipsLeft} skips remaining.`}
        className={`relative w-16 h-16 sm:w-20 sm:h-20 rounded-full flex flex-col items-center justify-center p-1 transition-all duration-200 group focus:outline-none focus:ring-4 focus:ring-amber-300 ${
          isAvailable
            ? 'cursor-pointer hover:scale-105 active:scale-95 shadow-lg hover:shadow-amber-400/30'
            : 'opacity-40 cursor-not-allowed grayscale'
        }`}
      >
        {/* SVG Nautical Lifebuoy Ring (white & safety orange) */}
        <svg viewBox="0 0 100 100" className="w-full h-full filter drop-shadow-md">
          {/* Outer ring */}
          <circle cx="50" cy="50" r="45" fill="#ea580c" stroke="#c2410c" strokeWidth="4" />
          
          {/* White cross wraps on lifebuoy */}
          <path d="M42 6 L58 6 L56 22 L44 22 Z" fill="#ffffff" />
          <path d="M42 94 L58 94 L56 78 L44 78 Z" fill="#ffffff" />
          <path d="M6 42 L6 58 L22 56 L22 44 Z" fill="#ffffff" />
          <path d="M94 42 L94 58 L78 56 L78 44 Z" fill="#ffffff" />
          
          {/* Rope loops around outer lifebuoy */}
          <circle cx="50" cy="50" r="46" fill="none" stroke="#fed7aa" strokeWidth="2" strokeDasharray="6 14" />
          
          {/* Inner hole */}
          <circle cx="50" cy="50" r="24" fill="#082f49" stroke="#fed7aa" strokeWidth="2" />
        </svg>

        {/* Center Text / Icon */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
          <FastForward className="w-3.5 h-3.5 text-amber-300 mb-0.5 group-hover:translate-x-0.5 transition-transform" />
          <span className="text-[11px] font-black uppercase text-white tracking-wider leading-none">
            {showConfirm ? 'SURE?' : 'SKIP'}
          </span>
          <span className="text-[9px] font-bold text-amber-200 mt-0.5">
            ({skipsLeft} Left)
          </span>
        </div>
      </button>
    </div>
  );
};
