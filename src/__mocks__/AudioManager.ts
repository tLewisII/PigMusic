const AudioManager = {
  initialize: jest.fn().mockResolvedValue(undefined),
  playNote: jest.fn().mockResolvedValue(undefined),
  playSuccessSound: jest.fn().mockResolvedValue(undefined),
  playErrorSound: jest.fn().mockResolvedValue(undefined),
  playLevelCompleteSound: jest.fn().mockResolvedValue(undefined),
  setVolume: jest.fn(),
  setSoundEffectsEnabled: jest.fn(),
  dispose: jest.fn(),
};

export default AudioManager;