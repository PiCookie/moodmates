// Haupteinstiegspunkt: Komponenten (benötigt React) plus alles aus core.
// Die einzelnen Tiere sind bewusst nicht exportiert (ADR-0006), sie sind über `type` wählbar.
export * from './core';
export { Moodmate } from './Moodmate';
export type { MoodmateProps } from './Moodmate';
export { MoodmateSprite } from './MoodmateSprite';
export type { MoodmateSpriteProps } from './MoodmateSprite';
export type { PetProps } from './shared';
export { MoodHistoryBar } from './MoodHistoryBar';
