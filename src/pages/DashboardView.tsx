import React from 'react';
import { useApp } from '../context/AppContext';
import { DevilEye } from '../components/common/DevilEye';
import { UploadCloud, Film } from 'lucide-react';
import { ScreenId } from '../types';

export const DashboardView: React.FC = () => {
  const { setCurrentScreen, movies, setActiveMovie } = useApp();

  const handleSelectMovie = (movie: (typeof movies)[0], targetScreen: ScreenId) => {
    setActiveMovie(movie);
    setCurrentScreen(targetScreen);
  };

  const recentProjects = [
    {
      id: 'm1',
      title: 'Inception',
      status: 'Analysing...',
      statusColor: 'text-[#FF0033]',
      progress: 68,
      poster: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=600&auto=format&fit=crop&q=80',
      action: 'analysis' as ScreenId,
    },
    {
      id: 'm2',
      title: 'The Dark Knight',
      status: 'Ready for Story Engine',
      statusColor: 'text-[#00E5FF]',
      progress: 100,
      poster: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=600&auto=format&fit=crop&q=80',
      action: 'story' as ScreenId,
    },
    {
      id: 'm3',
      title: 'Interstellar',
      status: 'Analysis Complete',
      statusColor: 'text-emerald-400',
      progress: 100,
      poster: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&auto=format&fit=crop&q=80',
      action: 'script' as ScreenId,
    },
    {
      id: 'm4',
      title: 'Avengers Endgame',
      status: 'Ready for Editing',
      statusColor: 'text-purple-400',
      progress: 100,
      poster: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600&auto=format&fit=crop&q=80',
      action: 'editor' as ScreenId,
    },
  ];

  return (
    <div id="dashboard-view-screen" className="space-y-8 max-w-7xl mx-auto select-none">
      {/* ===============================================================
          TOP HERO CONTAINER (MATCH PANEL 2 EXACTLY)
          =============================================================== */}
      <div className="relative rounded-2xl bg-[#000000] border border-[#1a1a1a] p-8 md:p-12 overflow-hidden shadow-2xl flex flex-col-reverse lg:flex-row items-center justify-between gap-8">
        {/* Subtle radial fiery red background glow behind eye */}
        <div className="absolute -right-12 -top-12 w-[480px] h-[480px] bg-red-600/15 rounded-full blur-[120px] pointer-events-none" />

        {/* Left Side: Big Text & Action Buttons */}
        <div className="max-w-xl space-y-5 z-10 text-center lg:text-left">
          {/* Subtitle */}
          <p className="text-xs sm:text-sm font-mono-tech uppercase tracking-widest text-[#FF0033] font-bold">
            AI Powered • Smart Analysis • Professional Editing
          </p>

          {/* Heading */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black font-tech text-white leading-tight uppercase tracking-wide">
            TURN ANY MOVIE <br />
            INTO AN <span className="text-white">EPIC STORY</span>
          </h1>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
            <button
              id="hero-upload-movie-btn"
              onClick={() => setCurrentScreen('upload')}
              className="bg-[#FF0033] hover:bg-red-600 text-white font-bold px-6 py-2.5 rounded-lg shadow-[0_0_15px_rgba(255,0,51,0.6)] font-tech tracking-wider uppercase transition flex items-center gap-2 cursor-pointer text-xs sm:text-sm"
            >
              <UploadCloud size={16} />
              <span>Upload Movie</span>
            </button>

            <button
              id="hero-view-library-btn"
              onClick={() => setCurrentScreen('library')}
              className="border border-[#00E5FF] hover:bg-cyan-950/30 text-[#00E5FF] px-6 py-2.5 rounded-lg font-tech tracking-wider uppercase transition flex items-center gap-2 cursor-pointer text-xs sm:text-sm"
            >
              <Film size={16} />
              <span>View Library</span>
            </button>
          </div>
        </div>

        {/* Right Side Hero: Giant Neon Red Devil's Eye Logo with intense radial red glow */}
        <div className="relative flex items-center justify-center z-10">
          <div className="absolute inset-0 bg-red-600/25 rounded-full blur-[60px] pointer-events-none" />
          <div className="rounded-2xl p-2 shadow-[0_0_50px_rgba(255,0,51,0.4)]">
            <DevilEye size="large" width={420} height={250} interactive={true} />
          </div>
        </div>
      </div>

      {/* ===============================================================
          BOTTOM SECTION: RECENT PROJECTS GRID (MATCH PANEL 2 EXACTLY)
          =============================================================== */}
      <div className="space-y-4">
        <h2 className="text-base font-bold font-tech text-white uppercase tracking-wider">
          Recent Projects
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {recentProjects.map((project) => {
            const matchedMovie = movies.find((m) => m.id === project.id) || movies[0];

            return (
              <div
                key={project.id}
                id={`project-card-${project.id}`}
                onClick={() => handleSelectMovie(matchedMovie, project.action)}
                className="bg-[#050505] border border-[#1a1a1a] hover:border-slate-700 rounded-xl overflow-hidden transition-all duration-200 cursor-pointer group flex flex-col justify-between"
              >
                {/* Poster image */}
                <div className="aspect-video w-full overflow-hidden relative bg-black">
                  <img
                    src={project.poster}
                    alt={project.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-80 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                </div>

                {/* Card details */}
                <div className="p-3.5 space-y-2.5">
                  <h3 className="font-tech font-bold text-sm text-white truncate">
                    {project.title}
                  </h3>

                  <div className="flex items-center justify-between text-[11px] font-mono-tech">
                    <span className={`font-semibold ${project.statusColor}`}>
                      {project.status}
                    </span>
                    {project.progress < 100 && (
                      <span className="text-[#FF0033] font-bold">{project.progress}%</span>
                    )}
                  </div>

                  {/* Red progress bar if analyzing */}
                  {project.progress < 100 && (
                    <div className="w-full h-1 bg-[#1a1a1a] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#FF0033] rounded-full shadow-[0_0_8px_#ff0033]"
                        style={{ width: `${project.progress}%` }}
                      />
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
