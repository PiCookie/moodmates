import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { Moodmate } from './Moodmate';
import { MoodHistoryBar } from './MoodHistoryBar';
import type { PetMessages } from './messages';

const ENGLISH: Partial<PetMessages> = {
  tapPet: 'Tap the pet',
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
  moodLabels: { frozen: 'Frozen', cold: 'Cold', neutral: 'Normal', warm: 'Warm' },
  moodBarAriaLabel: 'Mood distribution today',
  moodBarHourTitle: (hour, moodLabel) => `${hour}:00 - ${moodLabel}`,
};

describe('Moodmate: Texte', () => {
  it('nutzt ohne eigene Texte die deutschen Standardtexte', () => {
    render(<Moodmate temperature={20} />);

    expect(screen.getByRole('button', { name: 'Tier antippen' })).toBeInTheDocument();
  });

  it('nutzt die eigene Beschriftung für Screenreader', () => {
    render(<Moodmate temperature={20} messages={ENGLISH} />);

    expect(screen.getByRole('button', { name: 'Tap the pet' })).toBeInTheDocument();
  });

  it('zeigt beim Antippen einen Spruch aus den eigenen Texten', () => {
    render(<Moodmate temperature={20} messages={ENGLISH} />);

    fireEvent.click(screen.getByRole('button'));

    expect(screen.getByText('Lovely day.')).toBeInTheDocument();
  });

  it('zeigt bei einem Ereignis den eigenen Ereignistext', () => {
    render(
      <Moodmate temperature={-2} messages={ENGLISH} event={{ kind: 'first-frost' }} />,
    );

    expect(screen.getByText('First frost of the year!')).toBeInTheDocument();
  });

  it('nutzt nach einem Wechsel der Texte beim nächsten Antippen die neuen Texte', () => {
    const { rerender } = render(<Moodmate temperature={20} messages={ENGLISH} />);
    const german = { speech: { ...ENGLISH.speech!, neutral: ['Schöner Tag.'] } };

    rerender(<Moodmate temperature={20} messages={german} />);
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
    const { rerender } = render(<Moodmate temperature={20} messages={ENGLISH} />);
    const german = { speech: { ...ENGLISH.speech!, neutral: ['Schöner Tag.'] } };

    rerender(<Moodmate temperature={20} messages={german} />);
    act(() => { vi.advanceTimersByTime(10_001); });

    expect(screen.getByText('Schöner Tag.')).toBeInTheDocument();
  });
});

describe('MoodHistoryBar: Texte', () => {
  it('nutzt ohne eigene Texte die deutschen Standardtexte', () => {
    render(<MoodHistoryBar tempValues={[3, 12]} />);

    expect(screen.getByRole('img', { name: 'Stimmungsverteilung heute' })).toBeInTheDocument();
    expect(screen.getByText(/Kalt 50 %/)).toBeInTheDocument();
    expect(screen.getByTitle('00:00 – Kalt')).toBeInTheDocument();
  });

  it('nutzt eigene Beschriftung, Stundentitel und Legende', () => {
    render(<MoodHistoryBar tempValues={[3, 12]} messages={ENGLISH} />);

    expect(screen.getByRole('img', { name: 'Mood distribution today' })).toBeInTheDocument();
    expect(screen.getByTitle('00:00 - Cold')).toBeInTheDocument();
    expect(screen.getByText(/Normal 50 %/)).toBeInTheDocument();
  });
});
