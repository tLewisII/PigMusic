# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

### Development
- `npm start` - Start development server on localhost:3000
- `npm test` - Run test suite in watch mode
- `npm build` - Create production build

### Testing
- Run all tests: `npm test`
- Run a single test file: `npm test -- VexFlowNoteDisplay.test.tsx`
- Run tests with coverage: `npm test -- --coverage`

## Architecture Overview

PigMusic is a React TypeScript application that teaches children music reading through gamification. The codebase follows a component-based architecture with clear separation of concerns.

### Key Technical Stack
- React 18 with TypeScript
- Tone.js for audio synthesis
- VexFlow for music notation rendering
- React Spring for animations
- Jest + React Testing Library for testing

### Component Organization
- `App.tsx` - Main container managing global game state and screen navigation
- `components/GameEngine/` - Core game logic including note display and piano keyboard
- `components/UI/` - Reusable UI components (level select, progress bars, clef selector)
- `components/Character/` - Pig mascot with mood-based animations
- `services/AudioManager.ts` - Centralized audio control using Tone.js

### State Management Pattern
Game state is managed in App.tsx and passed down via props. Key state includes:
- Current level and note
- Player progress (strikes, coins, streak)
- Settings (volume, clef selection)
- Unlocked items and achievements

State persistence uses localStorage with the key 'pigMusicGameState'.

### Testing Approach
Components are tested using React Testing Library with a focus on user interactions. VexFlow is mocked to avoid complex SVG testing. Test files follow the pattern `__tests__/ComponentName.test.tsx`.

### Audio Implementation
AudioManager provides methods for:
- `playNote(note)` - Plays a musical note
- `playSuccessSound()` - Positive feedback
- `playErrorSound()` - Mistake feedback
- `playLevelComplete()` - Level completion fanfare

Audio context initializes on first user interaction to comply with browser policies.

### Note System
Notes are defined with:
- `id`: Unique identifier (e.g., 'C4', 'D5')
- `name`: Display name
- `frequency`: Hz value for audio playback
- `pianoKey`: Corresponding piano key number
- `accidental`: Optional sharp/flat modifier

Levels progressively introduce notes:
- Level 1: C, D, E
- Level 2: F, G  
- Level 3: A, B
- Level 4: All notes including sharps/flats