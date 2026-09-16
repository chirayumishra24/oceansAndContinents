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
    easy: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    medium: 'bg-amber-50 text-amber-700 border-amber-200',
    hard: 'bg-red-50 text-red-700 border-red-200',
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

  const tabs: { key: PreviewTab; label: string; count: number; activeClass: string }[] = hasTeamSheets
    ? [
        { key: 'teamA', label: 'Team A (Red)', count: teamAQuestions.length, activeClass: 'bg-red-50 text-red-700 border-red-300' },
        { key: 'teamB', label: 'Team B (Blue)', count: teamBQuestions.length, activeClass: 'bg-blue-50 text-blue-700 border-blue-300' },
        { key: 'all', label: 'All Questions', count: questions.length, activeClass: 'bg-white text-slate-800 border-slate-300 shadow-sm' },
      ]
    : [];

  return (
    <div className="space-y-5">
      {/* Team Tab Switcher */}
      {hasTeamSheets && (
        <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-xl border border-slate-200">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                activeTab === tab.key
                  ? `${tab.activeClass} border shadow-xs`
                  : 'text-slate-600 hover:text-slate-900 border border-transparent'
              }`}
            >
              <span>{tab.label}</span>
              <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                activeTab === tab.key ? 'bg-black/5 text-slate-900' : 'bg-slate-200 text-slate-600'
              }`}>
                {tab.count}
              </span>
            </button>
          ))}
        </div>
      )}

      {/* Stats Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
          <p className="text-slate-500 text-xs font-semibold uppercase tracking-wider mb-1">Total Valid</p>
          <p className="text-2xl font-bold text-slate-800">{displayQuestions.length}<span className="text-slate-400 text-sm font-normal">/{activeTab === 'all' ? totalRows : displayQuestions.length}</span></p>
        </div>
        <div className="bg-emerald-50 rounded-xl p-4 border border-emerald-200">
          <p className="text-emerald-700 text-xs font-semibold uppercase tracking-wider mb-1">Easy</p>
          <p className="text-2xl font-bold text-emerald-700">{stats.easy}</p>
        </div>
        <div className="bg-amber-50 rounded-xl p-4 border border-amber-200">
          <p className="text-amber-700 text-xs font-semibold uppercase tracking-wider mb-1">Medium</p>
          <p className="text-2xl font-bold text-amber-700">{stats.medium}</p>
        </div>
        <div className="bg-red-50 rounded-xl p-4 border border-red-200">
          <p className="text-red-700 text-xs font-semibold uppercase tracking-wider mb-1">Hard</p>
          <p className="text-2xl font-bold text-red-700">{stats.hard}</p>
        </div>
      </div>

      {/* Categories */}
      {categories.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {categories.map(cat => (
            <span
              key={cat}
              className="px-3 py-1 rounded-full text-xs font-semibold bg-sky-50 text-sky-800 border border-sky-200 shadow-2xs"
            >
              {cat} ({displayQuestions.filter(q => q.category === cat).length})
            </span>
          ))}
        </div>
      )}

      {/* Errors */}
      {errors.length > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 space-y-2">
          <div className="flex items-center gap-2 text-red-700 font-semibold text-sm">
            <XCircle className="w-4 h-4 text-red-500" />
            <span>{errors.length} Error{errors.length > 1 ? 's' : ''} Found</span>
          </div>
          <div className="space-y-1.5 max-h-40 overflow-y-auto">
            {errors.map((err, i) => (
              <p key={i} className="text-red-700 text-xs font-medium">
                {err.row > 0 ? `Row ${err.row}` : 'Header'}{err.column ? ` → ${err.column}` : ''}: {err.message}
              </p>
            ))}
          </div>
        </div>
      )}

      {/* Warnings */}
      {warnings.length > 0 && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 space-y-2">
          <div className="flex items-center gap-2 text-amber-800 font-semibold text-sm">
            <AlertTriangle className="w-4 h-4 text-amber-600" />
            <span>{warnings.length} Warning{warnings.length > 1 ? 's' : ''}</span>
          </div>
          <div className="space-y-1 max-h-32 overflow-y-auto">
            {warnings.map((w, i) => (
              <p key={i} className="text-amber-800 text-xs">{w}</p>
            ))}
          </div>
        </div>
      )}

      {/* Questions Table */}
      {displayQuestions.length > 0 && (
        <div className="overflow-hidden rounded-xl border border-slate-200 shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-100 border-b border-slate-200">
                  <th className="text-left text-slate-600 font-bold px-4 py-3 text-xs uppercase tracking-wider w-10">#</th>
                  <th className="text-left text-slate-600 font-bold px-4 py-3 text-xs uppercase tracking-wider">Question</th>
                  <th className="text-left text-slate-600 font-bold px-4 py-3 text-xs uppercase tracking-wider">Options</th>
                  <th className="text-left text-slate-600 font-bold px-4 py-3 text-xs uppercase tracking-wider w-20">Answer</th>
                  <th className="text-left text-slate-600 font-bold px-4 py-3 text-xs uppercase tracking-wider w-24">Difficulty</th>
                  <th className="text-center text-slate-600 font-bold px-4 py-3 text-xs uppercase tracking-wider w-16">Valid</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 bg-white">
                {displayQuestions.map((q, i) => (
                  <tr
                    key={q.id}
                    className="hover:bg-sky-50/50 transition-colors"
                  >
                    <td className="px-4 py-3 text-slate-400 font-mono text-xs">{i + 1}</td>
                    <td className="px-4 py-3 text-slate-800 font-medium max-w-xs">
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
                                ? 'bg-emerald-100 text-emerald-800 border border-emerald-300 font-semibold'
                                : 'bg-slate-100 text-slate-600 border border-slate-200'
                              }
                            `}
                          >
                            {String.fromCharCode(65 + oi)}: {opt.length > 15 ? opt.slice(0, 15) + '…' : opt}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-emerald-700 font-bold text-sm">
                        {String.fromCharCode(65 + q.correctAnswer)}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${difficultyColor[q.difficulty]}`}>
                        {q.difficulty}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <CheckCircle className="w-4 h-4 text-emerald-600 mx-auto" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {displayQuestions.length > 10 && (
            <div className="bg-slate-50 px-4 py-2 text-center text-slate-500 text-xs border-t border-slate-200">
              Showing all {displayQuestions.length} questions
            </div>
          )}
        </div>
      )}
    </div>
  );
};
