import type { PetMessages } from './messages';
import { MESSAGES_EN } from './messages.en';

export type EventKind = 'first-frost' | 'first-summer' | 'heat-record' | 'back-online';

export interface DetectedEvent {
  kind: EventKind;
}

export function pickEventMessage(kind: EventKind, messages: PetMessages = MESSAGES_EN): string {
  const pool = messages.events[kind];
  return pool[Math.floor(Math.random() * pool.length)];
}
