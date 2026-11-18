import { describe, it, expect } from 'vitest';
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { createRequire } from 'node:module';
import { resolve } from 'node:path';
import { renderToString } from 'react-dom/server';
import { createElement } from 'react';

// Prüft das gebaute Paket so, wie es ein Außenstehender nutzt (npm-Paket, nicht die Quellen).
// Voraussetzung: `pnpm build`.
const ROOT = resolve(__dirname, '..');
const DIST = resolve(ROOT, 'dist');
const require = createRequire(import.meta.url);

const CORE_EXPORTS = [
  'ALL_PET_TYPES', 'MESSAGES_DE', 'MESSAGES_EN', 'moodFromTemperature', 'pickEventMessage',
  'pickMessage', 'randomPetType', 'resolveMessages', 'resolveMood',
];

function exportTargets(): string[] {
  const pkg = JSON.parse(readFileSync(resolve(ROOT, 'package.json'), 'utf8'));
  const targets: string[] = [];
  const walk = (node: unknown) => {
    if (typeof node === 'string') targets.push(node);
    else if (node && typeof node === 'object') Object.values(node).forEach(walk);
  };
  walk(pkg.exports);
  [pkg.main, pkg.module, pkg.types].forEach((t) => targets.push(t));
  return targets;
}

describe('gebautes Paket (dist)', () => {
  it('liegt vor (zuerst pnpm build ausführen)', () => {
    expect(existsSync(DIST)).toBe(true);
  });

  it('jeder Pfad in package.json (exports, main, module, types) zeigt auf eine echte Datei', () => {
    for (const target of exportTargets()) {
      expect(existsSync(resolve(ROOT, target)), target).toBe(true);
    }
  });

  it('core lässt sich als ESM laden und exportiert genau die vorgesehenen Werte', async () => {
    const core = await import(resolve(DIST, 'core.js'));

    expect(Object.keys(core).sort()).toEqual([...CORE_EXPORTS].sort());
    expect(core.ALL_PET_TYPES).toHaveLength(45);
  });

  it('core lässt sich als CommonJS laden (z. B. aus einem Backend)', () => {
    const core = require(resolve(DIST, 'core.cjs'));

    expect(Object.keys(core).sort()).toEqual([...CORE_EXPORTS].sort());
    expect(core.moodFromTemperature(-3)).toBe('frozen');
  });

  it('core zieht weder React noch CSS mit', () => {
    const files = readdirSync(DIST).filter((f) => /^(core|chunk).*\.(js|cjs)$/.test(f));
    for (const file of files) {
      const code = readFileSync(resolve(DIST, file), 'utf8');
      expect(code, file).not.toMatch(/from ['"]react|require\(['"]react|\.css['"]/);
    }
  });

  it('der Haupteinstieg lässt sich als ESM und CommonJS laden und exportiert nur die vorgesehenen Komponenten', async () => {
    const esm = await import(resolve(DIST, 'index.js'));
    const cjs = require(resolve(DIST, 'index.cjs'));

    for (const api of [esm, cjs]) {
      for (const name of ['Moodmate', 'MoodmateSprite', 'MoodHistoryBar']) expect(api).toHaveProperty(name);
      const leaked = Object.keys(api).filter((n) => n.startsWith('Pet'));
      expect(leaked).toEqual([]);
    }
  });

  it('rendert ein Tier aus dem gebauten Paket serverseitig', async () => {
    const { Moodmate } = await import(resolve(DIST, 'index.js'));

    const html = renderToString(createElement(Moodmate, { temperature: 20, type: 'cat', name: 'Mimi' }));

    expect(html).toContain('<svg');
    expect(html).toContain('mm-pet');
    expect(html).toContain('Mimi');
  });

  it('liefert das Stylesheet mit Klassen, Keyframes und Reduced-Motion-Regel', () => {
    const css = readFileSync(resolve(DIST, 'styles.css'), 'utf8');

    expect(css).toContain('.mm-bubble');
    expect(css).toContain('@keyframes mm-shiver');
    expect(css).toContain('prefers-reduced-motion');
  });

  it('die Typen des core-Einstiegs hängen nicht an React', () => {
    const types = readFileSync(resolve(DIST, 'core.d.ts'), 'utf8');

    expect(types).not.toMatch(/from ['"]react/);
  });
});
