import type { PetMessages } from './messages';
import { MESSAGES_EN } from './messages.en';
import { MESSAGES_DE } from './messages.de';

// Die Sprachen, die das Paket selbst mitbringt. Jede weitere Sprache übergibt die Anwendung über `messages`.
export const LANGUAGES = ['en', 'de'] as const;

export type Language = (typeof LANGUAGES)[number];

export const MESSAGES_BY_LANGUAGE: Record<Language, PetMessages> = {
  en: MESSAGES_EN,
  de: MESSAGES_DE,
};
