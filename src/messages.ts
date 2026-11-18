import type { Mood } from './shared';
import type { EventKind } from './events';
import type { PetType } from './pets';
import { MESSAGES_DE } from './messages.de';

// Alle Texte, die die Tiere selbst anzeigen. Eigene Texte werden als Teil-Objekt übergeben,
// fehlende Felder fallen auf die deutschen Standardtexte zurück (siehe resolveMessages).
export interface PetMessages {
  /** Sprüche beim Antippen und zwischendurch je Stimmung; "hot" gilt ab 28 °C */
  speech: Record<Mood | 'hot', readonly string[]>;
  /** Sprechblasen bei Ereignissen (erster Frost, Rekord, …) */
  events: Record<EventKind, readonly string[]>;
  moodLabels: Record<Mood, string>;
  /** Anzeigename je Tierart, z. B. für die Beschriftung für Screenreader */
  petNames: Record<PetType, string>;
  /** Beschriftung des Tierbilds für Screenreader, z. B. "Katze: Warm" */
  spriteLabel: (petName: string, moodLabel: string) => string;
  /** Beschriftung für Screenreader am antippbaren Tier */
  tapPet: string;
  moodBarAriaLabel: string;
  /** Tooltip eines Stundensegments, z. B. "14:00 – Warm" (hour ist zweistellig) */
  moodBarHourTitle: (hour: string, moodLabel: string) => string;
}

export function resolveMessages(overrides?: Partial<PetMessages>): PetMessages {
  const given = Object.entries(overrides ?? {}).filter(([, value]) => value !== undefined);
  return { ...MESSAGES_DE, ...Object.fromEntries(given) };
}

export function pickMessage(
  mood: Mood,
  temperature: number | null,
  messages: PetMessages = MESSAGES_DE,
): string {
  const pool =
    temperature !== null && temperature >= 28 ? messages.speech.hot : messages.speech[mood];
  return pool[Math.floor(Math.random() * pool.length)];
}
