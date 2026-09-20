/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { AppLayout } from './components/layout/AppLayout';

// 12 Strict Screen Views
import { LoginView } from './pages/LoginView';
import { DashboardView } from './pages/DashboardView';
import { MovieUploadView } from './pages/MovieUploadView';
import { MovieLibraryView } from './pages/MovieLibraryView';
import { MovieAnalysisView } from './pages/MovieAnalysisView';
import { StoryEngineView } from './pages/StoryEngineView';
import { ScriptStudioView } from './pages/ScriptStudioView';
import { VoiceLabView } from './pages/VoiceLabView';
import { ProEditorView } from './pages/ProEditorView';
import { AiAssistantView } from './pages/AiAssistantView';
import { ShortsSeoView } from './pages/ShortsSeoView';
import { EyeControlView } from './pages/EyeControlView';

const ScreenRenderer: React.FC = () => {
  const { currentScreen } = useApp();

  // Strict Single-Screen Router - Renders ONLY ONE view at a time
  switch (currentScreen) {
    case 'login':
      return <LoginView />;
    case 'dashboard':
      return <DashboardView />;
    case 'upload':
      return <MovieUploadView />;
    case 'library':
      return <MovieLibraryView />;
    case 'analysis':
      return <MovieAnalysisView />;
    case 'story':
      return <StoryEngineView />;
    case 'script':
      return <ScriptStudioView />;
    case 'voice':
      return <VoiceLabView />;
    case 'editor':
      return <ProEditorView />;
    case 'ai_assistant':
      return <AiAssistantView />;
    case 'shorts_seo':
      return <ShortsSeoView />;
    case 'eye_control':
      return <EyeControlView />;
    default:
      return <DashboardView />;
  }
};

export default function App() {
  return (
    <AppProvider>
      <AppLayout>
        <ScreenRenderer />
      </AppLayout>
    </AppProvider>
  );
}
