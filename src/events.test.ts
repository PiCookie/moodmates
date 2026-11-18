import { describe, it, expect, vi, afterEach } from 'vitest';
import { pickEventMessage } from './events';
import type { EventKind } from './events';
import { MESSAGES_EN } from './messages.en';

// Die Standardtexte des Pakets sind die englischen
const POOLS: Record<EventKind, readonly string[]> = MESSAGES_EN.events;

const ALL_KINDS: EventKind[] = ['first-frost', 'first-summer', 'heat-record', 'back-online'];

afterEach(() => vi.restoreAllMocks());

describe('pickEventMessage', () => {
  it.each(ALL_KINDS)('gibt für "%s" einen nicht-leeren String zurück', (kind) => {
    const msg = pickEventMessage(kind);
    expect(typeof msg).toBe('string');
    expect(msg.length).toBeGreaterThan(0);
  });

  it.each(ALL_KINDS)('gibt für "%s" immer eine Nachricht aus dem richtigen Pool zurück', (kind) => {
    // 20 Durchläufe decken alle 4 Einträge statistisch zuverlässig ab
    for (let i = 0; i < 20; i++) {
      expect(POOLS[kind]).toContain(pickEventMessage(kind));
    }
  });

  it.each(ALL_KINDS)('kann den ersten Eintrag des Pools von "%s" zurückgeben', (kind) => {
    vi.spyOn(Math, 'random').mockReturnValue(0);
    expect(pickEventMessage(kind)).toBe(POOLS[kind][0]);
  });

  it.each(ALL_KINDS)('kann den letzten Eintrag des Pools von "%s" zurückgeben', (kind) => {
    vi.spyOn(Math, 'random').mockReturnValue(0.9999);
    const pool = POOLS[kind];
    expect(pickEventMessage(kind)).toBe(pool[pool.length - 1]);
  });
});
