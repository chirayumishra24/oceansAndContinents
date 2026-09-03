import React from 'react';
import { InstructionsCard } from './InstructionsCard';
import { Check, Anchor, Sparkles } from 'lucide-react';

export const SidePanel: React.FC = () => {
  return (
    <aside className="w-full lg:w-80 xl:w-96 flex flex-col gap-4 select-none">
      
      {/* INSTRUCTIONS CARD (Matches Reference Top-Right Card) */}
      <InstructionsCard showSpeechButton={true} />

      {/* FEATURES CARD (Matches Reference Bottom-Right Card) */}
      <div className="rounded-2xl bg-gradient-to-b from-ocean-deep to-slate-950 border-4 border-amber-500/60 shadow-xl p-4 text-white relative overflow-hidden">
        
        {/* Glowing sparkles title */}
        <div className="flex items-center justify-center gap-2 mb-3">
          <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
          <h3 className="text-base sm:text-lg font-black tracking-wider uppercase font-display text-amber-300">
            FEATURES
          </h3>
          <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
        </div>

        {/* Feature Checkmarks List */}
        <ul className="space-y-2 text-xs sm:text-sm text-sky-100">
          <li className="flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-400 shrink-0 stroke-[3]" />
            <span>Unique questions — no repetition</span>
          </li>
          <li className="flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-400 shrink-0 stroke-[3]" />
            <span>Multiple choice, true/false & map topics</span>
          </li>
          <li className="flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-400 shrink-0 stroke-[3]" />
            <span>Smooth animated ship movement</span>
          </li>
          <li className="flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-400 shrink-0 stroke-[3]" />
            <span>Exciting procedural sound effects</span>
          </li>
          <li className="flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-400 shrink-0 stroke-[3]" />
            <span>Interactive projector & smartboard ready</span>
          </li>
          <li className="flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-400 shrink-0 stroke-[3]" />
            <span>Built for spirited classroom team battles!</span>
          </li>
        </ul>

        {/* Decorative Golden Anchor & Treasure Map Graphic */}
        <div className="mt-4 flex justify-end items-center opacity-80 hover:opacity-100 transition-opacity">
          <div className="flex items-center gap-2 text-[11px] text-amber-300/80 font-bold italic">
            <span>Classroom Edition</span>
            <Anchor className="w-5 h-5 text-amber-400" />
          </div>
        </div>

      </div>

    </aside>
  );
};
