import { describe, it, expect, vi, afterEach } from 'vitest';
import { pickMessage, resolveMessages } from './messages';
import type { PetMessages } from './messages';
import { pickEventMessage } from './events';
import type { EventKind } from './events';
import { MESSAGES_DE } from './messages.de';
import type { Mood } from './shared';

const MOODS: Mood[] = ['frozen', 'cold', 'neutral', 'warm'];
const EVENT_KINDS: EventKind[] = ['first-frost', 'first-summer', 'heat-record', 'back-online'];

const ENGLISH_SPEECH: PetMessages['speech'] = {
  frozen: ['Brrr!'],
  cold: ['A bit chilly.'],
  neutral: ['Lovely day.'],
  warm: ['Warm!'],
  hot: ['Too hot!'],
};

afterEach(() => vi.restoreAllMocks());

describe('MESSAGES_DE', () => {
  it.each([...MOODS, 'hot' as const])('hat Sprüche für die Stimmung %s', (mood) => {
    expect(MESSAGES_DE.speech[mood].length).toBeGreaterThan(0);
  });

  it.each(EVENT_KINDS)('hat Texte für das Ereignis %s', (kind) => {
    expect(MESSAGES_DE.events[kind].length).toBeGreaterThan(0);
  });

  it.each(MOODS)('hat ein Label für die Stimmung %s', (mood) => {
    expect(MESSAGES_DE.moodLabels[mood]).not.toBe('');
  });
});

describe('resolveMessages', () => {
  it('liefert ohne Angabe die deutschen Standardtexte', () => {
    expect(resolveMessages()).toEqual(MESSAGES_DE);
  });

  it('überschreibt nur die angegebenen Felder und behält den Rest', () => {
    const resolved = resolveMessages({ tapPet: 'Tap the pet' });

    expect(resolved.tapPet).toBe('Tap the pet');
    expect(resolved.speech).toBe(MESSAGES_DE.speech);
    expect(resolved.events).toBe(MESSAGES_DE.events);
  });

  it('behandelt ein ausdrücklich auf undefined gesetztes Feld wie ein fehlendes', () => {
    expect(resolveMessages({ tapPet: undefined }).tapPet).toBe(MESSAGES_DE.tapPet);
  });
});

describe('pickMessage', () => {
  it('nutzt die Standardtexte, wenn nichts übergeben wird', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0);

    expect(pickMessage('neutral', 20)).toBe(MESSAGES_DE.speech.neutral[0]);
  });

  it('wählt aus den übergebenen Texten', () => {
    const messages = resolveMessages({ speech: ENGLISH_SPEECH });

    expect(pickMessage('cold', 5, messages)).toBe('A bit chilly.');
  });

  it('nutzt ab 28 Grad den Hitze-Pool, unabhängig von der Stimmung', () => {
    const messages = resolveMessages({ speech: ENGLISH_SPEECH });

    expect(pickMessage('warm', 28, messages)).toBe('Too hot!');
    expect(pickMessage('warm', 27.9, messages)).toBe('Warm!');
  });

  it('nutzt den Stimmungs-Pool, wenn die Temperatur fehlt', () => {
    const messages = resolveMessages({ speech: ENGLISH_SPEECH });

    expect(pickMessage('neutral', null, messages)).toBe('Lovely day.');
  });
});

describe('pickEventMessage mit eigenen Texten', () => {
  it('wählt aus den übergebenen Ereignistexten', () => {
    const events = {
      'first-frost': ['First frost!'],
      'first-summer': ['First summer day!'],
      'heat-record': ['Record heat!'],
      'back-online': ['Back online!'],
    } satisfies PetMessages['events'];
    const messages = resolveMessages({ events });

    expect(pickEventMessage('heat-record', messages)).toBe('Record heat!');
  });
});
