// Einstiegspunkt ohne React: Tierliste, Stimmung, Ereignistypen und Texte.
// Für Code, der die Komponenten nicht braucht (z. B. ein Backend). Alles, was hier
// exportiert wird, darf weder React noch CSS importieren (siehe core.test.ts).
export { ALL_PET_TYPES, randomPetType } from './pets';
export type { PetType } from './pets';
export { moodFromTemperature, resolveMood } from './pet.shared';
export type { Mood } from './pet.shared';
export { pickEventMessage } from './pet.events';
export type { EventKind, DetectedEvent } from './pet.events';
export { pickMessage, resolveMessages } from './pet.messages';
export type { PetMessages } from './pet.messages';
export { MESSAGES_DE } from './messages.de';
