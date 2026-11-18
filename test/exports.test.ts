import { describe, it, expect } from 'vitest';
import * as core from '../src/core';
import * as api from '../src/index';

const CORE_EXPORTS = [
  'ALL_PET_TYPES',
  'MESSAGES_DE',
  'moodFromTemperature',
  'pickEventMessage',
  'pickMessage',
  'randomPetType',
  'resolveMessages',
  'resolveMood',
];

describe('öffentliche Oberfläche', () => {
  it('core exportiert genau die vorgesehenen Werte', () => {
    expect(Object.keys(core).sort()).toEqual([...CORE_EXPORTS].sort());
  });

  it('index enthält alles aus core', () => {
    for (const name of CORE_EXPORTS) expect(api).toHaveProperty(name);
  });

  it('index exportiert genau Moodmate, MoodmateSprite und MoodHistoryBar zusätzlich zu core', () => {
    const components = Object.keys(api).filter((n) => !CORE_EXPORTS.includes(n));
    expect(components.sort()).toEqual(['MoodHistoryBar', 'Moodmate', 'MoodmateSprite']);
  });
});
