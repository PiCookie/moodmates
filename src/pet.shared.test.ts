import { describe, it, expect } from 'vitest';
import { getMood } from './pet.shared';

describe('getMood()', () => {
  it('returns "neutral" for null temperature', () => {
    expect(getMood(null)).toBe('neutral');
  });

  it('returns "frozen" below 0°C', () => {
    expect(getMood(-0.1)).toBe('frozen');
    expect(getMood(-10)).toBe('frozen');
    expect(getMood(-273)).toBe('frozen');
  });

  it('returns "cold" from 0°C up to (but not including) 8°C', () => {
    expect(getMood(0)).toBe('cold');
    expect(getMood(4)).toBe('cold');
    expect(getMood(7.9)).toBe('cold');
  });

  it('returns "neutral" from 8°C up to (but not including) 22°C', () => {
    expect(getMood(8)).toBe('neutral');
    expect(getMood(15)).toBe('neutral');
    expect(getMood(21.9)).toBe('neutral');
  });

  it('returns "warm" at 22°C and above', () => {
    expect(getMood(22)).toBe('warm');
    expect(getMood(30)).toBe('warm');
    expect(getMood(50)).toBe('warm');
  });
});
