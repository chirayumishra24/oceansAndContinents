import React, { useState } from 'react';
import { Target, Compass, XCircle, Trophy, Flag, Anchor, X, Play, Volume2, Square } from 'lucide-react';
import { soundManager } from '../../utils/soundManager';

interface InstructionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStartRace?: () => void;
  showStartButton?: boolean;
}

export const InstructionsModal: React.FC<InstructionsModalProps> = ({
  isOpen,
  onClose,
  onStartRace,
  showStartButton = false,
}) => {
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);

  if (!isOpen) return null;

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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm animate-fadeIn select-none">
      
      {/* Modal Container */}
      <div className="relative w-full max-w-xl rounded-3xl bg-gradient-to-b from-ocean-deep via-ocean-abyss to-slate-950 border-4 border-amber-400 shadow-2xl overflow-hidden text-white animate-scaleUp">
        
        {/* Top actions: Speech + Close */}
        <div className="absolute top-4 right-4 flex items-center gap-2 z-20">
          <button
            type="button"
            onClick={handleSpeak}
            title={isSpeaking ? "Stop Narration" : "Listen to Instructions"}
            className={`p-2 rounded-full border transition-all ${
              isSpeaking
                ? 'bg-rose-500 text-white border-rose-300 animate-pulse'
                : 'bg-sky-900/80 hover:bg-sky-800 text-sky-200 hover:text-white border-sky-600'
            }`}
          >
            {isSpeaking ? <Square className="w-4 h-4 fill-current" /> : <Volume2 className="w-4 h-4" />}
          </button>

          <button
            type="button"
            onClick={() => {
              if (isSpeaking) {
                soundManager.stopSpeaking();
                setIsSpeaking(false);
              }
              onClose();
            }}
            className="p-2 rounded-full bg-sky-900/80 hover:bg-sky-800 text-sky-200 hover:text-white border border-sky-600 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Header */}
        <div className="bg-gradient-to-r from-sky-600 via-sky-500 to-sky-600 py-4 px-6 text-center border-b-2 border-amber-400 shadow-md">
          <div className="flex items-center justify-center gap-2">
            <Anchor className="w-6 h-6 text-amber-300" />
            <h2 className="text-2xl sm:text-3xl font-black uppercase font-display tracking-wider text-white drop-shadow">
              HOW TO PLAY
            </h2>
            <Anchor className="w-6 h-6 text-amber-300" />
          </div>
          <p className="text-xs sm:text-sm text-sky-100 font-bold mt-1">
            Rules of the Ocean Racers Classroom Competition
          </p>
        </div>

        {/* Modal Body - 5 Clear Rules */}
        <div className="p-6 space-y-3.5 max-h-[70vh] overflow-y-auto">
          
          <div className="flex items-start gap-3.5 p-2.5 rounded-xl bg-sky-950/40 border border-sky-800/40">
            <div className="w-10 h-10 rounded-full bg-rose-500/20 border-2 border-rose-400 flex items-center justify-center shrink-0 text-rose-400">
              <Target className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-extrabold text-sm sm:text-base text-white">1. Simultaneous 10 Questions</h4>
              <p className="text-xs sm:text-sm text-sky-200">Each team receives 10 questions simultaneously during the race.</p>
            </div>
          </div>

          <div className="flex items-start gap-3.5 p-2.5 rounded-xl bg-sky-950/40 border border-sky-800/40">
            <div className="w-10 h-10 rounded-full bg-amber-500/20 border-2 border-amber-400 flex items-center justify-center shrink-0 text-amber-300">
              <Compass className="w-5 h-5 animate-spin-slow" />
            </div>
            <div>
              <h4 className="font-extrabold text-sm sm:text-base text-white">2. Different Questions Each Round</h4>
              <p className="text-xs sm:text-sm text-sky-200">Both teams receive distinct questions in every round!</p>
            </div>
          </div>

          <div className="flex items-start gap-3.5 p-2.5 rounded-xl bg-sky-950/40 border border-sky-800/40">
            <div className="w-10 h-10 rounded-full bg-emerald-500/20 border-2 border-emerald-400 flex items-center justify-center shrink-0 text-emerald-300">
              <XCircle className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-extrabold text-sm sm:text-base text-white">3. Full Steam Ahead!</h4>
              <p className="text-xs sm:text-sm text-sky-200">The team whose answer is right will move forward across the ocean buoys!</p>
            </div>
          </div>

          <div className="flex items-start gap-3.5 p-2.5 rounded-xl bg-sky-950/40 border border-sky-800/40">
            <div className="w-10 h-10 rounded-full bg-yellow-500/20 border-2 border-yellow-400 flex items-center justify-center shrink-0 text-yellow-300">
              <Trophy className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-extrabold text-sm sm:text-base text-white">4. Stepping Power</h4>
              <p className="text-xs sm:text-sm text-sky-200"><strong className="text-emerald-400">Easy / Medium questions</strong> = 1 step. <strong className="text-amber-300">Hard questions</strong> = 2 steps forward!</p>
            </div>
          </div>

          <div className="flex items-start gap-3.5 p-2.5 rounded-xl bg-sky-950/40 border border-sky-800/40">
            <div className="w-10 h-10 rounded-full bg-cyan-500/20 border-2 border-cyan-400 flex items-center justify-center shrink-0 text-cyan-300">
              <Flag className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-extrabold text-sm sm:text-base text-white">5. Race to the Finish Line</h4>
              <p className="text-xs sm:text-sm text-sky-200">The first ship to reach the finish line (or furthest after 10 rounds) WINS!</p>
            </div>
          </div>

          {/* Guarantee banner */}
          <div className="p-3 rounded-xl bg-amber-500/20 border-2 border-amber-400/80 text-center">
            <p className="text-xs sm:text-sm font-black text-amber-300">
              ⚡ Zero Question Repetition: Every question is fresh and unique throughout your entire match!
            </p>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-900 border-t-2 border-sky-800/80 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={() => {
              if (isSpeaking) {
                soundManager.stopSpeaking();
                setIsSpeaking(false);
              }
              onClose();
            }}
            className="px-5 py-2.5 rounded-xl font-bold text-sm bg-slate-800 hover:bg-slate-700 text-sky-200 border border-slate-600 transition-colors"
          >
            Close
          </button>
          
          {showStartButton && onStartRace && (
            <button
              type="button"
              onClick={() => {
                if (isSpeaking) {
                  soundManager.stopSpeaking();
                  setIsSpeaking(false);
                }
                onClose();
                onStartRace();
              }}
              className="px-7 py-3 rounded-xl font-black text-base uppercase tracking-wider bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 shadow-nautical-button hover:shadow-nautical-button-pressed active:translate-y-1 transition-all flex items-center gap-2"
            >
              <Play className="w-5 h-5 fill-current" />
              LET&apos;S RACE!
            </button>
          )}
        </div>

      </div>
    </div>
  );
};
