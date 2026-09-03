import React, { useEffect } from 'react';
import { Question, SimultaneousRoundStatus } from '../../types/game';
import { RoundEvaluation } from '../../hooks/useGame';
import { TimerRing } from './TimerRing';
import { SkipButton } from './SkipButton';
import { AnswerButton } from './AnswerButton';
import { Compass, Sparkles, CheckCircle, XCircle } from 'lucide-react';

interface DualQuestionCardsProps {
  roundNumber: number;
  totalRounds: number;
  timeLeft: number;
  isUrgent: boolean;
  roundStatus: SimultaneousRoundStatus;
  redQuestion: Question;
  blueQuestion: Question;
  redSelected: number | null;
  blueSelected: number | null;
  redSkips: number;
  blueSkips: number;
  evaluation: RoundEvaluation | null;
  onRedAnswer: (index: number) => void;
  onBlueAnswer: (index: number) => void;
  onRedSkip: () => void;
  onBlueSkip: () => void;
}

export const DualQuestionCards: React.FC<DualQuestionCardsProps> = ({
  roundNumber,
  totalRounds,
  timeLeft,
  isUrgent,
  roundStatus,
  redQuestion,
  blueQuestion,
  redSelected,
  blueSelected,
  redSkips,
  blueSkips,
  evaluation,
  onRedAnswer,
  onBlueAnswer,
  onRedSkip,
  onBlueSkip,
}) => {
  const letters = ['A', 'B', 'C', 'D'];
  const isAnswering = roundStatus === 'answering';
  const isEvaluating = roundStatus === 'evaluating';

  // Dual keyboard shortcuts listener:
  // Team Red: keys 1, 2, 3, 4
  // Team Blue: keys 7, 8, 9, 0 (or U, I, O, P)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      if (!isAnswering) return;

      const key = e.key.toLowerCase();
      // Team Red: 1, 2, 3, 4
      if (key === '1') onRedAnswer(0);
      else if (key === '2') onRedAnswer(1);
      else if (key === '3' && redQuestion.options.length > 2) onRedAnswer(2);
      else if (key === '4' && redQuestion.options.length > 3) onRedAnswer(3);

      // Team Blue: 7, 8, 9, 0
      if (key === '7') onBlueAnswer(0);
      else if (key === '8') onBlueAnswer(1);
      else if (key === '9' && blueQuestion.options.length > 2) onBlueAnswer(2);
      else if (key === '0' && blueQuestion.options.length > 3) onBlueAnswer(3);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isAnswering, redQuestion.options.length, blueQuestion.options.length, onRedAnswer, onBlueAnswer]);

  return (
    <div className="w-full flex flex-col gap-3 select-none">
      
      {/* Central Round Status Bar & Timer */}
      <div className="flex items-center justify-between px-4 py-2 rounded-2xl bg-gradient-to-r from-ocean-deep via-ocean-abyss to-slate-950 border-2 border-amber-400/80 shadow-xl text-white">
        
        {/* Left Team indicator */}
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-red-500 animate-ping" />
          <span className="text-xs sm:text-sm font-black uppercase text-red-400">
            Team Red: {redSelected !== null ? 'Answer Locked' : 'Answering...'}
          </span>
        </div>

        {/* Center: Timer & Round Counter */}
        <div className="flex items-center gap-4">
          <div className="text-center">
            <span className="text-[10px] font-bold text-sky-300 uppercase tracking-wider block">
              SIMULTANEOUS ROUND
            </span>
            <span className="text-base sm:text-xl font-black font-display text-amber-300">
              {roundNumber} / {totalRounds}
            </span>
          </div>

          <TimerRing seconds={timeLeft} maxSeconds={15} isUrgent={isUrgent} />
        </div>

        {/* Right Team indicator */}
        <div className="flex items-center gap-2">
          <span className="text-xs sm:text-sm font-black uppercase text-blue-400">
            Team Blue: {blueSelected !== null ? 'Answer Locked' : 'Answering...'}
          </span>
          <span className="w-3 h-3 rounded-full bg-blue-500 animate-ping" />
        </div>

      </div>

      {/* Dual Split Cards: Team Red on Left, Team Blue on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        
        {/* ======================================================== */}
        {/* TEAM RED QUESTION CARD */}
        {/* ======================================================== */}
        <div className={`relative rounded-2xl p-4 sm:p-5 flex flex-col justify-between border-4 transition-all shadow-2xl bg-gradient-to-b from-rose-950 via-slate-950 to-slate-900 ${
          redSelected !== null && !isEvaluating ? 'border-amber-400 ring-2 ring-amber-400/50' : 'border-red-500/80'
        }`}>
          
          {/* Header */}
          <div>
            <div className="flex items-center justify-between gap-2 pb-2 mb-3 border-b border-red-800/60">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full text-xs font-black uppercase bg-gradient-to-r from-red-600 to-rose-700 text-white shadow">
                  TEAM RED — Voyagers
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-extrabold uppercase bg-red-900/80 text-red-200 border border-red-700">
                  {redQuestion.difficulty === 'hard' ? '+2 STEPS (HARD)' : '+1 STEP'}
                </span>
              </div>
              <span className="text-[11px] font-bold text-sky-200 bg-sky-950/60 px-2.5 py-0.5 rounded-full border border-sky-800">
                {redQuestion.category}
              </span>
            </div>

            {/* Question Text */}
            <div className="min-h-[64px] flex items-center mb-4">
              <h3 className="text-base sm:text-lg font-black text-white leading-snug">
                {redQuestion.question}
              </h3>
            </div>
          </div>

          {/* Options Grid (2x2 Layout: 2 rows, 2 columns) */}
          <div className="grid grid-cols-2 gap-2.5 sm:gap-3 my-2">
            {redQuestion.options.map((opt, idx) => {
              const isSelected = redSelected === idx;
              const isCorrect = isEvaluating ? idx === redQuestion.correctAnswer : null;
              return (
                <AnswerButton
                  key={`red-opt-${idx}`}
                  label={opt}
                  letter={letters[idx]}
                  index={idx}
                  isSelected={isSelected}
                  isCorrect={isCorrect}
                  showResult={isEvaluating}
                  disabled={!isAnswering || redSelected !== null}
                  onClick={() => onRedAnswer(idx)}
                />
              );
            })}
          </div>

          {/* Bottom Controls & Status */}
          <div className="mt-3 pt-2.5 border-t border-red-900/60 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <SkipButton 
                skipsLeft={redSkips} 
                onSkip={onRedSkip} 
                disabled={!isAnswering || redSelected !== null} 
              />
              <span className="text-[10px] text-slate-400">Keys: <kbd className="px-1 rounded bg-slate-800 text-slate-200 font-bold">1</kbd>–<kbd className="px-1 rounded bg-slate-800 text-slate-200 font-bold">4</kbd></span>
            </div>

            {/* Result / Locked Badge */}
            {isEvaluating && evaluation ? (
              <div className={`px-3 py-1 rounded-xl text-xs font-black flex items-center gap-1.5 ${
                evaluation.redCorrect ? 'bg-emerald-500 text-slate-950 animate-bounce' : 'bg-red-600 text-white'
              }`}>
                {evaluation.redCorrect ? <CheckCircle className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
                <span>{evaluation.redMessage}</span>
              </div>
            ) : redSelected !== null ? (
              <span className="text-xs font-bold text-amber-300 bg-amber-950/60 px-2.5 py-1 rounded-full border border-amber-500/40 animate-pulse">
                ✓ Choice Submitted
              </span>
            ) : (
              <span className="text-xs text-rose-300/80 animate-pulse">
                Waiting for answer...
              </span>
            )}
          </div>

          {/* Explanation during evaluation */}
          {isEvaluating && redQuestion.explanation && (
            <div className="mt-2 text-[11px] text-sky-100 bg-slate-900/90 p-2 rounded-lg border border-sky-600/40">
              💡 {redQuestion.explanation}
            </div>
          )}

        </div>

        {/* ======================================================== */}
        {/* TEAM BLUE QUESTION CARD */}
        {/* ======================================================== */}
        <div className={`relative rounded-2xl p-4 sm:p-5 flex flex-col justify-between border-4 transition-all shadow-2xl bg-gradient-to-b from-blue-950 via-slate-950 to-slate-900 ${
          blueSelected !== null && !isEvaluating ? 'border-amber-400 ring-2 ring-amber-400/50' : 'border-blue-500/80'
        }`}>
          
          {/* Header */}
          <div>
            <div className="flex items-center justify-between gap-2 pb-2 mb-3 border-b border-blue-800/60">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full text-xs font-black uppercase bg-gradient-to-r from-blue-600 to-indigo-700 text-white shadow">
                  TEAM BLUE — Explorers
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-extrabold uppercase bg-blue-900/80 text-blue-200 border border-blue-700">
                  {blueQuestion.difficulty === 'hard' ? '+2 STEPS (HARD)' : '+1 STEP'}
                </span>
              </div>
              <span className="text-[11px] font-bold text-sky-200 bg-sky-950/60 px-2.5 py-0.5 rounded-full border border-sky-800">
                {blueQuestion.category}
              </span>
            </div>

            {/* Question Text */}
            <div className="min-h-[64px] flex items-center mb-4">
              <h3 className="text-base sm:text-lg font-black text-white leading-snug">
                {blueQuestion.question}
              </h3>
            </div>
          </div>

          {/* Options Grid (2x2 Layout: 2 rows, 2 columns) */}
          <div className="grid grid-cols-2 gap-2.5 sm:gap-3 my-2">
            {blueQuestion.options.map((opt, idx) => {
              const isSelected = blueSelected === idx;
              const isCorrect = isEvaluating ? idx === blueQuestion.correctAnswer : null;
              return (
                <AnswerButton
                  key={`blue-opt-${idx}`}
                  label={opt}
                  letter={letters[idx]}
                  index={idx}
                  isSelected={isSelected}
                  isCorrect={isCorrect}
                  showResult={isEvaluating}
                  disabled={!isAnswering || blueSelected !== null}
                  onClick={() => onBlueAnswer(idx)}
                />
              );
            })}
          </div>

          {/* Bottom Controls & Status */}
          <div className="mt-3 pt-2.5 border-t border-blue-900/60 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <SkipButton 
                skipsLeft={blueSkips} 
                onSkip={onBlueSkip} 
                disabled={!isAnswering || blueSelected !== null} 
              />
              <span className="text-[10px] text-slate-400">Keys: <kbd className="px-1 rounded bg-slate-800 text-slate-200 font-bold">7</kbd>–<kbd className="px-1 rounded bg-slate-800 text-slate-200 font-bold">0</kbd></span>
            </div>

            {/* Result / Locked Badge */}
            {isEvaluating && evaluation ? (
              <div className={`px-3 py-1 rounded-xl text-xs font-black flex items-center gap-1.5 ${
                evaluation.blueCorrect ? 'bg-emerald-500 text-slate-950 animate-bounce' : 'bg-red-600 text-white'
              }`}>
                {evaluation.blueCorrect ? <CheckCircle className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
                <span>{evaluation.blueMessage}</span>
              </div>
            ) : blueSelected !== null ? (
              <span className="text-xs font-bold text-amber-300 bg-amber-950/60 px-2.5 py-1 rounded-full border border-amber-500/40 animate-pulse">
                ✓ Choice Submitted
              </span>
            ) : (
              <span className="text-xs text-blue-300/80 animate-pulse">
                Waiting for answer...
              </span>
            )}
          </div>

          {/* Explanation during evaluation */}
          {isEvaluating && blueQuestion.explanation && (
            <div className="mt-2 text-[11px] text-sky-100 bg-slate-900/90 p-2 rounded-lg border border-sky-600/40">
              💡 {blueQuestion.explanation}
            </div>
          )}

        </div>

      </div>

    </div>
  );
};
