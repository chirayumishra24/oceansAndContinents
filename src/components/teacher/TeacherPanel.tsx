import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Question } from '../../types/game';
import { parseExcelFile, generateTemplateExcel, ParseResult } from '../../utils/excelParser';
import { saveCustomQuestions, loadCustomQuestions, clearCustomQuestions, hasCustomQuestions } from '../../utils/questionStorage';
import { UploadZone } from './UploadZone';
import { QuestionPreview } from './QuestionPreview';
import {
  ArrowLeft,
  Download,
  Save,
  Trash2,
  CheckCircle,
  BookOpen,
  Sparkles,
  FileSpreadsheet,
  ShieldCheck,
} from 'lucide-react';

export const TeacherPanel: React.FC = () => {
  const navigate = useNavigate();
  const [parseResult, setParseResult] = useState<ParseResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [savedQuestions, setSavedQuestions] = useState<Question[] | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);

  useEffect(() => {
    const existing = loadCustomQuestions();
    if (existing) setSavedQuestions(existing);
  }, []);

  const handleFileSelected = async (file: File) => {
    setIsLoading(true);
    setFileName(file.name);
    try {
      const result = await parseExcelFile(file);
      setParseResult(result);
    } catch (err) {
      setParseResult({
        questions: [],
        errors: [{ row: 0, column: '', message: (err as Error).message }],
        warnings: [],
        totalRows: 0,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = () => {
    if (!parseResult || parseResult.questions.length === 0) return;
    saveCustomQuestions(parseResult.questions);
    setSavedQuestions(parseResult.questions);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const handleClear = () => {
    clearCustomQuestions();
    setSavedQuestions(null);
    setParseResult(null);
    setFileName(null);
  };

  const canSave = parseResult && parseResult.questions.length > 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 text-white">
      {/* Animated background shapes */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-500/3 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm font-medium">Back to Game</span>
          </button>
        </div>

        {/* Title Section */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-medium mb-4">
            <ShieldCheck className="w-3.5 h-3.5" />
            Teacher Dashboard
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold mb-3">
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              Question Manager
            </span>
          </h1>
          <p className="text-slate-400 max-w-xl mx-auto">
            Upload an Excel sheet to dynamically change game questions. Students will play with your custom questions.
          </p>
        </div>

        {/* Current Status */}
        <div className={`
          mb-8 rounded-2xl p-5 border transition-all duration-300
          ${savedQuestions
            ? 'bg-emerald-500/5 border-emerald-500/20'
            : 'bg-slate-800/30 border-slate-700/30'
          }
        `}>
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <div className={`
                w-10 h-10 rounded-xl flex items-center justify-center
                ${savedQuestions
                  ? 'bg-emerald-500/20 text-emerald-400'
                  : 'bg-slate-700/50 text-slate-500'
                }
              `}>
                {savedQuestions ? <Sparkles className="w-5 h-5" /> : <BookOpen className="w-5 h-5" />}
              </div>
              <div>
                <p className="font-semibold text-sm">
                  {savedQuestions
                    ? `Custom Questions Active (${savedQuestions.length} questions)`
                    : 'Using Default Question Bank'
                  }
                </p>
                <p className="text-slate-500 text-xs mt-0.5">
                  {savedQuestions
                    ? 'The game will use your uploaded questions'
                    : 'Upload an Excel sheet to replace the default questions'
                  }
                </p>
              </div>
            </div>

            {savedQuestions && (
              <button
                onClick={handleClear}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-500/10 text-red-400 
                           border border-red-500/20 hover:bg-red-500/20 transition-all text-sm font-medium"
              >
                <Trash2 className="w-4 h-4" />
                Clear & Use Defaults
              </button>
            )}
          </div>
        </div>

        {/* Upload Section */}
        <div className="bg-slate-900/50 backdrop-blur-sm rounded-2xl border border-slate-700/40 p-6 sm:p-8 mb-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <FileSpreadsheet className="w-5 h-5 text-cyan-400" />
              Upload Questions
            </h2>
            <button
              onClick={generateTemplateExcel}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800 text-slate-300 
                         border border-slate-600/50 hover:bg-slate-700 hover:text-white transition-all text-sm font-medium"
            >
              <Download className="w-4 h-4" />
              Download Template
            </button>
          </div>

          <UploadZone onFileSelected={handleFileSelected} isLoading={isLoading} />

          {fileName && !isLoading && parseResult && (
            <div className="mt-3 text-sm text-slate-500 flex items-center gap-2">
              <FileSpreadsheet className="w-4 h-4" />
              <span>Loaded: <span className="text-slate-300">{fileName}</span></span>
            </div>
          )}
        </div>

        {/* Preview Section */}
        {parseResult && (
          <div className="bg-slate-900/50 backdrop-blur-sm rounded-2xl border border-slate-700/40 p-6 sm:p-8 mb-6">
            <h2 className="text-lg font-semibold mb-5 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-blue-400" />
              Question Preview
            </h2>

            <QuestionPreview
              questions={parseResult.questions}
              errors={parseResult.errors}
              warnings={parseResult.warnings}
              totalRows={parseResult.totalRows}
            />

            {/* Save Button */}
            {canSave && (
              <div className="mt-6 flex justify-end">
                <button
                  onClick={handleSave}
                  className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm
                             bg-gradient-to-r from-cyan-500 to-blue-500 text-white
                             hover:from-cyan-400 hover:to-blue-400 hover:shadow-lg hover:shadow-cyan-500/25
                             active:scale-[0.98] transition-all duration-200"
                >
                  <Save className="w-4 h-4" />
                  Save & Apply ({parseResult.questions.length} Questions)
                </button>
              </div>
            )}
          </div>
        )}

        {/* Success Toast */}
        <div className={`
          fixed bottom-6 right-6 flex items-center gap-3 px-5 py-3.5 rounded-xl
          bg-emerald-500/90 text-white shadow-2xl shadow-emerald-500/30 backdrop-blur-sm
          transition-all duration-500 ease-out z-50
          ${showSuccess ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0 pointer-events-none'}
        `}>
          <CheckCircle className="w-5 h-5" />
          <span className="font-semibold text-sm">Questions saved! Game will use your custom set.</span>
        </div>

        {/* Format Guide */}
        <div className="bg-slate-900/30 rounded-2xl border border-slate-700/30 p-6 sm:p-8">
          <h3 className="text-sm font-semibold text-slate-300 mb-4 uppercase tracking-wider">Excel Format Guide</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-700/50">
                  <th className="text-left text-slate-400 font-medium px-3 py-2 text-xs">Column</th>
                  <th className="text-left text-slate-400 font-medium px-3 py-2 text-xs">Required</th>
                  <th className="text-left text-slate-400 font-medium px-3 py-2 text-xs">Example</th>
                  <th className="text-left text-slate-400 font-medium px-3 py-2 text-xs">Notes</th>
                </tr>
              </thead>
              <tbody className="text-slate-300 divide-y divide-slate-700/30">
                <tr>
                  <td className="px-3 py-2.5 font-medium text-white">Question</td>
                  <td className="px-3 py-2.5"><span className="text-emerald-400">✓ Yes</span></td>
                  <td className="px-3 py-2.5 text-slate-400">Which is the largest ocean?</td>
                  <td className="px-3 py-2.5 text-slate-500 text-xs">The question text shown to players</td>
                </tr>
                <tr>
                  <td className="px-3 py-2.5 font-medium text-white">Option A–D</td>
                  <td className="px-3 py-2.5"><span className="text-emerald-400">A & B required</span></td>
                  <td className="px-3 py-2.5 text-slate-400">Pacific Ocean</td>
                  <td className="px-3 py-2.5 text-slate-500 text-xs">C & D are optional (for True/False, use only A & B)</td>
                </tr>
                <tr>
                  <td className="px-3 py-2.5 font-medium text-white">Correct Answer</td>
                  <td className="px-3 py-2.5"><span className="text-emerald-400">✓ Yes</span></td>
                  <td className="px-3 py-2.5 text-slate-400">A</td>
                  <td className="px-3 py-2.5 text-slate-500 text-xs">Accepts A/B/C/D or 1/2/3/4</td>
                </tr>
                <tr>
                  <td className="px-3 py-2.5 font-medium text-white">Difficulty</td>
                  <td className="px-3 py-2.5"><span className="text-slate-500">Optional</span></td>
                  <td className="px-3 py-2.5 text-slate-400">easy</td>
                  <td className="px-3 py-2.5 text-slate-500 text-xs">easy / medium / hard (defaults to medium)</td>
                </tr>
                <tr>
                  <td className="px-3 py-2.5 font-medium text-white">Category</td>
                  <td className="px-3 py-2.5"><span className="text-slate-500">Optional</span></td>
                  <td className="px-3 py-2.5 text-slate-400">Oceans</td>
                  <td className="px-3 py-2.5 text-slate-500 text-xs">Auto-inferred from question if empty</td>
                </tr>
                <tr>
                  <td className="px-3 py-2.5 font-medium text-white">Explanation</td>
                  <td className="px-3 py-2.5"><span className="text-slate-500">Optional</span></td>
                  <td className="px-3 py-2.5 text-slate-400">The Pacific Ocean covers...</td>
                  <td className="px-3 py-2.5 text-slate-500 text-xs">Shown after answering for learning</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-slate-600 text-xs">
          Questions are stored in your browser's local storage. They persist across sessions but are device-specific.
        </div>
      </div>
    </div>
  );
};
