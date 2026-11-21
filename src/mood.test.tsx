import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { ALL_PET_TYPES } from './pets';
import { Moodmate } from './Moodmate';
import { MoodmateSprite } from './MoodmateSprite';
import { MoodHistoryBar } from './MoodHistoryBar';
import { MESSAGES_DE } from './messages.de';
import type { PetMessages } from './messages';

const SPEECH: PetMessages['speech'] = {
  frozen: ['Brrr!'],
  cold: ['A bit chilly.'],
  neutral: ['Lovely day.'],
  warm: ['Warm!'],
  hot: ['Too hot!'],
};

// PetSweat zeichnet einen Tropfen in dieser Farbe; kein anderes Teil nutzt sie mit dieser Deckkraft
const SWEAT = 'svg path[fill="#93c5fd"][opacity="0.85"]';

describe('Moodmate: Stimmung bestimmt das Aussehen', () => {
  // Jedes Tier setzt "shivering" aus seiner eigenen Stimmung: so fällt ein Tier auf, das mood ignoriert.
  it.each([...ALL_PET_TYPES])('%s zittert bei "frozen" und "cold"', (type) => {
    for (const mood of ['frozen', 'cold'] as const) {
      const { container, unmount } = render(<Moodmate mood={mood} type={type} />);
      expect(container.querySelector('svg.mm-shiver'), mood).not.toBeNull();
      unmount();
    }
  });

  it.each([...ALL_PET_TYPES])('%s zittert bei "neutral", "warm" und "hot" nicht', (type) => {
    for (const mood of ['neutral', 'warm', 'hot'] as const) {
      const { container, unmount } = render(<Moodmate mood={mood} type={type} />);
      expect(container.querySelector('svg.mm-shiver'), mood).toBeNull();
      unmount();
    }
  });

  it.each([...ALL_PET_TYPES])('%s schwitzt bei "hot", bei "warm" nicht', (type) => {
    const hot = render(<MoodmateSprite mood="hot" type={type} />);
    expect(hot.container.querySelector(SWEAT)).not.toBeNull();
    hot.unmount();

    const warm = render(<MoodmateSprite mood="warm" type={type} />);
    expect(warm.container.querySelector(SWEAT)).toBeNull();
  });

  it('zeigt "hot" sonst wie "warm" (Gesicht, Körperfarbe)', () => {
    // Das Label nennt die Stimmung ("Cat: Hot" gegen "Cat: Warm") und gehört nicht zur Zeichnung
    const drawing = (mood: 'hot' | 'warm') =>
      render(<MoodmateSprite mood={mood} type="cat" />).container.innerHTML.replace(/ aria-label="[^"]*"/, '');

    expect(drawing('hot').replace(SWEAT_PATH, '')).toBe(drawing('warm'));
  });
});

const SWEAT_PATH = /<path d="[^"]*" fill="#93c5fd" opacity="0.85"><\/path>/;

describe('Moodmate: Sprüche folgen der Stimmung', () => {
  it.each([
    ['cold', 'A bit chilly.'],
    ['warm', 'Warm!'],
    ['hot', 'Too hot!'],
  ] as const)('mood="%s" sagt %s', (mood, expected) => {
    render(<Moodmate type="cat" mood={mood} messages={{ speech: SPEECH }} />);

    fireEvent.click(screen.getByRole('button'));

    expect(screen.getByText(expected)).toBeInTheDocument();
  });
});

describe('Moodmate: Hüpfen', () => {
  it.each(['neutral', 'warm', 'hot'] as const)('hüpft bei mood="%s" nach dem Antippen', (mood) => {
    const { container } = render(<Moodmate mood={mood} type="cat" />);

    fireEvent.click(screen.getByRole('button'));

    expect(container.querySelector('.mm-pet__body.mm-hop')).not.toBeNull();
  });

  it.each(['frozen', 'cold'] as const)('hüpft bei mood="%s" nicht', (mood) => {
    const { container } = render(<Moodmate mood={mood} type="cat" />);

    fireEvent.click(screen.getByRole('button'));

    expect(container.querySelector('.mm-pet__body.mm-hop')).toBeNull();
  });
});

