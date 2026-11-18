import { describe, it, expect, afterEach, vi } from 'vitest';
import { render } from '@testing-library/react';
import { ALL_PET_TYPES, COMING_SOON_PET_TYPES, randomPetType } from './pets';
import { Moodmate } from './Moodmate';

describe('ALL_PET_TYPES', () => {
  it('lists 45 distinct pets', () => {
    expect(ALL_PET_TYPES).toHaveLength(45);
    expect(new Set(ALL_PET_TYPES).size).toBe(ALL_PET_TYPES.length);
  });

  // Schlägt fehl, wenn ein Tier in der Liste steht, aber in Moodmate nicht gerendert wird.
  it.each([...ALL_PET_TYPES])('renders %s as an SVG', (type) => {
    const { container } = render(<Moodmate mood="neutral" type={type} />);

    expect(container.querySelector('svg')).not.toBeNull();
  });
});

describe('randomPetType', () => {
  afterEach(() => vi.restoreAllMocks());

  it('returns the first pet for the lowest random value', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0);

    expect(randomPetType()).toBe(ALL_PET_TYPES[0]);
  });

  it('returns the last pet for the highest random value', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0.999999);

    expect(randomPetType()).toBe(ALL_PET_TYPES[ALL_PET_TYPES.length - 1]);
  });
});

describe('COMING_SOON_PET_TYPES', () => {
  it('enthält nur echte Arten, ohne Doppelte', () => {
    for (const type of COMING_SOON_PET_TYPES) expect(ALL_PET_TYPES).toContain(type);
    expect(new Set(COMING_SOON_PET_TYPES).size).toBe(COMING_SOON_PET_TYPES.length);
  });

  it('randomPetType wählt keine Art, die noch nicht fertig ist', () => {
    for (let i = 0; i <= 200; i++) {
      vi.spyOn(Math, 'random').mockReturnValue(i / 200 === 1 ? 0.999999 : i / 200);
      expect(COMING_SOON_PET_TYPES as readonly string[]).not.toContain(randomPetType());
    }
    vi.restoreAllMocks();
  });
});
