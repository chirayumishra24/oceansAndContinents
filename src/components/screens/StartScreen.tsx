import React from 'react';
import { Ship } from '../race/Ship';
import { Play, Volume2, VolumeX, Compass, Anchor } from 'lucide-react';
import { InstructionsCard } from '../layout/InstructionsCard';

interface StartScreenProps {
  onStart: () => void;
  onOpenInstructions?: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
}

export const StartScreen: React.FC<StartScreenProps> = ({
  onStart,
  soundEnabled,
  onToggleSound,
}) => {
  return (
    <div className="relative min-h-screen w-full flex flex-col justify-between overflow-x-hidden bg-gradient-to-b from-sky-400 via-sky-300 to-ocean-dark select-none p-3 sm:p-6">
      
      {/* ======================================================== */}
      {/* BACKGROUND SCENERY & ANIMATIONS */}
      {/* ======================================================== */}

      {/* Sun Ray Beams */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-gradient-to-b from-yellow-200/30 to-transparent pointer-events-none blur-2xl -z-10" />

      {/* Floating Clouds */}
      <div className="absolute top-6 left-8 w-28 h-9 bg-white/80 rounded-full blur-[1px] animate-float-slow" />
      <div className="absolute top-14 right-12 w-40 h-10 bg-white/70 rounded-full blur-[1px] animate-float-slow" style={{ animationDelay: '2.5s' }} />

      {/* Animated Seagulls */}
      <div className="absolute top-12 left-1/4 flex gap-4 pointer-events-none opacity-80 animate-float-slow">
        <svg className="w-7 h-3.5 fill-slate-700" viewBox="0 0 40 20">
          <path d="M0,15 Q10,0 20,10 Q30,0 40,15 Q30,8 20,12 Q10,8 0,15 Z" />
        </svg>
      </div>

      {/* Multi-layered Animated Ocean Waves at Bottom */}
      <div className="absolute inset-x-0 bottom-0 h-44 sm:h-64 pointer-events-none overflow-hidden z-10">
        <div className="absolute inset-x-0 bottom-0 h-full opacity-40 animate-waves-1">
          <svg viewBox="0 0 1200 300" className="w-[200%] h-full fill-sky-600" preserveAspectRatio="none">
            <path d="M0,100 C150,150 350,50 500,100 C650,150 850,50 1000,100 C1100,130 1150,70 1200,100 L1200,300 L0,300 Z" />
          </svg>
        </div>
        <div className="absolute inset-x-0 bottom-0 h-32 sm:h-48 fill-ocean-dark">
          <svg viewBox="0 0 1200 300" className="w-full h-full" preserveAspectRatio="none">
            <path d="M0,60 C200,120 400,30 600,70 C800,110 1000,40 1200,60 L1200,300 L0,300 Z" />
          </svg>
        </div>
      </div>

      {/* ======================================================== */}
      {/* TOP BAR CONTROLS */}
      {/* ======================================================== */}
      <div className="relative z-30 flex items-center justify-between max-w-7xl mx-auto w-full mb-3">
        <div className="inline-flex items-center gap-2 bg-sky-950/70 border-2 border-amber-400/80 px-4 py-1.5 rounded-full text-xs sm:text-sm font-black text-amber-300 shadow-md">
          <Compass className="w-4 h-4 text-amber-400 animate-spin-slow" />
          <span>STARTING SCREEN (ANIMATED)</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onToggleSound}
            className={`p-2.5 rounded-full border-2 shadow-md transition-all hover:scale-105 ${
              soundEnabled
                ? 'bg-amber-500 text-slate-950 border-amber-300'
                : 'bg-slate-800 text-slate-400 border-slate-700'
            }`}
            title={soundEnabled ? 'Mute' : 'Unmute'}
          >
            {soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* ======================================================== */}
      {/* MAIN CENTERED START SCENE */}
      {/* ======================================================== */}
      <div className="relative z-30 max-w-4xl mx-auto w-full flex flex-col items-center justify-center flex-1 my-auto text-center">
        
        {/* Ship's Steering Wheel Backdrop Frame */}
        <div className="relative mb-2 flex items-center justify-center">
          <div className="absolute -inset-8 w-44 sm:w-56 h-44 sm:h-56 mx-auto rounded-full border-8 border-amber-800/60 flex items-center justify-center pointer-events-none -z-10 opacity-75">
            <div className="w-full h-2 bg-amber-800 absolute rotate-0" />
            <div className="w-full h-2 bg-amber-800 absolute rotate-45" />
            <div className="w-full h-2 bg-amber-800 absolute rotate-90" />
            <div className="w-full h-2 bg-amber-800 absolute rotate-135" />
          </div>

          {/* Main 3D Title Text */}
          <div className="flex flex-col items-center drop-shadow-2xl">
            <span className="text-5xl sm:text-6xl md:text-7xl font-black font-display tracking-tight text-white text-shadow-nautical text-stroke-thick leading-none uppercase">
              OCEAN
            </span>
            <span className="text-5xl sm:text-6xl md:text-7xl font-black font-display tracking-tight text-amber-300 text-shadow-gold text-stroke-gold leading-none uppercase -mt-2">
              RACERS
            </span>
          </div>
        </div>

        {/* Subtitle Ribbon */}
        <div className="relative my-2">
          <div className="bg-gradient-to-r from-amber-700 via-amber-800 to-amber-700 text-amber-100 font-black text-xs sm:text-sm px-6 py-1.5 rounded-full border-2 border-amber-400/80 shadow-lg tracking-widest uppercase">
            RACE ACROSS THE BLUE PLANET!
          </div>
        </div>

        {/* Chapter badge */}
        <p className="text-xs sm:text-sm font-extrabold text-sky-950/80 tracking-wide uppercase mt-0.5">
          Chapter 2: Oceans and Continents
        </p>

        {/* Center Intro Mission Card */}
        <div className="mt-3 p-3.5 rounded-2xl bg-amber-50/95 border-2 border-amber-400 text-slate-800 shadow-xl max-w-sm text-center">
          <p className="text-xs sm:text-sm font-bold text-slate-700 leading-tight">
            Two teams. One ocean.<br />
            One goal — <strong className="text-amber-600 font-extrabold">Reach the Finish Line First!</strong>
          </p>
        </div>

        {/* Large START Button */}
        <div className="mt-5">
          <button
            type="button"
            onClick={onStart}
            className="px-12 sm:px-16 py-3.5 sm:py-4 rounded-2xl font-black text-xl sm:text-2xl uppercase tracking-wider font-display bg-gradient-to-b from-amber-300 via-amber-400 to-amber-500 hover:from-amber-200 hover:to-amber-400 text-slate-950 border-4 border-amber-200 shadow-nautical-button hover:shadow-nautical-button-pressed active:translate-y-1 transition-all flex items-center gap-3 cursor-pointer group"
          >
            <Play className="w-6 h-6 fill-slate-950 group-hover:scale-110 transition-transform" />
            <span>START RACE</span>
          </button>
        </div>

        {/* Floating Ships along the bottom */}
        <div className="w-full max-w-xl flex items-end justify-around px-2 pt-6">
          <div className="flex flex-col items-center">
            <span className="mb-1.5 px-3 py-0.5 rounded-full bg-red-700 text-white font-extrabold text-[11px] border border-red-300 shadow">
              TEAM RED — Voyagers
            </span>
            <Ship team="red" size="md" className="animate-bob-slow" />
          </div>

          <Anchor className="w-7 h-7 text-amber-300 drop-shadow mb-4" />

          <div className="flex flex-col items-center">
            <span className="mb-1.5 px-3 py-0.5 rounded-full bg-blue-700 text-white font-extrabold text-[11px] border border-blue-300 shadow">
              TEAM BLUE — Explorers
            </span>
            <Ship team="blue" size="md" className="animate-bob-delayed" />
          </div>
        </div>

      </div>
    </div>
  );
};