describe('Moodmate: talk und onTap', () => {
  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  it('spricht von selbst, solange talk nicht abgeschaltet ist', () => {
    vi.useFakeTimers();
    vi.spyOn(Math, 'random').mockReturnValue(0);
    render(<Moodmate type="cat" mood="neutral" messages={{ speech: SPEECH }} />);

    act(() => { vi.advanceTimersByTime(10_001); });

    expect(screen.getByText('Lovely day.')).toBeInTheDocument();
  });

  it('spricht mit talk={false} nicht von selbst', () => {
    vi.useFakeTimers();
    vi.spyOn(Math, 'random').mockReturnValue(0);
    render(<Moodmate type="cat" mood="neutral" talk={false} messages={{ speech: SPEECH }} />);

    act(() => { vi.advanceTimersByTime(120_000); });

    expect(screen.queryByText('Lovely day.')).toBeNull();
  });

  it('zeigt mit talk={false} beim Antippen keine Blase, hüpft aber', () => {
    const { container } = render(<Moodmate type="cat" mood="neutral" talk={false} messages={{ speech: SPEECH }} />);

    fireEvent.click(screen.getByRole('button'));

    expect(screen.queryByText('Lovely day.')).toBeNull();
    expect(container.querySelector('.mm-pet__body.mm-hop')).not.toBeNull();
  });

  it('zeigt mit talk={false} trotzdem die Blase eines Ereignisses', () => {
    render(<Moodmate type="cat" mood="cold" talk={false} event={{ kind: 'first-frost' }} />);

    expect(document.querySelector('.mm-bubble')).not.toBeNull();
  });

  it.each([true, false])('ruft onTap bei jedem Antippen auf (talk=%s)', (talk) => {
    const onTap = vi.fn();
    render(<Moodmate type="cat" mood="neutral" talk={talk} onTap={onTap} />);

    fireEvent.click(screen.getByRole('button'));
    fireEvent.click(screen.getByRole('button'));

    expect(onTap).toHaveBeenCalledTimes(2);
  });

  it('ruft das zuletzt übergebene onTap auf', () => {
    const first = vi.fn();
    const second = vi.fn();
    const { rerender } = render(<Moodmate type="cat" mood="neutral" onTap={first} />);
    rerender(<Moodmate type="cat" mood="neutral" onTap={second} />);

    fireEvent.click(screen.getByRole('button'));

    expect(first).not.toHaveBeenCalled();
    expect(second).toHaveBeenCalledTimes(1);
  });
});

