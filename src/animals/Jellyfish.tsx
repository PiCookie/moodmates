/**
 * Qualle im Retro-Stil
 *
 * Erkennungsmerkmale: Runder Schirm (Hauptmerkmal), herabhängende
 * Tentakel, große sanfte Augen, transluzente Farbtöne.
 *
 * Mood → temperature:
 *   warm    ≥ 22 °C  Sonnenbrille + Wangenrouge
 *   neutral  8–22 °C  runde Augen, entspannter Ausdruck
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

const QUALLE_BELL: Record<Mood, string> = {
  frozen:  '#c7d2fe',
  cold:    '#a5b4fc',
  neutral: '#c084fc',
  warm:    '#e879f9',
};

const QUALLE_INNER: Record<Mood, string> = {
  frozen:  '#e0e7ff',
  cold:    '#c7d2fe',
  neutral: '#e9d5ff',
  warm:    '#f5d0fe',
};

const QUALLE_TENTACLE: Record<Mood, string> = {
  frozen:  '#818cf8',
  cold:    '#7c3aed',
  neutral: '#9333ea',
  warm:    '#c026d3',
};

export function Jellyfish({ temperature, size = 80, blinking = false, mood: moodOverride, ariaLabel }: AnimalProps) {
  const mood     = resolveMood(temperature, moodOverride);
  const isHot    = temperature !== null && temperature >= 28;
  const bell     = QUALLE_BELL[mood];
  const inner    = QUALLE_INNER[mood];
  const tentacle = QUALLE_TENTACLE[mood];

  return (
    <PetSvg size={size} shivering={mood === 'cold' || mood === 'frozen'} ariaLabel={ariaLabel}>
      <PetShadow cx={32} />
      <PetIcicles mood={mood} y={77} />

      {/* ── Tentakel (hinter dem Schirm) ── */}
      <path d="M16,50 Q13,60 16,70 Q14,76 16,80" stroke={tentacle} strokeWidth="1.8" strokeLinecap="round" fill="none" />
      <path d="M22,52 Q19,63 22,72 Q20,77 21,80" stroke={tentacle} strokeWidth="1.8" strokeLinecap="round" fill="none" />
      <path d="M28,53 Q26,64 28,74 Q27,78 28,80" stroke={tentacle} strokeWidth="1.8" strokeLinecap="round" fill="none" />
      <path d="M32,53 Q34,65 32,75 Q33,79 32,80" stroke={tentacle} strokeWidth="1.8" strokeLinecap="round" fill="none" />
      <path d="M36,53 Q38,64 36,74 Q37,78 36,80" stroke={tentacle} strokeWidth="1.8" strokeLinecap="round" fill="none" />
      <path d="M42,52 Q45,63 42,72 Q44,77 43,80" stroke={tentacle} strokeWidth="1.8" strokeLinecap="round" fill="none" />
      <path d="M48,50 Q51,60 48,70 Q50,76 48,80" stroke={tentacle} strokeWidth="1.8" strokeLinecap="round" fill="none" />

      {/* ── Schirm (halbe Ellipse + Boden) ── */}
      <path d="M8,42 Q8,12 32,10 Q56,12 56,42 Q44,52 32,52 Q20,52 8,42 Z" fill={bell} stroke={OUTLINE} strokeWidth="1.5" />
      {/* Innerer Schimmer */}
      <path d="M14,40 Q14,20 32,18 Q50,20 50,40 Q40,48 32,48 Q24,48 14,40 Z" fill={inner} opacity="0.5" />

      <PetSnowflakes mood={mood} left={{ x: 2, y: 20 }} right={{ x: 56, y: 20 }} />
      <PetSun mood={mood} />
      <PetSweat isHot={isHot} y={10} />

      {/* ── Augen (groß, sanft, zentriert im Schirm) ── */}
      {mood === 'neutral' && (blinking ? (
        <>
          <line x1="21" y1="36" x2="29" y2="36" stroke={OUTLINE} strokeWidth="2.5" strokeLinecap="round" />
          <line x1="35" y1="36" x2="43" y2="36" stroke={OUTLINE} strokeWidth="2.5" strokeLinecap="round" />
        </>
      ) : (
        <>
          <circle cx="25" cy="36" r="5"   fill="white"   stroke={OUTLINE} strokeWidth="1" />
          <circle cx="39" cy="36" r="5"   fill="white"   stroke={OUTLINE} strokeWidth="1" />
          <circle cx="25" cy="36" r="3"   fill={OUTLINE} />
          <circle cx="39" cy="36" r="3"   fill={OUTLINE} />
          <circle cx="23.5" cy="34.5" r="1.2" fill="white" opacity="0.65" />
          <circle cx="37.5" cy="34.5" r="1.2" fill="white" opacity="0.65" />
        </>
      ))}

      <PetSunglasses
        mood={mood}
        frame={{ y: 29, w: 14, h: 14, rx: 5 }}
        leftX={14} rightX={33}
        leftTemple={[14, 36, 6, 39]}
        rightTemple={[47, 36, 55, 39]}
      />

      <PetWorriedBrows
        mood={mood}
        leftBrow={{ x1: 18, y1: 29, x2: 29, y2: 32 }}
        rightBrow={{ x1: 35, y1: 32, x2: 46, y2: 29 }}
      />
      {mood === 'cold' && (
        <>
          <circle cx="25" cy="37" r="5"   fill="white"   stroke={OUTLINE} strokeWidth="1" />
          <circle cx="39" cy="37" r="5"   fill="white"   stroke={OUTLINE} strokeWidth="1" />
          <circle cx="25" cy="37" r="3"   fill={OUTLINE} />
          <circle cx="39" cy="37" r="3"   fill={OUTLINE} />
          <circle cx="23.5" cy="35.5" r="1.2" fill="white" opacity="0.65" />
          <circle cx="37.5" cy="35.5" r="1.2" fill="white" opacity="0.65" />
        </>
      )}

      <PetFrozenEyes
        mood={mood}
        leftBox={{ l: 17, t: 29, r: 33, b: 45 }}
        rightBox={{ l: 31, t: 29, r: 47, b: 45 }}
      />

      <PetBlush mood={mood} leftCx={14} rightCx={50} cy={44} rx={5} ry={3} />

      {/* ── Mund ── */}
      {mood === 'neutral' && (
        <path d="M28,44 Q32,47 36,44" stroke={OUTLINE} strokeWidth="1.5" strokeLinecap="round" fill="none" />
      )}
      {mood === 'warm' && (
        <path d="M26,43 Q32,48 38,43" stroke={OUTLINE} strokeWidth="1.5" strokeLinecap="round" fill="none" />
      )}
      {mood === 'cold' && (
        <path d="M28,45 Q32,42 36,45" stroke={OUTLINE} strokeWidth="1.5" strokeLinecap="round" fill="none" />
      )}
      {mood === 'frozen' && (
        <path d="M26,45 Q29,41 32,45 Q35,49 38,45" stroke={OUTLINE} strokeWidth="1.5" strokeLinecap="round" fill="none" />
      )}

      <PetScarf mood={mood} x={10} y={44} width={44} knotCx={53} knotCy={49} />
    </PetSvg>
  );
}
