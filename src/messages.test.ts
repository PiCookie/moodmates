import { describe, it, expect, vi, afterEach } from 'vitest';
import { pickMessage, resolveMessages } from './messages';
import type { PetMessages } from './messages';
import { pickEventMessage } from './events';
import type { EventKind } from './events';
import { MESSAGES_EN } from './messages.en';
import { ALL_PET_TYPES } from './pets';
import type { Mood } from './shared';

const MOODS: Mood[] = ['frozen', 'cold', 'neutral', 'warm', 'hot'];
const EVENT_KINDS: EventKind[] = ['first-frost', 'first-summer', 'heat-record', 'back-online'];

const ENGLISH_SPEECH: PetMessages['speech'] = {
  frozen: ['Brrr!'],
  cold: ['A bit chilly.'],
  neutral: ['Lovely day.'],
  warm: ['Warm!'],
  hot: ['Too hot!'],
};

afterEach(() => vi.restoreAllMocks());

describe('resolveMessages', () => {
  it('liefert ohne Angabe die englischen Standardtexte', () => {
    expect(resolveMessages()).toEqual(MESSAGES_EN);
  });

  it('überschreibt nur die angegebenen Felder und behält den Rest', () => {
    const resolved = resolveMessages({ tapPet: 'Tap the pet' });

    expect(resolved.tapPet).toBe('Tap the pet');
    expect(resolved.speech).toBe(MESSAGES_EN.speech);
    expect(resolved.events).toBe(MESSAGES_EN.events);
  });

  it('behandelt ein ausdrücklich auf undefined gesetztes Feld wie ein fehlendes', () => {
    expect(resolveMessages({ tapPet: undefined }).tapPet).toBe(MESSAGES_EN.tapPet);
  });
});

describe('pickMessage', () => {
  it('nutzt die Standardtexte, wenn nichts übergeben wird', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0);

    expect(pickMessage('neutral')).toBe(MESSAGES_EN.speech.neutral[0]);
  });

  it('wählt aus den übergebenen Texten', () => {
    const messages = resolveMessages({ speech: ENGLISH_SPEECH });

    expect(pickMessage('cold', messages)).toBe('A bit chilly.');
  });

  it('nutzt ab 28 Grad den Hitze-Pool, unabhängig von der Stimmung', () => {
    const messages = resolveMessages({ speech: ENGLISH_SPEECH });

    expect(pickMessage('hot', messages)).toBe('Too hot!');
    expect(pickMessage('warm', messages)).toBe('Warm!');
  });

  it('nutzt den Pool der übergebenen Stimmung', () => {
    const messages = resolveMessages({ speech: ENGLISH_SPEECH });

    expect(pickMessage('neutral', messages)).toBe('Lovely day.');
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

describe('MESSAGES_EN ist vollständig', () => {
  const messages = MESSAGES_EN;

  it.each([...ALL_PET_TYPES])('hat einen Namen für %s', (type) => {
    expect(messages.petNames[type]).toBeTruthy();
  });

  it('beschriftet ein Tier mit Name und Stimmung', () => {
    expect(messages.spriteLabel('X', 'Y')).toContain('X');
    expect(messages.spriteLabel('X', 'Y')).toContain('Y');
  });

  it.each(MOODS)('hat Sprüche für %s', (mood) => {
    expect(messages.speech[mood].length).toBeGreaterThan(0);
  });

  it.each(EVENT_KINDS)('hat Texte für %s', (kind) => {
    expect(messages.events[kind].length).toBeGreaterThan(0);
  });

  it.each(MOODS)('hat ein Label für %s', (mood) => {
    expect(messages.moodLabels[mood]).toBeTruthy();
  });
});

describe('MESSAGES_EN', () => {
  it('ist englisch', () => {
    expect(MESSAGES_EN.petNames.cat).toBe('Cat');
    expect(MESSAGES_EN.tapPet).toBe('Tap the pet');
    expect(MESSAGES_EN.moodLabels.neutral).toBe('Normal');
  });
});
