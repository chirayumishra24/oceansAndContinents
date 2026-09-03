import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Home, HelpCircle, Anchor, Maximize, Minimize } from 'lucide-react';

interface HeaderProps {
  questionNumber: number;
  maxQuestions?: number;
  soundEnabled: boolean;
  onToggleSound: () => void;
  onHome: () => void;
  onOpenInstructions: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  questionNumber,
  soundEnabled,
  onToggleSound,
  onHome,
  onOpenInstructions,
}) => {
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen?.().catch(() => {});
    } else {
      document.exitFullscreen?.().catch(() => {});
    }
  };

  return (
    <header className="w-full flex items-center justify-between gap-2 sm:gap-4 py-2 px-3 sm:px-6 bg-gradient-to-r from-ocean-deep via-ocean-dark to-ocean-abyss border-b-4 border-amber-500/80 shadow-lg select-none text-white">
      
      {/* Brand & Nautical Wheel */}
      <div className="flex items-center gap-2 cursor-pointer group" onClick={onHome}>
        <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-gradient-to-b from-amber-300 to-amber-600 flex items-center justify-center p-1.5 shadow-md group-hover:rotate-45 transition-transform duration-300 border-2 border-amber-200">
          <Anchor className="w-full h-full text-slate-900" />
        </div>
        <div>
          <h1 className="text-base sm:text-xl md:text-2xl font-black tracking-wide font-display text-white drop-shadow leading-none">
            OCEAN <span className="text-amber-300">RACERS</span>
          </h1>
          <p className="text-[10px] sm:text-xs text-sky-200 font-semibold tracking-wider uppercase">
            Race Across the Blue Planet!
          </p>
        </div>
      </div>

      {/* Center Question Counter Badge */}
      <div className="flex items-center justify-center">
        <div className="px-3 sm:px-5 py-1 sm:py-1.5 rounded-full bg-slate-900/80 border-2 border-sky-400/60 shadow-inner flex items-center gap-2">
          <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-sky-300">
            ROUND
          </span>
          <span className="text-sm sm:text-lg font-black text-amber-300 font-display">
            {questionNumber}
          </span>
        </div>
      </div>

      {/* Right Controls: Fullscreen, Instructions, Sound Toggle, Home */}
      <div className="flex items-center gap-1.5 sm:gap-2">
        {/* Fullscreen Toggle */}
        <button
          type="button"
          onClick={toggleFullscreen}
          title={isFullscreen ? 'Exit Full Screen' : 'Enter Full Screen'}
          aria-label={isFullscreen ? 'Exit Full Screen' : 'Enter Full Screen'}
          className="p-2 sm:p-2.5 rounded-full bg-sky-800/80 hover:bg-sky-700 text-sky-100 hover:text-white border border-sky-600 transition-colors shadow focus:outline-none focus:ring-2 focus:ring-amber-300"
        >
          {isFullscreen ? (
            <Minimize className="w-4 h-4 sm:w-5 sm:h-5" />
          ) : (
            <Maximize className="w-4 h-4 sm:w-5 sm:h-5" />
          )}
        </button>

        {/* Help / Instructions Modal Trigger */}
        <button
          type="button"
          onClick={onOpenInstructions}
          title="How to Play"
          className="p-2 sm:p-2.5 rounded-full bg-sky-800/80 hover:bg-sky-700 text-sky-100 hover:text-white border border-sky-600 transition-colors shadow focus:outline-none focus:ring-2 focus:ring-amber-300"
        >
          <HelpCircle className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>

        {/* Sound Toggle */}
        <button
          type="button"
          onClick={onToggleSound}
          title={soundEnabled ? 'Mute Sound' : 'Unmute Sound'}
          aria-label={soundEnabled ? 'Mute Sound' : 'Unmute Sound'}
          className={`p-2 sm:p-2.5 rounded-full transition-colors shadow border focus:outline-none focus:ring-2 focus:ring-amber-300 ${
            soundEnabled
              ? 'bg-amber-500 hover:bg-amber-400 text-slate-950 border-amber-300'
              : 'bg-slate-800 text-slate-400 border-slate-700 hover:bg-slate-700'
          }`}
        >
          {soundEnabled ? (
            <Volume2 className="w-4 h-4 sm:w-5 sm:h-5" />
          ) : (
            <VolumeX className="w-4 h-4 sm:w-5 sm:h-5" />
          )}
        </button>

        {/* Home Button */}
        <button
          type="button"
          onClick={onHome}
          title="Back to Title Screen"
          className="p-2 sm:p-2.5 rounded-full bg-sky-800/80 hover:bg-sky-700 text-sky-100 hover:text-white border border-sky-600 transition-colors shadow focus:outline-none focus:ring-2 focus:ring-amber-300"
        >
          <Home className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>
      </div>

    </header>
  );
};
