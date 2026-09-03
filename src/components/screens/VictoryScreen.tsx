import React, { useEffect } from 'react';
import { WinnerType, GameStats } from '../../types/game';
import { Ship } from '../race/Ship';
import { Trophy, RotateCcw, Home, Sparkles, Flag } from 'lucide-react';
import { triggerVictoryConfetti } from '../../utils/confetti';

interface VictoryScreenProps {
  winner: WinnerType;
  stats: GameStats;
  onPlayAgain: () => void;
  onHome: () => void;
}

export const VictoryScreen: React.FC<VictoryScreenProps> = ({
  winner,
  stats,
  onPlayAgain,
  onHome,
}) => {
  const isRed = winner === 'red';
  const isBlue = winner === 'blue';
  const isTie = winner === 'tie';

  let winnerTitle = 'DEAD HEAT TIE!';
  let winnerSubtitle = 'BOTH TEAMS CONQUERED THE OCEAN EQUALLY!';

  if (isRed) {
    winnerTitle = 'TEAM RED WINS!';
    winnerSubtitle = 'THE VOYAGERS HAVE CONQUERED THE OCEAN!';
  } else if (isBlue) {
    winnerTitle = 'TEAM BLUE WINS!';
    winnerSubtitle = 'THE EXPLORERS HAVE CONQUERED THE OCEAN!';
  }

  useEffect(() => {
    // Fire celebratory confetti on mount
    triggerVictoryConfetti();
  }, []);

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center p-4 sm:p-6 bg-gradient-to-b from-ocean-deep via-ocean-dark to-slate-950 select-none text-white overflow-hidden">
      
      {/* Background radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-sky-400/20 via-transparent to-transparent pointer-events-none" />

      {/* Main Victory Card */}
      <div className="relative z-10 w-full max-w-2xl rounded-3xl bg-slate-900/90 border-4 border-amber-400 shadow-2xl p-6 sm:p-8 flex flex-col items-center text-center animate-scaleUp">
        
        {/* Trophy with Laurel / Sparkles */}
        <div className="relative mb-3">
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-b from-amber-300 via-amber-400 to-amber-600 flex items-center justify-center p-4 border-4 border-amber-200 shadow-xl animate-bounce">
            <Trophy className="w-full h-full text-slate-950" />
          </div>
          <Sparkles className="absolute -top-2 -right-2 w-8 h-8 text-amber-300 animate-spin-slow" />
          <Sparkles className="absolute -bottom-2 -left-2 w-6 h-6 text-amber-300 animate-pulse" />
        </div>

        {/* Victory Headline */}
        <h1 className="text-3xl sm:text-5xl font-black font-display tracking-tight text-amber-300 drop-shadow-md leading-tight uppercase">
          {winnerTitle}
        </h1>
        <p className="text-sm sm:text-base md:text-lg font-extrabold text-sky-200 mt-1 uppercase tracking-wider">
          {winnerSubtitle}
        </p>

        {/* Winning Ship Spotlight */}
        <div className="my-6 p-4 rounded-2xl bg-sky-950/60 border-2 border-sky-400/40 w-full flex flex-col items-center relative overflow-hidden">
          <div className="flex items-center gap-2 mb-2 text-xs font-bold text-amber-300 uppercase">
            <Flag className="w-4 h-4" />
            <span>CROSSING THE CHECKERED FINISH LINE</span>
          </div>
          
          {isTie ? (
            <div className="flex items-center justify-center gap-6 my-2">
              <Ship team="red" size="md" className="animate-bob-slow" />
              <Ship team="blue" size="md" className="animate-bob-delayed" />
            </div>
          ) : (
            <Ship team={isRed ? 'red' : 'blue'} size="lg" className="animate-bob-slow my-2" />
          )}
        </div>

        {/* Match Statistics Grid */}
        <div className="w-full grid grid-cols-2 sm:grid-cols-4 gap-3 my-4">
          <div className="p-3 rounded-xl bg-sky-950/80 border border-sky-700/60 text-center">
            <span className="text-[10px] sm:text-xs font-bold text-sky-300 uppercase block">
              Questions
            </span>
            <span className="text-xl sm:text-2xl font-black text-white font-display">
              {stats.questionsPlayed}
            </span>
          </div>

          <div className="p-3 rounded-xl bg-rose-950/60 border border-rose-600/60 text-center">
            <span className="text-[10px] sm:text-xs font-bold text-rose-300 uppercase block">
              Red Steps
            </span>
            <span className="text-xl sm:text-2xl font-black text-rose-400 font-display">
              {stats.redSteps}
            </span>
          </div>

          <div className="p-3 rounded-xl bg-blue-950/60 border border-blue-600/60 text-center">
            <span className="text-[10px] sm:text-xs font-bold text-blue-300 uppercase block">
              Blue Steps
            </span>
            <span className="text-xl sm:text-2xl font-black text-blue-400 font-display">
              {stats.blueSteps}
            </span>
          </div>

          <div className="p-3 rounded-xl bg-emerald-950/60 border border-emerald-600/60 text-center">
            <span className="text-[10px] sm:text-xs font-bold text-emerald-300 uppercase block">
              Skips Used
            </span>
            <span className="text-xl sm:text-2xl font-black text-emerald-300 font-display">
              {stats.redSkipsUsed + stats.blueSkipsUsed}
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-4 flex flex-col sm:flex-row items-center gap-3 w-full justify-center">
          <button
            type="button"
            onClick={onPlayAgain}
            className="w-full sm:w-auto px-8 py-3 rounded-xl font-black text-lg uppercase tracking-wider font-display bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 shadow-nautical-button hover:shadow-nautical-button-pressed active:translate-y-1 transition-all flex items-center justify-center gap-2"
          >
            <RotateCcw className="w-5 h-5" />
            <span>PLAY AGAIN</span>
          </button>

          <button
            type="button"
            onClick={onHome}
            className="w-full sm:w-auto px-6 py-3 rounded-xl font-bold text-base uppercase tracking-wider bg-slate-800 hover:bg-slate-700 text-sky-100 border-2 border-slate-600 transition-colors flex items-center justify-center gap-2"
          >
            <Home className="w-5 h-5" />
            <span>BACK TO HOME</span>
          </button>
        </div>

      </div>

    </div>
  );
};
