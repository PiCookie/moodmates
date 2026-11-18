/**
 * Eisbär im Retro-Stil
 *
 * Erkennungsmerkmale: Weißes/eisiges Fell (mood-tinted: eisblau=frozen,
 * blassblau=cold, nahezu weiß=neutral, cremefarben=warm),
 * charakteristische schwarze Nase.
 *
 * Basis: Bear — identische Struktur, andere Farben.
 * Kategorie: 🐧 Antarktis
 *
 * Look (the ranges below are only an example, the app decides):
 *   warm    ≥ 22 °C  Sonnenbrille + Wangenrouge
 *   neutral  8–22 °C  runde Augen, entspanntes Lächeln
 *   cold     0–8 °C  besorgte Augen, Schal, Schneeflocken, Zittern
 *   frozen    < 0 °C  X-Augen, Eiszapfen, Schal, starkes Zittern
 */

import type { Look, AnimalProps } from '../shared';
import { OUTLINE } from '../shared';
import {
  PetSvg, PetShadow, PetIcicles, PetSun,
  PetSweat, PetSnowflakes, PetScarf, PetBlush,
  PetSunglasses, PetFrozenEyes, PetWorriedBrows,
} from '../petParts';

const EISBEAR_FUR: Record<Look, string> = {
  frozen:  '#93c5fd', // eisblau
  cold:    '#bfdbfe', // helles eisblau
  neutral: '#f0f9ff', // nahezu weiß
  warm:    '#fef9f0', // cremefarben
};

const EISBEAR_BELLY: Record<Look, string> = {
  frozen:  '#dbeafe',
  cold:    '#eff6ff',
  neutral: '#ffffff',
  warm:    '#fffbeb',
};

const EISBEAR_EAR_INNER = '#fcd5ce';

export function PolarBear({ mood, isHot, size = 80, blinking = false, ariaLabel }: AnimalProps) {
  const fur   = EISBEAR_FUR[mood];
  const belly = EISBEAR_BELLY[mood];

  return (
    <PetSvg size={size} shivering={mood === 'cold' || mood === 'frozen'} ariaLabel={ariaLabel}>
      <PetShadow cx={33} />
      <PetIcicles mood={mood} y={72} />

      {/* ── Körper ── */}
      <ellipse cx="32" cy="64" rx="14" ry="12" fill={fur} stroke={OUTLINE} strokeWidth="1.5" />

      {/* ── Arme (vor Körper) ── */}
      <ellipse cx="14" cy="60" rx="5" ry="7" fill={fur} stroke={OUTLINE} strokeWidth="1.5" transform="rotate(-10 14 60)" />
      <ellipse cx="50" cy="60" rx="5" ry="7" fill={fur} stroke={OUTLINE} strokeWidth="1.5" transform="rotate(10 50 60)" />

      {/* ── Füße ── */}
      <ellipse cx="23" cy="74" rx="8" ry="3.5" fill={fur} stroke={OUTLINE} strokeWidth="1" />
      <ellipse cx="41" cy="74" rx="8" ry="3.5" fill={fur} stroke={OUTLINE} strokeWidth="1" />

      {/* ── Ohren (hinter Kopf) ── */}
      <circle cx="19" cy="17" r="7" fill={fur}               stroke={OUTLINE} strokeWidth="1.5" />
      <circle cx="45" cy="17" r="7" fill={fur}               stroke={OUTLINE} strokeWidth="1.5" />
      <circle cx="19" cy="17" r="4" fill={EISBEAR_EAR_INNER} />
      <circle cx="45" cy="17" r="4" fill={EISBEAR_EAR_INNER} />

      {/* ── Kopf: breite Ellipse ── */}
      <ellipse cx="32" cy="36" rx="21" ry="18" fill={fur} stroke={OUTLINE} strokeWidth="1.5" />

      {/* ── Heller Bauchbereich ── */}
      <ellipse cx="32" cy="40" rx="13" ry="13" fill={belly} />

      <PetSnowflakes mood={mood} left={{ x: 4, y: 22 }} right={{ x: 60, y: 22 }} />
      <PetSun mood={mood} />
      <PetSweat isHot={isHot} y={14} />

      {/* ── Augen ── */}
      {mood === 'neutral' && (blinking ? (
        <>
          <line x1="23" y1="31" x2="30" y2="31" stroke={OUTLINE} strokeWidth="2.5" strokeLinecap="round" />
          <line x1="34" y1="31" x2="41" y2="31" stroke={OUTLINE} strokeWidth="2.5" strokeLinecap="round" />
        </>
      ) : (
        <>
          <circle cx="26.5" cy="31" r="3.5" fill={OUTLINE} />
          <circle cx="37.5" cy="31" r="3.5" fill={OUTLINE} />
          <circle cx="25.3" cy="29.8" r="1.2" fill="white" opacity="0.65" />
          <circle cx="36.3" cy="29.8" r="1.2" fill="white" opacity="0.65" />
        </>
      ))}

      <PetSunglasses
        mood={mood}
        frame={{ y: 25, w: 13, h: 12, rx: 4 }}
        leftX={17} rightX={32}
        leftTemple={[17, 31, 8, 34]}
        rightTemple={[45, 31, 54, 34]}
      />

      <PetWorriedBrows
        mood={mood}
        leftBrow={{ x1: 19, y1: 23, x2: 30, y2: 26 }}
        rightBrow={{ x1: 34, y1: 26, x2: 45, y2: 23 }}
      />
      {mood === 'cold' && (
        <>
          <circle cx="26.5" cy="32" r="3.5" fill={OUTLINE} />
          <circle cx="37.5" cy="32" r="3.5" fill={OUTLINE} />
          <circle cx="25.3" cy="30.8" r="1.2" fill="white" opacity="0.65" />
          <circle cx="36.3" cy="30.8" r="1.2" fill="white" opacity="0.65" />
        </>
      )}

      <PetFrozenEyes
        mood={mood}
        leftBox={{ l: 21, t: 25, r: 32, b: 37 }}
        rightBox={{ l: 33, t: 25, r: 44, b: 37 }}
      />

      {/* ── Nase (schwarz — charakteristisches Merkmal des Eisbärs) ── */}
      <ellipse cx="32" cy="40" rx="3.5" ry="2.5" fill={OUTLINE} />
      <ellipse cx="30.8" cy="39" rx="1.3" ry="0.9" fill="white" opacity="0.35" />

      <PetBlush mood={mood} leftCx={15} rightCx={49} cy={45} rx={6} ry={3.5} />

      {/* ── Mund ── */}
      {mood === 'neutral' && (
        <path d="M29,43 Q32,47 35,43" stroke={OUTLINE} strokeWidth="1.5" strokeLinecap="round" fill="none" />
      )}
      {mood === 'warm' && (
        <path d="M28,43 Q32,48 36,43" stroke={OUTLINE} strokeWidth="1.5" strokeLinecap="round" fill="none" />
      )}
      {mood === 'cold' && (
        <path d="M29,45 Q32,41 35,45" stroke={OUTLINE} strokeWidth="1.5" strokeLinecap="round" fill="none" />
      )}
      {mood === 'frozen' && (
        <path d="M27,44 Q30,40 32,44 Q34,40 37,44" stroke={OUTLINE} strokeWidth="1.5" strokeLinecap="round" fill="none" />
      )}

      <PetScarf mood={mood} x={9} y={51} width={46} knotCx={54} knotCy={56} />
    </PetSvg>
  );
}
