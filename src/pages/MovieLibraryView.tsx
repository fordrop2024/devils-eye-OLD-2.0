import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Plus, Search, Filter, Play, CheckCircle2, AlertCircle, Sparkles } from 'lucide-react';
import { MovieProject } from '../types';

export const MovieLibraryView: React.FC = () => {
  const { movies, setActiveMovie, setCurrentScreen } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [genreFilter, setGenreFilter] = useState('All');

  const filteredMovies = movies.filter((m) => {
    const matchesSearch = m.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'All' || m.analysisStatus === statusFilter;
    const matchesGenre = genreFilter === 'All' || m.genre.includes(genreFilter);
    return matchesSearch && matchesStatus && matchesGenre;
  });

  const handleAction = (movie: MovieProject) => {
    setActiveMovie(movie);
    if (movie.analysisStatus === 'In Progress' || movie.analysisStatus === 'Not Started') {
      setCurrentScreen('analysis');
    } else {
      setCurrentScreen('story');
    }
  };

  return (
    <div id="movie-library-view" className="space-y-6 pb-12">
      {/* Top Header & Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-800 pb-4">
        <div>
          <h1 className="text-2xl font-bold font-tech text-white uppercase tracking-wider">
            Movie Library
          </h1>
          <p className="text-xs text-gray-400 font-mono-tech mt-1">
            Ingested 4K Cine-Masters & Gemini Neural Embeddings
          </p>
        </div>

        <button
          id="library-upload-btn"
          onClick={() => setCurrentScreen('upload')}
          className="px-4 py-2.5 rounded-lg bg-[#FF0033] hover:bg-[#E50914] text-white font-tech font-bold text-xs tracking-wider uppercase transition glow-red flex items-center gap-2 cursor-pointer self-start sm:self-auto"
        >
          <Plus size={16} />
          <span>Upload Movie</span>
        </button>
      </div>

      {/* Filter Toolbar (Panel 4) */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-black/60 rounded-xl border border-gray-800">
        <div className="flex flex-wrap items-center gap-3">
          {/* Status filter */}
          <select
            id="status-filter-select"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-1.5 bg-black border border-gray-800 text-xs font-mono-tech text-gray-300 rounded-lg outline-none focus:border-cyan-500"
          >
            <option value="All">All Status</option>
            <option value="Complete">Analysis Complete</option>
            <option value="In Progress">In Progress</option>
            <option value="Not Started">Not Started</option>
          </select>

          {/* Genre filter */}
          <select
            id="genre-filter-select"
            value={genreFilter}
            onChange={(e) => setGenreFilter(e.target.value)}
            className="px-3 py-1.5 bg-black border border-gray-800 text-xs font-mono-tech text-gray-300 rounded-lg outline-none focus:border-cyan-500"
          >
            <option value="All">All Genres</option>
            <option value="Sci-Fi">Sci-Fi</option>
            <option value="Action">Action</option>
            <option value="Drama">Drama</option>
            <option value="Crime">Crime</option>
          </select>
        </div>

        {/* Search Input */}
        <div className="relative min-w-[240px]">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
          <input
            id="search-movies-input"
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search movies..."
            className="w-full pl-9 pr-3 py-1.5 bg-black border border-gray-800 rounded-lg text-xs font-mono-tech text-white placeholder-gray-500 focus:border-cyan-500 outline-none"
          />
        </div>
      </div>

      {/* Movie Table / Grid matching Panel 4 */}
      <div className="glass-panel-cyan rounded-xl overflow-hidden border border-cyan-500/20 bg-black/80">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-800/80 bg-cyan-950/20 text-[11px] font-mono-tech uppercase text-gray-400">
                <th className="py-3.5 px-4 font-semibold">Movie</th>
                <th className="py-3.5 px-4 font-semibold">Size</th>
                <th className="py-3.5 px-4 font-semibold">Upload</th>
                <th className="py-3.5 px-4 font-semibold">Gemini</th>
                <th className="py-3.5 px-4 font-semibold">Analysis</th>
                <th className="py-3.5 px-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800/60 text-xs font-mono-tech">
              {filteredMovies.map((movie) => (
                <tr
                  key={movie.id}
                  id={`movie-row-${movie.id}`}
                  className="hover:bg-white/[0.02] transition-colors group"
                >
                  {/* Movie Title & Poster */}
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-14 h-9 rounded overflow-hidden bg-black flex-shrink-0 border border-gray-800">
                        <img
                          src={movie.poster}
                          alt={movie.title}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        />
                      </div>
                      <div>
                        <span className="font-bold text-sm font-tech text-white group-hover:text-cyan-400 transition-colors block">
                          {movie.fileName}
                        </span>
                        <span className="text-[10px] text-gray-500 font-mono-tech">
                          {movie.title} • {movie.duration}
                        </span>
                      </div>
                    </div>
                  </td>

                  {/* Size */}
                  <td className="py-3 px-4 text-gray-300 font-semibold">{movie.fileSize}</td>

                  {/* Upload status */}
                  <td className="py-3 px-4">
                    <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 text-[11px]">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      Complete
                    </span>
                  </td>

                  {/* Gemini Status */}
                  <td className="py-3 px-4">
                    <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-400 text-[11px]">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                      Active
                    </span>
                  </td>

                  {/* Analysis status */}
                  <td className="py-3 px-4">
                    {movie.analysisStatus === 'In Progress' && (
                      <div className="flex items-center gap-2">
                        <span className="text-[#FF0033] text-[11px] flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#FF0033] animate-ping" />
                          In Progress
                        </span>
                        <span className="text-[10px] text-gray-400">({movie.analysisProgress}%)</span>
                      </div>
                    )}
                    {movie.analysisStatus === 'Complete' && (
                      <span className="text-emerald-400 text-[11px] flex items-center gap-1">
                        <CheckCircle2 size={12} />
                        Complete
                      </span>
                    )}
                    {movie.analysisStatus === 'Not Started' && (
                      <span className="text-gray-500 text-[11px] flex items-center gap-1">
                        <AlertCircle size={12} />
                        Not Started
                      </span>
                    )}
                  </td>

                  {/* Actions */}
                  <td className="py-3 px-4 text-right">
                    <button
                      id={`start-action-btn-${movie.id}`}
                      onClick={() => handleAction(movie)}
                      className="px-3.5 py-1.5 rounded bg-[#FF0033] hover:bg-[#E50914] text-white font-bold font-tech text-xs tracking-wider uppercase transition glow-red inline-flex items-center gap-1 cursor-pointer"
                    >
                      <Play size={10} fill="white" />
                      <span>Start</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
