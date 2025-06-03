import { render, screen, within } from '@testing-library/react';
import LevelSelect from '../LevelSelect';
import { LevelProgress } from '../../../types/game';

describe('LevelSelect', () => {
  const baseProgress: LevelProgress[] = [
    { levelNumber: 1, oinks: 0, completed: false },
    { levelNumber: 2, oinks: 0, completed: false },
    { levelNumber: 3, oinks: 0, completed: false },
    { levelNumber: 4, oinks: 0, completed: false }
  ];

  test('disables locked level button', () => {
    render(
      <LevelSelect levelProgress={baseProgress} onSelectLevel={() => {}} onBack={() => {}} />
    );
    const level2Heading = screen.getByText('Level 2');
    const card = level2Heading.closest('.level-card') as HTMLElement;
    const button = within(card).getByRole('button');
    expect(button).toBeDisabled();
    expect(button).toHaveTextContent('🔒 Locked');
  });

  test('enables unlocked level button when previous level has oinks', () => {
    const progress = JSON.parse(JSON.stringify(baseProgress)) as LevelProgress[];
    progress[0].oinks = 1; // unlock level 2
    render(
      <LevelSelect levelProgress={progress} onSelectLevel={() => {}} onBack={() => {}} />
    );
    const level2Heading = screen.getByText('Level 2');
    const card = level2Heading.closest('.level-card') as HTMLElement;
    const button = within(card).getByRole('button');
    expect(button).not.toBeDisabled();
    expect(button).toHaveTextContent('Play! 🎹');
  });
});
