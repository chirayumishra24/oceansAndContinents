import React, { useEffect } from 'react';
import { Question, TeamId, FeedbackState, TurnStatus } from '../../types/game';
import { AnswerButton } from './AnswerButton';
import { TimerRing } from './TimerRing';
import { SkipButton } from './SkipButton';
import { Compass, Sparkles, AlertCircle } from 'lucide-react';

interface QuestionCardProps {
  question: Question;
  currentTeam: TeamId;
  turnStatus: TurnStatus;
  selectedOption: number | null;
  feedback: FeedbackState | null;
  onAnswer: (index: number) => void;
  onSkip: () => void;
  skipsLeft: number;
  timeLeft: number;
  isUrgent: boolean;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  currentTeam,
  turnStatus,
  selectedOption,
  feedback,
  onAnswer,
  onSkip,
  skipsLeft,
  timeLeft,
  isUrgent,
}) => {
  const letters = ['A', 'B', 'C', 'D'];
  const isRed = currentTeam === 'red';
  const isRebound = turnStatus === 'rebound_turn';
  const isInteractive = turnStatus === 'answering' || turnStatus === 'rebound_turn';
  const showResults = turnStatus === 'feedback';

  // Keyboard shortcut listener (1..4, A..D, S for skip)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't intercept if modifier keys pressed
      if (e.metaKey || e.ctrlKey || e.altKey) return;

      const key = e.key.toLowerCase();
      if (isInteractive) {
        if (key === '1' || key === 'a') onAnswer(0);
        else if (key === '2' || key === 'b') onAnswer(1);
        else if (key === '3' || key === 'c') {
          if (question.options.length > 2) onAnswer(2);
        } else if (key === '4' || key === 'd') {
          if (question.options.length > 3) onAnswer(3);
        } else if (key === 's') {
          onSkip();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isInteractive, question.options.length, onAnswer, onSkip]);

  const difficultyColors = {
    easy: 'bg-emerald-500 text-white',
    medium: 'bg-sky-500 text-white',
    hard: 'bg-amber-500 text-slate-900',
  }[question.difficulty];

  const difficultyLabel = {
    easy: 'EASY (+1 STEP)',
    medium: 'MEDIUM (+1 STEP)',
    hard: 'HARD (+2 STEPS)',
  }[question.difficulty];

  return (
    <div className="relative w-full rounded-2xl bg-gradient-to-b from-ocean-deep via-ocean-abyss to-slate-950 border-4 border-sky-600/50 shadow-2xl p-4 sm:p-6 text-white select-none">
      
      {/* Top Banner: Turn Header & Category Pills */}
      <div className="flex flex-wrap items-center justify-between gap-2 mb-3 pb-3 border-b border-sky-800/60">
        
        {/* Active Team Pill */}
        <div className="flex items-center gap-2">
          <div 
            className={`px-3 sm:px-4 py-1.5 rounded-full font-black text-xs sm:text-sm uppercase tracking-wider flex items-center gap-1.5 shadow-md ${
              isRed 
                ? 'bg-gradient-to-r from-red-600 to-rose-700 text-white ring-2 ring-red-400' 
                : 'bg-gradient-to-r from-blue-600 to-indigo-700 text-white ring-2 ring-blue-400'
            }`}
          >
            <Compass className="w-4 h-4 animate-spin-slow" />
            {isRebound ? (
              <span>REBOUND CHANCE: {isRed ? 'TEAM RED' : 'TEAM BLUE'}!</span>
            ) : (
              <span>{isRed ? "TEAM RED'S TURN" : "TEAM BLUE'S TURN"}</span>
            )}
          </div>

          {/* Difficulty pill */}
          <span className={`px-2.5 py-1 rounded-md text-[11px] font-extrabold uppercase tracking-wide shadow-sm ${difficultyColors}`}>
            {difficultyLabel}
          </span>
        </div>

        {/* Category Pill */}
        <div className="flex items-center gap-1.5 text-sky-200 text-xs font-bold bg-sky-900/60 px-3 py-1 rounded-full border border-sky-700">
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          <span>{question.category}</span>
        </div>
      </div>

      {/* Main Question Text */}
      <div className="mb-5 min-h-[56px] flex items-center justify-center">
        <h2 className="text-lg sm:text-xl md:text-2xl font-black text-center text-white leading-snug drop-shadow-md">
          {question.question}
        </h2>
      </div>

      {/* Middle: Answer Choices + Controls Layout */}
      <div className="flex flex-col lg:flex-row gap-4 items-center">
        
        {/* Answer Buttons Grid */}
        <div className="w-full flex-1 grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
          {question.options.map((opt, idx) => {
            const isSelected = selectedOption === idx;
            const isCorrect = showResults ? idx === question.correctAnswer : null;
            return (
              <AnswerButton
                key={`${question.id}-opt-${idx}`}
                label={opt}
                letter={letters[idx]}
                index={idx}
                isSelected={isSelected}
                isCorrect={isCorrect}
                showResult={showResults}
                disabled={!isInteractive}
                onClick={() => onAnswer(idx)}
              />
            );
          })}
        </div>

        {/* Nautical Side Controls: Timer & Skip Button */}
        <div className="flex flex-row lg:flex-col items-center justify-center gap-4 shrink-0 pt-2 lg:pt-0">
          <TimerRing 
            seconds={timeLeft} 
            maxSeconds={15} 
            isUrgent={isUrgent} 
          />
          <SkipButton 
            skipsLeft={skipsLeft} 
            onSkip={onSkip} 
            disabled={!isInteractive || isRebound} 
          />
        </div>
      </div>

      {/* Educational Explanation & Feedback Banner */}
      {feedback && (
        <div className="mt-4 p-3 rounded-xl border-2 flex items-start gap-3 bg-slate-900/90 shadow-xl transition-all duration-300 animate-fadeIn border-sky-400">
          <AlertCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <div className="flex-1 text-xs sm:text-sm">
            <p className="font-extrabold text-amber-300 mb-0.5">
              {feedback.message}
            </p>
            {question.explanation && (
              <p className="text-sky-100/90 font-medium leading-relaxed">
                💡 <strong className="text-white">Did you know?</strong> {question.explanation}
              </p>
            )}
          </div>
        </div>
      )}

      {/* Classroom Keyboard Helper hint */}
      <div className="mt-3 flex justify-between items-center text-[10px] text-sky-300/70 border-t border-sky-900/50 pt-2">
        <span>Press <kbd className="px-1.5 py-0.5 rounded bg-sky-950 border border-sky-700 text-sky-200 font-bold">1</kbd>–<kbd className="px-1.5 py-0.5 rounded bg-sky-950 border border-sky-700 text-sky-200 font-bold">4</kbd> to answer</span>
        <span>Press <kbd className="px-1.5 py-0.5 rounded bg-sky-950 border border-sky-700 text-sky-200 font-bold">S</kbd> to skip</span>
      </div>

    </div>
  );
};
