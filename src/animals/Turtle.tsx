/**
 * Turtle im Retro-Stil
 *
 * Bauchansicht: Brauner Panzer (Carapax) im Hintergrund, hellgelbes Plastron
 * (Bauch) im Zentrum. Grüne Gliedmaßen lugen an den Seiten hervor.
 *
 * Schichten (hinten → vorne):
 *   Panzer → Plastron → Muster → Gliedmaßen → Kopf
 *
 * Mood → temperature:
 *   warm    ≥ 22 °C  Sonnenbrille + Wangenrouge
 *   neutral  8–22 °C  runde Augen, kleines Lächeln
 *   cold     0–8 °C  besorgte Augen, Schal, Schneeflocken, Zittern
 *   frozen    < 0 °C  X-Augen, Eiszapfen, Schal, starkes Zittern
 */

import type { Mood, AnimalProps } from '../shared';
import { resolveMood, OUTLINE } from '../shared';
import {
  PetSvg, PetShadow, PetIcicles, PetSun,
  PetSweat, PetSnowflakes, PetScarf, PetBlush,
  PetSunglasses, PetFrozenEyes, PetWorriedBrows,
} from '../petParts';

/** Gliedmaßen + Kopf */
const TURTLE_LIMB: Record<Mood, string> = {
  frozen:  '#c7d2fe',
  cold:    '#ccfbf1',
  neutral: '#86efac',
  warm:    '#d9f99d',
};

const TURTLE_LIMB_DARK: Record<Mood, string> = {
  frozen:  '#6366f1',
  cold:    '#0d9488',
  neutral: '#15803d',
  warm:    '#65a30d',
};

/** Panzer (Carapax) — braun/olive */
const TURTLE_SHELL: Record<Mood, string> = {
  frozen:  '#6878a0',
  cold:    '#7a6030',
  neutral: '#7a5c1e',
  warm:    '#8b6014',
};

/** Plastron (Bauch) — gelblich-creme */
const TURTLE_BELLY: Record<Mood, string> = {
  frozen:  '#b8c8dc',
  cold:    '#d8cc88',
  neutral: '#d4c458',
  warm:    '#dcc038',
};

