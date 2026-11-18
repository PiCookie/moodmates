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

  it('liefert dasselbe wie die passenden Temperaturen', () => {
    const fromTemps = render(<MoodHistoryBar tempValues={[-5, 3, 15, 25]} />);
    const fromMoods = render(<MoodHistoryBar moods={['frozen', 'cold', 'neutral', 'warm']} />);

    expect(fromMoods.container.innerHTML).toBe(fromTemps.container.innerHTML);
  });

  it('zeigt nichts ohne Daten', () => {
    expect(render(<MoodHistoryBar moods={[]} />).container.innerHTML).toBe('');
    expect(render(<MoodHistoryBar />).container.innerHTML).toBe('');
  });

  it('bevorzugt moods, wenn beides übergeben wird', () => {
    const { container } = render(<MoodHistoryBar tempValues={[25, 25]} moods={['frozen']} />);

    expect(segments(container)).toHaveLength(1);
  });
});
