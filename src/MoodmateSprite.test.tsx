import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { act } from 'react';
import { ALL_PET_TYPES } from './pets';
import { MoodmateSprite } from './MoodmateSprite';

afterEach(() => vi.useRealTimers());

describe('MoodmateSprite', () => {
  it.each([...ALL_PET_TYPES])('zeigt %s als SVG', (type) => {
    const { container } = render(<MoodmateSprite type={type} temperature={15} />);

    expect(container.querySelector('svg')).not.toBeNull();
  });

  it('zeigt keinen Namen, keine Sprechblase und keine Schaltfläche', () => {
    const { container } = render(<MoodmateSprite type="cat" temperature={15} />);

    expect(container.querySelector('.mm-pet__name')).toBeNull();
    expect(container.querySelector('.mm-bubble')).toBeNull();
    expect(screen.queryByRole('button')).toBeNull();
  });

  it('startet keine Timer und zeigt auch nach Minuten keine Blase', () => {
    vi.useFakeTimers();
    const { container } = render(<MoodmateSprite type="dog" temperature={15} />);

    act(() => { vi.advanceTimersByTime(120_000); });

    expect(vi.getTimerCount()).toBe(0);
    expect(container.querySelector('.mm-bubble')).toBeNull();
  });

  it('nimmt die Stimmung aus mood, wenn sie gesetzt ist', () => {
    const cold = render(<MoodmateSprite type="cat" temperature={25} mood="frozen" />);
    const warm = render(<MoodmateSprite type="cat" temperature={25} />);

    expect(cold.container.innerHTML).not.toBe(warm.container.innerHTML);
  });

  it('übernimmt die Größe', () => {
    const { container } = render(<MoodmateSprite type="cat" temperature={15} size={52} />);

    expect(container.querySelector('svg')?.getAttribute('width')).toBe('52');
  });

  it('fällt bei einer unbekannten Tierart (z. B. veraltete gespeicherte Einstellung) auf die Katze zurück', () => {
    const cat = render(<MoodmateSprite type="cat" temperature={15} />);
    const unknown = render(<MoodmateSprite type={'gibt-es-nicht' as never} temperature={15} />);

    expect(unknown.container.innerHTML).toBe(cat.container.innerHTML);
  });
});
