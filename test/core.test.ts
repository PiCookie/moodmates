import { describe, it, expect } from 'vitest';
import { existsSync, readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const SRC = resolve(dirname(fileURLToPath(import.meta.url)), '../src');

// Folgt allen relativen Importen ab core.ts und sammelt die nicht relativen (Pakete, CSS).
function collectExternalImports(entry: string): { files: Set<string>; external: string[] } {
  const files = new Set<string>();
  const external: string[] = [];
  const visit = (file: string) => {
    if (files.has(file)) return;
    files.add(file);
    const code = readFileSync(file, 'utf8');
    for (const [, specifier] of code.matchAll(/(?:from|import)\s+['"]([^'"]+)['"]/g)) {
      if (!specifier.startsWith('.')) { external.push(specifier); continue; }
      const base = resolve(dirname(file), specifier);
      const target = ['.ts', '.tsx', ''].map((ext) => base + ext).find((p) => existsSync(p) && /\.tsx?$/.test(p));
      if (target) visit(target);
      else external.push(specifier);
    }
  };
  visit(entry);
  return { files, external };
}

describe('core.ts', () => {
  const { files, external } = collectExternalImports(resolve(SRC, 'core.ts'));

  it('erreicht die Module, die es exportieren soll', () => {
    const names = [...files].map((f) => f.slice(SRC.length + 1));
    expect(names).toEqual(expect.arrayContaining(['pets.ts', 'shared.ts', 'events.ts', 'messages.ts', 'messages.en.ts']));
  });

  // Das Backend lädt nur core. Es darf dafür weder React noch CSS mitziehen.
  it('importiert weder React noch CSS noch irgendein Paket', () => {
    expect(external).toEqual([]);
  });
});
