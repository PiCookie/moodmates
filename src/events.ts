import type { PetMessages } from './messages';
import { MESSAGES_DE } from './messages.de';

export type EventKind = 'first-frost' | 'first-summer' | 'heat-record' | 'back-online';

export interface DetectedEvent {
  kind: EventKind;
}

export function pickEventMessage(kind: EventKind, messages: PetMessages = MESSAGES_DE): string {
  const pool = messages.events[kind];
  return pool[Math.floor(Math.random() * pool.length)];
}
