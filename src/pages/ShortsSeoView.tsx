import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Smartphone, Image, Search, Play, Download, Sparkles, Check, Share2 } from 'lucide-react';

export const ShortsSeoView: React.FC = () => {
  const { activeMovie } = useApp();
  const [activeTab, setActiveTab] = useState<'Shorts' | 'Thumbnail' | 'SEO Center'>('Shorts');
  const [generationMode, setGenerationMode] = useState<'Auto Generate' | 'Manual'>('Auto Generate');
  const [selectedPlatforms, setSelectedPlatforms] = useState<Record<string, boolean>>({
    'YouTube Shorts': true,
    'Instagram Reels': true,
    TikTok: true,
    Facebook: false,
  });
  const [aspectRatio, setAspectRatio] = useState<'9:16' | '1:1'>('9:16');
  const [isGenerating, setIsGenerating] = useState(false);

  const shortsList = [
    {
      id: 's1',
      title: 'Short 1: The Spinning Totem Mystery',
      duration: '0:59',
      image: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=600&auto=format&fit=crop&q=80',
    },
    {
      id: 's2',
      title: 'Short 2: Rain City Subconscious Breach',
      duration: '0:48',
      image: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=600&auto=format&fit=crop&q=80',
    },
    {
      id: 's3',
      title: 'Short 3: Zero-G Hotel Corridor Fight',
      duration: '1:12',
      image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&auto=format&fit=crop&q=80',
    },
  ];

  const togglePlatform = (name: string) => {
    setSelectedPlatforms((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  const handleGenerateShorts = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      alert('3 Vertical 9:16 Reels generated with burnt-in animated captions & dynamic zooms!');
    }, 1500);
  };

  return (
    <div id="shorts-seo-view" className="space-y-6 pb-12">
      {/* Top 3-Tab Header (Panel 11 Reference) */}
      <div className="flex items-center justify-between border-b border-gray-800 pb-3">
        <div>
          <h1 className="text-2xl font-bold font-tech text-white uppercase tracking-wider">
            Shorts / SEO Studio
          </h1>
          <p className="text-xs text-gray-400 font-mono-tech mt-0.5">
            Algorithmic 9:16 Vertical Cropping, Thumbnail Synthesis & Viral Metadata
          </p>
        </div>

        {/* 3 Unified Tabs: Shorts | Thumbnail | SEO Center */}
        <div className="flex items-center gap-2 p-1 bg-black/60 rounded-xl border border-gray-800">
          {(['Shorts', 'Thumbnail', 'SEO Center'] as const).map((tab) => (
            <button
              key={tab}
              id={`tab-${tab.toLowerCase().replace(/\s+/g, '-')}`}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-1.5 text-xs font-tech tracking-wider uppercase rounded-lg transition cursor-pointer flex items-center gap-1.5 ${
                activeTab === tab
                  ? 'bg-[#FF0033] text-white shadow-[0_0_15px_#ff0033] font-bold'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {tab === 'Shorts' && <Smartphone size={13} />}
              {tab === 'Thumbnail' && <Image size={13} />}
              {tab === 'SEO Center' && <Search size={13} />}
              <span>{tab}</span>
            </button>
          ))}
        </div>
      </div>

      {/* TAB 1: SHORTS */}
      {activeTab === 'Shorts' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Shorts Cards */}
          <div className="lg:col-span-7 space-y-4">
            {/* Mode Switcher */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 bg-black/60 p-1 rounded-lg border border-gray-800">
                {(['Auto Generate', 'Manual'] as const).map((mode) => (
                  <button
                    key={mode}
                    onClick={() => setGenerationMode(mode)}
                    className={`px-3 py-1 text-xs font-mono-tech rounded transition ${
                      generationMode === mode
                        ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-bold'
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    {mode}
                  </button>
                ))}
              </div>
              <span className="text-xs font-mono-tech text-gray-400">3 Reels Ready</span>
            </div>

            {/* Vertical Reels 9:16 Row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {shortsList.map((short) => (
                <div
                  key={short.id}
                  className="group relative rounded-xl overflow-hidden glass-panel-cyan border border-cyan-500/20 bg-black aspect-[9/16] flex flex-col justify-between p-3"
                >
                  <img
                    src={short.image}
                    alt={short.title}
                    referrerPolicy="no-referrer"
                    className="absolute inset-0 w-full h-full object-cover opacity-75 group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />

                  {/* Top badge */}
                  <div className="relative z-10 flex justify-between items-center">
                    <span className="px-2 py-0.5 rounded bg-black/80 text-[10px] font-mono-tech text-cyan-300 border border-cyan-500/30">
                      9:16
                    </span>
                    <span className="px-2 py-0.5 rounded bg-red-950/80 text-[10px] font-mono-tech text-red-300 border border-red-500/30">
                      {short.duration}
                    </span>
                  </div>

                  {/* Center Play Button */}
                  <button className="relative z-10 self-center w-10 h-10 rounded-full bg-[#FF0033]/90 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition shadow-lg cursor-pointer">
                    <Play size={16} fill="white" className="ml-0.5" />
                  </button>

                  {/* Bottom title */}
                  <div className="relative z-10 space-y-1">
                    <p className="text-xs font-bold font-tech text-white leading-tight">
                      {short.title}
                    </p>
                    <p className="text-[10px] text-cyan-400 font-mono-tech">Auto Kinetic Subs</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Export Settings (Panel 11 Reference) */}
          <div className="lg:col-span-5">
            <div className="glass-panel-cyan rounded-xl p-6 border border-cyan-500/30 bg-black/80 space-y-6">
              <h2 className="text-sm font-bold font-tech uppercase text-white tracking-wider border-b border-gray-800 pb-3">
                Export Settings
              </h2>

              {/* Platform Checkboxes */}
              <div className="space-y-2.5">
                <span className="text-xs font-bold font-tech uppercase text-gray-400 block">
                  Platform
                </span>
                {Object.keys(selectedPlatforms).map((p) => (
                  <label
                    key={p}
                    className="flex items-center justify-between p-2.5 rounded-lg bg-black/60 border border-gray-800 hover:border-cyan-500/40 cursor-pointer text-xs font-mono-tech"
                  >
                    <span className="text-gray-200">{p}</span>
                    <input
                      type="checkbox"
                      checked={selectedPlatforms[p]}
                      onChange={() => togglePlatform(p)}
                      className="rounded bg-black border-gray-700 text-[#FF0033] focus:ring-red-500"
                    />
                  </label>
                ))}
              </div>

              {/* Aspect Ratio Radios */}
              <div className="space-y-2.5">
                <span className="text-xs font-bold font-tech uppercase text-gray-400 block">
                  Aspect Ratio
                </span>
                <div className="grid grid-cols-2 gap-3">
                  <label
                    className={`flex items-center gap-2 p-3 rounded-lg border text-xs font-mono-tech cursor-pointer ${
                      aspectRatio === '9:16'
                        ? 'bg-red-950/40 border-red-500 text-white'
                        : 'bg-black/60 border-gray-800 text-gray-400'
                    }`}
                  >
                    <input
                      type="radio"
                      name="aspect"
                      checked={aspectRatio === '9:16'}
                      onChange={() => setAspectRatio('9:16')}
                      className="accent-[#FF0033]"
                    />
                    <span>9:16 (Vertical)</span>
                  </label>

                  <label
                    className={`flex items-center gap-2 p-3 rounded-lg border text-xs font-mono-tech cursor-pointer ${
                      aspectRatio === '1:1'
                        ? 'bg-red-950/40 border-red-500 text-white'
                        : 'bg-black/60 border-gray-800 text-gray-400'
                    }`}
                  >
                    <input
                      type="radio"
                      name="aspect"
                      checked={aspectRatio === '1:1'}
                      onChange={() => setAspectRatio('1:1')}
                      className="accent-[#FF0033]"
                    />
                    <span>1:1 (Square)</span>
                  </label>
                </div>
              </div>

              {/* Action Button: [Generate Shorts] (Panel 11) */}
              <button
                id="generate-shorts-btn"
                onClick={handleGenerateShorts}
                disabled={isGenerating}
                className="w-full py-3.5 rounded-lg bg-[#FF0033] hover:bg-[#E50914] text-white font-bold font-tech text-sm tracking-wider uppercase transition glow-red flex items-center justify-center gap-2 cursor-pointer shadow-lg"
              >
                {isGenerating ? (
                  <Sparkles size={16} className="animate-spin" />
                ) : (
                  <Smartphone size={16} />
                )}
                <span>{isGenerating ? 'Rendering 9:16 Vertical Video...' : 'Generate Shorts'}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: THUMBNAIL */}
      {activeTab === 'Thumbnail' && (
        <div className="glass-panel-cyan rounded-xl p-6 border border-cyan-500/30 bg-black/80 space-y-5">
          <div className="flex items-center justify-between border-b border-gray-800 pb-3">
            <h2 className="text-sm font-bold font-tech uppercase text-white tracking-wider">
              AI YouTube Thumbnail Generator
            </h2>
            <span className="text-xs font-mono-tech text-cyan-400">1280x720 4K Render</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-8 rounded-xl overflow-hidden border border-cyan-500/30 bg-black aspect-video relative flex items-center justify-center shadow-2xl">
              <img
                src={activeMovie.poster}
                alt="Thumbnail"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover filter contrast-125"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-black/40" />

              {/* High-CTR Bold Overlay typography */}
              <div className="absolute left-6 bottom-8 space-y-2">
                <span className="bg-[#FF0033] text-white font-black text-2xl sm:text-4xl px-3 py-1 uppercase font-tech tracking-wider shadow-2xl inline-block">
                  THE SHOCKING TRUTH
                </span>
                <span className="bg-black/90 text-cyan-400 font-bold text-lg sm:text-2xl px-3 py-1 uppercase font-tech tracking-wider block border border-cyan-500/40">
                  INCEPTION ENDING DECODED
                </span>
              </div>
            </div>

            <div className="lg:col-span-4 space-y-4 text-xs font-mono-tech">
              <div className="p-4 bg-black/60 rounded-xl border border-gray-800 space-y-3">
                <h3 className="font-bold text-white font-tech uppercase">Overlay Presets</h3>
                <div className="space-y-2">
                  <button className="w-full p-2 bg-red-950/40 border border-red-500 text-red-200 rounded text-left">
                    High CTR: Red Box + Warning Tape
                  </button>
                  <button className="w-full p-2 bg-black border border-gray-800 text-gray-300 rounded text-left hover:border-gray-700">
                    Cinematic: Dark Minimal Glow
                  </button>
                  <button className="w-full p-2 bg-black border border-gray-800 text-gray-300 rounded text-left hover:border-gray-700">
                    Split Screen: Cobb vs Mal
                  </button>
                </div>
              </div>

              <button
                onClick={() => alert('High-resolution 4K Thumbnail saved.')}
                className="w-full py-3 bg-[#FF0033] hover:bg-[#E50914] text-white font-bold font-tech text-xs uppercase tracking-wider rounded-lg transition glow-red flex items-center justify-center gap-2 cursor-pointer"
              >
                <Download size={14} />
                <span>Export 4K Thumbnail (PNG)</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: SEO CENTER */}
      {activeTab === 'SEO Center' && (
        <div className="glass-panel-cyan rounded-xl p-6 border border-cyan-500/30 bg-black/80 space-y-5">
          <div className="flex items-center justify-between border-b border-gray-800 pb-3">
            <h2 className="text-sm font-bold font-tech uppercase text-white tracking-wider">
              Viral SEO Optimization Engine
            </h2>
            <div className="flex items-center gap-1 text-emerald-400 text-xs font-mono-tech">
              <Sparkles size={14} />
              <span>VIRAL SCORE: 96 / 100</span>
            </div>
          </div>

          <div className="space-y-4 text-xs font-mono-tech">
            {/* Title options */}
            <div className="space-y-1.5">
              <label className="text-gray-400 uppercase font-tech font-bold">
                Optimized YouTube Titles (A/B Testing)
              </label>
              <div className="space-y-2">
                <div className="p-3 bg-black/60 rounded-lg border border-red-500/50 flex items-center justify-between">
                  <span className="text-white font-bold">
                    Why INCEPTION's Ending Was Never a Dream (Mind-Blowing Hidden Clue!)
                  </span>
                  <span className="text-[#FF0033] font-bold">98% Viral Potential</span>
                </div>
                <div className="p-3 bg-black/60 rounded-lg border border-gray-800 flex items-center justify-between">
                  <span className="text-gray-300">
                    Christopher Nolan Lied About The Totem in Inception
                  </span>
                  <span className="text-gray-500">92%</span>
                </div>
              </div>
            </div>

            {/* Description with Chapters */}
            <div className="space-y-1.5">
              <label className="text-gray-400 uppercase font-tech font-bold">
                Auto-Generated Description & Chapters
              </label>
              <div className="p-3 bg-black/60 rounded-lg border border-gray-800 text-gray-300 leading-relaxed max-h-36 overflow-y-auto">
                In this video, we break down Christopher Nolan's Inception beat by beat, exploring
                dream architecture, the totem mystery, and the real secret behind Dom Cobb's ring.
                <br />
                <br />
                TIMESTAMPS:
                <br />
                00:00 - The Impossible Dream
                <br />
                01:42 - Extraction vs Inception
                <br />
                04:10 - The Architect and the Labyrinth
                <br />
                08:30 - Fischer's Subconscious Army
                <br />
                12:45 - The Limbo Paradox
              </div>
            </div>

            {/* Tags */}
            <div className="space-y-1.5">
              <label className="text-gray-400 uppercase font-tech font-bold">Ranked Tags</label>
              <div className="flex flex-wrap gap-2">
                {[
                  '#Inception',
                  '#ChristopherNolan',
                  '#MovieExplanation',
                  '#EndingExplained',
                  '#LeonardoDiCaprio',
                  '#MindBending',
                  '#SciFiCinema',
                ].map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
