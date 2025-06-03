export type Clef = 'treble' | 'bass';

export interface Note {
  pitch: string;
  staffPosition: number;
  accidental?: 'sharp' | 'flat';
  clef: Clef;
}

export interface GameState {
  currentLevel: number;
  currentNote: Note | null;
  strikes: number;
  pigCoins: number;
  unlockedItems: CustomizationItem[];
  achievements: Achievement[];
  settings: GameSettings;
  streak: number;
  notesCompleted: number;
  notesInLevel: number;
  selectedClef: Clef;
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
  completed: boolean;
}


export const NOTES_PER_LEVEL = {
  treble: [
    // Level 1: just the first three notes around middle C
    ['C4', 'D4', 'E4'],
    // Level 2: add F and G
    ['C4', 'D4', 'E4', 'F4', 'G4'],
    // Level 3: full C major scale
    ['C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4', 'C5'],
    // Level 4: introduce sharps
    [
      'C4', 'C#4', 'D4', 'D#4', 'E4',
      'F4', 'F#4', 'G4', 'G#4', 'A4', 'A#4', 'B4',
      'C5', 'C#5', 'D5', 'D#5', 'E5', 'F5'
    ]
  ],
  bass: [
    // Level 1: first three notes in bass clef (G2, A2, B2)
    ['G2', 'A2', 'B2'],
    // Level 2: add C3 and D3
    ['G2', 'A2', 'B2', 'C3', 'D3'],
    // Level 3: extended range
    ['G2', 'A2', 'B2', 'C3', 'D3', 'E3', 'F3', 'G3'],
    // Level 4: full range with sharps G2 to A3
    ['G2', 'G#2', 'A2', 'A#2', 'B2', 'C3', 'C#3', 'D3', 'D#3', 'E3', 'F3', 'F#3', 'G3', 'G#3', 'A3']
  ]
};

export const TREBLE_STAFF_POSITIONS: { [key: string]: number } = {
  'C4': 0,   // Ledger line below
  'C#4': 0,  // Sharp shares position with its natural
  'D4': 1,   // Space below staff
  'D#4': 1,
  'E4': 2,   // Bottom line
  'F4': 3,   // First space
  'F#4': 3,
  'G4': 4,   // Second line
  'G#4': 4,
  'A4': 5,   // Second space
  'A#4': 5,
  'B4': 6,   // Third line
  'C5': 7,   // Third space
  'C#5': 7,
  'D5': 8,   // Fourth line
  'D#5': 8,
  'E5': 9,   // Fourth space
  'F5': 10   // Top line
};

export const BASS_STAFF_POSITIONS: { [key: string]: number } = {
  'G2': 2,   // Bottom line of staff
  'G#2': 2,
  'A2': 3,   // First space
  'A#2': 3,
  'B2': 4,   // Second line
  'C3': 5,   // Second space
  'C#3': 5,
  'D3': 6,   // Third line
  'D#3': 6,
  'E3': 7,   // Third space
  'F3': 8,   // Fourth line
  'F#3': 8,
  'G3': 9,   // Fourth space
  'G#3': 9,
  'A3': 10   // Top line
};