import { describe, it, expect } from 'vitest';
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, resolve } from 'node:path';

// Das Paket kennt nur Stimmungen. Welche Messwerte zu welcher Stimmung führen, entscheidet die
// Anwendung (ADR-0006). Eine Prop oder Variable "temperature" wäre der Weg zurück in die Kopplung.
const SRC = resolve(__dirname, '../src');
const SKIPPED = /\.test\.tsx?$|messages\.en\.ts$/; // Tests und englische Nutzertexte ("Perfect temperature")

function walk(dir: string): string[] {
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    return statSync(path).isDirectory() ? walk(path) : [path];
  });
}

describe('keine Temperaturen im Paket', () => {
  const files = walk(SRC).filter((f) => !SKIPPED.test(f));

  it('prüft überhaupt Dateien', () => {
    expect(files.length).toBeGreaterThan(50);
  });

  it('kein Quellcode nutzt "temperature"', () => {
    expect(files.filter((f) => /\btemperature\b/i.test(readFileSync(f, 'utf8')))).toEqual([]);
  });
});
