import * as Tone from 'tone';

class AudioManager {
  private synth: any;
  private initialized: boolean = false;
  private volume: number = 0.7;
  private soundEffectsEnabled: boolean = true;

  constructor() {
    this.synth = new Tone.Synth({
      oscillator: {
        type: 'triangle'
      },
      envelope: {
        attack: 0.01,
        decay: 0.1,
        sustain: 0.3,
        release: 0.5
      }
    }).toDestination();
  }

  async initialize(): Promise<void> {
    if (this.initialized) return;
    
    await Tone.start();
    this.initialized = true;
  }

  async playNote(note: string): Promise<void> {
    if (!this.soundEffectsEnabled) return;
    
    await this.initialize();
    
    Tone.Destination.volume.value = Tone.gainToDb(this.volume);
    
    this.synth.triggerAttackRelease(note, '8n');
  }

  async playSuccessSound(): Promise<void> {
    if (!this.soundEffectsEnabled) return;
    
    await this.initialize();
    
    const synth = new Tone.Synth({
      oscillator: { type: 'sine' },
      envelope: {
        attack: 0.01,
        decay: 0.1,
        sustain: 0,
        release: 0.1
      }
    }).toDestination();
    
    synth.volume.value = Tone.gainToDb(this.volume * 0.5);
    synth.triggerAttackRelease('C5', '16n');
    setTimeout(() => synth.triggerAttackRelease('E5', '16n'), 100);
    setTimeout(() => synth.triggerAttackRelease('G5', '16n'), 200);
  }

  async playErrorSound(): Promise<void> {
    if (!this.soundEffectsEnabled) return;
    
    await this.initialize();
    
    const synth = new Tone.Synth({
      oscillator: { type: 'sawtooth' },
      envelope: {
        attack: 0.01,
        decay: 0.2,
        sustain: 0,
        release: 0.1
      }
    }).toDestination();
    
    synth.volume.value = Tone.gainToDb(this.volume * 0.3);
    synth.triggerAttackRelease('C3', '8n');
  }

  async playLevelCompleteSound(): Promise<void> {
    if (!this.soundEffectsEnabled) return;
    
    await this.initialize();
    
    const synth = new Tone.PolySynth(Tone.Synth, {
      oscillator: { type: 'sine' },
      envelope: {
        attack: 0.02,
        decay: 0.1,
        sustain: 0.3,
        release: 0.8
      }
    }).toDestination();
    
    synth.volume.value = Tone.gainToDb(this.volume * 0.6);
    
    synth.triggerAttackRelease(['C4', 'E4', 'G4'], '4n');
    setTimeout(() => synth.triggerAttackRelease(['D4', 'F4', 'A4'], '4n'), 300);
    setTimeout(() => synth.triggerAttackRelease(['E4', 'G4', 'B4'], '4n'), 600);
    setTimeout(() => synth.triggerAttackRelease(['F4', 'A4', 'C5'], '2n'), 900);
  }

  setVolume(volume: number): void {
    this.volume = Math.max(0, Math.min(1, volume));
  }

  setSoundEffectsEnabled(enabled: boolean): void {
    this.soundEffectsEnabled = enabled;
  }

  dispose(): void {
    this.synth.dispose();
  }
}

export default new AudioManager();