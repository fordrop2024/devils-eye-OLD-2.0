import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Sparkles, ArrowRight, Clock, Film } from 'lucide-react';

interface StoryBeatItem {
  id: number;
  title: string;
  subtitle: string;
  sourceScene: string;
  startTime: string;
  endTime: string;
  characters: string;
  importance: string;
  description: string;
  image: string;
}

export const StoryEngineView: React.FC = () => {
  const { activeMovie, setCurrentScreen } = useApp();
  const [activeTab, setActiveTab] = useState<
    'Story Structure' | 'Story Beats' | 'Character Arc' | 'Key Events' | 'Timeline'
  >('Story Structure');
  const [selectedBeatId, setSelectedBeatId] = useState<number>(1);

  const beats: StoryBeatItem[] = [
    {
      id: 1,
      title: 'Hook',
      subtitle: 'The world is not what it seems',
      sourceScene: 'Scene 01 - Hotel Lobby',
      startTime: '00:01:42',
      endTime: '00:03:15',
      characters: 'Cobb, Saito',
      importance: '9/10',
      description:
        'The film opens with Cobb in a mysterious setting, hinting that reality is not what it seems, immediately pulling the viewer into the central mystery.',
      image: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=600&auto=format&fit=crop&q=80',
    },
    {
      id: 2,
      title: 'Central Question',
      subtitle: 'Is it all a dream?',
      sourceScene: 'Scene 03 - Bullet Train',
      startTime: '00:07:30',
      endTime: '00:10:12',
      characters: 'Cobb, Arthur',
      importance: '10/10',
      description:
        'Arthur tests the waking state with a spinning totem, introducing the primary philosophical conflict of reality vs artificial constructs.',
      image: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=600&auto=format&fit=crop&q=80',
    },
    {
      id: 3,
      title: 'Character Introduction',
      subtitle: 'Cobb and his team',
      sourceScene: 'Scene 06 - Paris Cafe',
      startTime: '00:15:20',
      endTime: '00:18:45',
      characters: 'Cobb, Ariadne',
      importance: '8/10',
      description:
        'Ariadne folds the streets of Paris into a dream labyrinth, establishing the visual rules of architectural manipulation.',
      image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&auto=format&fit=crop&q=80',
    },
    {
      id: 4,
      title: 'Inciting Event',
      subtitle: 'The impossible mission',
      sourceScene: 'Scene 08 - Saito Heliport',
      startTime: '00:23:10',
      endTime: '00:26:00',
      characters: 'Saito, Cobb',
      importance: '9/10',
      description:
        'Saito proposes the inception contract against Fischer in exchange for Cobb gaining legal clearance to return home to his children.',
      image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600&auto=format&fit=crop&q=80',
    },
    {
      id: 5,
      title: 'Clues',
      subtitle: 'Dreams within dreams',
      sourceScene: 'Scene 11 - Yusuf Pharmacy',
      startTime: '00:32:00',
      endTime: '00:35:10',
      characters: 'Yusuf, Eames, Cobb',
      importance: '8/10',
      description:
        'Yusuf demonstrates the compounding time-dilation chemical compound required to plunge into three concentric dream strata.',
      image: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=600&auto=format&fit=crop&q=80',
    },
    {
      id: 6,
      title: 'Rising Tension',
      subtitle: 'The plan gets complicated',
      sourceScene: 'Scene 15 - Rainy Street Pursuit',
      startTime: '00:48:15',
      endTime: '00:52:00',
      characters: 'Fischer Subconscious, Team',
      importance: '9/10',
      description:
        'Fischers militarized subconscious defense mechanisms ambush the van, wounding Saito and revealing that death will drop them into Limbo.',
      image: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=600&auto=format&fit=crop&q=80',
    },
    {
      id: 7,
      title: 'Twist / Revelation',
      subtitle: 'The truth about the dream world',
      sourceScene: 'Scene 21 - Hotel Zero-G',
      startTime: '01:14:00',
      endTime: '01:18:20',
      characters: 'Arthur, Cobb, Mal',
      importance: '10/10',
      description:
        'Cobb confesses that he previously performed inception on his wife Mal, which ultimately led to her inability to accept waking reality.',
      image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&auto=format&fit=crop&q=80',
    },
    {
      id: 8,
      title: 'Climax',
      subtitle: 'The final confrontation',
      sourceScene: 'Scene 26 - Limbo Palace',
      startTime: '01:38:00',
      endTime: '01:44:00',
      characters: 'Cobb, Saito, Mal',
      importance: '10/10',
      description:
        'Cobb lets Mal go in Limbo, tracks down an aged Saito, and triggers the synchronized kick across all collapsing dream levels.',
      image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&auto=format&fit=crop&q=80',
    },
  ];

  const selectedBeat = beats.find((b) => b.id === selectedBeatId) || beats[0];

  const tabs = [
    'Story Structure',
    'Story Beats',
    'Character Arc',
    'Key Events',
    'Timeline',
  ] as const;

  return (
    <div id="story-engine-view" className="space-y-6 max-w-7xl mx-auto select-none pb-10">
      {/* Top Header & Sub-Tabs (Panel 6 Reference) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#1a1a1a] pb-4">
        <div>
          <h1 className="text-xl font-bold font-tech text-white uppercase tracking-wider">
            Story Engine
          </h1>
          <p className="text-xs text-gray-400 font-mono-tech mt-0.5">
            Film: <span className="text-white font-semibold">{activeMovie.title}</span> • 8-Beat Hero's Journey Decoded
          </p>
        </div>

        {/* Sub-Tabs: [Story Structure] (Cyan active pill), [Story Beats], [Character Arc], [Key Events], [Timeline] */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 bg-[#050505] rounded-lg border border-[#1a1a1a]">
          {tabs.map((tab) => (
            <button
              key={tab}
              id={`story-tab-${tab.toLowerCase().replace(/\s+/g, '-')}`}
              onClick={() => setActiveTab(tab)}
              className={`px-3.5 py-1.5 rounded-md text-xs font-mono-tech transition cursor-pointer ${
                activeTab === tab
                  ? 'bg-[#00E5FF] text-black font-bold shadow-[0_0_12px_rgba(0,229,255,0.4)]'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid: Left Column (Story Structure) + Right Column (Selected Beat Details) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* ===============================================================
            LEFT COLUMN: NUMBERED VERTICAL PILLS (1 TO 8 IN RED CIRCLES)
            =============================================================== */}
        <div className="lg:col-span-5 space-y-3">
          <div className="flex items-center justify-between px-1">
            <h2 className="text-xs font-bold font-tech uppercase text-gray-300 tracking-wider">
              Story Structure
            </h2>
            <span className="text-[11px] font-mono-tech text-[#00E5FF]">8 Key Beats</span>
          </div>

          <div className="space-y-2">
            {beats.map((beat) => {
              const isSelected = beat.id === selectedBeatId;

              return (
                <div
                  key={beat.id}
                  id={`story-beat-item-${beat.id}`}
                  onClick={() => setSelectedBeatId(beat.id)}
                  className={`flex items-center gap-3 p-3 rounded-xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#0c0c0c] border-red-500/60 shadow-[0_0_15px_rgba(255,0,51,0.2)]'
                      : 'bg-[#050505] border-[#1a1a1a] hover:border-slate-800'
                  }`}
                >
                  {/* Numbered bright red circle */}
                  <div className="w-7 h-7 rounded-full bg-[#FF0033] text-white flex items-center justify-center font-bold text-xs font-mono-tech shrink-0 shadow-[0_0_8px_rgba(255,0,51,0.6)]">
                    {beat.id}
                  </div>

                  {/* Beat titles */}
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold font-tech text-white uppercase truncate">
                      {beat.title}
                    </p>
                    <p className="text-[11px] text-gray-400 font-mono-tech truncate">
                      {beat.subtitle}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ===============================================================
            RIGHT COLUMN: SELECTED BEAT DETAILS (MATCH PANEL 6 EXACTLY)
            =============================================================== */}
        <div className="lg:col-span-7">
          <div className="rounded-xl border border-[#1a1a1a] bg-[#050505] p-6 space-y-5 shadow-2xl">
            <h2 className="text-xs font-bold font-tech uppercase text-gray-400 tracking-wider border-b border-[#1a1a1a] pb-3">
              Selected Beat Details
            </h2>

            {/* Top row: Image card on left + Title & Subtitle on right */}
            <div className="flex flex-col sm:flex-row gap-4 items-start">
              <div className="w-full sm:w-44 aspect-video rounded-lg overflow-hidden border border-[#1a1a1a] shrink-0 bg-black">
                <img
                  src={selectedBeat.image}
                  alt={selectedBeat.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="space-y-1">
                <h3 className="text-lg font-bold font-tech text-white uppercase">
                  {selectedBeat.title}
                </h3>
                <p className="text-xs font-mono-tech text-[#00E5FF]">
                  {selectedBeat.subtitle}
                </p>
              </div>
            </div>

            {/* Metadata Fields Table (Panel 6) */}
            <div className="grid grid-cols-2 gap-y-2.5 gap-x-4 text-xs font-mono-tech pt-2 border-t border-[#1a1a1a]">
              <div>
                <span className="text-gray-500 block text-[10px] uppercase">Source Scene:</span>
                <span className="text-white font-medium">{selectedBeat.sourceScene}</span>
              </div>
              <div>
                <span className="text-gray-500 block text-[10px] uppercase">Start Time:</span>
                <span className="text-[#00E5FF] font-semibold">{selectedBeat.startTime}</span>
              </div>
              <div>
                <span className="text-gray-500 block text-[10px] uppercase">End Time:</span>
                <span className="text-[#00E5FF] font-semibold">{selectedBeat.endTime}</span>
              </div>
              <div>
                <span className="text-gray-500 block text-[10px] uppercase">Characters:</span>
                <span className="text-white font-medium">{selectedBeat.characters}</span>
              </div>
              <div className="col-span-2">
                <span className="text-gray-500 block text-[10px] uppercase">Importance:</span>
                <span className="text-[#FF0033] font-bold">{selectedBeat.importance}</span>
              </div>
            </div>

            {/* Description Box */}
            <div className="space-y-1.5 pt-2 border-t border-[#1a1a1a]">
              <span className="text-[10px] uppercase font-mono-tech text-gray-500 block">
                Description
              </span>
              <div className="p-3.5 rounded-lg bg-[#000000] border border-[#1a1a1a] text-xs font-mono-tech text-gray-300 leading-relaxed">
                {selectedBeat.description}
              </div>
            </div>

            {/* Red Action Button: [ View in Timeline ] */}
            <div className="pt-2">
              <button
                id="story-view-in-timeline-btn"
                onClick={() => setCurrentScreen('editor')}
                className="w-full py-3 rounded-lg bg-[#FF0033] hover:bg-red-600 text-white font-bold font-tech text-xs tracking-wider uppercase transition shadow-[0_0_15px_rgba(255,0,51,0.5)] flex items-center justify-center gap-2 cursor-pointer"
              >
                <Film size={14} />
                <span>View in Timeline</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
