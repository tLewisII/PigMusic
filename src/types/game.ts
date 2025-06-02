export interface Note {
  pitch: string;
  staffPosition: number;
  accidental?: 'sharp' | 'flat';
}

export interface GameState {
  currentLevel: number;
  currentNote: Note | null;
  score: number;
  strikes: number;
  pigCoins: number;
  unlockedItems: CustomizationItem[];
  achievements: Achievement[];
  settings: GameSettings;
  streak: number;
  notesCompleted: number;
  notesInLevel: number;
}

export interface CustomizationItem {
  id: string;
  type: 'hat' | 'accessory' | 'background' | 'instrument';
  name: string;
  cost: number;
  unlocked: boolean;
  equipped: boolean;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  unlocked: boolean;
  icon: string;
}

export interface GameSettings {
  volume: number;
  soundEffects: boolean;
  musicEnabled: boolean;
  showHints: boolean;
  highContrast: boolean;
}

export interface LevelProgress {
  levelNumber: number;
  oinks: number;
  bestScore: number;
  completed: boolean;
}

export interface SaveData {
  userId: string;
  progress: LevelProgress[];
  inventory: CustomizationItem[];
  settings: GameSettings;
  statistics: GameStatistics;
}

export interface GameStatistics {
  totalNotesPlayed: number;
  correctNotes: number;
  averageResponseTime: number;
  longestStreak: number;
  totalPlayTime: number;
}

export const NOTES_PER_LEVEL = [
  ['C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4', 'C5', 'D5', 'E5', 'F5'],
  ['C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4', 'C5', 'D5', 'E5', 'F5'],
  ['C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4', 'C5', 'D5', 'E5', 'F5'],
  ['C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4', 'C5', 'D5', 'E5', 'F5']
];

export const STAFF_POSITIONS: { [key: string]: number } = {
  'C4': 0,   // Ledger line below
  'D4': 1,   // Space below staff
  'E4': 2,   // Bottom line
  'F4': 3,   // First space
  'G4': 4,   // Second line
  'A4': 5,   // Second space
  'B4': 6,   // Third line
  'C5': 7,   // Third space
  'D5': 8,   // Fourth line
  'E5': 9,   // Fourth space
  'F5': 10   // Top line
};