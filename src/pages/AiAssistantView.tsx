import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Sparkles, Send, CheckCircle2, ArrowRight, Bot, User, Check, RefreshCw } from 'lucide-react';

interface SuggestionItem {
  id: string;
  text: string;
  checked: boolean;
}

export const AiAssistantView: React.FC = () => {
  const { setCurrentScreen } = useApp();
  const [inputText, setInputText] = useState('');
  const [applied, setApplied] = useState(false);

  const [suggestions, setSuggestions] = useState<SuggestionItem[]>([
    { id: '1', text: 'Trim 30% of this scene (keep key moments)', checked: true },
    { id: '2', text: 'Add suspense with faster cuts', checked: true },
    { id: '3', text: 'Enhance audio with low background music', checked: true },
    { id: '4', text: 'Use a zoom effect on the character', checked: true },
  ]);

  const [messages, setMessages] = useState<Array<{ role: 'user' | 'assistant'; text: string }>>([
    {
      role: 'user',
      text: 'Make this scene more intense and shorter (30% cut) and add suspense.',
    },
  ]);

  const handleToggleSuggestion = (id: string) => {
    setSuggestions((prev) =>
      prev.map((s) => (s.id === id ? { ...s, checked: !s.checked } : s))
    );
  };

  const handleApplyChanges = () => {
    setApplied(true);
    setTimeout(() => {
      setCurrentScreen('editor');
    }, 1000);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const newMsg = inputText.trim();
    setMessages((prev) => [...prev, { role: 'user', text: newMsg }]);
    setInputText('');

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          text: `Analyzed "${newMsg}". I have calibrated the timeline keyframes, adjusted L-cuts on dialogue audio, and prepared the render cache.`,
        },
      ]);
    }, 600);
  };

  return (
    <div id="ai-assistant-view" className="max-w-3xl mx-auto space-y-6 pb-12">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-gray-800 pb-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-cyan-950/60 border border-cyan-500/40 flex items-center justify-center text-cyan-400 shadow-[0_0_15px_rgba(0,229,255,0.3)]">
            <Bot size={22} />
          </div>
          <div>
            <h1 className="text-xl font-bold font-tech text-white uppercase tracking-wider">
              AI Editor Assistant
            </h1>
            <p className="text-xs text-gray-400 font-mono-tech">
              Conversational NLE Directing & Multi-Track Auto-Assembly
            </p>
          </div>
        </div>

        <div className="px-3 py-1 bg-red-950/60 border border-red-500/30 text-red-400 text-xs font-mono-tech rounded-full flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-[#FF0033] animate-pulse" />
          <span>CO-PILOT READY</span>
        </div>
      </div>

      {/* Conversation Thread */}
      <div className="space-y-4">
        {/* User prompt message bubble (Panel 10 reference) */}
        <div className="flex justify-end">
          <div className="max-w-md p-4 rounded-2xl rounded-tr-none bg-blue-950/40 border border-cyan-500/30 text-cyan-100 text-sm font-mono-tech space-y-1 shadow-lg">
            <div className="flex items-center justify-between text-[10px] text-cyan-400 uppercase font-tech">
              <span>You</span>
              <span>Scene 01 • Cut Request</span>
            </div>
            <p>Make this scene more intense and shorter (30% cut) and add suspense.</p>
          </div>
        </div>

        {/* AI Suggestion Card (Panel 10 Reference) */}
        <div className="glass-panel-cyan rounded-2xl p-6 border border-cyan-500/30 bg-black/90 space-y-5">
          <div className="flex items-center gap-2 text-cyan-400">
            <Sparkles size={18} />
            <h2 className="text-sm font-bold font-tech uppercase tracking-wider text-white">
              AI Suggestion
            </h2>
          </div>

          {/* 4 Checkpoint Items */}
          <div className="space-y-3">
            {suggestions.map((s) => (
              <div
                key={s.id}
                onClick={() => handleToggleSuggestion(s.id)}
                className="flex items-center gap-3 p-2.5 rounded-lg bg-black/60 border border-gray-800 hover:border-cyan-500/40 transition cursor-pointer"
              >
                <div
                  className={`w-5 h-5 rounded flex items-center justify-center text-xs transition ${
                    s.checked ? 'bg-cyan-500 text-black font-bold' : 'bg-gray-800 text-gray-500'
                  }`}
                >
                  {s.checked && <Check size={14} />}
                </div>
                <span className="text-xs font-mono-tech text-gray-200">{s.text}</span>
              </div>
            ))}
          </div>

          {/* Action Buttons: [Apply Changes] (Red) & [View Changes] (Cyan) */}
          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              id="apply-changes-btn"
              onClick={handleApplyChanges}
              className="px-6 py-2.5 rounded-lg bg-[#FF0033] hover:bg-[#E50914] text-white font-tech font-bold text-xs tracking-wider uppercase transition glow-red flex items-center gap-2 cursor-pointer shadow-lg"
            >
              {applied ? <CheckCircle2 size={15} /> : <Sparkles size={15} />}
              <span>{applied ? 'Applied to Timeline!' : 'Apply Changes'}</span>
            </button>

            <button
              id="view-changes-btn"
              onClick={() => setCurrentScreen('editor')}
              className="px-5 py-2.5 rounded-lg bg-black/60 hover:bg-cyan-950/40 text-cyan-300 border border-cyan-500/40 text-xs font-tech tracking-wider uppercase transition cursor-pointer"
            >
              View Changes in Editor
            </button>
          </div>
        </div>

        {/* Dynamic Additional messages */}
        {messages.slice(1).map((m, idx) => (
          <div
            key={idx}
            className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-md p-4 rounded-2xl text-xs font-mono-tech ${
                m.role === 'user'
                  ? 'bg-blue-950/40 border border-cyan-500/30 text-cyan-100 rounded-tr-none'
                  : 'bg-black/80 border border-gray-800 text-gray-300 rounded-tl-none'
              }`}
            >
              {m.text}
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Chat Prompt Input Bar (Panel 10) */}
      <div className="space-y-3 pt-2">
        {/* Quick prompt suggestions */}
        <div className="flex flex-wrap gap-2">
          {[
            'Increase scene tempo',
            'Remove silence in dialogue',
            'Add dramatic beat drop before climax',
            'Apply Teal & Orange color LUT',
          ].map((prompt) => (
            <button
              key={prompt}
              onClick={() => setInputText(prompt)}
              className="px-2.5 py-1 rounded-full bg-black/60 border border-gray-800 hover:border-cyan-500/40 text-gray-400 hover:text-cyan-300 text-[11px] font-mono-tech transition cursor-pointer"
            >
              + {prompt}
            </button>
          ))}
        </div>

        {/* Input field */}
        <form onSubmit={handleSendMessage} className="relative flex items-center">
          <input
            id="ai-assistant-input"
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Ask anything... (e.g. Cut dead air, add suspense to scene 2)"
            className="w-full py-3 pl-4 pr-12 bg-black/80 border border-cyan-500/30 focus:border-cyan-400 rounded-xl text-sm font-mono-tech text-white placeholder-gray-500 outline-none shadow-inner"
          />
          <button
            id="ai-assistant-send-btn"
            type="submit"
            className="absolute right-2 p-2 bg-[#FF0033] hover:bg-[#E50914] text-white rounded-lg transition glow-red cursor-pointer"
          >
            <Send size={15} />
          </button>
        </form>
      </div>
    </div>
  );
};
