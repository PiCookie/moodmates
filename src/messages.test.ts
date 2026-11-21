import { describe, it, expect, vi, afterEach } from 'vitest';
import { pickMessage, resolveMessages } from './messages';
import type { PetMessages } from './messages';
import { pickEventMessage } from './events';
import type { EventKind } from './events';
import { MESSAGES_EN } from './messages.en';
import { MESSAGES_DE } from './messages.de';
import { LANGUAGES } from './languages';
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

describe('Standardsprüche sind nicht wetterabhängig', () => {
  // Die Stimmungen sind eine Komfortskala; die Sprüche sollen auch zu anderen Daten als Wetter passen.
  const WEATHER = {
    en: /weather|spring|autumn|summer|winter|sunscreen|\blake\b|barbecue|\brain|snow|forecast/i,
    de: /wetter|frühling|herbst|sommer|winter|sonnencreme|\bsee\b|grill|regen|schnee|vorhersage/i,
  };

  describe.each([['en', MESSAGES_EN], ['de', MESSAGES_DE]] as const)('%s', (language, messages) => {
    it.each(['frozen', 'cold', 'neutral', 'warm', 'hot'] as const)('%s: kein Spruch handelt vom Wetter', (mood) => {
      const offending = messages.speech[mood].filter((text) => WEATHER[language].test(text));

      expect(offending).toEqual([]);
    });
  });
});

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

describe('Sprachen', () => {
  const PETS_AND_MOODS = { moods: MOODS, events: EVENT_KINDS };

  it('LANGUAGES nennt Englisch und Deutsch', () => {
    expect([...LANGUAGES]).toEqual(['en', 'de']);
  });

  it('nimmt ohne Sprache Englisch', () => {
    expect(resolveMessages().tapPet).toBe(MESSAGES_EN.tapPet);
    expect(resolveMessages(undefined, 'en')).toEqual(resolveMessages());
  });

  it('nimmt mit language="de" die deutschen Texte', () => {
    const messages = resolveMessages(undefined, 'de');

    expect(messages.speech).toBe(MESSAGES_DE.speech);
    expect(messages.tapPet).toBe('Tier antippen');
    expect(messages.petNames.cat).toBe('Katze');
  });

  it('lässt eigene Texte vor der Sprache gelten, den Rest nimmt er aus der Sprache', () => {
    const messages = resolveMessages({ tapPet: 'Streicheln' }, 'de');

    expect(messages.tapPet).toBe('Streicheln');
    expect(messages.moodLabels).toBe(MESSAGES_DE.moodLabels);
  });

  it('fällt bei einer unbekannten Sprache auf Englisch zurück', () => {
    expect(resolveMessages(undefined, 'fr' as never).tapPet).toBe(MESSAGES_EN.tapPet);
  });

  it.each([...ALL_PET_TYPES])('MESSAGES_DE hat einen Namen für %s', (type) => {
    expect(MESSAGES_DE.petNames[type]).toBeTruthy();
  });

  it.each(PETS_AND_MOODS.moods)('MESSAGES_DE hat Sprüche und ein Label für %s', (mood) => {
    expect(MESSAGES_DE.speech[mood].length).toBeGreaterThan(0);
    expect(MESSAGES_DE.moodLabels[mood]).toBeTruthy();
  });

  it.each(PETS_AND_MOODS.events)('MESSAGES_DE hat Texte für %s', (kind) => {
    expect(MESSAGES_DE.events[kind].length).toBeGreaterThan(0);
  });

  it('MESSAGES_DE hat so viele Sprüche wie MESSAGES_EN (nichts vergessen, nichts erfunden)', () => {
    for (const mood of MOODS) expect(MESSAGES_DE.speech[mood]).toHaveLength(MESSAGES_EN.speech[mood].length);
    for (const kind of EVENT_KINDS) expect(MESSAGES_DE.events[kind]).toHaveLength(MESSAGES_EN.events[kind].length);
  });

  it('MESSAGES_DE übersetzt Sprüche wirklich (kein Satz ist wortgleich mit dem englischen)', () => {
    const english = new Set([...MOODS.flatMap((m) => MESSAGES_EN.speech[m]), ...EVENT_KINDS.flatMap((k) => MESSAGES_EN.events[k])]);
    const same = [...MOODS.flatMap((m) => MESSAGES_DE.speech[m]), ...EVENT_KINDS.flatMap((k) => MESSAGES_DE.events[k])]
      .filter((text) => english.has(text));

    expect(same).toEqual([]);
  });

  it('MESSAGES_DE beschriftet Tier und Stundenwert auf Deutsch', () => {
    expect(MESSAGES_DE.spriteLabel('Katze', 'Warm')).toBe('Katze: Warm');
    expect(MESSAGES_DE.moodBarHourTitle('14', 'Warm')).toBe('14:00 Uhr – Warm');
  });
});
