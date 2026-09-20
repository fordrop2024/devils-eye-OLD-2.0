import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { UploadCloud, Film, X, CheckCircle, Cpu, Radio, ArrowRight } from 'lucide-react';

export const MovieUploadView: React.FC = () => {
  const { setCurrentScreen, setMovies, setActiveMovie } = useApp();
  const [selectedFileName, setSelectedFileName] = useState<string>('Inception.mp4');
  const [fileSize, setFileSize] = useState<string>('1.84 GB');
  const [isUploading, setIsUploading] = useState<boolean>(true);
  const [progress, setProgress] = useState<number>(68);
  const [activeStage, setActiveStage] = useState<number>(2); // 1: Uploading, 2: Processing, 3: Gemini, 4: Ready

  const handleSimulateComplete = () => {
    setProgress(100);
    setActiveStage(4);
    setTimeout(() => {
      setCurrentScreen('analysis');
    }, 1000);
  };

  const handleFileDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      setSelectedFileName(file.name);
      setFileSize(`${(file.size / (1024 * 1024 * 1024)).toFixed(2)} GB`);
      setProgress(10);
      setIsUploading(true);
      setActiveStage(1);
    }
  };

  return (
    <div id="movie-upload-view" className="max-w-4xl mx-auto space-y-6 pb-12">
      <div className="flex items-center justify-between border-b border-gray-800 pb-4">
        <div>
          <h1 className="text-2xl font-bold font-tech text-white uppercase tracking-wider">
            Upload Movie
          </h1>
          <p className="text-xs text-gray-400 font-mono-tech mt-1">
            Multimodal Neural Ingestion • 4K HDR & Resumable Chunks
          </p>
        </div>
        <div className="text-xs font-mono-tech px-3 py-1 bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 rounded-full flex items-center gap-1.5">
          <Radio size={12} className="animate-pulse text-cyan-400" />
          <span>GEMINI 2.0 FLASH PIPELINE</span>
        </div>
      </div>

      {/* Drag and Drop Zone */}
      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleFileDrop}
        className="relative group rounded-2xl border-2 border-dashed border-cyan-500/30 hover:border-cyan-400/80 bg-black/60 hover:bg-cyan-950/10 p-10 text-center transition-all duration-300 cursor-pointer overflow-hidden"
      >
        <input
          type="file"
          id="movie-file-input"
          accept=".mp4,.mov,.avi,.mkv"
          className="absolute inset-0 opacity-0 cursor-pointer z-20"
          onChange={(e) => {
            if (e.target.files && e.target.files[0]) {
              setSelectedFileName(e.target.files[0].name);
              setFileSize(`${(e.target.files[0].size / (1024 * 1024 * 1024)).toFixed(2)} GB`);
            }
          }}
        />

        <div className="relative z-10 flex flex-col items-center justify-center space-y-4">
          <div className="w-20 h-20 rounded-full bg-cyan-950/50 border border-cyan-500/40 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform shadow-[0_0_30px_rgba(0,229,255,0.25)]">
            <UploadCloud size={38} className="animate-bounce" />
          </div>

          <div>
            <p className="text-base font-bold font-tech text-white">
              Drag & drop your movie file here
            </p>
            <p className="text-sm text-cyan-400 font-mono-tech mt-1">
              or <span className="underline decoration-cyan-400">click to browse</span>
            </p>
          </div>

          <p className="text-xs text-gray-500 font-mono-tech">
            Supports: MP4, MOV, AVI, MKV (Max 2GB)
          </p>
        </div>
      </div>

      {/* Ingested File Card */}
      {selectedFileName && (
        <div className="glass-panel-cyan rounded-xl p-4 flex items-center justify-between border border-cyan-500/20 bg-black/70">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-red-950/60 border border-red-500/30 flex items-center justify-center text-[#FF0033]">
              <Film size={20} />
            </div>
            <div>
              <p className="text-sm font-bold font-tech text-white">{selectedFileName}</p>
              <p className="text-xs text-gray-400 font-mono-tech">{fileSize} • Codec H.265 / HEVC</p>
            </div>
          </div>

          <button
            onClick={() => setSelectedFileName('')}
            className="p-1.5 text-gray-400 hover:text-red-400 hover:bg-red-950/40 rounded transition cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>
      )}

      {/* Upload Action Buttons */}
      <div className="flex items-center gap-4">
        <button
          id="start-upload-btn"
          onClick={handleSimulateComplete}
          className="flex-1 py-3 px-6 rounded-lg bg-[#FF0033] hover:bg-[#E50914] text-white font-bold font-tech text-sm tracking-wider uppercase transition glow-red cursor-pointer flex items-center justify-center gap-2"
        >
          <span>Upload</span>
          <ArrowRight size={16} />
        </button>

        <button
          id="cancel-upload-btn"
          onClick={() => setCurrentScreen('dashboard')}
          className="px-6 py-3 rounded-lg bg-black/60 hover:bg-gray-900 border border-gray-800 text-gray-300 font-tech text-sm tracking-wider uppercase transition cursor-pointer"
        >
          Cancel
        </button>
      </div>

      {/* Upload Progress Pipeline (4 Stages from Reference Panel 3) */}
      <div className="glass-panel-cyan rounded-xl p-6 border border-cyan-500/20 bg-black/80 space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold font-tech uppercase text-white tracking-wider">
            Upload Progress
          </h2>
          <span className="text-base font-bold font-mono-tech text-[#FF0033]">{progress}%</span>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-2 bg-gray-950 rounded-full overflow-hidden border border-gray-800">
          <div
            className="h-full bg-gradient-to-r from-[#FF0033] via-cyan-400 to-[#FF0033] transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* 4 Stage Steppers */}
        <div className="grid grid-cols-4 gap-2 pt-2">
          {/* Stage 1: Uploading */}
          <div className="flex flex-col items-center text-center space-y-1.5">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                activeStage >= 1
                  ? 'bg-red-600 text-white shadow-[0_0_15px_rgba(255,0,51,0.5)]'
                  : 'bg-gray-800 text-gray-500'
              }`}
            >
              <CheckCircle size={16} />
            </div>
            <span className="text-xs font-mono-tech font-semibold text-white">Uploading</span>
            <span className="text-[10px] text-gray-400 font-mono-tech">Chunk 142/208</span>
          </div>

          {/* Stage 2: Processing */}
          <div className="flex flex-col items-center text-center space-y-1.5">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                activeStage >= 2
                  ? 'bg-cyan-500 text-black shadow-[0_0_15px_rgba(0,229,255,0.6)] animate-pulse'
                  : 'bg-gray-800 text-gray-500'
              }`}
            >
              <Film size={16} />
            </div>
            <span className="text-xs font-mono-tech font-semibold text-cyan-300">Processing</span>
            <span className="text-[10px] text-gray-400 font-mono-tech">Transcoding 4K</span>
          </div>

          {/* Stage 3: Gemini */}
          <div className="flex flex-col items-center text-center space-y-1.5">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                activeStage >= 3
                  ? 'bg-purple-600 text-white shadow-[0_0_15px_rgba(168,85,247,0.6)]'
                  : 'bg-gray-900 border border-gray-800 text-gray-500'
              }`}
            >
              <Cpu size={16} />
            </div>
            <span className="text-xs font-mono-tech font-semibold text-gray-300">Gemini</span>
            <span className="text-[10px] text-gray-400 font-mono-tech">Multimodal Ingest</span>
          </div>

          {/* Stage 4: Ready */}
          <div className="flex flex-col items-center text-center space-y-1.5">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                activeStage >= 4
                  ? 'bg-emerald-500 text-black shadow-[0_0_15px_rgba(16,185,129,0.6)]'
                  : 'bg-gray-900 border border-gray-800 text-gray-500'
              }`}
            >
              <CheckCircle size={16} />
            </div>
            <span className="text-xs font-mono-tech font-semibold text-gray-400">Ready</span>
            <span className="text-[10px] text-gray-500 font-mono-tech">Story Pipeline</span>
          </div>
        </div>
      </div>
    </div>
  );
};
