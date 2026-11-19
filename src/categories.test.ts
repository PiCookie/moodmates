import { describe, it, expect } from 'vitest';
import { ALL_PET_TYPES } from './pets';
import { PET_CATEGORIES, petCategoryOf, petTypesIn } from './categories';
import { MESSAGES_EN } from './messages.en';

describe('Kategorien', () => {
  it('ordnet jede Art genau einer Kategorie zu', () => {
    const all = PET_CATEGORIES.flatMap((category) => petTypesIn(category));

    expect([...all].sort()).toEqual([...ALL_PET_TYPES].sort());
  });

  it.each(PET_CATEGORIES)('Kategorie %s ist nicht leer und hat einen Namen', (category) => {
    expect(petTypesIn(category).length).toBeGreaterThan(0);
    expect(MESSAGES_EN.categoryNames[category]).toBeTruthy();
  });

  it('petCategoryOf und petTypesIn passen zusammen', () => {
    for (const type of ALL_PET_TYPES) {
      expect(petTypesIn(petCategoryOf(type))).toContain(type);
    }
  });

  it('hält die Reihenfolge von ALL_PET_TYPES innerhalb einer Kategorie', () => {
    expect(petTypesIn('pets')).toEqual(['cat', 'dog', 'rabbit', 'hamster']);
  });

  it('kennt genau die vorgesehenen Kategorien in dieser Anzeigereihenfolge', () => {
    expect(PET_CATEGORIES).toEqual([
      'pets', 'africa', 'asia', 'south-america', 'antarctica', 'nature', 'sea', 'dinosaurs',
    ]);
  });

  it('hat alle sechs Dinosaurier in der Kategorie dinosaurs', () => {
    expect(petTypesIn('dinosaurs')).toEqual([
      'trex', 'triceratops', 'stegosaurus', 'brachiosaurus', 'pteranodon', 'ankylosaurus',
    ]);
  });
});
