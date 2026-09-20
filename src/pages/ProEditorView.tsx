import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Scissors,
  Eye,
  EyeOff,
  Lock,
  Unlock,
  Volume2,
  VolumeX,
  Sliders,
  Film,
  Sparkles,
  Maximize2,
  RotateCcw,
} from 'lucide-react';

export const ProEditorView: React.FC = () => {
  const { activeMovie, setCurrentScreen } = useApp();
  const [isPlaying, setIsPlaying] = useState(false);
  const [timecode, setTimecode] = useState('00:02:34:16');
  const [activeTool, setActiveTool] = useState<'select' | 'razor' | 'slip'>('select');
  const [playheadX, setPlayheadX] = useState(38); // percent along timeline

  // Effect control states
  const [scaleVal, setScaleVal] = useState(100);
  const [rotationVal, setRotationVal] = useState(0);
  const [opacityVal, setOpacityVal] = useState(100);

  // Track lock & mute toggles
  const [trackStates, setTrackStates] = useState({
    V3: { visible: true, locked: false },
    V2: { visible: true, locked: false },
    V1: { visible: true, locked: false },
    A1: { mute: false, solo: false },
    A2: { mute: false, solo: false },
    A3: { mute: false, solo: false },
  });

  const timelineClips = [
    { track: 'V1', name: 'Scene_01.mp4', left: 4, width: 20, color: 'bg-cyan-700/80 border-cyan-400' },
    { track: 'V1', name: 'Scene_02.mp4', left: 25, width: 28, color: 'bg-blue-700/80 border-blue-400' },
    { track: 'V1', name: 'Demo_01.mp4', left: 54, width: 18, color: 'bg-indigo-700/80 border-indigo-400' },
    { track: 'V1', name: 'Scene_03.mp4', left: 73, width: 23, color: 'bg-cyan-700/80 border-cyan-400' },
    { track: 'V2', name: 'Title_LowerThird.mov', left: 8, width: 14, color: 'bg-purple-700/80 border-purple-400' },
    { track: 'V2', name: 'Glitch_FX.mp4', left: 36, width: 10, color: 'bg-red-700/80 border-red-400' },
    { track: 'A1', name: 'Dialogue_Arjun_HI.wav', left: 4, width: 49, color: 'bg-emerald-800/80 border-emerald-400' },
    { track: 'A1', name: 'Dialogue_Part2.wav', left: 54, width: 42, color: 'bg-emerald-800/80 border-emerald-400' },
    { track: 'A2', name: 'Inception_Score_BGM.wav', left: 0, width: 96, color: 'bg-teal-800/80 border-teal-400' },
    { track: 'A3', name: 'SFX_Whoosh_Boom.wav', left: 24, width: 12, color: 'bg-amber-800/80 border-amber-400' },
    { track: 'A3', name: 'SFX_Riser.wav', left: 70, width: 15, color: 'bg-amber-800/80 border-amber-400' },
  ];

  return (
    <div id="pro-editor-view" className="space-y-3 pb-12">
      {/* Top Bar Navigation */}
      <div className="flex items-center justify-between border-b border-gray-800 pb-2">
        <div className="flex items-center gap-3">
          <h1 className="text-lg font-bold font-tech text-white uppercase tracking-wider flex items-center gap-2">
            <Film size={18} className="text-[#FF0033]" />
            <span>Pro Editor</span>
            <span className="text-gray-500 font-normal">|</span>
            <span className="text-cyan-400 font-mono-tech text-xs">6-Track Master Timeline</span>
          </h1>
        </div>

        <div className="flex items-center gap-2">
          <button
            id="editor-assistant-btn"
            onClick={() => setCurrentScreen('ai_assistant')}
            className="px-3 py-1.5 bg-cyan-950/60 hover:bg-cyan-900 border border-cyan-500/40 text-cyan-300 rounded text-xs font-tech tracking-wider uppercase transition flex items-center gap-1.5 cursor-pointer"
          >
            <Sparkles size={13} />
            <span>AI Editor Assistant</span>
          </button>

          <button
            id="editor-shorts-btn"
            onClick={() => setCurrentScreen('shorts_seo')}
            className="px-3 py-1.5 bg-[#FF0033] hover:bg-[#E50914] text-white rounded text-xs font-tech tracking-wider uppercase transition glow-red cursor-pointer"
          >
            Export Shorts
          </button>
        </div>
      </div>

      {/* Top 3-Box Layout: Media Browser | Program Monitor | Effect Controls */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 h-auto lg:h-72">
        {/* Box 1: Media Browser */}
        <div className="lg:col-span-3 glass-panel-cyan rounded-xl p-3 border border-cyan-500/20 bg-black/80 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-gray-800 pb-2 mb-2 text-xs font-tech text-gray-300">
              <span className="text-white font-bold uppercase">Media Browser</span>
              <span className="text-[10px] text-cyan-400 font-mono-tech">4 CLIPS</span>
            </div>

            <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto pr-1">
              {['Scene_01.mp4', 'Scene_02.mp4', 'Scene_03.mp4', 'Scene_04.mp4'].map((clip, i) => (
                <div
                  key={clip}
                  className="p-1.5 bg-black/60 border border-gray-800 hover:border-cyan-400 rounded-lg group cursor-pointer transition"
                >
                  <div className="aspect-video bg-gray-900 rounded overflow-hidden relative">
                    <img
                      src={activeMovie.poster}
                      alt={clip}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                    <span className="absolute bottom-1 right-1 text-[8px] bg-black/80 px-1 text-cyan-300 font-mono-tech">
                      00:3{i}s
                    </span>
                  </div>
                  <p className="text-[10px] font-mono-tech text-gray-300 truncate mt-1">{clip}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-2 border-t border-gray-800/60 flex items-center justify-between text-[11px] font-mono-tech text-gray-400">
            <span>BIN: {activeMovie.title}</span>
            <span className="text-emerald-400">SYNCED</span>
          </div>
        </div>

        {/* Box 2: Program Monitor */}
        <div className="lg:col-span-6 rounded-xl border border-cyan-500/30 bg-black flex flex-col justify-between overflow-hidden shadow-2xl relative">
          {/* Header inside monitor */}
          <div className="p-2.5 bg-black/80 flex items-center justify-between text-xs font-mono-tech border-b border-gray-800">
            <span className="text-white font-bold flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse" />
              Program: Inception_Sequence
            </span>
            <span className="text-cyan-400 font-bold tracking-widest">{timecode}</span>
          </div>

          {/* Video Preview Canvas */}
          <div className="relative flex-1 flex items-center justify-center bg-black overflow-hidden min-h-[160px]">
            <img
              src={activeMovie.poster}
              alt="Program Preview"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover opacity-85"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

            {/* Subtle crosshair */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-30">
              <div className="w-12 h-12 border border-cyan-400/50 rounded-full" />
            </div>
          </div>

          {/* Transport Controls Bar */}
          <div className="p-2 bg-black/90 border-t border-gray-800 flex items-center justify-center gap-3 text-gray-300">
            <button
              onClick={() => setPlayheadX(Math.max(0, playheadX - 10))}
              className="p-1 hover:text-cyan-400 transition cursor-pointer"
            >
              <SkipBack size={15} />
            </button>

            <button
              id="editor-play-pause-btn"
              onClick={() => setIsPlaying(!isPlaying)}
              className="w-8 h-8 rounded-full bg-[#FF0033] hover:bg-[#E50914] text-white flex items-center justify-center transition glow-red cursor-pointer"
            >
              {isPlaying ? <Pause size={14} /> : <Play size={14} fill="white" className="ml-0.5" />}
            </button>

            <button
              onClick={() => setPlayheadX(Math.min(100, playheadX + 10))}
              className="p-1 hover:text-cyan-400 transition cursor-pointer"
            >
              <SkipForward size={15} />
            </button>

            <span className="w-px h-4 bg-gray-800 mx-2" />

            <button
              id="razor-tool-btn"
              onClick={() => setActiveTool(activeTool === 'razor' ? 'select' : 'razor')}
              className={`p-1.5 rounded transition cursor-pointer ${
                activeTool === 'razor' ? 'bg-red-950 text-[#FF0033] border border-red-500/50' : 'hover:text-cyan-400'
              }`}
            >
              <Scissors size={14} />
            </button>
          </div>
        </div>

        {/* Box 3: Effect Controls Panel */}
        <div className="lg:col-span-3 glass-panel-cyan rounded-xl p-3 border border-cyan-500/20 bg-black/80 flex flex-col justify-between text-xs font-mono-tech">
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b border-gray-800 pb-2">
              <span className="text-white font-bold font-tech uppercase">Effect Controls</span>
              <span className="text-cyan-400 text-[10px]">VIDEO FX</span>
            </div>

            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Position</span>
                <span className="text-cyan-300">960.0, 540.0</span>
              </div>

              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Scale</span>
                  <span className="text-white">{scaleVal}%</span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="150"
                  value={scaleVal}
                  onChange={(e) => setScaleVal(parseInt(e.target.value))}
                  className="w-full h-1 accent-cyan-400"
                />
              </div>

              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Rotation</span>
                  <span className="text-white">{rotationVal}°</span>
                </div>
                <input
                  type="range"
                  min="-180"
                  max="180"
                  value={rotationVal}
                  onChange={(e) => setRotationVal(parseInt(e.target.value))}
                  className="w-full h-1 accent-cyan-400"
                />
              </div>

              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Opacity</span>
                  <span className="text-white">{opacityVal}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={opacityVal}
                  onChange={(e) => setOpacityVal(parseInt(e.target.value))}
                  className="w-full h-1 accent-cyan-400"
                />
              </div>
            </div>
          </div>

          <div className="pt-2 border-t border-gray-800 flex items-center justify-between text-[10px] text-gray-500">
            <span>Lumetri Color: Basic</span>
            <span className="text-cyan-400 font-bold">REC.709</span>
          </div>
        </div>
      </div>

      {/* Bottom 6-Track NLE Timeline (Panel 9 Reference) */}
      <div className="glass-panel-cyan rounded-xl p-3 border border-cyan-500/20 bg-black/90 space-y-2">
        {/* Timeline Header & Time Ruler */}
        <div className="flex items-center gap-2 border-b border-gray-800 pb-2">
          <div className="w-24 text-[10px] font-mono-tech text-gray-400 uppercase">TRACKS</div>
          <div className="flex-1 flex justify-between text-[9px] font-mono-tech text-gray-500 px-2">
            <span>00:00:00:00</span>
            <span>00:00:30:00</span>
            <span>00:01:00:00</span>
            <span>00:01:30:00</span>
            <span>00:02:00:00</span>
            <span>00:02:30:00</span>
            <span>00:03:00:00</span>
          </div>
        </div>

        {/* Tracks Area with Interactive Playhead */}
        <div
          id="timeline-tracks-container"
          onClick={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const clickPercent = ((e.clientX - rect.left - 96) / (rect.width - 96)) * 100;
            if (clickPercent >= 0 && clickPercent <= 100) {
              setPlayheadX(Math.round(clickPercent));
            }
          }}
          className="relative space-y-1.5 py-1 cursor-crosshair select-none"
        >
          {/* Vertical Glowing Red Playhead */}
          <div
            className="absolute top-0 bottom-0 w-0.5 bg-[#FF0033] shadow-[0_0_10px_#ff0033] z-30 pointer-events-none"
            style={{ left: `calc(96px + ${playheadX}%)` }}
          >
            <div className="w-3 h-3 bg-[#FF0033] rotate-45 -translate-x-1.25 -translate-y-1.5 shadow-[0_0_8px_#ff0033]" />
          </div>

          {/* 6 Tracks: V3, V2, V1, A1, A2, A3 */}
          {(['V3', 'V2', 'V1', 'A1', 'A2', 'A3'] as const).map((trackName) => {
            const isVideo = trackName.startsWith('V');
            const trackClips = timelineClips.filter((c) => c.track === trackName);

            return (
              <div key={trackName} className="flex items-center gap-2 h-9 group">
                {/* Track Header controls */}
                <div className="w-24 shrink-0 flex items-center justify-between px-2 bg-black/80 rounded border border-gray-800 text-[11px] font-mono-tech">
                  <span className={`font-bold ${isVideo ? 'text-cyan-400' : 'text-emerald-400'}`}>
                    {trackName}
                  </span>
                  <div className="flex items-center gap-1 text-gray-500">
                    {isVideo ? (
                      <Eye size={12} className="hover:text-white cursor-pointer" />
                    ) : (
                      <Volume2 size={12} className="hover:text-white cursor-pointer" />
                    )}
                    <Lock size={12} className="hover:text-white cursor-pointer" />
                  </div>
                </div>

                {/* Track Lane */}
                <div className="flex-1 h-full bg-black/50 border border-gray-900 rounded relative overflow-hidden">
                  {trackClips.map((clip, idx) => (
                    <div
                      key={idx}
                      style={{ left: `${clip.left}%`, width: `${clip.width}%` }}
                      className={`absolute top-0.5 bottom-0.5 rounded px-2 flex items-center text-[10px] font-mono-tech text-white border shadow-sm truncate ${clip.color}`}
                    >
                      {clip.name}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
