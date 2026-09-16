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
  AlertTriangle,
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
  const [saveError, setSaveError] = useState<string | null>(null);

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
    setSaveError(null);
    try {
      const code = await saveQuestionSetToCloud(teamA, teamB);
      setGeneratedCode(code);
      setTeacherCodes(loadTeacherCodes());
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 5000);
    } catch (err) {
      console.error('Failed to save questions to cloud:', err);
      setSaveError((err as Error).message || 'Failed to save questions to cloud.');
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
    <div className="min-h-screen bg-gradient-to-b from-sky-100 via-sky-50 to-blue-50 text-slate-800">
      {/* Subtle ambient light shapes */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-sky-200/40 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-200/30 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/80 hover:bg-white text-slate-600 hover:text-sky-700 border border-slate-200 shadow-xs transition-all group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm font-semibold">Back to Game</span>
          </button>
        </div>

        {/* Title Section */}
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-2.5 mb-3 flex-wrap">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sky-100 border border-sky-300 text-sky-800 text-xs font-bold uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4 text-sky-600" />
              Teacher Dashboard
            </div>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black mb-3 text-slate-900 tracking-tight">
            <span className="bg-gradient-to-r from-sky-700 via-blue-700 to-indigo-800 bg-clip-text text-transparent">
              Question Manager
            </span>
          </h1>
          <p className="text-slate-600 text-sm sm:text-base max-w-xl mx-auto font-medium">
            Upload questions with separate <strong className="text-red-600 font-bold">Team A (Red)</strong> and <strong className="text-blue-600 font-bold">Team B (Blue)</strong> sheets. Get a unique code to share with your class.
          </p>
        </div>

        {/* ════════════════════════════════════════════════════════ */}
        {/* GENERATED CODE DISPLAY (top banner if no file uploaded) */}
        {/* ════════════════════════════════════════════════════════ */}
        {!parseResult && generatedCode && (
          <div className="mb-8 rounded-2xl overflow-hidden border-2 border-emerald-400 bg-gradient-to-br from-emerald-50 via-white to-sky-50 shadow-lg">
            <div className="p-6 sm:p-8 text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <CheckCircle className="w-5 h-5 text-emerald-600" />
                <span className="text-emerald-800 font-bold text-sm uppercase tracking-wider">Question Set Created Successfully!</span>
              </div>
              <p className="text-slate-600 text-xs sm:text-sm mb-4 font-medium">Share this code with your students to load the question set</p>
              
              <div className="inline-flex items-center gap-4 bg-white rounded-2xl px-8 py-4 border-2 border-emerald-500 shadow-md">
                <span className="text-4xl sm:text-6xl font-mono font-black text-sky-950 tracking-[0.35em]">
                  {generatedCode}
                </span>
                <button
                  onClick={() => handleCopyCode(generatedCode)}
                  className="p-3 rounded-xl bg-emerald-100 hover:bg-emerald-200 text-emerald-800 border border-emerald-300 transition-all hover:scale-105"
                  title="Copy code"
                >
                  {copiedCode ? <CheckCircle className="w-5 h-5 text-emerald-600" /> : <Copy className="w-5 h-5" />}
                </button>
              </div>

              <p className="mt-4 text-slate-500 text-xs">
                Students enter this code on the <strong className="text-slate-800">Start Screen → Join Game</strong>
              </p>
            </div>
          </div>
        )}

        {/* ════════════════════════════════════════════════════════ */}
        {/* MY QUESTION SETS (previously created) */}
        {/* ════════════════════════════════════════════════════════ */}
        {teacherCodes.length > 0 && (
          <div className="mb-8 rounded-2xl border border-sky-200/80 bg-white/90 backdrop-blur-sm p-5 sm:p-6 shadow-md shadow-sky-900/5">
            <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wider mb-4 flex items-center gap-2">
              <Hash className="w-4 h-4 text-sky-600" />
              My Question Sets
            </h3>
            <div className="space-y-2">
              {teacherCodes.map((entry) => (
                <div
                  key={entry.code}
                  className={`flex items-center justify-between px-4 py-3 rounded-xl border transition-all ${
                    entry.code === generatedCode
                      ? 'bg-emerald-50 border-emerald-300 shadow-xs'
                      : 'bg-slate-50/70 border-slate-200 hover:bg-sky-50/60 hover:border-sky-300'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <span className="font-mono font-black text-lg text-slate-900 tracking-[0.2em]">{entry.code}</span>
                    <div className="flex items-center gap-2.5 text-xs text-slate-600">
                      <span className="px-2.5 py-0.5 rounded-full bg-red-100 text-red-800 font-semibold border border-red-200">
                        Team A: {entry.teamACount}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 font-semibold border border-blue-200">
                        Team B: {entry.teamBCount}
                      </span>
                      <span className="flex items-center gap-1 text-slate-400 font-medium">
                        <Clock className="w-3 h-3" />
                        {new Date(entry.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleCopyCode(entry.code)}
                      className="p-2 rounded-lg bg-white hover:bg-sky-100 text-slate-600 hover:text-sky-700 border border-slate-200 transition-all shadow-2xs"
                      title="Copy code"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteCode(entry.code)}
                      className="p-2 rounded-lg bg-white hover:bg-red-50 text-slate-400 hover:text-red-600 border border-slate-200 transition-all shadow-2xs"
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
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl border border-sky-200 shadow-md shadow-sky-900/5 p-6 sm:p-8 mb-6">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
            <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
              <FileSpreadsheet className="w-5 h-5 text-sky-600" />
              Upload Questions
            </h2>
            <div className="flex items-center gap-2">
              <button
                onClick={generateTemplateExcel}
                className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-sky-50 text-sky-800 
                           border border-sky-300 hover:bg-sky-100 transition-all text-xs font-semibold shadow-2xs"
              >
                <Download className="w-3.5 h-3.5" />
                Excel Template (2 Sheets)
              </button>
              <button
                onClick={generateTemplateJson}
                className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-indigo-50 text-indigo-800 
                           border border-indigo-200 hover:bg-indigo-100 transition-all text-xs font-semibold shadow-2xs"
              >
                <Download className="w-3.5 h-3.5" />
                JSON Template
              </button>
            </div>
          </div>

          {/* Template info */}
          <div className="mb-4 p-3.5 rounded-xl bg-sky-50 border border-sky-200 text-xs text-sky-900">
            <strong className="text-sky-950 font-bold">Template format:</strong> Excel with two sheets — <strong>"Team A (Red)"</strong> and <strong>"Team B (Blue)"</strong>. Each sheet has the same columns: Question, Option A–D, Correct Answer, Difficulty, Explanation. Single-sheet uploads work too — both teams will share the same questions.
          </div>

          <UploadZone onFileSelected={handleFileSelected} isLoading={isLoading} />

          {fileName && !isLoading && parseResult && (
            <div className="mt-3 flex items-center gap-3 text-sm text-slate-600">
              <FileSpreadsheet className="w-4 h-4 text-sky-600" />
              <span>Loaded: <span className="font-semibold text-slate-800">{fileName}</span></span>
              {parseResult.hasTeamSheets && (
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold border border-emerald-300">
                  ✓ Team A/B detected
                </span>
              )}
              {!parseResult.hasTeamSheets && parseResult.questions.length > 0 && (
                <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 text-[10px] font-bold border border-amber-300">
                  Single sheet — shared pool
                </span>
              )}
            </div>
          )}
        </div>

        {/* Preview Section */}
        {parseResult && (
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl border border-sky-200 shadow-md shadow-sky-900/5 p-6 sm:p-8 mb-6">
            <h2 className="text-lg font-bold text-slate-800 mb-5 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-sky-600" />
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

            {/* ════════════════════════════════════════════════════════ */}
            {/* CENTER GENERATED CODE DISPLAY (In this section)        */}
            {/* ════════════════════════════════════════════════════════ */}
            {generatedCode && (
              <div className="mt-8 mb-4 p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-emerald-50 via-white to-sky-50 border-2 border-emerald-500 shadow-xl flex flex-col items-center justify-center text-center animate-in fade-in zoom-in-95 duration-300">
                <div className="flex items-center gap-2 mb-2 text-emerald-800 font-bold text-xs sm:text-sm uppercase tracking-wider">
                  <CheckCircle className="w-5 h-5 text-emerald-600" />
                  <span>Question Set Saved & Code Active!</span>
                </div>
                <p className="text-slate-600 text-xs sm:text-sm mb-4 font-medium">
                  Share this 4-digit game code with your students to load this question set:
                </p>

                <div className="inline-flex items-center gap-4 bg-white rounded-2xl px-8 py-4 border-2 border-emerald-500 shadow-md">
                  <span className="text-4xl sm:text-6xl font-mono font-black text-sky-950 tracking-[0.35em]">
                    {generatedCode}
                  </span>
                  <button
                    onClick={() => handleCopyCode(generatedCode)}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold transition-all hover:scale-105 active:scale-95 shadow-sm"
                    title="Copy code"
                  >
                    {copiedCode ? (
                      <>
                        <CheckCircle className="w-4 h-4 text-white" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        <span>Copy Code</span>
                      </>
                    )}
                  </button>
                </div>

                <p className="mt-4 text-slate-500 text-xs flex items-center gap-1.5">
                  <span>Students enter this code on the</span>
                  <strong className="text-slate-800 font-bold">Start Screen → Join Game</strong>
                </p>
              </div>
            )}

            {/* Error message if save fails */}
            {saveError && (
              <div className="mt-4 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs sm:text-sm flex items-center gap-2 justify-center text-center">
                <AlertTriangle className="w-4 h-4 shrink-0 text-red-600" />
                <span>{saveError}</span>
              </div>
            )}

            {/* Action Buttons */}
            {canSave && (
              <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
                <button
                  onClick={() => exportQuestionsToJson(parseResult.questions, fileName ? fileName.replace(/\.[^/.]+$/, '') + '.json' : 'questions.json')}
                  className="flex items-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm
                             bg-white text-slate-700 border border-slate-300 shadow-xs
                             hover:bg-slate-50 hover:text-slate-900 transition-all duration-200"
                >
                  <Download className="w-4 h-4" />
                  Download as JSON
                </button>

                {/* Center Code Badge if generated */}
                {generatedCode && (
                  <div className="flex items-center gap-3 px-5 py-2.5 rounded-xl bg-white border-2 border-emerald-500 shadow-sm">
                    <span className="text-xs text-slate-500 font-bold uppercase tracking-wider">GAME CODE:</span>
                    <span className="text-2xl font-mono font-black text-slate-900 tracking-[0.25em]">{generatedCode}</span>
                    <button
                      onClick={() => handleCopyCode(generatedCode)}
                      className="p-1.5 rounded-lg bg-emerald-100 hover:bg-emerald-200 text-emerald-800 border border-emerald-300 transition-all hover:scale-105"
                      title="Copy code"
                    >
                      {copiedCode ? <CheckCircle className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                )}

                <button
                  onClick={handleSave}
                  disabled={isSavingCloud}
                  className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm
                             bg-gradient-to-r from-sky-600 to-blue-600 text-white shadow-md shadow-sky-600/20
                             hover:from-sky-500 hover:to-blue-500
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
                      {generatedCode ? 'Update & Get New Code' : 'Save & Get Game Code'}
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
          bg-emerald-600 text-white shadow-2xl shadow-emerald-600/30
          transition-all duration-500 ease-out z-50
          ${showSuccess ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0 pointer-events-none'}
        `}>
          <CheckCircle className="w-5 h-5 text-emerald-200" />
          <span className="font-bold text-sm">
            Questions saved! Game code: <span className="font-mono tracking-widest text-amber-200">{generatedCode}</span>
          </span>
        </div>

        {/* Format Guide */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl border border-sky-200 shadow-md shadow-sky-900/5 p-6 sm:p-8">
          <h3 className="text-sm font-bold text-slate-700 mb-4 uppercase tracking-wider">Excel Format Guide</h3>
          <p className="text-xs text-slate-500 mb-4">
            Your Excel file should have <strong className="text-slate-700">two sheets</strong>: "Team A (Red)" and "Team B (Blue)". Each sheet uses the same column format below.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border border-slate-200 rounded-xl overflow-hidden">
              <thead className="bg-slate-100 border-b border-slate-200">
                <tr>
                  <th className="text-left text-slate-600 font-bold px-3 py-2 text-xs">Column</th>
                  <th className="text-left text-slate-600 font-bold px-3 py-2 text-xs">Required</th>
                  <th className="text-left text-slate-600 font-bold px-3 py-2 text-xs">Example</th>
                  <th className="text-left text-slate-600 font-bold px-3 py-2 text-xs">Notes</th>
                </tr>
              </thead>
              <tbody className="text-slate-700 divide-y divide-slate-200 bg-white">
                <tr>
                  <td className="px-3 py-2.5 font-semibold text-slate-900">Question</td>
                  <td className="px-3 py-2.5"><span className="text-emerald-700 font-semibold">✓ Yes</span></td>
                  <td className="px-3 py-2.5 text-slate-600">Which is the largest ocean?</td>
                  <td className="px-3 py-2.5 text-slate-500 text-xs">The question text shown to players</td>
                </tr>
                <tr>
                  <td className="px-3 py-2.5 font-semibold text-slate-900">Option A–D</td>
                  <td className="px-3 py-2.5"><span className="text-emerald-700 font-semibold">A & B required</span></td>
                  <td className="px-3 py-2.5 text-slate-600">Pacific Ocean</td>
                  <td className="px-3 py-2.5 text-slate-500 text-xs">C & D are optional</td>
                </tr>
                <tr>
                  <td className="px-3 py-2.5 font-semibold text-slate-900">Correct Answer</td>
                  <td className="px-3 py-2.5"><span className="text-emerald-700 font-semibold">✓ Yes</span></td>
                  <td className="px-3 py-2.5 text-slate-600">A</td>
                  <td className="px-3 py-2.5 text-slate-500 text-xs">Accepts A/B/C/D or 1/2/3/4</td>
                </tr>
                <tr>
                  <td className="px-3 py-2.5 font-semibold text-slate-900">Difficulty</td>
                  <td className="px-3 py-2.5"><span className="text-slate-400 font-medium">Optional</span></td>
                  <td className="px-3 py-2.5 text-slate-600">easy</td>
                  <td className="px-3 py-2.5 text-slate-500 text-xs">easy / medium / hard</td>
                </tr>
                <tr>
                  <td className="px-3 py-2.5 font-semibold text-slate-900">Explanation</td>
                  <td className="px-3 py-2.5"><span className="text-slate-400 font-medium">Optional</span></td>
                  <td className="px-3 py-2.5 text-slate-600">The Pacific Ocean covers...</td>
                  <td className="px-3 py-2.5 text-slate-500 text-xs">Shown after answering</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-slate-500 text-xs">
          Each upload generates a unique game code. Share the code with your students to load your questions.
        </div>
      </div>
    </div>
  );
};
