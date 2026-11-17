import { describe, it, expect } from 'vitest';
import { moodFromTemperature } from './pet.shared';

describe('moodFromTemperature()', () => {
  it('returns "neutral" for null temperature', () => {
    expect(moodFromTemperature(null)).toBe('neutral');
  });

  it('returns "frozen" below 0°C', () => {
    expect(moodFromTemperature(-0.1)).toBe('frozen');
    expect(moodFromTemperature(-10)).toBe('frozen');
    expect(moodFromTemperature(-273)).toBe('frozen');
  });

  it('returns "cold" from 0°C up to (but not including) 8°C', () => {
    expect(moodFromTemperature(0)).toBe('cold');
    expect(moodFromTemperature(4)).toBe('cold');
    expect(moodFromTemperature(7.9)).toBe('cold');
  });

  it('returns "neutral" from 8°C up to (but not including) 22°C', () => {
    expect(moodFromTemperature(8)).toBe('neutral');
    expect(moodFromTemperature(15)).toBe('neutral');
    expect(moodFromTemperature(21.9)).toBe('neutral');
  });

  it('returns "warm" at 22°C and above', () => {
    expect(moodFromTemperature(22)).toBe('warm');
    expect(moodFromTemperature(30)).toBe('warm');
    expect(moodFromTemperature(50)).toBe('warm');
  });
});
