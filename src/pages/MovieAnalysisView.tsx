import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Play, Pause, CheckCircle2, Loader2, Circle, Eye, Film, Users, MapPin, Calendar, Sparkles } from 'lucide-react';

export const MovieAnalysisView: React.FC = () => {
  const { activeMovie, setCurrentScreen } = useApp();
  const [activeTab, setActiveTab] = useState<'Overview' | 'Scenes' | 'Characters' | 'Locations' | 'Events' | 'More'>('Overview');
  const [isPlaying, setIsPlaying] = useState(false);

  const subTabs = ['Overview', 'Scenes', 'Characters', 'Locations', 'Events', 'More'] as const;

  const steps = [
    { name: 'Video Processing', status: 'completed' },
    { name: 'Scene Detection', status: 'completed' },
    { name: 'Character Recognition', status: 'in_progress' },
    { name: 'Object Detection', status: 'pending' },
    { name: 'Audio Analysis', status: 'pending' },
  ];

  return (
    <div id="movie-analysis-view" className="space-y-5 pb-12">
      {/* Top Header with Badges (Panel 5) */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 glass-panel-cyan p-4 rounded-xl border border-cyan-500/20 bg-black/80">
        <div>
          <h1 className="text-xl font-bold font-tech text-white uppercase tracking-wider flex items-center gap-2">
            <span>Movie Analysis</span>
            <span className="text-gray-500">•</span>
            <span className="text-cyan-400 font-mono-tech text-sm">{activeMovie.fileName}</span>
          </h1>
        </div>

        {/* Status badges from Reference Panel 5 */}
        <div className="flex flex-wrap items-center gap-2 text-xs font-mono-tech">
          <div className="px-3 py-1 rounded-full bg-emerald-950/70 border border-emerald-500/30 text-emerald-400 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span>Upload: Complete</span>
          </div>

          <div className="px-3 py-1 rounded-full bg-cyan-950/70 border border-cyan-500/30 text-cyan-400 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            <span>Gemini: Active</span>
          </div>

          <div className="px-3 py-1 rounded-full bg-red-950/70 border border-red-500/40 text-red-400 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF0033] animate-ping" />
            <span>Analysis: In Progress (72%)</span>
          </div>
        </div>
      </div>

      {/* Sub-Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-gray-800 pb-2 overflow-x-auto">
        {subTabs.map((tab) => (
          <button
            key={tab}
            id={`tab-${tab.toLowerCase()}`}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 text-xs font-tech tracking-wider uppercase rounded-lg transition cursor-pointer ${
              activeTab === tab
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-bold'
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            {tab}
          </button>
        ))}

        <div className="ml-auto">
          <button
            onClick={() => setCurrentScreen('story')}
            className="px-3 py-1.5 bg-[#FF0033] hover:bg-[#E50914] text-white font-tech text-xs tracking-wider rounded font-bold uppercase transition glow-red cursor-pointer"
          >
            Go to Story Engine
          </button>
        </div>
      </div>

      {/* Main Grid: Left Checklist + Right Scanner Screen */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Analysis Progress Checklist */}
        <div className="lg:col-span-4 space-y-4">
          <div className="glass-panel-cyan rounded-xl p-5 border border-cyan-500/20 bg-black/80 space-y-4">
            <h2 className="text-sm font-bold font-tech uppercase text-white tracking-wider flex items-center gap-2">
              <Eye size={16} className="text-cyan-400" />
              <span>Analysis Progress</span>
            </h2>

            <div className="space-y-3">
              {steps.map((step, idx) => (
                <div
                  key={step.name}
                  className="flex items-center justify-between p-2.5 rounded-lg bg-black/50 border border-gray-800/80 text-xs font-mono-tech"
                >
                  <div className="flex items-center gap-2.5">
                    {step.status === 'completed' && (
                      <CheckCircle2 size={16} className="text-emerald-400" />
                    )}
                    {step.status === 'in_progress' && (
                      <Loader2 size={16} className="text-cyan-400 animate-spin" />
                    )}
                    {step.status === 'pending' && (
                      <Circle size={16} className="text-gray-600" />
                    )}
                    <span
                      className={
                        step.status === 'in_progress'
                          ? 'text-cyan-300 font-bold'
                          : step.status === 'completed'
                          ? 'text-gray-200'
                          : 'text-gray-500'
                      }
                    >
                      {step.name}
                    </span>
                  </div>

                  <span className="text-[10px] uppercase font-bold tracking-wider">
                    {step.status === 'completed' && <span className="text-emerald-400">100%</span>}
                    {step.status === 'in_progress' && <span className="text-cyan-400">SCANNING</span>}
                    {step.status === 'pending' && <span className="text-gray-600">QUEUED</span>}
                  </span>
                </div>
              ))}
            </div>

            {/* AI Intelligence Metric */}
            <div className="pt-3 border-t border-gray-800/80 space-y-2">
              <div className="flex items-center justify-between text-xs font-mono-tech">
                <span className="text-red-400 flex items-center gap-1 font-bold">
                  <Sparkles size={13} />
                  AI Intelligence
                </span>
                <span className="text-white font-bold">72%</span>
              </div>
              <div className="w-full h-2 bg-gray-950 rounded-full overflow-hidden border border-red-500/20">
                <div className="h-full bg-gradient-to-r from-red-600 via-[#FF0033] to-cyan-400 w-[72%]" />
              </div>
            </div>
          </div>

          {/* Quick Scene Insights */}
          <div className="glass-panel-cyan rounded-xl p-4 border border-cyan-500/20 bg-black/80 space-y-2">
            <h3 className="text-xs font-bold font-tech uppercase text-gray-300">
              Extracted Entities
            </h3>
            <div className="flex flex-wrap gap-1.5 text-[11px] font-mono-tech">
              <span className="px-2 py-0.5 rounded bg-cyan-950/60 border border-cyan-500/30 text-cyan-300">
                Dom Cobb (Leonardo DiCaprio)
              </span>
              <span className="px-2 py-0.5 rounded bg-cyan-950/60 border border-cyan-500/30 text-cyan-300">
                Arthur (Joseph Gordon-Levitt)
              </span>
              <span className="px-2 py-0.5 rounded bg-cyan-950/60 border border-cyan-500/30 text-cyan-300">
                Ariadne (Elliot Page)
              </span>
              <span className="px-2 py-0.5 rounded bg-red-950/60 border border-red-500/30 text-red-300">
                Dream Level 1: Rain City
              </span>
            </div>
          </div>
        </div>

        {/* Right Column: Multimodal Video Scanner Display */}
        <div className="lg:col-span-8">
          <div className="relative rounded-xl overflow-hidden border border-cyan-500/30 bg-black aspect-video flex flex-col justify-between shadow-2xl">
            {/* Background movie image frame */}
            <img
              src={activeMovie.poster}
              alt="Analysis video preview"
              referrerPolicy="no-referrer"
              className="absolute inset-0 w-full h-full object-cover opacity-60 filter contrast-125"
            />

            {/* Neural scan HUD overlay */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(0,0,0,0.85)_100%)] pointer-events-none" />

            {/* Scanning line animation */}
            <div className="absolute inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_15px_#00e5ff] animate-[pulse_2s_ease-in-out_infinite]" />

            {/* Face/Character Detection Bounding Box Overlay */}
            <div className="absolute top-1/4 left-1/3 w-32 h-36 border border-cyan-400/80 bg-cyan-500/10 rounded-sm pointer-events-none flex flex-col justify-between p-1">
              <span className="text-[9px] font-mono-tech text-cyan-300 bg-black/80 px-1 py-0.5 rounded w-fit">
                DOM COBB (98.4%)
              </span>
              <div className="flex justify-between text-[8px] font-mono-tech text-cyan-400">
                <span>PUPIL: DILATED</span>
                <span>EMOTION: FOCUS</span>
              </div>
            </div>

            {/* Top Bar HUD inside player */}
            <div className="relative z-10 p-4 flex items-center justify-between text-xs font-mono-tech bg-gradient-to-b from-black/80 to-transparent">
              <span className="text-cyan-400 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                REC 00:01:42:18 • 4K UHD 60FPS
              </span>
              <span className="text-red-400 font-bold tracking-widest">
                DEVIL EYE NEURAL STREAM
              </span>
            </div>

            {/* Center Play button */}
            <div className="relative z-10 self-center">
              <button
                id="analysis-player-toggle"
                onClick={() => setIsPlaying(!isPlaying)}
                className="w-16 h-16 rounded-full bg-red-600/90 hover:bg-red-500 text-white flex items-center justify-center shadow-[0_0_30px_rgba(255,0,51,0.6)] transition hover:scale-105 cursor-pointer"
              >
                {isPlaying ? (
                  <Pause size={28} />
                ) : (
                  <Play size={28} fill="white" className="ml-1" />
                )}
              </button>
            </div>

            {/* Bottom HUD Banner: Analyzing scenes and characters... */}
            <div className="relative z-10 p-4 bg-gradient-to-t from-black/95 via-black/80 to-transparent space-y-2">
              <div className="flex items-center justify-between">
                <p className="text-sm font-bold font-tech text-white flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#FF0033] animate-pulse" />
                  Analyzing scenes and characters...
                </p>
                <span className="text-xs font-mono-tech text-cyan-400">72% Completed</span>
              </div>

              {/* Glowing Red scan line bar */}
              <div className="w-full h-1.5 bg-gray-900 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-[#FF0033] to-cyan-400 w-[72%] shadow-[0_0_10px_#ff0033]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
