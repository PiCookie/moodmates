import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { renderOverview } from '../scripts/overview.mjs';

// Das Übersichtsbild in der README (docs/moodmates.svg) muss zum gebauten Paket passen.
// Kommt eine Tierart dazu oder ändert sich eine Zeichnung: `pnpm build && pnpm gen:overview`.
describe('Übersichtsbild docs/moodmates.svg', () => {
  it('stimmt mit dem aktuellen Paket überein', () => {
    const committed = readFileSync(resolve(__dirname, '..', 'docs', 'moodmates.svg'), 'utf8');
    expect(
      renderOverview() === committed,
      'docs/moodmates.svg ist veraltet. Neu erzeugen mit: pnpm build && pnpm gen:overview',
    ).toBe(true);
  });
});
