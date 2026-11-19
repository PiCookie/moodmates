import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Moodmate } from './Moodmate';
import { MoodHistoryBar } from './MoodHistoryBar';
import type { EventKind } from './events';

// Die Tiere sollen ohne Tailwind und ohne CSS der App funktionieren: Jede Klasse in
// ihrem Markup muss zu styles.css gehören, also das Präfix "mm-" tragen.
function foreignClasses(container: HTMLElement): string[] {
  return [...container.querySelectorAll('[class]')]
    .flatMap((el) => (el.getAttribute('class') ?? '').split(/\s+/))
    .filter((name) => name !== '' && !name.startsWith('mm-'));
}

const EVENT_KINDS: EventKind[] = ['first-frost', 'first-summer', 'heat-record', 'back-online'];

describe('selbstenthaltenes Styling', () => {
  it.each(EVENT_KINDS)('Moodmate mit Sprechblase (%s) nutzt nur mm- Klassen', (kind) => {
    const { container } = render(
      <Moodmate mood="frozen" type="cat" name="Mimi" event={{ kind }} />,
    );

    expect(container.querySelector('.mm-bubble')).not.toBeNull();
    expect(foreignClasses(container)).toEqual([]);
  });

  it('nutzt auch für große Tiere mit eigener Blasenposition nur mm- Klassen', () => {
    const { container } = render(
      <Moodmate mood="neutral" type="blue-whale" event={{ kind: 'first-frost' }} />,
    );

    expect(foreignClasses(container)).toEqual([]);
  });

  it('lässt ein frierendes Tier zittern', () => {
    const { container } = render(<Moodmate mood="frozen" type="dog" />);

    expect(container.querySelector('svg.mm-shiver')).not.toBeNull();
  });

  it('lässt ein warmes Tier nach einem Klick hüpfen', () => {
    const { container } = render(<Moodmate mood="warm" type="cat" />);

    fireEvent.click(screen.getByRole('button'));

    expect(container.querySelector('.mm-pet__body.mm-hop')).not.toBeNull();
  });

  it('MoodHistoryBar nutzt nur mm- Klassen', () => {
    const { container } = render(<MoodHistoryBar moods={['frozen', 'cold', 'neutral', 'warm']} />);

    expect(container.querySelector('.mm-mood-bar')).not.toBeNull();
    expect(foreignClasses(container)).toEqual([]);
  });
});

describe('Legende der Stimmungsleiste', () => {
  // Ein festes helles Weiß war auf hellem Hintergrund kaum zu sehen. Der Standard folgt der Textfarbe der Seite.
  it('hat als Standardfarbe die abgeschwächte Textfarbe statt eines festen Weiß', () => {
    const css = readFileSync(resolve(process.cwd(), 'src/styles.css'), 'utf8');
    const rule = css.match(/\.mm-mood-bar__legend-item\s*\{[^}]*\}/)?.[0] ?? '';

    expect(rule).toContain('var(--mm-legend-color, color-mix(in srgb, currentColor');
    expect(rule).not.toMatch(/rgb\(255 255 255/);
  });
});
