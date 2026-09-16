import React, { useState, useCallback, useRef } from 'react';
import { Upload, FileSpreadsheet, AlertCircle } from 'lucide-react';

interface UploadZoneProps {
  onFileSelected: (file: File) => void;
  isLoading: boolean;
}

export const UploadZone: React.FC<UploadZoneProps> = ({ onFileSelected, isLoading }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const validateFile = (file: File): boolean => {
    const validTypes = [
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'application/vnd.ms-excel',
      'application/json',
      'text/json',
    ];
    const validExtensions = ['.xlsx', '.xls', '.json'];
    const ext = file.name.substring(file.name.lastIndexOf('.')).toLowerCase();

    if (!validTypes.includes(file.type) && !validExtensions.includes(ext)) {
      setError('Please upload an Excel file (.xlsx, .xls) or JSON file (.json)');
      return false;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError('File size must be under 5MB');
      return false;
    }

    setError(null);
    return true;
  };

  const handleFile = useCallback((file: File) => {
    if (validateFile(file)) {
      onFileSelected(file);
    }
  }, [onFileSelected]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  }, [handleFile]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
    if (inputRef.current) inputRef.current.value = '';
  };

  return (
    <div className="w-full">
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={() => inputRef.current?.click()}
        className={`
          relative cursor-pointer rounded-2xl border-2 border-dashed p-10
          transition-all duration-300 ease-out text-center
          ${isDragging
            ? 'border-sky-500 bg-sky-50 scale-[1.02] shadow-lg shadow-sky-500/20'
            : 'border-slate-300 bg-slate-50/80 hover:border-sky-400 hover:bg-sky-50/50'
          }
          ${isLoading ? 'pointer-events-none opacity-60' : ''}
        `}
      >
        <input
          ref={inputRef}
          type="file"
          accept=".xlsx,.xls,.json,application/json"
          onChange={handleInputChange}
          className="hidden"
        />

        {isLoading ? (
          <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 rounded-full border-4 border-sky-400/30 border-t-sky-500 animate-spin" />
            <p className="text-slate-600 text-base font-semibold">Parsing questions file...</p>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-4">
            <div className={`
              w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-300 shadow-sm
              ${isDragging
                ? 'bg-sky-100 text-sky-600 scale-110'
                : 'bg-gradient-to-br from-sky-100 to-blue-100 text-sky-600 border border-sky-200'
              }
            `}>
              {isDragging ? (
                <FileSpreadsheet className="w-8 h-8" />
              ) : (
                <Upload className="w-8 h-8" />
              )}
            </div>

            <div>
              <p className="text-slate-900 text-lg font-bold mb-1">
                {isDragging ? 'Drop your file here' : 'Upload Questions (Excel or JSON)'}
              </p>
              <p className="text-slate-500 text-sm">
                Drag & drop or click to browse • <span className="text-sky-600 font-semibold">.xlsx</span>, <span className="text-sky-600 font-semibold">.xls</span> or <span className="text-sky-600 font-semibold">.json</span> files
              </p>
            </div>
          </div>
        )}
      </div>

      {error && (
        <div className="mt-3 flex items-center gap-2 text-red-700 text-sm bg-red-50 border border-red-200 rounded-lg px-4 py-2.5">
          <AlertCircle className="w-4 h-4 flex-shrink-0 text-red-500" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
};
