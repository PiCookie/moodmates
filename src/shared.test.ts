import { describe, it, expect } from 'vitest';
import { lookOf } from './shared';

describe('lookOf()', () => {
  it('zeigt "hot" wie "warm", aber mit Schweiß', () => {
    expect(lookOf('hot')).toEqual({ look: 'warm', isHot: true });
  });

  it.each(['frozen', 'cold', 'neutral', 'warm'] as const)('lässt "%s" unverändert und ohne Schweiß', (mood) => {
    expect(lookOf(mood)).toEqual({ look: mood, isHot: false });
  });
});
