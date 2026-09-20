import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ScreenId } from '../../types';
import { DevilEye } from '../common/DevilEye';
import {
  Home,
  Film,
  Scan,
  BookOpen,
  FileText,
  SlidersHorizontal,
  Smartphone,
  Image,
  Search,
  Download,
  Settings,
  LogIn,
  Bell,
  Radio,
  Sparkles,
} from 'lucide-react';

interface AppLayoutProps {
  children: React.ReactNode;
}

export const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const { currentScreen, setCurrentScreen, activeMovie } = useApp();
  const [searchQuery, setSearchQuery] = useState('');

  // When on Screen 1 (Login View), render full screen with NO SIDEBAR and NO HEADER
  if (currentScreen === 'login') {
    return (
      <div id="login-fullscreen-root" className="min-h-screen w-full bg-[#030303]">
        {children}
      </div>
    );
  }

  const navItems = [
    { id: 'dashboard' as ScreenId, label: 'Home', icon: Home },
    { id: 'library' as ScreenId, label: 'Movie Library', icon: Film },
    { id: 'analysis' as ScreenId, label: 'AI Analysis', icon: Scan },
    { id: 'story' as ScreenId, label: 'Story Engine', icon: BookOpen },
    { id: 'script' as ScreenId, label: 'Script Studio', icon: FileText },
    { id: 'voice' as ScreenId, label: 'TTS - Voice & Audio', icon: Sparkles },
    { id: 'editor' as ScreenId, label: 'Pro Editor', icon: SlidersHorizontal },
    { id: 'ai_assistant' as ScreenId, label: 'AI Assistant', icon: Sparkles },
    { id: 'shorts_seo' as ScreenId, label: 'Shorts', icon: Smartphone },
    { id: 'upload' as ScreenId, label: 'Movie Upload', icon: Download },
    { id: 'eye_control' as ScreenId, label: 'Settings', icon: Settings },
    { id: 'login' as ScreenId, label: 'Login / Splash', icon: LogIn },
  ];

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[#030303] text-gray-200">
      {/* ===============================================================
          1. EXACT LEFT SIDEBAR (`w-64 bg-[#030303] border-r border-[#1a1a1a]`)
          =============================================================== */}
      <aside
        id="app-sidebar"
        className="w-64 shrink-0 bg-[#030303] border-r border-[#1a1a1a] flex flex-col justify-between p-4 h-screen select-none z-30"
      >
        <div className="space-y-6">
          {/* Brand Header with Red Glowing Eye Logo */}
          <div
            onClick={() => setCurrentScreen('dashboard')}
            className="flex items-center gap-3 cursor-pointer group px-1"
          >
            <div className="w-10 h-7 rounded bg-black flex items-center justify-center border border-red-500/50 shadow-[0_0_12px_rgba(255,0,51,0.5)]">
              <DevilEye size="compact" width={40} height={26} interactive={false} />
            </div>
            <div>
              <span className="font-tech font-bold text-sm tracking-wider text-white block uppercase">
                THE <span className="text-[#FF0033]">DEVIL'S EYE</span>
              </span>
              <span className="text-[9px] font-mono-tech tracking-widest text-red-500 block uppercase font-semibold">
                AI CINEMATIC ENGINE
              </span>
            </div>
          </div>

          {/* Nav Items List */}
          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentScreen === item.id;

              return (
                <button
                  key={item.id}
                  id={`sidebar-nav-${item.id}`}
                  onClick={() => setCurrentScreen(item.id)}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 text-xs font-mono-tech transition-all cursor-pointer rounded-r-md ${
                    isActive
                      ? 'border-l-2 border-[#00E5FF] text-white bg-[#0a0a0a] font-bold shadow-[inset_10px_0_15px_-10px_rgba(0,229,255,0.3)]'
                      : 'border-l-2 border-transparent text-gray-400 hover:text-white hover:bg-[#080808]'
                  }`}
                >
                  <Icon
                    size={16}
                    className={isActive ? 'text-[#00E5FF]' : 'text-gray-400'}
                  />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom Tagline */}
        <div className="pt-3 border-t border-[#1a1a1a] text-center">
          <p className="text-[10px] font-tech font-bold italic text-red-500 tracking-wider">
            "Not Just an Editor.... It's a Mind."
          </p>
        </div>
      </aside>

      {/* ===============================================================
          2. MAIN CONTENT AREA WITH TOP TECHNICAL HEADER BAR
          =============================================================== */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Top Header Bar */}
        <header
          id="app-top-header"
          className="h-14 border-b border-[#1a1a1a] bg-[#030303] px-6 flex items-center justify-between gap-4 shrink-0 z-20"
        >
          {/* Search Input Bar (from reference panel 2) */}
          <div className="relative">
            <Search
              size={14}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
            />
            <input
              id="top-header-search-input"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search movies, projects, or features..."
              className="bg-[#0a0a0a] border border-[#1a1a1a] text-xs text-slate-300 w-72 sm:w-96 rounded-md pl-9 pr-3 py-1.5 outline-none focus:border-[#00E5FF] transition font-mono-tech placeholder-gray-500"
            />
          </div>

          {/* Right Header Status Pills & Profile */}
          <div className="flex items-center gap-3">
            {/* System Status */}
            <div className="hidden md:flex items-center gap-2 px-2.5 py-1 rounded bg-[#0a0a0a] border border-[#1a1a1a] text-[11px] font-mono-tech text-gray-300">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF0033] animate-pulse" />
              <span className="text-gray-400">STATUS:</span>
              <span className="text-red-400 font-bold">NEURAL 2.0</span>
            </div>

            {/* Active Movie Badge */}
            <div
              onClick={() => setCurrentScreen('analysis')}
              className="hidden lg:flex items-center gap-2 px-2.5 py-1 rounded bg-[#0a0a0a] border border-cyan-500/30 text-[11px] font-mono-tech text-cyan-300 cursor-pointer hover:border-cyan-400 transition"
            >
              <Radio size={12} className="text-cyan-400 animate-pulse" />
              <span className="truncate max-w-[140px] text-white font-semibold">
                {activeMovie.fileName}
              </span>
              <span className="text-red-400 font-bold">68%</span>
            </div>

            {/* Notification Bell */}
            <button
              onClick={() => setCurrentScreen('analysis')}
              className="p-1.5 text-gray-400 hover:text-white bg-[#0a0a0a] border border-[#1a1a1a] rounded cursor-pointer"
            >
              <Bell size={15} />
            </button>

            {/* Profile Avatar */}
            <div
              onClick={() => setCurrentScreen('login')}
              className="flex items-center gap-2 cursor-pointer group"
            >
              <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-red-600 to-cyan-400 p-0.5 shadow-[0_0_8px_rgba(255,0,51,0.4)]">
                <div className="w-full h-full rounded-full bg-black flex items-center justify-center text-[10px] font-bold text-white font-tech">
                  DE
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* View Container: Renders strictly ONLY the active screen */}
        <main
          id="main-view-viewport"
          className="flex-1 overflow-y-auto bg-[#030303] p-6"
        >
          {children}
        </main>
      </div>
    </div>
  );
};
