import React from 'react';
import { CheckCircle2, XCircle } from 'lucide-react';

interface AnswerButtonProps {
  label: string;
  letter: string;
  index: number;
  isSelected: boolean;
  isCorrect: boolean | null;
  showResult: boolean;
  disabled: boolean;
  onClick: () => void;
}

export const AnswerButton: React.FC<AnswerButtonProps> = ({
  label,
  letter,
  index,
  isSelected,
  isCorrect,
  showResult,
  disabled,
  onClick,
}) => {
  // Determine color styling based on answer outcome state
  let buttonClasses = 'bg-amber-50 hover:bg-white text-slate-800 border-amber-200/80 shadow-sm hover:border-amber-300';
  let badgeClasses = 'bg-red-600 text-white border-red-700';

  if (index === 0) badgeClasses = 'bg-rose-600 text-white';
  else if (index === 1) badgeClasses = 'bg-blue-600 text-white';
  else if (index === 2) badgeClasses = 'bg-amber-600 text-white';
  else badgeClasses = 'bg-teal-600 text-white';

  if (showResult) {
    if (isCorrect === true) {
      // Correct answer style
      buttonClasses = 'bg-emerald-100 text-emerald-950 border-emerald-500 shadow-md ring-2 ring-emerald-400';
      badgeClasses = 'bg-emerald-600 text-white border-emerald-700';
    } else if (isSelected && isCorrect === false) {
      // Selected wrong answer
      buttonClasses = 'bg-red-100 text-red-950 border-red-500 shadow-md ring-2 ring-red-400 animate-shake';
      badgeClasses = 'bg-red-600 text-white border-red-700';
    } else {
      // Other unselected options when result is revealed
      buttonClasses = 'bg-slate-100/70 text-slate-400 border-slate-200 opacity-60';
      badgeClasses = 'bg-slate-400 text-white';
    }
  } else if (isSelected) {
    buttonClasses = 'bg-amber-200 text-slate-900 border-amber-500 ring-2 ring-amber-400 shadow-md';
  }

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`relative w-full min-h-[52px] sm:min-h-[58px] p-3 sm:p-4 rounded-xl border-2 flex items-center justify-between text-left font-bold text-sm sm:text-base transition-all duration-150 group focus:outline-none focus:ring-4 focus:ring-sky-300 ${buttonClasses} ${
        !disabled ? 'cursor-pointer active:scale-[0.98]' : 'cursor-default'
      }`}
    >
      <div className="flex items-center gap-3">
        {/* Letter Badge (A, B, C, D) */}
        <span 
          className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs sm:text-sm font-black shadow-inner shrink-0 ${badgeClasses}`}
        >
          {letter}
        </span>

        {/* Option Text */}
        <span className="leading-snug">
          {label}
        </span>
      </div>

      {/* Outcome Icon Indicator */}
      {showResult && isCorrect === true && (
        <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0 animate-bounce" />
      )}
      {showResult && isSelected && isCorrect === false && (
        <XCircle className="w-6 h-6 text-red-600 shrink-0" />
      )}
    </button>
  );
};
