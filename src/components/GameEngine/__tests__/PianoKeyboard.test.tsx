import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import PianoKeyboard from '../PianoKeyboard';

describe('PianoKeyboard', () => {
  const mockOnKeyPress = jest.fn();

  beforeEach(() => {
    mockOnKeyPress.mockClear();
  });

  it('renders correctly without hint', () => {
    const { container } = render(
      <PianoKeyboard onKeyPress={mockOnKeyPress} />
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  it('renders correctly with hint key', () => {
    const { container } = render(
      <PianoKeyboard onKeyPress={mockOnKeyPress} hintKey={40} />
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  it('renders correct number of keys', () => {
    const { container } = render(
      <PianoKeyboard onKeyPress={mockOnKeyPress} />
    );
    
    // Should have 52 white keys (C to C across 7+ octaves)
    const whiteKeys = container.querySelectorAll('.key:not(.black)');
    expect(whiteKeys).toHaveLength(52);
    
    // Should have 36 black keys
    const blackKeys = container.querySelectorAll('.key.black');
    expect(blackKeys).toHaveLength(36);
  });

  it('calls onKeyPress with correct key number when white key is clicked', () => {
    const { container } = render(
      <PianoKeyboard onKeyPress={mockOnKeyPress} />
    );
    
    // Click middle C (key 40)
    const middleC = container.querySelectorAll('.key:not(.black)')[20]; // 21st white key
    fireEvent.click(middleC);
    
    expect(mockOnKeyPress).toHaveBeenCalledWith(40);
  });

  it('calls onKeyPress with correct key number when black key is clicked', () => {
    const { container } = render(
      <PianoKeyboard onKeyPress={mockOnKeyPress} />
    );
    
    // Click C# (key 41)
    const cSharp = container.querySelectorAll('.key.black')[14]; // 15th black key
    fireEvent.click(cSharp);
    
    expect(mockOnKeyPress).toHaveBeenCalledWith(41);
  });

  it('highlights hint key with special class', () => {
    const { container } = render(
      <PianoKeyboard onKeyPress={mockOnKeyPress} hintKey={40} />
    );
    
    const hintedKey = container.querySelector('[data-key="40"]');
    expect(hintedKey).toHaveClass('hint');
  });

  it('displays note labels on white keys', () => {
    const { container } = render(
      <PianoKeyboard onKeyPress={mockOnKeyPress} />
    );
    
    // Check for note labels
    expect(container.textContent).toContain('C');
    expect(container.textContent).toContain('D');
    expect(container.textContent).toContain('E');
    expect(container.textContent).toContain('F');
    expect(container.textContent).toContain('G');
    expect(container.textContent).toContain('A');
    expect(container.textContent).toContain('B');
  });

  it('renders keyboard with proper structure', () => {
    const { container } = render(
      <PianoKeyboard onKeyPress={mockOnKeyPress} />
    );
    
    expect(container.querySelector('.piano-keyboard')).toBeInTheDocument();
    expect(container.querySelector('.keys-container')).toBeInTheDocument();
  });

  it('prevents event propagation on black key clicks', () => {
    const { container } = render(
      <PianoKeyboard onKeyPress={mockOnKeyPress} />
    );
    
    const blackKey = container.querySelector('.key.black');
    const clickEvent = new MouseEvent('click', { bubbles: true });
    const stopPropagationSpy = jest.spyOn(clickEvent, 'stopPropagation');
    
    blackKey?.dispatchEvent(clickEvent);
    
    expect(stopPropagationSpy).toHaveBeenCalled();
  });
});