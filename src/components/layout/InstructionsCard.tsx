import React, { useState } from 'react';
import { Target, Compass, XCircle, Trophy, Flag, Anchor, Volume2, Square } from 'lucide-react';
import { soundManager } from '../../utils/soundManager';

interface InstructionsCardProps {
  showSpeechButton?: boolean;
}

export const InstructionsCard: React.FC<InstructionsCardProps> = ({
  showSpeechButton = true,
}) => {
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);

  const handleSpeak = () => {
    if (isSpeaking) {
      soundManager.stopSpeaking();
      setIsSpeaking(false);
      return;
    }

    const narrationScript = `
      Welcome to Ocean Racers! Race Across the Blue Planet!
      Here are the instructions:
      Rule number 1: Each team gets 10 questions simultaneously during the race.
      Rule number 2: Both teams receive different questions in every round!
      Rule number 3: The team whose answer is right moves their ship forward across the ocean!
      Rule number 4: Hard questions are worth two steps!
      Rule number 5: The first ship to reach the finish line wins!
      Remember: No question will repeat. Every question is a new challenge!
    `;

    setIsSpeaking(true);
    soundManager.speakText(narrationScript, () => setIsSpeaking(false));
  };

  return (
    <div className="rounded-3xl bg-gradient-to-b from-[#026aa2] to-[#035388] border-4 border-[#38bdf8] shadow-2xl overflow-hidden text-white select-none">
      
      {/* Top Ribbon Banner */}
      <div className="bg-[#0284c7] py-3 px-4 text-center border-b-2 border-sky-400/60 flex items-center justify-between">
        <div className="flex items-center gap-2 mx-auto">
          <Anchor className="w-5 h-5 text-amber-300" />
          <h3 className="text-lg sm:text-xl font-black tracking-wider uppercase font-display text-white drop-shadow">
            INSTRUCTIONS
          </h3>
          <Anchor className="w-5 h-5 text-amber-300" />
        </div>

        {showSpeechButton && (
          <button
            type="button"
            onClick={handleSpeak}
            title={isSpeaking ? "Stop Narration" : "Listen to Instructions"}
            className={`p-1.5 rounded-full transition-all border ${
              isSpeaking
                ? 'bg-rose-500 text-white border-rose-300 animate-pulse'
                : 'bg-sky-900/80 hover:bg-sky-800 text-sky-200 border-sky-600'
            }`}
          >
            {isSpeaking ? <Square className="w-4 h-4 fill-current" /> : <Volume2 className="w-4 h-4" />}
          </button>
        )}
      </div>

      {/* Rules Body with Illustrated Badges */}
      <div className="p-4 sm:p-5 space-y-3 sm:space-y-4 text-xs sm:text-sm">
        
        {/* Rule 1 */}
        <div className="flex items-center gap-3.5">
          <div className="w-9 h-9 rounded-full bg-rose-500/20 border-2 border-rose-400/80 flex items-center justify-center shrink-0 text-rose-300">
            <Target className="w-5 h-5" />
          </div>
          <p className="leading-snug text-sky-50 font-medium">
            Each team gets <strong className="text-white font-extrabold">10 questions simultaneously</strong>.
          </p>
        </div>

        {/* Rule 2 */}
        <div className="flex items-center gap-3.5">
          <div className="w-9 h-9 rounded-full bg-amber-500/20 border-2 border-amber-400/80 flex items-center justify-center shrink-0 text-amber-300">
            <Compass className="w-5 h-5" />
          </div>
          <p className="leading-snug text-sky-50 font-medium">
            Both teams receive <strong className="text-white font-extrabold">different questions</strong> each round!
          </p>
        </div>

        {/* Rule 3 */}
        <div className="flex items-center gap-3.5">
          <div className="w-9 h-9 rounded-full bg-red-500/20 border-2 border-red-400/80 flex items-center justify-center shrink-0 text-red-300">
            <XCircle className="w-5 h-5" />
          </div>
          <p className="leading-snug text-sky-50 font-medium">
            The team whose answer is right <strong className="text-white font-extrabold">will move forward!</strong>
          </p>
        </div>

        {/* Rule 4 */}
        <div className="flex items-center gap-3.5">
          <div className="w-9 h-9 rounded-full bg-yellow-500/20 border-2 border-yellow-400/80 flex items-center justify-center shrink-0 text-yellow-300">
            <Trophy className="w-5 h-5" />
          </div>
          <p className="leading-snug text-sky-50 font-medium">
            Hard questions are worth <strong className="text-amber-300 font-extrabold">2 steps!</strong>
          </p>
        </div>

        {/* Rule 5 */}
        <div className="flex items-center gap-3.5">
          <div className="w-9 h-9 rounded-full bg-emerald-500/20 border-2 border-emerald-400/80 flex items-center justify-center shrink-0 text-emerald-300">
            <Flag className="w-5 h-5" />
          </div>
          <p className="leading-snug text-sky-50 font-medium">
            First ship to reach the finish line <strong className="text-white font-extrabold">WINS!</strong>
          </p>
        </div>

        {/* Bottom Banner */}
        <div className="mt-4 pt-2.5 border-t border-sky-600/40 text-center text-xs text-sky-100 font-bold bg-[#034775]/60 p-2.5 rounded-xl border border-sky-500/30">
          ✨ No question will repeat. Every question is a new challenge!
        </div>

      </div>
    </div>
  );
};
