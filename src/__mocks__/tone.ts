export const Destination = {
  volume: { value: 0 },
};

export const gainToDb = (gain: number) => 20 * Math.log10(gain);

export const start = jest.fn().mockResolvedValue(undefined);

export class Synth {
  triggerAttackRelease = jest.fn();
  toDestination = jest.fn().mockReturnThis();
  dispose = jest.fn();
  volume = { value: 0 };
}

export class PolySynth {
  triggerAttackRelease = jest.fn();
  toDestination = jest.fn().mockReturnThis();
  dispose = jest.fn();
  volume = { value: 0 };
  
  constructor(_SynthClass?: any, _options?: any) {
    // Mock constructor
  }
}