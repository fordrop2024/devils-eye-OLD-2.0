import React, { createContext, useContext, useState, ReactNode } from 'react';
import { ScreenId, EyeConfig, MovieProject } from '../types';

interface AppContextType {
  currentScreen: ScreenId;
  setCurrentScreen: (screen: ScreenId) => void;
  eyeConfig: EyeConfig;
  setEyeConfig: React.Dispatch<React.SetStateAction<EyeConfig>>;
  activeMovie: MovieProject;
  setActiveMovie: (movie: MovieProject) => void;
  movies: MovieProject[];
  setMovies: React.Dispatch<React.SetStateAction<MovieProject[]>>;
  isLoggedIn: boolean;
  setIsLoggedIn: (val: boolean) => void;
}

const initialEyeConfig: EyeConfig = {
  colorMode: 'red',
  hueShift: 0,
  speed: 1.0,
  responseMode: 'reactive',
  glowIntensity: 1.0,
};

const defaultMovies: MovieProject[] = [
  {
    id: 'm-1',
    title: 'Inception',
    fileName: 'Inception.mp4',
    fileSize: '1.84 GB',
    duration: '02:28:00',
    uploadStatus: 'Complete',
    geminiStatus: 'Active',
    analysisStatus: 'In Progress',
    analysisProgress: 72,
    stageNote: 'Analyzing scenes and characters... 72%',
    poster: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=800&auto=format&fit=crop&q=80',
    genre: 'Sci-Fi / Thriller',
    year: 2010,
  },
  {
    id: 'm-2',
    title: 'The Dark Knight',
    fileName: 'The Dark Knight.mp4',
    fileSize: '1.52 GB',
    duration: '02:32:00',
    uploadStatus: 'Complete',
    geminiStatus: 'Active',
    analysisStatus: 'Complete',
    analysisProgress: 100,
    stageNote: 'Ready for Story Engine',
    poster: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=800&auto=format&fit=crop&q=80',
    genre: 'Action / Crime',
    year: 2008,
  },
  {
    id: 'm-3',
    title: 'Interstellar',
    fileName: 'Interstellar.mp4',
    fileSize: '1.76 GB',
    duration: '02:49:00',
    uploadStatus: 'Complete',
    geminiStatus: 'Active',
    analysisStatus: 'Complete',
    analysisProgress: 100,
    stageNote: 'Analysis Complete',
    poster: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&auto=format&fit=crop&q=80',
    genre: 'Sci-Fi / Adventure',
    year: 2014,
  },
  {
    id: 'm-4',
    title: 'Avengers Endgame',
    fileName: 'Avengers Endgame.mp4',
    fileSize: '1.92 GB',
    duration: '03:01:00',
    uploadStatus: 'Complete',
    geminiStatus: 'Active',
    analysisStatus: 'Complete',
    analysisProgress: 100,
    stageNote: 'Ready for Editing',
    poster: 'https://images.unsplash.com/photo-1563089145-599997674d42?w=800&auto=format&fit=crop&q=80',
    genre: 'Sci-Fi / Action',
    year: 2019,
  },
  {
    id: 'm-5',
    title: 'Joker',
    fileName: 'Joker.mp4',
    fileSize: '1.34 GB',
    duration: '02:02:00',
    uploadStatus: 'Complete',
    geminiStatus: 'Active',
    analysisStatus: 'Not Started',
    analysisProgress: 0,
    stageNote: 'Ingested & Indexed',
    poster: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&auto=format&fit=crop&q=80',
    genre: 'Drama / Crime',
    year: 2019,
  },
];

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentScreen, setCurrentScreen] = useState<ScreenId>('dashboard');
  const [eyeConfig, setEyeConfig] = useState<EyeConfig>(initialEyeConfig);
  const [movies, setMovies] = useState<MovieProject[]>(defaultMovies);
  const [activeMovie, setActiveMovie] = useState<MovieProject>(defaultMovies[0]);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true);

  return (
    <AppContext.Provider
      value={{
        currentScreen,
        setCurrentScreen,
        eyeConfig,
        setEyeConfig,
        activeMovie,
        setActiveMovie,
        movies,
        setMovies,
        isLoggedIn,
        setIsLoggedIn,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
