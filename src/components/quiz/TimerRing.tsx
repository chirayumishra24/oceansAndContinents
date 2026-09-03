import React from 'react';
import { Hourglass } from 'lucide-react';

interface TimerRingProps {
  seconds: number;
  maxSeconds?: number;
  isUrgent?: boolean;
}

export const TimerRing: React.FC<TimerRingProps> = ({
  seconds,
  maxSeconds = 15,
  isUrgent = false,
}) => {
  const radius = 24;
  const circumference = 2 * Math.PI * radius;
  const progress = Math.max(0, Math.min(1, seconds / maxSeconds));
  const strokeDashoffset = circumference - progress * circumference;

  return (
    <div className="flex flex-col items-center justify-center select-none">
      {/* Outer circular vessel */}
      <div 
        className={`relative w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center bg-slate-900/80 border-4 shadow-lg transition-transform duration-300 ${
          isUrgent 
            ? 'border-red-500 scale-105 animate-pulse shadow-red-500/40' 
            : 'border-amber-400/80 shadow-cyan-900/30'
        }`}
      >
        {/* SVG Progress Circle */}
        <svg className="absolute inset-0 w-full h-full -rotate-90 p-1">
          <circle
            cx="50%"
            cy="50%"
            r={radius}
            stroke="rgba(255, 255, 255, 0.15)"
            strokeWidth="4"
            fill="none"
          />
          <circle
            cx="50%"
            cy="50%"
            r={radius}
            stroke={isUrgent ? '#ef4444' : '#eab308'}
            strokeWidth="4.5"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            fill="none"
            className="transition-all duration-1000 linear"
          />
        </svg>

        {/* Center Timer Display with Hourglass Icon */}
        <div className="flex flex-col items-center justify-center z-10 text-center">
          <Hourglass className={`w-3.5 h-3.5 sm:w-4 sm:h-4 transition-colors ${
            isUrgent ? 'text-red-400 animate-spin-slow' : 'text-amber-300'
          }`} />
          <span className={`text-base sm:text-lg font-black tracking-tight font-display leading-tight ${
            isUrgent ? 'text-red-400 animate-ping-short' : 'text-white'
          }`}>
            {seconds}
          </span>
          <span className="text-[8px] font-bold uppercase tracking-wider text-slate-400 -mt-0.5">
            SEC
          </span>
        </div>
      </div>
    </div>
  );
};
