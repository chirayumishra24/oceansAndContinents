import React, { useState } from 'react';
import { Question } from '../../types/game';
import { ParseError } from '../../utils/excelParser';
import { CheckCircle, XCircle, AlertTriangle } from 'lucide-react';

type PreviewTab = 'all' | 'teamA' | 'teamB';

interface QuestionPreviewProps {
  questions: Question[];
  teamAQuestions: Question[];
  teamBQuestions: Question[];
  hasTeamSheets: boolean;
  errors: ParseError[];
  warnings: string[];
  totalRows: number;
}

export const QuestionPreview: React.FC<QuestionPreviewProps> = ({
  questions,
  teamAQuestions,
  teamBQuestions,
  hasTeamSheets,
  errors,
  warnings,
  totalRows,
}) => {
  const [activeTab, setActiveTab] = useState<PreviewTab>(hasTeamSheets ? 'teamA' : 'all');

  const difficultyColor: Record<string, string> = {
    easy: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
    medium: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
    hard: 'bg-red-500/20 text-red-400 border-red-500/30',
  };

  // Select which questions to show
  const displayQuestions =
    activeTab === 'teamA' ? teamAQuestions :
    activeTab === 'teamB' ? teamBQuestions :
    questions;

  const stats = {
    easy: displayQuestions.filter(q => q.difficulty === 'easy').length,
    medium: displayQuestions.filter(q => q.difficulty === 'medium').length,
    hard: displayQuestions.filter(q => q.difficulty === 'hard').length,
  };

  const categories = [...new Set(displayQuestions.map(q => q.category))];

  const tabs: { key: PreviewTab; label: string; count: number; color: string }[] = hasTeamSheets
    ? [
        { key: 'teamA', label: 'Team A (Red)', count: teamAQuestions.length, color: 'text-red-400 border-red-400' },
        { key: 'teamB', label: 'Team B (Blue)', count: teamBQuestions.length, color: 'text-blue-400 border-blue-400' },
        { key: 'all', label: 'All Questions', count: questions.length, color: 'text-slate-300 border-slate-300' },
      ]
    : [];

  return (
    <div className="space-y-5">
      {/* Team Tab Switcher */}
      {hasTeamSheets && (
        <div className="flex items-center gap-1 p-1 bg-slate-800/60 rounded-xl border border-slate-700/40">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                activeTab === tab.key
                  ? `bg-slate-700/80 ${tab.color} border border-current shadow-sm`
                  : 'text-slate-500 hover:text-slate-300 border border-transparent'
              }`}
            >
              <span>{tab.label}</span>
              <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                activeTab === tab.key ? 'bg-white/10' : 'bg-slate-700/50'
              }`}>
                {tab.count}
              </span>
            </button>
          ))}
        </div>
      )}

      {/* Stats Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-slate-800/60 rounded-xl p-4 border border-slate-700/50">
          <p className="text-slate-400 text-xs uppercase tracking-wider mb-1">Total Valid</p>
          <p className="text-2xl font-bold text-white">{displayQuestions.length}<span className="text-slate-500 text-sm font-normal">/{activeTab === 'all' ? totalRows : displayQuestions.length}</span></p>
        </div>
        <div className="bg-emerald-500/10 rounded-xl p-4 border border-emerald-500/20">
          <p className="text-emerald-400/70 text-xs uppercase tracking-wider mb-1">Easy</p>
          <p className="text-2xl font-bold text-emerald-400">{stats.easy}</p>
        </div>
        <div className="bg-amber-500/10 rounded-xl p-4 border border-amber-500/20">
          <p className="text-amber-400/70 text-xs uppercase tracking-wider mb-1">Medium</p>
          <p className="text-2xl font-bold text-amber-400">{stats.medium}</p>
        </div>
        <div className="bg-red-500/10 rounded-xl p-4 border border-red-500/20">
          <p className="text-red-400/70 text-xs uppercase tracking-wider mb-1">Hard</p>
          <p className="text-2xl font-bold text-red-400">{stats.hard}</p>
        </div>
      </div>

      {/* Categories */}
      {categories.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {categories.map(cat => (
            <span
              key={cat}
              className="px-3 py-1 rounded-full text-xs font-medium bg-blue-500/15 text-blue-300 border border-blue-500/20"
            >
              {cat} ({displayQuestions.filter(q => q.category === cat).length})
            </span>
          ))}
        </div>
      )}

      {/* Errors */}
      {errors.length > 0 && (
        <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 space-y-2">
          <div className="flex items-center gap-2 text-red-400 font-semibold text-sm">
            <XCircle className="w-4 h-4" />
            <span>{errors.length} Error{errors.length > 1 ? 's' : ''} Found</span>
          </div>
          <div className="space-y-1.5 max-h-40 overflow-y-auto">
            {errors.map((err, i) => (
              <p key={i} className="text-red-300/80 text-xs">
                {err.row > 0 ? `Row ${err.row}` : 'Header'}{err.column ? ` → ${err.column}` : ''}: {err.message}
              </p>
            ))}
          </div>
        </div>
      )}

      {/* Warnings */}
      {warnings.length > 0 && (
        <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4 space-y-2">
          <div className="flex items-center gap-2 text-amber-400 font-semibold text-sm">
            <AlertTriangle className="w-4 h-4" />
            <span>{warnings.length} Warning{warnings.length > 1 ? 's' : ''}</span>
          </div>
          <div className="space-y-1 max-h-32 overflow-y-auto">
            {warnings.map((w, i) => (
              <p key={i} className="text-amber-300/80 text-xs">{w}</p>
            ))}
          </div>
        </div>
      )}

      {/* Questions Table */}
      {displayQuestions.length > 0 && (
        <div className="overflow-hidden rounded-xl border border-slate-700/50">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-800/80">
                  <th className="text-left text-slate-400 font-medium px-4 py-3 text-xs uppercase tracking-wider w-10">#</th>
                  <th className="text-left text-slate-400 font-medium px-4 py-3 text-xs uppercase tracking-wider">Question</th>
                  <th className="text-left text-slate-400 font-medium px-4 py-3 text-xs uppercase tracking-wider">Options</th>
                  <th className="text-left text-slate-400 font-medium px-4 py-3 text-xs uppercase tracking-wider w-20">Answer</th>
                  <th className="text-left text-slate-400 font-medium px-4 py-3 text-xs uppercase tracking-wider w-24">Difficulty</th>
                  <th className="text-center text-slate-400 font-medium px-4 py-3 text-xs uppercase tracking-wider w-16">Valid</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700/40">
                {displayQuestions.map((q, i) => (
                  <tr
                    key={q.id}
                    className="bg-slate-900/30 hover:bg-slate-800/40 transition-colors"
                  >
                    <td className="px-4 py-3 text-slate-500 font-mono text-xs">{i + 1}</td>
                    <td className="px-4 py-3 text-white/90 max-w-xs">
                      <p className="truncate">{q.question}</p>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex flex-wrap gap-1">
                        {q.options.map((opt, oi) => (
                          <span
                            key={oi}
                            className={`
                              px-2 py-0.5 rounded text-xs
                              ${oi === q.correctAnswer
                                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-medium'
                                : 'bg-slate-700/50 text-slate-400 border border-slate-600/30'
                              }
                            `}
                          >
                            {String.fromCharCode(65 + oi)}: {opt.length > 15 ? opt.slice(0, 15) + '…' : opt}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-emerald-400 font-semibold">
                        {String.fromCharCode(65 + q.correctAnswer)}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-0.5 rounded-full text-xs border ${difficultyColor[q.difficulty]}`}>
                        {q.difficulty}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <CheckCircle className="w-4 h-4 text-emerald-400 mx-auto" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {displayQuestions.length > 10 && (
            <div className="bg-slate-800/40 px-4 py-2 text-center text-slate-500 text-xs">
              Showing all {displayQuestions.length} questions
            </div>
          )}
        </div>
      )}
    </div>
  );
};
