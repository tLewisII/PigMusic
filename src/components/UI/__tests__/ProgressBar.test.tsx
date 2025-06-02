import { render, screen } from '@testing-library/react';
import ProgressBar from '../ProgressBar';

describe('ProgressBar', () => {
  test('displays correct width and pig icon when progress >= 10%', () => {
    render(<ProgressBar current={1} total={10} />);
    const fill = document.querySelector('.progress-fill') as HTMLElement;
    expect(fill.style.width).toBe('10%');
    expect(screen.getByText('🐷')).toBeInTheDocument();
  });

  test('hides pig icon when progress is 0%', () => {
    render(<ProgressBar current={0} total={10} />);
    const fill = document.querySelector('.progress-fill') as HTMLElement;
    expect(fill.style.width).toBe('0%');
    expect(screen.queryByText('🐷')).toBeNull();
  });
});
