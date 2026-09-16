import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Question } from '../../types/game';
import { parseQuestionsFile, generateTemplateExcel, generateTemplateJson, ParseResult } from '../../utils/excelParser';
import { 
  saveQuestionSetToCloud,
  deleteQuestionSetByCode,
  loadTeacherCodes,
  TeacherCodeEntry,
  exportQuestionsToJson,
} from '../../utils/questionStorage';
import { QUESTIONS_BANK } from '../../data/questions';
import { UploadZone } from './UploadZone';
import { QuestionPreview } from './QuestionPreview';
import {
  ArrowLeft,
  Download,
  Trash2,
  CheckCircle,
  BookOpen,
  FileSpreadsheet,
  ShieldCheck,
  Cloud,
  Loader2,
  Copy,
  Hash,
  Clock,
  X,
} from 'lucide-react';

export const TeacherPanel: React.FC = () => {
  const navigate = useNavigate();
  const [parseResult, setParseResult] = useState<ParseResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSavingCloud, setIsSavingCloud] = useState(false);
  const [generatedCode, setGeneratedCode] = useState<string | null>(null);
  const [teacherCodes, setTeacherCodes] = useState<TeacherCodeEntry[]>([]);
  const [showSuccess, setShowSuccess] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const [copiedCode, setCopiedCode] = useState(false);

  useEffect(() => {
    setTeacherCodes(loadTeacherCodes());
  }, []);

  const handleFileSelected = async (file: File) => {
    setIsLoading(true);
    setFileName(file.name);
    setGeneratedCode(null);
    try {
      const result = await parseQuestionsFile(file);
      setParseResult(result);
    } catch (err) {
      setParseResult({
        questions: [],
        teamAQuestions: [],
        teamBQuestions: [],
        hasTeamSheets: false,
        errors: [{ row: 0, column: '', message: (err as Error).message }],
        warnings: [],
        totalRows: 0,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    if (!parseResult) return;
    const teamA = parseResult.teamAQuestions;
    const teamB = parseResult.teamBQuestions;
    if (teamA.length === 0 && teamB.length === 0) return;

    setIsSavingCloud(true);
    try {
      const code = await saveQuestionSetToCloud(teamA, teamB);
      setGeneratedCode(code);
      setTeacherCodes(loadTeacherCodes());
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 5000);
    } catch (err) {
      console.error('Failed to save questions to cloud:', err);
    } finally {
      setIsSavingCloud(false);
    }
  };

  const handleDeleteCode = async (code: string) => {
    try {
      await deleteQuestionSetByCode(code);
      setTeacherCodes(loadTeacherCodes());
      if (generatedCode === code) setGeneratedCode(null);
    } catch (err) {
      console.error('Failed to delete question set:', err);
    }
  };

  const handleCopyCode = async (code: string) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2000);
    } catch {
      // Fallback
      const input = document.createElement('input');
      input.value = code;
      document.body.appendChild(input);
      input.select();
      document.execCommand('copy');
      document.body.removeChild(input);
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2000);
    }
  };

  const canSave = parseResult && (parseResult.teamAQuestions.length > 0 || parseResult.teamBQuestions.length > 0) && !isSavingCloud;

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
          <div className="flex items-center justify-center gap-2.5 mb-4 flex-wrap">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-medium">
              <ShieldCheck className="w-3.5 h-3.5" />
              Teacher Dashboard
            </div>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold mb-3">
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              Question Manager
            </span>
          </h1>
          <p className="text-slate-400 max-w-xl mx-auto">
            Upload questions with separate <strong className="text-cyan-300">Team A (Red)</strong> and <strong className="text-blue-300">Team B (Blue)</strong> sheets. Get a unique code to share with your class.
          </p>
        </div>

        {/* ════════════════════════════════════════════════════════ */}
        {/* GENERATED CODE DISPLAY (after save) */}
        {/* ════════════════════════════════════════════════════════ */}
        {generatedCode && (
          <div className="mb-8 rounded-2xl overflow-hidden border border-emerald-500/30 bg-gradient-to-br from-emerald-500/10 to-cyan-500/5">
            <div className="p-6 sm:p-8 text-center">
              <div className="flex items-center justify-center gap-2 mb-3">
                <CheckCircle className="w-5 h-5 text-emerald-400" />
                <span className="text-emerald-300 font-semibold text-sm">Question Set Created Successfully!</span>
              </div>
              <p className="text-slate-400 text-xs mb-5">Share this code with your students to load the question set</p>
              
              <div className="inline-flex items-center gap-4 bg-slate-900/80 rounded-2xl px-8 py-5 border-2 border-emerald-500/40">
                <span className="text-5xl sm:text-6xl font-mono font-black text-white tracking-[0.4em]">
                  {generatedCode}
                </span>
                <button
                  onClick={() => handleCopyCode(generatedCode)}
                  className="p-3 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 border border-emerald-500/30 transition-all hover:scale-105"
                  title="Copy code"
                >
                  {copiedCode ? <CheckCircle className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                </button>
              </div>

              <p className="mt-4 text-slate-500 text-xs">
                Students enter this code on the Start Screen → Join Game
              </p>
            </div>
          </div>
        )}

        {/* ════════════════════════════════════════════════════════ */}
        {/* MY QUESTION SETS (previously created) */}
        {/* ════════════════════════════════════════════════════════ */}
        {teacherCodes.length > 0 && (
          <div className="mb-8 rounded-2xl border border-slate-700/40 bg-slate-900/30 p-5 sm:p-6">
            <h3 className="text-sm font-semibold text-slate-300 mb-4 flex items-center gap-2">
              <Hash className="w-4 h-4 text-cyan-400" />
              My Question Sets
            </h3>
            <div className="space-y-2">
              {teacherCodes.map((entry) => (
                <div
                  key={entry.code}
                  className={`flex items-center justify-between px-4 py-3 rounded-xl border transition-all ${
                    entry.code === generatedCode
                      ? 'bg-emerald-500/10 border-emerald-500/30'
                      : 'bg-slate-800/40 border-slate-700/30 hover:bg-slate-800/60'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <span className="font-mono font-bold text-lg text-white tracking-[0.2em]">{entry.code}</span>
                    <div className="flex items-center gap-3 text-xs text-slate-400">
                      <span className="px-2 py-0.5 rounded bg-red-500/10 text-red-300 border border-red-500/20">
                        Team A: {entry.teamACount}
                      </span>
                      <span className="px-2 py-0.5 rounded bg-blue-500/10 text-blue-300 border border-blue-500/20">
                        Team B: {entry.teamBCount}
                      </span>
                      <span className="flex items-center gap-1 text-slate-500">
                        <Clock className="w-3 h-3" />
                        {new Date(entry.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleCopyCode(entry.code)}
                      className="p-2 rounded-lg bg-slate-700/50 hover:bg-cyan-500/20 text-slate-400 hover:text-cyan-300 transition-all"
                      title="Copy code"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteCode(entry.code)}
                      className="p-2 rounded-lg bg-slate-700/50 hover:bg-red-500/20 text-slate-400 hover:text-red-400 transition-all"
                      title="Delete question set"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Upload Section */}
        <div className="bg-slate-900/50 backdrop-blur-sm rounded-2xl border border-slate-700/40 p-6 sm:p-8 mb-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <FileSpreadsheet className="w-5 h-5 text-cyan-400" />
              Upload Questions
            </h2>
            <div className="flex items-center gap-2">
              <button
                onClick={generateTemplateExcel}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-800 text-slate-300 
                           border border-slate-600/50 hover:bg-slate-700 hover:text-white transition-all text-xs font-medium"
              >
                <Download className="w-3.5 h-3.5" />
                Excel Template (2 Sheets)
              </button>
              <button
                onClick={generateTemplateJson}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-800 text-cyan-300 
                           border border-cyan-600/30 hover:bg-slate-700 hover:text-white transition-all text-xs font-medium"
              >
                <Download className="w-3.5 h-3.5" />
                JSON Template
              </button>
            </div>
          </div>

          {/* Template info */}
          <div className="mb-4 p-3 rounded-xl bg-cyan-500/5 border border-cyan-500/15 text-xs text-cyan-300/80">
            <strong className="text-cyan-300">Template format:</strong> Excel with two sheets — <strong>"Team A (Red)"</strong> and <strong>"Team B (Blue)"</strong>. Each sheet has the same columns: Question, Option A–D, Correct Answer, Difficulty, Explanation. Single-sheet uploads work too — both teams will share the same questions.
          </div>

          <UploadZone onFileSelected={handleFileSelected} isLoading={isLoading} />

          {fileName && !isLoading && parseResult && (
            <div className="mt-3 flex items-center gap-3 text-sm text-slate-500">
              <FileSpreadsheet className="w-4 h-4" />
              <span>Loaded: <span className="text-slate-300">{fileName}</span></span>
              {parseResult.hasTeamSheets && (
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 text-[10px] font-medium border border-emerald-500/20">
                  ✓ Team A/B detected
                </span>
              )}
              {!parseResult.hasTeamSheets && parseResult.questions.length > 0 && (
                <span className="px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-400 text-[10px] font-medium border border-amber-500/20">
                  Single sheet — shared pool
                </span>
              )}
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
              teamAQuestions={parseResult.teamAQuestions}
              teamBQuestions={parseResult.teamBQuestions}
              hasTeamSheets={parseResult.hasTeamSheets}
              errors={parseResult.errors}
              warnings={parseResult.warnings}
              totalRows={parseResult.totalRows}
            />

            {/* Action Buttons */}
            {canSave && (
              <div className="mt-6 flex flex-wrap items-center justify-end gap-3">
                <button
                  onClick={() => exportQuestionsToJson(parseResult.questions, fileName ? fileName.replace(/\.[^/.]+$/, '') + '.json' : 'questions.json')}
                  className="flex items-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm
                             bg-slate-800 text-cyan-300 border border-cyan-500/30
                             hover:bg-slate-700 hover:text-white transition-all duration-200"
                >
                  <Download className="w-4 h-4" />
                  Download as JSON
                </button>
                <button
                  onClick={handleSave}
                  disabled={isSavingCloud}
                  className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm
                             bg-gradient-to-r from-cyan-500 to-blue-500 text-white
                             hover:from-cyan-400 hover:to-blue-400 hover:shadow-lg hover:shadow-cyan-500/25
                             active:scale-[0.98] transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSavingCloud ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Saving & Generating Code...
                    </>
                  ) : (
                    <>
                      <Cloud className="w-4 h-4" />
                      Save & Get Game Code
                    </>
                  )}
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
          <span className="font-semibold text-sm">
            Questions saved! Game code: <span className="font-mono tracking-widest">{generatedCode}</span>
          </span>
        </div>

        {/* Format Guide */}
        <div className="bg-slate-900/30 rounded-2xl border border-slate-700/30 p-6 sm:p-8">
          <h3 className="text-sm font-semibold text-slate-300 mb-4 uppercase tracking-wider">Excel Format Guide</h3>
          <p className="text-xs text-slate-500 mb-4">
            Your Excel file should have <strong className="text-slate-300">two sheets</strong>: "Team A (Red)" and "Team B (Blue)". Each sheet uses the same column format below.
          </p>
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
                  <td className="px-3 py-2.5 text-slate-500 text-xs">C & D are optional</td>
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
                  <td className="px-3 py-2.5 text-slate-500 text-xs">easy / medium / hard</td>
                </tr>
                <tr>
                  <td className="px-3 py-2.5 font-medium text-white">Explanation</td>
                  <td className="px-3 py-2.5"><span className="text-slate-500">Optional</span></td>
                  <td className="px-3 py-2.5 text-slate-400">The Pacific Ocean covers...</td>
                  <td className="px-3 py-2.5 text-slate-500 text-xs">Shown after answering</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-slate-600 text-xs">
          Each upload generates a unique game code. Share the code with your students to load your questions.
        </div>
      </div>
    </div>
  );
};
