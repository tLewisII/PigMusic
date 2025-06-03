import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import ClefSelector from '../ClefSelector';

describe('ClefSelector', () => {
  const mockOnSelectClef = jest.fn();

  beforeEach(() => {
    mockOnSelectClef.mockClear();
  });

  it('renders correctly with treble clef selected', () => {
    const { container } = render(
      <ClefSelector selectedClef="treble" onSelectClef={mockOnSelectClef} />
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  it('renders correctly with bass clef selected', () => {
    const { container } = render(
      <ClefSelector selectedClef="bass" onSelectClef={mockOnSelectClef} />
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  it('calls onSelectClef when treble button is clicked', () => {
    const { getByText } = render(
      <ClefSelector selectedClef="bass" onSelectClef={mockOnSelectClef} />
    );
    
    fireEvent.click(getByText('Treble Clef'));
    expect(mockOnSelectClef).toHaveBeenCalledWith('treble');
  });

  it('calls onSelectClef when bass button is clicked', () => {
    const { getByText } = render(
      <ClefSelector selectedClef="treble" onSelectClef={mockOnSelectClef} />
    );
    
    fireEvent.click(getByText('Bass Clef'));
    expect(mockOnSelectClef).toHaveBeenCalledWith('bass');
  });

  it('applies active class to selected clef button', () => {
    const { getByText } = render(
      <ClefSelector selectedClef="treble" onSelectClef={mockOnSelectClef} />
    );
    
    const trebleButton = getByText('Treble Clef');
    const bassButton = getByText('Bass Clef');
    
    expect(trebleButton).toHaveClass('active');
    expect(bassButton).not.toHaveClass('active');
  });

  it('does not re-trigger onSelectClef when clicking already selected clef', () => {
    const { getByText } = render(
      <ClefSelector selectedClef="treble" onSelectClef={mockOnSelectClef} />
    );
    
    fireEvent.click(getByText('Treble Clef'));
    expect(mockOnSelectClef).not.toHaveBeenCalled();
  });
});