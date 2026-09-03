import React from 'react';
import { TeamId, FeedbackState } from '../../types/game';
import { Ship } from './Ship';
import { CheckpointNode } from './CheckpointNode';

interface RaceTrackProps {
  redPosition: number;
  bluePosition: number;
  maxCheckpoints: number;
  feedback: FeedbackState | null;
  currentTeam: TeamId;
}

export const RaceTrack: React.FC<RaceTrackProps> = ({
  redPosition,
  bluePosition,
  maxCheckpoints,
  feedback,
  currentTeam,
}) => {
  const checkpoints = Array.from({ length: maxCheckpoints + 1 }, (_, i) => i);

  // Position calculation (percentage along the water track: 0% to 100%)
  const getPercent = (pos: number) => {
    return Math.min(100, Math.max(0, (pos / maxCheckpoints) * 100));
  };

  const isRedMoving = feedback?.type === 'correct' && feedback.team === 'red';
  const isBlueMoving = feedback?.type === 'correct' && feedback.team === 'blue';

  return (
    <div className="relative w-full rounded-2xl overflow-hidden shadow-2xl border-4 border-sky-600/40 bg-gradient-to-b from-sky-400 via-sky-500 to-ocean-dark p-3 select-none">
      
      {/* Sky & Distant Horizon */}
      <div className="absolute inset-0 bg-gradient-to-b from-sky-200 via-sky-300 to-sky-400 h-28 pointer-events-none opacity-80" />

      {/* Distant Clouds */}
      <div className="absolute top-2 left-10 w-24 h-7 bg-white/70 rounded-full blur-[1px] animate-float-slow" />
      <div className="absolute top-5 right-28 w-32 h-8 bg-white/60 rounded-full blur-[1px] animate-float-slow" style={{ animationDelay: '2s' }} />

      {/* Animated Water Surface Waves */}
      <div className="absolute inset-x-0 bottom-0 h-4/5 pointer-events-none overflow-hidden opacity-30">
        <div className="w-[200%] h-full flex animate-waves-1">
          <svg viewBox="0 0 1200 200" className="w-1/2 h-full fill-white" preserveAspectRatio="none">
            <path d="M0,80 C150,110 350,50 500,80 C650,110 850,50 1000,80 C1100,100 1150,60 1200,80 L1200,200 L0,200 Z" />
          </svg>
          <svg viewBox="0 0 1200 200" className="w-1/2 h-full fill-white" preserveAspectRatio="none">
            <path d="M0,80 C150,110 350,50 500,80 C650,110 850,50 1000,80 C1100,100 1150,60 1200,80 L1200,200 L0,200 Z" />
          </svg>
        </div>
      </div>

      {/* Left Coast / Island Starting Line */}
      <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-24 z-0 pointer-events-none flex flex-col justify-between">
        {/* Upper Island */}
        <div className="w-20 sm:w-28 h-28 bg-emerald-700/80 rounded-r-full -translate-x-6 border-r-4 border-amber-600/60 shadow-lg relative">
          <div className="absolute top-4 right-4 w-4 h-8 bg-amber-800 rounded-sm" />
          {/* Palm leaves */}
          <div className="absolute top-1 right-2 w-8 h-4 bg-emerald-500 rounded-full rotate-45" />
          <div className="absolute top-2 right-5 w-8 h-4 bg-emerald-600 rounded-full -rotate-45" />
        </div>
        {/* Lower Coast */}
        <div className="w-24 sm:w-32 h-24 bg-emerald-800/80 rounded-r-3xl -translate-x-8 border-r-4 border-amber-700/60 shadow-lg" />
      </div>

      {/* Right Coast / Finish Line Island */}
      <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-24 z-0 pointer-events-none flex flex-col justify-center items-end">
        <div className="w-20 sm:w-28 h-44 bg-amber-200/90 rounded-l-full translate-x-6 border-l-4 border-amber-500 shadow-xl relative overflow-hidden flex items-center justify-start pl-2">
          {/* Finish Line Checkered Arch */}
          <div className="flex flex-col items-center ml-1">
            <div className="w-7 h-10 bg-white border border-slate-700 shadow-md relative overflow-hidden animate-pulse">
              <div className="grid grid-cols-2 grid-rows-4 w-full h-full">
                <div className="bg-black" />
                <div className="bg-white" />
                <div className="bg-white" />
                <div className="bg-black" />
                <div className="bg-black" />
                <div className="bg-white" />
                <div className="bg-white" />
                <div className="bg-black" />
              </div>
            </div>
            <div className="w-1.5 h-14 bg-slate-700 rounded-b" />
          </div>
        </div>
      </div>

      {/* Main Race Track Content Area */}
      <div className="relative z-10 flex flex-col gap-6 py-2 px-1 sm:px-4">
        
        {/* ======================================================== */}
        {/* LANE 1: TEAM RED — VOYAGERS */}
        {/* ======================================================== */}
        <div className="relative bg-slate-900/30 backdrop-blur-xs rounded-2xl p-3 sm:p-4 border-2 border-red-400/40 shadow-inner">
          
          {/* Team Identifier Header */}
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2.5">
              <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs sm:text-sm font-black bg-gradient-to-r from-red-600 to-rose-700 text-white shadow-md border border-red-300/40">
                <span className="w-2.5 h-2.5 rounded-full bg-white animate-ping" />
                TEAM RED — Voyagers
              </span>
              <span className="text-xs font-bold text-sky-100 bg-sky-950/60 px-2.5 py-0.5 rounded-md border border-sky-800">
                Step: <strong className="text-amber-300 font-extrabold">{redPosition}</strong> / {maxCheckpoints}
              </span>
            </div>

            <span className="text-xs font-bold text-rose-300 bg-rose-950/60 px-2.5 py-0.5 rounded-full border border-rose-500/40">
              Lane 1
            </span>
          </div>

          {/* Water Route with Checkpoints */}
          <div className="relative h-24 sm:h-28 flex items-center">
            {/* Guide line connecting buoys */}
            <div className="absolute left-6 sm:left-12 right-6 sm:right-12 h-2 bg-sky-200/50 rounded-full z-0 shadow-inner" />
            
            {/* Buoy Checkpoints */}
            <div className="relative w-full flex justify-between items-center px-4 sm:px-10 z-10">
              {checkpoints.map(idx => (
                <CheckpointNode 
                  key={`red-cp-${idx}`}
                  index={idx}
                  total={maxCheckpoints}
                  isActiveRed={redPosition === idx}
                  isActiveBlue={false}
                />
              ))}
            </div>

            {/* Red Ship moving along the lane */}
            <div 
              className="absolute z-20 transition-all duration-700 ease-out pointer-events-none"
              style={{
                left: `calc(1.5rem + (100% - 8rem) * (${getPercent(redPosition)} / 100))`,
                transform: 'translateY(-14px)',
              }}
            >
              <div className="relative">
                {/* Stepping Floater animation */}
                {isRedMoving && feedback && (
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 z-30 bg-amber-400 text-slate-900 font-black text-xs sm:text-sm px-2.5 py-0.5 rounded-full shadow-lg border-2 border-white animate-bounce whitespace-nowrap">
                    +{feedback.stepsAdded} {feedback.stepsAdded === 1 ? 'STEP!' : 'STEPS!'}
                  </div>
                )}
                <Ship team="red" isMoving={isRedMoving} size="md" className="animate-bob-slow" />
              </div>
            </div>
          </div>
        </div>

        {/* ======================================================== */}
        {/* LANE 2: TEAM BLUE — EXPLORERS */}
        {/* ======================================================== */}
        <div className="relative bg-slate-900/30 backdrop-blur-xs rounded-2xl p-3 sm:p-4 border-2 border-blue-400/40 shadow-inner">
          
          {/* Team Identifier Header */}
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2.5">
              <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs sm:text-sm font-black bg-gradient-to-r from-blue-600 to-indigo-700 text-white shadow-md border border-blue-300/40">
                <span className="w-2.5 h-2.5 rounded-full bg-white animate-ping" />
                TEAM BLUE — Explorers
              </span>
              <span className="text-xs font-bold text-sky-100 bg-sky-950/60 px-2.5 py-0.5 rounded-md border border-sky-800">
                Step: <strong className="text-amber-300 font-extrabold">{bluePosition}</strong> / {maxCheckpoints}
              </span>
            </div>

            <span className="text-xs font-bold text-blue-300 bg-blue-950/60 px-2.5 py-0.5 rounded-full border border-blue-500/40">
              Lane 2
            </span>
          </div>

          {/* Water Route with Checkpoints */}
          <div className="relative h-24 sm:h-28 flex items-center">
            {/* Guide line connecting buoys */}
            <div className="absolute left-6 sm:left-12 right-6 sm:right-12 h-2 bg-sky-200/50 rounded-full z-0 shadow-inner" />
            
            {/* Buoy Checkpoints */}
            <div className="relative w-full flex justify-between items-center px-4 sm:px-10 z-10">
              {checkpoints.map(idx => (
                <CheckpointNode 
                  key={`blue-cp-${idx}`}
                  index={idx}
                  total={maxCheckpoints}
                  isActiveRed={false}
                  isActiveBlue={bluePosition === idx}
                />
              ))}
            </div>

            {/* Blue Ship moving along the lane */}
            <div 
              className="absolute z-20 transition-all duration-700 ease-out pointer-events-none"
              style={{
                left: `calc(1.5rem + (100% - 8rem) * (${getPercent(bluePosition)} / 100))`,
                transform: 'translateY(-14px)',
              }}
            >
              <div className="relative">
                {/* Stepping Floater animation */}
                {isBlueMoving && feedback && (
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 z-30 bg-amber-400 text-slate-900 font-black text-xs sm:text-sm px-2.5 py-0.5 rounded-full shadow-lg border-2 border-white animate-bounce whitespace-nowrap">
                    +{feedback.stepsAdded} {feedback.stepsAdded === 1 ? 'STEP!' : 'STEPS!'}
                  </div>
                )}
                <Ship team="blue" isMoving={isBlueMoving} size="md" className="animate-bob-delayed" />
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