describe('Moodmate: say', () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it('zeigt den eigenen Satz und lässt das Tier hüpfen', () => {
    const { container } = render(<Moodmate type="cat" mood="neutral" say={{ text: 'Gespeichert ✓' }} />);

    expect(screen.getByText('Gespeichert ✓')).toBeInTheDocument();
    expect(container.querySelector('.mm-pet__body.mm-hop')).not.toBeNull();
  });

  it('zeigt nichts bei null oder ohne Prop', () => {
    const { rerender } = render(<Moodmate type="cat" mood="neutral" say={null} />);
    expect(document.querySelector('.mm-bubble')).toBeNull();
    rerender(<Moodmate type="cat" mood="neutral" />);
    expect(document.querySelector('.mm-bubble')).toBeNull();
  });

  it('zeigt den Satz auch mit talk={false}', () => {
    render(<Moodmate type="cat" mood="neutral" talk={false} say={{ text: 'Hallo' }} />);

    expect(screen.getByText('Hallo')).toBeInTheDocument();
  });

  it('lässt die Blase nach 4,5 s verschwinden und nach duration, wenn angegeben', () => {
    vi.useFakeTimers();
    const { rerender } = render(<Moodmate type="cat" mood="neutral" say={{ text: 'Standard' }} />);
    act(() => { vi.advanceTimersByTime(4499); });
    expect(screen.getByText('Standard')).toBeInTheDocument();
    act(() => { vi.advanceTimersByTime(2); });
    expect(screen.queryByText('Standard')).toBeNull();

    rerender(<Moodmate type="cat" mood="neutral" say={{ text: 'Kurz', duration: 1000 }} />);
    act(() => { vi.advanceTimersByTime(999); });
    expect(screen.getByText('Kurz')).toBeInTheDocument();
    act(() => { vi.advanceTimersByTime(2); });
    expect(screen.queryByText('Kurz')).toBeNull();
  });

  it('zeigt denselben Text mit einem neuen Objekt erneut und setzt den Timer zurück', () => {
    vi.useFakeTimers();
    const { rerender } = render(<Moodmate type="cat" mood="neutral" say={{ text: 'Nochmal' }} />);
    act(() => { vi.advanceTimersByTime(4000); });
    rerender(<Moodmate type="cat" mood="neutral" say={{ text: 'Nochmal' }} />);
    act(() => { vi.advanceTimersByTime(4000); });

    expect(screen.getByText('Nochmal')).toBeInTheDocument();
  });

  it('ersetzt eine laufende Blase', () => {
    const { rerender } = render(<Moodmate type="cat" mood="neutral" say={{ text: 'Eins' }} />);
    rerender(<Moodmate type="cat" mood="neutral" say={{ text: 'Zwei' }} />);

    expect(screen.queryByText('Eins')).toBeNull();
    expect(screen.getByText('Zwei')).toBeInTheDocument();
  });

  it('übersetzt den Text nicht', () => {
    render(<Moodmate type="cat" mood="neutral" language="de" say={{ text: 'Hello' }} />);

    expect(screen.getByText('Hello')).toBeInTheDocument();
  });
});

describe('Sprache', () => {
  afterEach(() => { vi.restoreAllMocks(); });

  it('Moodmate mit language="de" sagt einen deutschen Spruch und hat ein deutsches Label', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0);
    render(<Moodmate type="cat" mood="neutral" language="de" />);

    expect(screen.getByRole('button', { name: MESSAGES_DE.tapPet })).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button'));

    expect(screen.getByText(MESSAGES_DE.speech.neutral[0])).toBeInTheDocument();
  });

  it('Moodmate mit language="de" nennt das Tier auf Deutsch für Screenreader', () => {
    render(<Moodmate type="cat" mood="warm" language="de" />);

    expect(screen.getByRole('img', { name: 'Katze: Warm' })).toBeInTheDocument();
  });

  it('eigene Texte gelten vor der Sprache', () => {
    render(<Moodmate type="cat" mood="neutral" language="de" messages={{ tapPet: 'Streicheln' }} />);

    expect(screen.getByRole('button', { name: 'Streicheln' })).toBeInTheDocument();
  });

  it('MoodmateSprite mit language="de" beschriftet auf Deutsch', () => {
    render(<MoodmateSprite type="dog" mood="cold" language="de" />);

    expect(screen.getByRole('img', { name: 'Hund: Kalt' })).toBeInTheDocument();
  });

  it('MoodHistoryBar mit language="de" beschriftet Balken und Legende auf Deutsch', () => {
    render(<MoodHistoryBar moods={['cold', 'neutral']} language="de" />);

    expect(screen.getByRole('img', { name: MESSAGES_DE.moodBarAriaLabel })).toBeInTheDocument();
    expect(screen.getByText(/Kalt 50 %/)).toBeInTheDocument();
    expect(screen.getByTitle('00:00 Uhr – Kalt')).toBeInTheDocument();
  });

  it('ohne language bleibt alles englisch', () => {
    render(<Moodmate type="cat" mood="warm" />);

    expect(screen.getByRole('img', { name: 'Cat: Warm' })).toBeInTheDocument();
  });
});
