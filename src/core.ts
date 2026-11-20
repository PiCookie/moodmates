// Einstiegspunkt ohne React: Tierliste, Stimmung, Ereignistypen und Texte.
// Für Code, der die Komponenten nicht braucht (z. B. ein Backend). Alles, was hier
// exportiert wird, darf weder React noch CSS importieren (siehe core.test.ts).
export { ALL_PET_TYPES, COMING_SOON_PET_TYPES, randomPetType } from './pets';
export type { PetType } from './pets';
export { PET_CATEGORIES, petCategoryOf, petTypesIn } from './categories';
export type { PetCategory } from './categories';
export type { Mood } from './shared';
export { pickEventMessage } from './events';
export type { EventKind, DetectedEvent } from './events';
export { pickMessage, resolveMessages } from './messages';
export type { PetMessages } from './messages';
export { MESSAGES_EN } from './messages.en';
export { MESSAGES_DE } from './messages.de';
export { LANGUAGES } from './languages';
export type { Language } from './languages';
