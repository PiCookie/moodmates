import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { Moodmate } from './Moodmate';
import { MoodHistoryBar } from './MoodHistoryBar';
import type { PetMessages } from './messages';

const CUSTOM: Partial<PetMessages> = {
  tapPet: 'Tap me',
  speech: {
    frozen: ['Brrr!'],
    cold: ['A bit chilly.'],
    neutral: ['Lovely day.'],
    warm: ['Warm!'],
    hot: ['Too hot!'],
  },
  events: {
    'first-frost': ['First frost of the year!'],
    'first-summer': ['First summer day!'],
    'heat-record': ['Record heat!'],
    'back-online': ['Back online!'],
  },
  moodLabels: { frozen: 'Icy', cold: 'Chilly', neutral: 'Fine', warm: 'Toasty', hot: 'Scorching' },
  moodBarAriaLabel: 'Moods of the day',
  moodBarHourTitle: (hour, moodLabel) => `${hour}h - ${moodLabel}`,
};

describe('Moodmate: Texte', () => {
  it('nutzt ohne eigene Texte die englischen Standardtexte', () => {
    render(<Moodmate type="cat" mood="neutral" />);

    expect(screen.getByRole('button', { name: 'Tap the pet' })).toBeInTheDocument();
  });

  it('nutzt die eigene Beschriftung für Screenreader', () => {
    render(<Moodmate type="cat" mood="neutral" messages={CUSTOM} />);

    expect(screen.getByRole('button', { name: 'Tap me' })).toBeInTheDocument();
  });

  it('zeigt beim Antippen einen Spruch aus den eigenen Texten', () => {
    render(<Moodmate type="cat" mood="neutral" messages={CUSTOM} />);

    fireEvent.click(screen.getByRole('button'));

    expect(screen.getByText('Lovely day.')).toBeInTheDocument();
  });

  it('zeigt bei einem Ereignis den eigenen Ereignistext', () => {
    render(
      <Moodmate type="cat" mood="frozen" messages={CUSTOM} event={{ kind: 'first-frost' }} />,
    );

    expect(screen.getByText('First frost of the year!')).toBeInTheDocument();
  });

  it('nutzt nach einem Wechsel der Texte beim nächsten Antippen die neuen Texte', () => {
    const { rerender } = render(<Moodmate type="cat" mood="neutral" messages={CUSTOM} />);
    const german = { speech: { ...CUSTOM.speech!, neutral: ['Schöner Tag.'] } };

    rerender(<Moodmate type="cat" mood="neutral" messages={german} />);
    fireEvent.click(screen.getByRole('button'));

    expect(screen.getByText('Schöner Tag.')).toBeInTheDocument();
  });
});

describe('Moodmate: automatische Sprüche', () => {
  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  // Der Timer wird beim ersten Render gestartet und muss trotzdem die zuletzt übergebenen Texte lesen.
  it('nutzt für den automatischen Spruch die zuletzt übergebenen Texte', () => {
    vi.useFakeTimers();
    vi.spyOn(Math, 'random').mockReturnValue(0);
    const { rerender } = render(<Moodmate type="cat" mood="neutral" messages={CUSTOM} />);
    const german = { speech: { ...CUSTOM.speech!, neutral: ['Schöner Tag.'] } };

    rerender(<Moodmate type="cat" mood="neutral" messages={german} />);
    act(() => { vi.advanceTimersByTime(10_001); });

    expect(screen.getByText('Schöner Tag.')).toBeInTheDocument();
  });
});

describe('MoodHistoryBar: Texte', () => {
  it('nutzt ohne eigene Texte die englischen Standardtexte', () => {
    render(<MoodHistoryBar moods={['cold', 'neutral']} />);

    expect(screen.getByRole('img', { name: 'Mood distribution today' })).toBeInTheDocument();
    expect(screen.getByText(/Cold 50 %/)).toBeInTheDocument();
    expect(screen.getByTitle('00:00 – Cold')).toBeInTheDocument();
  });

  it('nutzt eigene Beschriftung, Stundentitel und Legende', () => {
    render(<MoodHistoryBar moods={['cold', 'neutral']} messages={CUSTOM} />);

    expect(screen.getByRole('img', { name: 'Moods of the day' })).toBeInTheDocument();
    expect(screen.getByTitle('00h - Chilly')).toBeInTheDocument();
    expect(screen.getByText(/Fine 50 %/)).toBeInTheDocument();
  });
});
