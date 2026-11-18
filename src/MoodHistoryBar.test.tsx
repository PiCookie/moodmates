import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { MoodHistoryBar } from './MoodHistoryBar';

const segments = (c: HTMLElement) => c.querySelectorAll('.mm-mood-bar__segment');

describe('MoodHistoryBar mit Stimmungen', () => {
  it('zeigt ein Segment je Stimmung', () => {
    const { container } = render(<MoodHistoryBar moods={['frozen', 'warm', 'warm']} />);

    expect(segments(container)).toHaveLength(3);
  });

  it('zählt die Legende aus den Stimmungen', () => {
    const { container } = render(<MoodHistoryBar moods={['cold', 'warm', 'warm', 'warm']} />);

    expect(container.querySelector('.mm-mood-bar__legend')?.textContent).toContain('Warm 75 %');
    expect(container.querySelector('.mm-mood-bar__legend')?.textContent).toContain('Cold 25 %');
  });

  it('zeigt "hot" als eigene Stimmung mit Label', () => {
    const { container } = render(<MoodHistoryBar moods={['warm', 'hot']} />);

    expect(container.querySelector('.mm-mood-bar__legend')?.textContent).toContain('Hot 50 %');
    expect(container.querySelector('.mm-mood-bar__legend')?.textContent).toContain('Warm 50 %');
  });

  it('zeigt nichts ohne Daten', () => {
    expect(render(<MoodHistoryBar moods={[]} />).container.innerHTML).toBe('');
  });
});
