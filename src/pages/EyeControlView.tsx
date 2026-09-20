import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { DevilEye } from '../components/common/DevilEye';
import { EyeColorPreset, EyeResponseMode } from '../types';
import { Settings, Eye, Sliders, RotateCcw, Check, Sparkles, Cpu, Palette } from 'lucide-react';

export const EyeControlView: React.FC = () => {
  const { eyeConfig, setEyeConfig } = useApp();
  const [activeSubTab, setActiveSubTab] = useState('Eye Control');

  const settingsTabs = [
    'General',
    'AI Analysis',
    'Eye Control',
    'TTS / Voice',
    'Pro Editor',
    'Shorts',
    'Thumbnail',
    'SEO',
    'Export',
  ];

  const colorPresets: Array<{ id: EyeColorPreset; label: string; bg: string; border: string }> = [
    { id: 'red', label: 'Red', bg: 'bg-[#FF0033]', border: 'border-red-500' },
    { id: 'blue', label: 'Blue', bg: 'bg-[#00E5FF]', border: 'border-cyan-400' },
    { id: 'green', label: 'Green', bg: 'bg-[#00FF66]', border: 'border-emerald-400' },
    { id: 'purple', label: 'Purple', bg: 'bg-[#B026FF]', border: 'border-purple-400' },
    { id: 'white', label: 'White', bg: 'bg-gray-100', border: 'border-white' },
  ];

  const handleReset = () => {
    setEyeConfig({
      colorMode: 'red',
      hueShift: 0,
      speed: 1.0,
      responseMode: 'reactive',
      glowIntensity: 1.0,
    });
  };

  return (
    <div id="eye-control-view" className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-gray-800 pb-3">
        <div>
          <h1 className="text-2xl font-bold font-tech text-white uppercase tracking-wider flex items-center gap-2.5">
            <Settings size={22} className="text-[#FF0033]" />
            <span>Settings - Eye Control Suite</span>
          </h1>
          <p className="text-xs text-gray-400 font-mono-tech mt-0.5">
            Global Neural Optics, Ocular Tracking Geometry & Chromatic Calibration
          </p>
        </div>

        <button
          id="reset-eye-defaults-btn"
          onClick={handleReset}
          className="px-3.5 py-1.5 bg-black/60 hover:bg-gray-900 border border-gray-800 hover:border-red-500/40 text-xs font-mono-tech text-gray-300 hover:text-white rounded-lg flex items-center gap-1.5 transition cursor-pointer"
        >
          <RotateCcw size={13} />
          <span>Reset to Default</span>
        </button>
      </div>

      {/* 2-Column Split: Sub-Menu on Left + Configuration on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Sub-Menu Navigation (Panel 12 Reference) */}
        <div className="lg:col-span-3 space-y-1">
          {settingsTabs.map((tab) => {
            const isSelected = activeSubTab === tab;
            return (
              <button
                key={tab}
                id={`settings-tab-${tab.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                onClick={() => setActiveSubTab(tab)}
                className={`w-full py-2.5 px-4 rounded-xl text-left text-xs font-tech tracking-wider uppercase transition cursor-pointer flex items-center justify-between ${
                  isSelected
                    ? 'bg-red-950/50 text-white font-bold border border-red-500/50 shadow-[0_0_15px_rgba(255,0,51,0.2)]'
                    : 'text-gray-400 hover:text-white hover:bg-white/5 border border-transparent'
                }`}
              >
                <span>{tab}</span>
                {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-[#FF0033]" />}
              </button>
            );
          })}
        </div>

        {/* Right Main Configuration Area (Panel 12 Reference) */}
        <div className="lg:col-span-9 space-y-6">
          <div className="glass-panel-cyan rounded-2xl p-6 border border-cyan-500/30 bg-black/80 space-y-6">
            <div className="flex items-center justify-between border-b border-gray-800 pb-3">
              <h2 className="text-sm font-bold font-tech uppercase text-white tracking-wider flex items-center gap-2">
                <Eye size={16} className="text-cyan-400" />
                <span>Eye Control Configuration</span>
              </h2>
              <div className="px-2.5 py-0.5 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 text-xs font-mono-tech flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>ACTIVE CALIBRATION</span>
              </div>
            </div>

            {/* Live Devil's Eye Showcase Stage */}
            <div className="relative rounded-2xl overflow-hidden border border-red-500/30 bg-black/90 p-8 flex flex-col items-center justify-center space-y-4 shadow-2xl">
              <div className="absolute top-3 left-4 text-[11px] font-mono-tech text-gray-400">
                <span>PREVIEW: </span>
                <span className="text-white font-bold uppercase">
                  {eyeConfig.colorMode} EYE - 8K ({eyeConfig.colorMode === 'red' ? 'DEFAULT' : 'CUSTOM'})
                </span>
              </div>

              {/* Central Canvas Eye with live response */}
              <div className="relative py-2">
                <div className="absolute inset-0 bg-red-600/20 blur-3xl rounded-full pointer-events-none" />
                <DevilEye size="large" width={420} height={240} className="relative z-10" />
              </div>

              <div className="flex items-center gap-4 text-xs font-mono-tech text-gray-400">
                <span className="flex items-center gap-1.5 text-cyan-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
                  Pupil Lerp: 0.08
                </span>
                <span>•</span>
                <span>Resolution: 8K Biomechanical</span>
                <span>•</span>
                <span className="text-[#FF0033]">FPS: 60 (Hardware Accel)</span>
              </div>
            </div>

            {/* Color Mode Presets (Panel 12 Reference) */}
            <div className="space-y-2.5">
              <label className="text-xs font-bold font-tech uppercase text-gray-300 block">
                Color Mode
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                {colorPresets.map((preset) => {
                  const isSelected = eyeConfig.colorMode === preset.id;
                  return (
                    <button
                      key={preset.id}
                      id={`color-preset-${preset.id}`}
                      onClick={() => setEyeConfig((prev) => ({ ...prev, colorMode: preset.id, hueShift: 0 }))}
                      className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-2 transition cursor-pointer ${
                        isSelected
                          ? 'bg-black/90 border-red-500 shadow-[0_0_15px_rgba(255,0,51,0.4)]'
                          : 'bg-black/50 border-gray-800 hover:border-gray-700'
                      }`}
                    >
                      <span
                        className={`w-6 h-6 rounded-full ${preset.bg} shadow-md flex items-center justify-center`}
                      >
                        {isSelected && <Check size={12} className="text-black stroke-[3]" />}
                      </span>
                      <span
                        className={`text-xs font-mono-tech ${
                          isSelected ? 'text-white font-bold' : 'text-gray-400'
                        }`}
                      >
                        {preset.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Hue Shifter (Live Rainbow Slider) */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-mono-tech">
                <span className="text-gray-300 font-bold uppercase font-tech">Hue Shifter (Live)</span>
                <span className="text-cyan-400 font-bold">{Math.round((eyeConfig.hueShift / 360) * 100)}% ({eyeConfig.hueShift}°)</span>
              </div>
              <input
                id="eye-hue-shifter"
                type="range"
                min="0"
                max="360"
                value={eyeConfig.hueShift}
                onChange={(e) =>
                  setEyeConfig((prev) => ({ ...prev, hueShift: parseInt(e.target.value) }))
                }
                className="w-full h-3 rounded-lg appearance-none cursor-pointer"
                style={{
                  background:
                    'linear-gradient(to right, #ff0000, #ffff00, #00ff00, #00ffff, #0000ff, #ff00ff, #ff0000)',
                }}
              />
            </div>

            {/* Animation Speed Slider */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-mono-tech">
                <span className="text-gray-300 font-bold uppercase font-tech">Animation Speed</span>
                <span className="text-cyan-400 font-bold">
                  {eyeConfig.speed === 1.0
                    ? 'Normal (1.0x)'
                    : eyeConfig.speed < 1.0
                    ? 'Slow'
                    : 'Hyper Fast'}
                </span>
              </div>
              <input
                id="eye-speed-slider"
                type="range"
                min="0.4"
                max="2.0"
                step="0.1"
                value={eyeConfig.speed}
                onChange={(e) =>
                  setEyeConfig((prev) => ({ ...prev, speed: parseFloat(e.target.value) }))
                }
                className="w-full accent-cyan-400 cursor-pointer"
              />
            </div>

            {/* Eye Response Dropdown */}
            <div className="space-y-2">
              <label className="text-xs font-bold font-tech uppercase text-gray-300 block">
                Eye Response Mode
              </label>
              <select
                id="eye-response-select"
                value={eyeConfig.responseMode}
                onChange={(e) =>
                  setEyeConfig((prev) => ({
                    ...prev,
                    responseMode: e.target.value as EyeResponseMode,
                  }))
                }
                className="w-full py-2.5 px-4 bg-black border border-gray-800 text-xs font-mono-tech text-white rounded-xl outline-none focus:border-cyan-400 cursor-pointer"
              >
                <option value="reactive">Reactive (Follow Cursor)</option>
                <option value="pulse">Pulse (Breathing Heartbeat)</option>
                <option value="scan">Hypnotic Scan (Horizontal Patrol)</option>
                <option value="idle">Idle (Staring Locked Forward)</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
