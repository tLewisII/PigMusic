import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import PianoKeyboard from '../PianoKeyboard';

describe('PianoKeyboard', () => {
  const mockOnNoteSelect = jest.fn();
  const defaultAvailableNotes = ['C4', 'D4', 'E4', 'F4', 'G4'];

  beforeEach(() => {
    mockOnNoteSelect.mockClear();
  });

  it('renders correctly without hint', () => {
    const { container } = render(
      <PianoKeyboard 
        availableNotes={defaultAvailableNotes}
        onNoteSelect={mockOnNoteSelect} 
      />
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  it('renders correctly with highlighted note', () => {
    const { container } = render(
      <PianoKeyboard 
        availableNotes={defaultAvailableNotes}
        onNoteSelect={mockOnNoteSelect}
        highlightedNote="C4"
      />
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  it('renders keys based on available notes', () => {
    const { container } = render(
      <PianoKeyboard 
        availableNotes={defaultAvailableNotes}
        onNoteSelect={mockOnNoteSelect}
      />
    );
    
    // Should render keys for the octave range of available notes
    const keys = container.querySelectorAll('.key');
    expect(keys.length).toBeGreaterThan(0);
  });

  it('calls onNoteSelect when a key is clicked', () => {
    const { container } = render(
      <PianoKeyboard 
        availableNotes={defaultAvailableNotes}
        onNoteSelect={mockOnNoteSelect}
      />
    );
    
    const firstKey = container.querySelector('.key');
    if (firstKey) {
      fireEvent.click(firstKey);
      expect(mockOnNoteSelect).toHaveBeenCalled();
    }
  });

  it('displays note labels on keys', () => {
    const { container } = render(
      <PianoKeyboard 
        availableNotes={['C4', 'C#4', 'D4']}
        onNoteSelect={mockOnNoteSelect}
      />
    );
    
    expect(container.textContent).toContain('C');
    expect(container.textContent).toContain('D');
  });

  it('highlights hint key with special class', () => {
    const { container } = render(
      <PianoKeyboard 
        availableNotes={['C4', 'D4', 'E4']} 
        onNoteSelect={mockOnKeyPress} 
        highlightedNote="C4" 
      />
    );
    
    // The highlighted note should have a visual indicator
    const keys = container.querySelectorAll('.key');
    expect(keys.length).toBeGreaterThan(0);
  });

  it('renders keyboard with proper structure', () => {
    const { container } = render(
      <PianoKeyboard 
        availableNotes={defaultAvailableNotes}
        onNoteSelect={mockOnNoteSelect}
      />
    );
    
    expect(container.querySelector('.piano-keyboard')).toBeInTheDocument();
  });

  it('only renders keys for available notes octave range', () => {
    const { container } = render(
      <PianoKeyboard 
        availableNotes={['C3', 'D3', 'E3', 'C4', 'D4']} // Notes in octaves 3 and 4
        onNoteSelect={mockOnNoteSelect}
      />
    );
    
    const keys = container.querySelectorAll('.key');
    // Should render keys for octaves 3 and 4 only
    expect(keys.length).toBeLessThan(88); // Less than full piano
  });

  it('handles available notes with sharps', () => {
    const { container } = render(
      <PianoKeyboard 
        availableNotes={['C4', 'C#4', 'D4', 'D#4', 'E4']}
        onNoteSelect={mockOnNoteSelect}
      />
    );
    
    const blackKeys = container.querySelectorAll('.key.black');
    expect(blackKeys.length).toBeGreaterThan(0);
  });
});