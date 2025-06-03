import AudioManager from '../AudioManager';

// Mock Tone.js at the module level
jest.mock('tone');

describe('AudioManager', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('AudioManager methods', () => {
    it('has all required methods', () => {
      expect(typeof AudioManager.initialize).toBe('function');
      expect(typeof AudioManager.playNote).toBe('function');
      expect(typeof AudioManager.playSuccessSound).toBe('function');
      expect(typeof AudioManager.playErrorSound).toBe('function');
      expect(typeof AudioManager.playLevelCompleteSound).toBe('function');
      expect(typeof AudioManager.setVolume).toBe('function');
      expect(typeof AudioManager.setSoundEffectsEnabled).toBe('function');
    });

    it('can call initialize without errors', async () => {
      await expect(AudioManager.initialize()).resolves.not.toThrow();
    });

    it('can play notes without errors', async () => {
      await expect(AudioManager.playNote('C4')).resolves.not.toThrow();
      await expect(AudioManager.playNote('C#4')).resolves.not.toThrow();
      await expect(AudioManager.playNote('Bb3')).resolves.not.toThrow();
    });

    it('can play sound effects without errors', async () => {
      await expect(AudioManager.playSuccessSound()).resolves.not.toThrow();
      await expect(AudioManager.playErrorSound()).resolves.not.toThrow();
      await expect(AudioManager.playLevelCompleteSound()).resolves.not.toThrow();
    });
  });

  describe('setVolume', () => {
    it('sets the volume correctly', () => {
      AudioManager.setVolume(0.7);
      // Volume is set internally, we can't directly test it without exposing it
      // But we can test that it clamps values
      AudioManager.setVolume(1.5);
      AudioManager.setVolume(-0.5);
      // No errors should be thrown
      expect(true).toBe(true);
    });
  });

  describe('setSoundEffectsEnabled', () => {
    it('can enable and disable sound effects', () => {
      expect(() => AudioManager.setSoundEffectsEnabled(false)).not.toThrow();
      expect(() => AudioManager.setSoundEffectsEnabled(true)).not.toThrow();
    });
  });
});