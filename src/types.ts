export type ScreenId =
  | 'login'
  | 'dashboard'
  | 'upload'
  | 'library'
  | 'analysis'
  | 'story'
  | 'script'
  | 'voice'
  | 'editor'
  | 'ai_assistant'
  | 'shorts_seo'
  | 'eye_control';

export interface NavigationItem {
  id: ScreenId;
  label: string;
  badge?: string;
  iconName: string;
}

export type EyeColorPreset = 'red' | 'blue' | 'green' | 'purple' | 'white';
export type EyeResponseMode = 'reactive' | 'pulse' | 'scan' | 'idle';

export interface EyeConfig {
  colorMode: EyeColorPreset;
  hueShift: number; // 0 - 360
  speed: number; // 0.5 - 2.0
  responseMode: EyeResponseMode;
  glowIntensity: number; // 0.5 - 1.5
}

export interface MovieProject {
  id: string;
  title: string;
  fileName: string;
  fileSize: string;
  duration: string;
  uploadStatus: 'Complete' | 'Uploading' | 'Processing';
  geminiStatus: 'Active' | 'Ready' | 'Inactive';
  analysisStatus: 'Complete' | 'In Progress' | 'Not Started';
  analysisProgress: number;
  stageNote?: string;
  poster: string;
  genre: string;
  year: number;
}

export interface StoryBeat {
  id: number;
  number: number;
  title: string;
  subtitle: string;
  sourceScene: string;
  startTime: string;
  endTime: string;
  characters: string[];
  importance: string; // e.g. '9/10'
  description: string;
  image: string;
}

export interface ScriptBlock {
  id: string;
  timecode: string;
  section: string;
  dialogue: string;
  notes?: string;
}

export interface TimelineClip {
  id: string;
  name: string;
  track: 'V3' | 'V2' | 'V1' | 'A1' | 'A2' | 'A3';
  startPercent: number; // 0 to 100
  widthPercent: number; // 5 to 50
  color: string;
}

export interface AiSuggestion {
  id: string;
  text: string;
  checked: boolean;
}
