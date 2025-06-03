import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import ClefSelector from '../ClefSelector';

describe('ClefSelector', () => {
  const mockOnSelectClef = jest.fn();

  beforeEach(() => {
    mockOnSelectClef.mockClear();
  });

  it('renders correctly', () => {
    const { container } = render(
      <ClefSelector onSelectClef={mockOnSelectClef} />
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  it('calls onSelectClef when treble button is clicked', () => {
    const { getByText } = render(
      <ClefSelector onSelectClef={mockOnSelectClef} />
    );
    
    fireEvent.click(getByText('Treble Clef'));
    expect(mockOnSelectClef).toHaveBeenCalledWith('treble');
  });

  it('calls onSelectClef when bass button is clicked', () => {
    const { getByText } = render(
      <ClefSelector onSelectClef={mockOnSelectClef} />
    );
    
    fireEvent.click(getByText('Bass Clef'));
    expect(mockOnSelectClef).toHaveBeenCalledWith('bass');
  });

  it('renders both clef options', () => {
    const { getByText } = render(
      <ClefSelector onSelectClef={mockOnSelectClef} />
    );
    
    expect(getByText('Treble Clef')).toBeInTheDocument();
    expect(getByText('Bass Clef')).toBeInTheDocument();
    expect(getByText('Higher notes (C4 - F5)')).toBeInTheDocument();
    expect(getByText('Lower notes (E2 - C4)')).toBeInTheDocument();
  });
});