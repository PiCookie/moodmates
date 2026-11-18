import { describe, expect, it } from 'vitest';
import { bubbleLeftPx } from './bubble';
import { ALL_PET_TYPES } from './pets';

describe('bubbleLeftPx', () => {
  it('beginnt bei normalen Tieren am rechten Rand der Grafik, 16 px überlappend', () => {
    expect(bubbleLeftPx('cat', 66)).toBe(50);
    expect(bubbleLeftPx('cat', 132)).toBe(116);
  });

  it('ist für alle Tiere mit Körpermitte 33 gleich, auch für Wale und Hai', () => {
    for (const type of ['dog', 'blue-whale', 'sperm-whale', 'killer-whale', 'beluga', 'shark'] as const) {
      expect(bubbleLeftPx(type, 80)).toBe(bubbleLeftPx('cat', 80));
    }
  });

  it('folgt beim Narwal der weiter rechts liegenden Körpermitte', () => {
    expect(bubbleLeftPx('narwhal', 66)).toBe(75);
  });

  it('liefert für jede Art eine endliche Zahl', () => {
    for (const type of ALL_PET_TYPES) {
      expect(Number.isFinite(bubbleLeftPx(type, 80))).toBe(true);
    }
  });
});
