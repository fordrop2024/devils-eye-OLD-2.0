import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { Play, Pause, Volume2, Download, Mic, Radio, Sliders, ArrowRight } from 'lucide-react';

export const VoiceLabView: React.FC = () => {
  const { setCurrentScreen } = useApp();
  const [activeTab, setActiveTab] = useState('Voice Settings');
  const [selectedVoice, setSelectedVoice] = useState('Hindi - Arjun (Male)');
  const [speed, setSpeed] = useState(1.0);
  const [pitch, setPitch] = useState(0);
  const [volume, setVolume] = useState(100);
  const [isPlaying, setIsPlaying] = useState(false);
  const [previewTime, setPreviewTime] = useState(0);

  const subTabs = ['Voice Settings', 'Audio Timeline'];
  const voices = [
    'Hindi - Arjun (Male)',
    'Hindi - Priya (Female)',
    'English - Marcus (Cinematic Deep)',
    'English - Sophia (Narrator)',
    'Hinglish - Kabir (Storyteller)',
  ];

  useEffect(() => {
    let timer: any;
    if (isPlaying) {
      timer = setInterval(() => {
        setPreviewTime((prev) => (prev >= 10 ? 0 : prev + 0.5));
      }, 500);
    }
    return () => clearInterval(timer);
  }, [isPlaying]);

  return (
    <div id="voice-lab-view" className="max-w-4xl mx-auto space-y-6 pb-12">
      {/* Header & Sub-Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-800 pb-3">
        <div>
          <h1 className="text-2xl font-bold font-tech text-white uppercase tracking-wider">
            TTS - Voice & Audio
          </h1>
          <p className="text-xs text-gray-400 font-mono-tech mt-0.5">
            Neural Voice Synthesis & Spectral Frequency Mastering
          </p>
        </div>

        <div className="flex items-center gap-1.5 p-1 bg-black/60 rounded-xl border border-gray-800">
          {subTabs.map((tab) => (
            <button
              key={tab}
              id={`voice-tab-${tab.toLowerCase().replace(/\s+/g, '-')}`}
              onClick={() => setActiveTab(tab)}
              className={`px-3 py-1.5 text-xs font-tech tracking-wider uppercase rounded-lg transition cursor-pointer ${
                activeTab === tab
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-bold'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Voice Selection Card (Panel 8) */}
      <div className="glass-panel-cyan rounded-xl p-5 border border-cyan-500/20 bg-black/80 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-cyan-950/60 border border-cyan-500/40 flex items-center justify-center text-cyan-400 shadow-[0_0_15px_rgba(0,229,255,0.3)]">
              <Mic size={22} />
            </div>
            <div>
              <span className="text-[10px] font-mono-tech text-cyan-400 uppercase tracking-wider block">
                Active Neural Speaker
              </span>
              <h2 className="text-base font-bold font-tech text-white">{selectedVoice}</h2>
            </div>
          </div>

          {/* Mini waveform representation */}
          <div className="flex items-center gap-0.5 h-7 px-3 bg-black/60 rounded border border-gray-800">
            {[4, 12, 18, 9, 22, 15, 26, 14, 8, 20, 16, 7, 24, 18, 11, 23, 15, 6].map((h, i) => (
              <span
                key={i}
                style={{ height: `${h}px` }}
                className="w-1 bg-cyan-400 rounded-full animate-pulse"
              />
            ))}
          </div>

          <select
            id="voice-picker-select"
            value={selectedVoice}
            onChange={(e) => setSelectedVoice(e.target.value)}
            className="px-3 py-1.5 bg-black border border-gray-800 text-xs font-mono-tech text-cyan-300 rounded-lg outline-none focus:border-cyan-400 cursor-pointer"
          >
            {voices.map((v) => (
              <option key={v} value={v}>
                {v}
              </option>
            ))}
          </select>
        </div>

        {/* 3 Parameter Sliders: Speed, Pitch, Volume */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-gray-800/80">
          {/* Speed */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-mono-tech">
              <span className="text-gray-400">Speed</span>
              <span className="text-cyan-400 font-bold">{speed.toFixed(1)}x</span>
            </div>
            <input
              id="voice-speed-slider"
              type="range"
              min="0.5"
              max="2.0"
              step="0.1"
              value={speed}
              onChange={(e) => setSpeed(parseFloat(e.target.value))}
              className="w-full accent-cyan-400 cursor-pointer"
            />
          </div>

          {/* Pitch */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-mono-tech">
              <span className="text-gray-400">Pitch</span>
              <span className="text-cyan-400 font-bold">{pitch > 0 ? `+${pitch}` : pitch}</span>
            </div>
            <input
              id="voice-pitch-slider"
              type="range"
              min="-10"
              max="10"
              step="1"
              value={pitch}
              onChange={(e) => setPitch(parseInt(e.target.value))}
              className="w-full accent-cyan-400 cursor-pointer"
            />
          </div>

          {/* Volume */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-mono-tech">
              <span className="text-gray-400">Volume</span>
              <span className="text-cyan-400 font-bold">{volume}%</span>
            </div>
            <input
              id="voice-volume-slider"
              type="range"
              min="0"
              max="100"
              value={volume}
              onChange={(e) => setVolume(parseInt(e.target.value))}
              className="w-full accent-cyan-400 cursor-pointer"
            />
          </div>
        </div>
      </div>

      {/* Generated Audio Section with Blue Waveform Visualizer (Panel 8) */}
      <div className="glass-panel-cyan rounded-xl p-6 border border-cyan-500/30 bg-black/80 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Radio size={16} className="text-cyan-400 animate-pulse" />
            <h3 className="text-sm font-bold font-tech uppercase text-white tracking-wider">
              Generated Audio
            </h3>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono-tech text-cyan-400 font-bold">15:24</span>
            <button
              id="download-audio-btn"
              onClick={() => alert('Exporting Master WAV file at 48kHz / 24-bit.')}
              className="px-3 py-1 bg-cyan-950/40 hover:bg-cyan-900/60 border border-cyan-500/40 text-cyan-300 text-xs font-mono-tech rounded flex items-center gap-1.5 transition cursor-pointer"
            >
              <Download size={13} />
              <span>Download</span>
            </button>
          </div>
        </div>

        {/* Big Blue Waveform Visualizer Canvas */}
        <div className="h-24 w-full bg-black/90 rounded-xl border border-cyan-500/30 p-3 flex items-center justify-between gap-1 overflow-hidden relative shadow-[inset_0_0_20px_rgba(0,229,255,0.08)]">
          {Array.from({ length: 64 }).map((_, i) => {
            const h = Math.sin(i * 0.25) * 24 + Math.cos(i * 0.5) * 16 + 32;
            const isPlayed = i < (previewTime / 10) * 64;
            return (
              <div
                key={i}
                style={{ height: `${Math.max(8, h)}px` }}
                className={`w-1 rounded-full transition-all duration-150 ${
                  isPlayed
                    ? 'bg-gradient-to-t from-red-500 to-[#FF0033] shadow-[0_0_8px_#ff0033]'
                    : 'bg-gradient-to-t from-cyan-600 to-cyan-400'
                }`}
              />
            );
          })}
          {/* Playhead indicator line */}
          <div
            className="absolute top-0 bottom-0 w-0.5 bg-red-500 shadow-[0_0_8px_#ff0033] pointer-events-none"
            style={{ left: `${(previewTime / 10) * 100}%` }}
          />
        </div>
      </div>

      {/* Voice Preview Player Bar (Bottom of Panel 8) */}
      <div className="p-4 rounded-xl bg-black/90 border border-gray-800 flex items-center gap-4">
        <button
          id="preview-audio-toggle"
          onClick={() => setIsPlaying(!isPlaying)}
          className="w-10 h-10 rounded-full bg-[#FF0033] hover:bg-[#E50914] text-white flex items-center justify-center transition glow-red cursor-pointer shrink-0"
        >
          {isPlaying ? <Pause size={18} /> : <Play size={18} fill="white" className="ml-0.5" />}
        </button>

        <div className="flex-1 space-y-1">
          <div className="flex justify-between text-xs font-mono-tech">
            <span className="text-white font-semibold">Voice Preview</span>
            <span className="text-gray-400">
              00:{previewTime < 10 ? `0${Math.floor(previewTime)}` : Math.floor(previewTime)} / 00:10
            </span>
          </div>
          <div className="w-full h-1.5 bg-gray-900 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-red-500 to-cyan-400 transition-all duration-200"
              style={{ width: `${(previewTime / 10) * 100}%` }}
            />
          </div>
        </div>

        <button
          id="send-to-editor-btn"
          onClick={() => setCurrentScreen('editor')}
          className="px-4 py-2 bg-[#FF0033] hover:bg-[#E50914] text-white font-tech text-xs tracking-wider rounded font-bold uppercase transition glow-red flex items-center gap-2 cursor-pointer shrink-0"
        >
          <span>Send To Timeline</span>
          <ArrowRight size={14} />
        </button>
      </div>
    </div>
  );
};
