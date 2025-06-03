import { render } from '@testing-library/react';
import VexFlowNoteDisplay from '../VexFlowNoteDisplay';
import { Note } from '../../../types/game';

// Mock vexflow to avoid depending on actual implementation
jest.mock('vexflow', () => {
  class MockRenderer {
    static Backends = { SVG: 'svg' };
    element: any;
    constructor(element: any) {
      this.element = element;
      this.element.innerHTML = '<svg></svg>';
    }
    resize() {}
    getContext() { return { setFont() {} }; }
  }
  class MockStave {
    addClef() { return this; }
    setContext() { return { draw() {} }; }
  }
  class MockStaveNote {}
  class MockVoice { addTickables() {} draw() {} }
  class MockFormatter { joinVoices() { return this; } format() {} }
  return { Renderer: MockRenderer, Stave: MockStave, StaveNote: MockStaveNote, Voice: MockVoice, Formatter: MockFormatter };
});

describe('VexFlowNoteDisplay', () => {
  test('renders SVG when a note is provided', () => {
    const note: Note = { pitch: 'C4', staffPosition: 0, clef: 'treble' };
    const { container } = render(<VexFlowNoteDisplay note={note} showHint={false} clef="treble" />);
    // the mock renderer injects an svg element
    expect(container.querySelector('svg')).toBeInTheDocument();
  });
});
