// Erzeugt das Übersichtsbild aller Tierarten (docs/moodmates.svg) aus dem gebauten Paket.
// Voraussetzung: `pnpm build`. Alles wird in EINEM Renderdurchgang erzeugt, damit die per useId
// vergebenen SVG-IDs (Frosch, Seepferdchen, Igel) im Bild eindeutig bleiben.
import { createElement as h } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { ALL_PET_TYPES, MESSAGES_EN, MoodmateSprite } from '../dist/index.js';

const SIZE = 64;
const COLS = 9;
const CELL_W = 140;
const CELL_H = 122;
const PAD = 24;
const TITLE_H = 60;
const SECTION_GAP = 28;
const MOODS = ['frozen', 'cold', 'neutral', 'warm', 'hot'];

const INK = '#3d2b1f';
const MUTED = '#7a6a5e';
const FONT = 'system-ui, -apple-system, "Segoe UI", sans-serif';

// Breite und Höhe der Zeichnung kommen aus dem SVG selbst (breite Tiere sind breiter als hoch skaliert).
function spriteBox(type) {
  const svg = renderToStaticMarkup(h(MoodmateSprite, { type, mood: 'neutral', size: SIZE }));
  const m = /<svg width="(\d+)" height="(\d+)"/.exec(svg);
  if (!m) throw new Error(`Keine Größe für ${type} gefunden`);
  return { w: Number(m[1]), h: Number(m[2]) };
}

function cell(x, y, type, mood, label) {
  const box = spriteBox(type);
  return h('g', { key: `${type}-${mood}` },
    h('g', { transform: `translate(${x + (CELL_W - box.w) / 2} ${y})` },
      h(MoodmateSprite, { type, mood, size: SIZE })),
    h('text', {
      x: x + CELL_W / 2, y: y + box.h + 18, textAnchor: 'middle',
      fontFamily: FONT, fontSize: 13, fill: MUTED,
    }, label));
}

export function renderOverview() {
  const rows = Math.ceil(ALL_PET_TYPES.length / COLS);
  const width = PAD * 2 + COLS * CELL_W;
  const gridTop = PAD + TITLE_H;
  const moodTop = gridTop + rows * CELL_H + SECTION_GAP;
  const height = moodTop + 40 + CELL_H + PAD;

  const grid = ALL_PET_TYPES.map((type, i) =>
    cell(PAD + (i % COLS) * CELL_W, gridTop + Math.floor(i / COLS) * CELL_H, type, 'neutral', type));

  const moodX = (width - MOODS.length * CELL_W) / 2;
  const moods = MOODS.map((mood, i) =>
    cell(moodX + i * CELL_W, moodTop + 40, 'cat', mood, MESSAGES_EN.moodLabels[mood]));

  const svg = h('svg', {
    xmlns: 'http://www.w3.org/2000/svg', width, height, viewBox: `0 0 ${width} ${height}`,
    role: 'img', 'aria-label': `All ${ALL_PET_TYPES.length} moodmates species`,
  },
    h('rect', { width, height, rx: 16, fill: '#fbf8f2' }),
    h('text', { x: PAD, y: PAD + 26, fontFamily: FONT, fontSize: 24, fontWeight: 700, fill: INK },
      `moodmates: ${ALL_PET_TYPES.length} species`),
    ...grid,
    h('text', { x: width / 2, y: moodTop + 14, textAnchor: 'middle', fontFamily: FONT, fontSize: 16, fontWeight: 600, fill: INK },
      'One animal, five moods'),
    ...moods);

  return renderToStaticMarkup(svg) + '\n';
}
