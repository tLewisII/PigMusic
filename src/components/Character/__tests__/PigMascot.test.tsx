import React from 'react';
import { render } from '@testing-library/react';
import PigMascot from '../PigMascot';

describe('PigMascot', () => {
  it('renders correctly in idle mood', () => {
    const { container } = render(<PigMascot mood="idle" />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('renders correctly in happy mood', () => {
    const { container } = render(<PigMascot mood="happy" />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('renders correctly in encouraging mood', () => {
    const { container } = render(<PigMascot mood="encouraging" />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('renders correctly in celebrating mood', () => {
    const { container } = render(<PigMascot mood="celebrating" />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('applies correct CSS classes for mood', () => {
    const { container } = render(<PigMascot mood="happy" />);
    const pigElement = container.querySelector('.pig-mascot');
    expect(pigElement).toHaveClass('pig-mascot', 'happy');
  });

  it('renders all pig body parts', () => {
    const { container } = render(<PigMascot mood="idle" />);
    expect(container.querySelector('.pig-body')).toBeInTheDocument();
    expect(container.querySelector('.pig-head')).toBeInTheDocument();
    expect(container.querySelector('.pig-snout')).toBeInTheDocument();
    expect(container.querySelectorAll('.nostril')).toHaveLength(2);
    expect(container.querySelectorAll('.eye')).toHaveLength(2);
    expect(container.querySelectorAll('.ear')).toHaveLength(2);
    expect(container.querySelectorAll('.leg')).toHaveLength(4);
    expect(container.querySelector('.tail')).toBeInTheDocument();
  });
});