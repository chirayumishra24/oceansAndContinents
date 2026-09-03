import React from 'react';

interface CheckpointNodeProps {
  index: number;
  total: number;
  isActiveRed: boolean;
  isActiveBlue: boolean;
}

export const CheckpointNode: React.FC<CheckpointNodeProps> = ({
  index,
  total,
  isActiveRed,
  isActiveBlue,
}) => {
  const isStart = index === 0;
  const isFinish = index === total;
  const isAnyActive = isActiveRed || isActiveBlue;

  return (
    <div className="relative flex flex-col items-center justify-center group">
      {/* Floating water ripple under buoy */}
      <div 
        className={`absolute -bottom-2 w-7 h-2 rounded-full transition-all duration-300 ${
          isAnyActive ? 'bg-white/60 blur-[1px] scale-125' : 'bg-cyan-900/30'
        }`}
      />

      {/* Buoy / Marker Body */}
      <div 
        className={`relative z-10 w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
          isFinish 
            ? 'bg-amber-300 border-amber-500 shadow-lg scale-110'
            : isStart
            ? 'bg-emerald-200 border-emerald-500 text-emerald-800'
            : isAnyActive
            ? 'bg-white border-sky-400 shadow-md scale-110 ring-2 ring-sky-300/60'
            : 'bg-white/85 border-sky-200 text-slate-500 hover:border-sky-400'
        }`}
      >
        {isFinish ? (
          <span className="text-xs font-black">🏁</span>
        ) : isStart ? (
          <span className="text-[10px] font-bold">S</span>
        ) : (
          <span className="text-[10px] font-bold text-slate-600">{index}</span>
        )}

        {/* Active team indicator aura */}
        {isActiveRed && (
          <div className="absolute -inset-1 rounded-full border-2 border-red-500 animate-ping opacity-60 pointer-events-none" />
        )}
        {isActiveBlue && (
          <div className="absolute -inset-1 rounded-full border-2 border-blue-500 animate-ping opacity-60 pointer-events-none" />
        )}
      </div>

      {/* Label for Start/Finish */}
      {isStart && (
        <span className="absolute -top-5 text-[9px] font-bold uppercase tracking-wider text-white/90 bg-slate-800/40 px-1 rounded">
          START
        </span>
      )}
      {isFinish && (
        <span className="absolute -top-5 text-[9px] font-bold uppercase tracking-wider text-amber-200 bg-slate-800/60 px-1 rounded shadow">
          FINISH
        </span>
      )}
    </div>
  );
};
