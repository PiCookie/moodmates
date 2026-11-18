import { describe, it, expect } from 'vitest';
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, resolve } from 'node:path';

// "Pet" ist eine Marke und soll im veröffentlichten Paket nirgends vorkommen
// (ADR-0006). Das Wort wird hier zusammengesetzt, damit dieser Test sich nicht selbst findet.
const BRAND = new RegExp(['tama', 'gotchi'].join(''), 'i');
const SRC = resolve(__dirname, '../src');

function walk(dir: string): string[] {
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    return statSync(path).isDirectory() ? walk(path) : [path];
  });
}

describe('neutrale Namen im Paket', () => {
  const files = walk(SRC);

  it('findet überhaupt Dateien (Schutz vor leerem Pfad)', () => {
    expect(files.length).toBeGreaterThan(50);
  });

  it('kein Dateiname enthält die Marke', () => {
    expect(files.filter((f) => BRAND.test(f.slice(SRC.length)))).toEqual([]);
  });

  it('kein Dateiinhalt enthält die Marke (Bezeichner, Kommentare, Beschriftungen)', () => {
    expect(files.filter((f) => BRAND.test(readFileSync(f, 'utf8')))).toEqual([]);
  });
});
