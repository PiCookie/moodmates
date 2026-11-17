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

  it('index exportiert Moodmate, MoodHistoryBar und alle 45 Tiere', () => {
    expect(api).toHaveProperty('Moodmate');
    expect(api).toHaveProperty('MoodHistoryBar');
    const animals = Object.keys(api).filter((n) => n.startsWith('Pet') && n !== 'Moodmate');
    expect(animals).toHaveLength(45);
  });
});