export function Turtle({ temperature, size = 80, blinking = false, mood: moodOverride, ariaLabel }: AnimalProps) {
  const mood  = resolveMood(temperature, moodOverride);
  const isHot = temperature !== null && temperature >= 28;
  const limb  = TURTLE_LIMB[mood];
  const lDark = TURTLE_LIMB_DARK[mood];
  const shell = TURTLE_SHELL[mood];
  const belly = TURTLE_BELLY[mood];

  return (
    <PetSvg size={size} shivering={mood === 'cold' || mood === 'frozen'} ariaLabel={ariaLabel}>
      <PetShadow cx={33} />
      <PetIcicles mood={mood} y={74} />

      {/* ── Panzer (Carapax) im Hintergrund — braun, breiter Rand um Plastron ── */}
      <ellipse cx="32" cy="56" rx="22" ry="17" fill={shell} stroke={OUTLINE} strokeWidth="1.5" />

      {/* ── Plastron (Bauch) — gelblich, zentral vorne ── */}
      <ellipse cx="32" cy="56" rx="14" ry="13" fill={belly} stroke={OUTLINE} strokeWidth="1" />

      {/* ── Plastron-Muster (vereinfachtes Schildkröten-Muster) ── */}
      <line x1="32" y1="44" x2="32" y2="68" stroke={OUTLINE} strokeWidth="0.9" opacity="0.3" />
      <line x1="32" y1="51" x2="22" y2="49" stroke={OUTLINE} strokeWidth="0.9" opacity="0.25" />
      <line x1="32" y1="51" x2="42" y2="49" stroke={OUTLINE} strokeWidth="0.9" opacity="0.25" />
      <line x1="32" y1="61" x2="20" y2="63" stroke={OUTLINE} strokeWidth="0.9" opacity="0.25" />
      <line x1="32" y1="61" x2="44" y2="63" stroke={OUTLINE} strokeWidth="0.9" opacity="0.25" />

      {/* ── Gliedmaßen (vor Panzer/Bauch, hinter Kopf) ── */}
      <ellipse cx="11"  cy="57" rx="7" ry="4.5" fill={limb} stroke={lDark} strokeWidth="1.5" />
      <ellipse cx="53" cy="57" rx="7" ry="4.5" fill={limb} stroke={lDark} strokeWidth="1.5" />
      <ellipse cx="22" cy="72" rx="8" ry="3.5" fill={limb} stroke={lDark} strokeWidth="1.5" />
      <ellipse cx="42" cy="72" rx="8" ry="3.5" fill={limb} stroke={lDark} strokeWidth="1.5" />

      <PetSnowflakes mood={mood} left={{ x: 3, y: 44 }} right={{ x: 62, y: 39 }} />
      <PetSun mood={mood} />
      <PetSweat isHot={isHot} y={36} />

      {/* ── Kopf (grün, vorne) ── */}
      <circle cx="32" cy="30" r="13" fill={limb} stroke={lDark} strokeWidth="1.5" />

      {/* ── Augen ── */}
      {mood === 'neutral' && (blinking ? (
        <>
          <line x1="23" y1="27" x2="29" y2="27" stroke={OUTLINE} strokeWidth="2.5" strokeLinecap="round" />
          <line x1="35" y1="27" x2="41" y2="27" stroke={OUTLINE} strokeWidth="2.5" strokeLinecap="round" />
        </>
      ) : (
        <>
          <circle cx="26" cy="27" r="3.5" fill={OUTLINE} />
          <circle cx="38" cy="27" r="3.5" fill={OUTLINE} />
          <circle cx="24.8" cy="25.8" r="1.2" fill="white" opacity="0.65" />
          <circle cx="36.8" cy="25.8" r="1.2" fill="white" opacity="0.65" />
        </>
      ))}

      <PetSunglasses
        mood={mood}
        frame={{ y: 21, w: 13, h: 11, rx: 4 }}
        leftX={17} rightX={36}
        leftTemple={[17, 27, 11, 30]}
        rightTemple={[49, 27, 55, 30]}
      />

      <PetWorriedBrows
        mood={mood}
        leftBrow={{ x1: 20, y1: 22, x2: 30, y2: 25 }}
        rightBrow={{ x1: 34, y1: 25, x2: 44, y2: 22 }}
      />
      {mood === 'cold' && (
        <>
          <circle cx="26" cy="28" r="3.5" fill={OUTLINE} />
          <circle cx="38" cy="28" r="3.5" fill={OUTLINE} />
          <circle cx="24.8" cy="26.8" r="1.2" fill="white" opacity="0.65" />
          <circle cx="36.8" cy="26.8" r="1.2" fill="white" opacity="0.65" />
        </>
      )}

      <PetFrozenEyes
        mood={mood}
        leftBox={{ l: 20, t: 23, r: 31, b: 34 }}
        rightBox={{ l: 33, t: 23, r: 44, b: 34 }}
      />

      {/* ── Nasenlöcher ── */}
      <circle cx="29.5" cy="33" r="1.3" fill={lDark} opacity="0.6" />
      <circle cx="34.5" cy="33" r="1.3" fill={lDark} opacity="0.6" />

      <PetBlush mood={mood} leftCx={18} rightCx={46} cy={35} rx={5} ry={3} />

      {/* ── Mund ── */}
      {(mood === 'neutral' || mood === 'warm') && (
        <path d="M27,37 Q32,41 37,37" stroke={OUTLINE} strokeWidth="1.5" strokeLinecap="round" fill="none" />
      )}
      {mood === 'cold' && (
        <path d="M27,39 Q32,35 37,39" stroke={OUTLINE} strokeWidth="1.5" strokeLinecap="round" fill="none" />
      )}
      {mood === 'frozen' && (
        <path d="M24,37 Q27,34 30,37 Q33,40 36,37 Q39,34 42,37" stroke={OUTLINE} strokeWidth="1.5" strokeLinecap="round" fill="none" />
      )}

      <PetScarf mood={mood} x={16} y={40} width={32} knotCx={47} knotCy={44} small />
    </PetSvg>
  );
}
