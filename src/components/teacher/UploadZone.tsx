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
            ? 'border-cyan-400 bg-cyan-500/10 scale-[1.02] shadow-lg shadow-cyan-500/20'
            : 'border-slate-600 bg-slate-800/50 hover:border-cyan-500/60 hover:bg-slate-800/80'
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
            <div className="w-12 h-12 rounded-full border-4 border-cyan-400/30 border-t-cyan-400 animate-spin" />
            <p className="text-slate-300 text-lg">Parsing questions file...</p>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-4">
            <div className={`
              w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-300
              ${isDragging
                ? 'bg-cyan-500/20 text-cyan-300 scale-110'
                : 'bg-gradient-to-br from-cyan-500/20 to-blue-500/20 text-cyan-400'
              }
            `}>
              {isDragging ? (
                <FileSpreadsheet className="w-8 h-8" />
              ) : (
                <Upload className="w-8 h-8" />
              )}
            </div>

            <div>
              <p className="text-white text-lg font-semibold mb-1">
                {isDragging ? 'Drop your file here' : 'Upload Questions (Excel or JSON)'}
              </p>
              <p className="text-slate-400 text-sm">
                Drag & drop or click to browse • <span className="text-cyan-400">.xlsx</span>, <span className="text-cyan-400">.xls</span> or <span className="text-cyan-400">.json</span> files
              </p>
            </div>
          </div>
        )}
      </div>

      {error && (
        <div className="mt-3 flex items-center gap-2 text-red-400 text-sm bg-red-500/10 rounded-lg px-4 py-2.5">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
};
