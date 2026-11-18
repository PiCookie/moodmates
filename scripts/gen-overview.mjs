// Schreibt docs/moodmates.svg. Aufruf: pnpm build && pnpm gen:overview
import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { renderOverview } from './overview.mjs';

const out = resolve(dirname(fileURLToPath(import.meta.url)), '..', 'docs', 'moodmates.svg');
mkdirSync(dirname(out), { recursive: true });
writeFileSync(out, renderOverview());
console.log(`geschrieben: ${out}`);
