/**
 * Gen1-Style Wal Pet
 *
 * Erkennungsmerkmale: Breiter ovaler Körper, charakteristische Schwanzflosse
 * (Hauptmerkmal), kleines Blasloch oben, heller Bauch.
 * Warm-Mood: Wasserfontäne aus dem Blasloch.
 *
 * Mood → temperature:
 *   warm    ≥ 22 °C  Sonnenbrille + Wangenrouge + Wasserfontäne
 *   neutral  8–22 °C  runde Augen, entspannter Ausdruck
 *   cold     0–8 °C  besorgte Augen, Schal, Schneeflocken, Zittern
 *   frozen    < 0 °C  X-Augen, Eiszapfen, Schal, starkes Zittern
 */

import type { Mood, PetProps } from './pet.shared';
import { getMood, OUTLINE } from './pet.shared';
import {
  PetSvg, PetShadow, PetIcicles, PetSun,
  PetSweat, PetSnowflakes, PetScarf, PetBlush,
  PetSunglasses, PetFrozenEyes, PetWorriedBrows,
} from './BasePet';

const WAL_FUR: Record<Mood, string> = {
  frozen:  '#bfdbfe',
  cold:    '#93c5fd',
  neutral: '#3b82f6',
  warm:    '#1d4ed8',
};

const WAL_BELLY: Record<Mood, string> = {
  frozen:  '#f0f9ff',
  cold:    '#dbeafe',
  neutral: '#bfdbfe',
  warm:    '#93c5fd',
};

export function PetWal({ temperature, size = 80, blinking = false }: PetProps) {
  const mood  = getMood(temperature);
  const isHot = temperature !== null && temperature >= 28;
  const fur   = WAL_FUR[mood];
  const belly = WAL_BELLY[mood];

  return (
    <PetSvg size={size} shivering={mood === 'cold' || mood === 'frozen'} ariaLabel={`Wal-Pet: ${mood}`}>
      <PetShadow cx={32} />
      <PetIcicles mood={mood} y={77} />

      {/* ── Schwanzflosse (Hauptmerkmal, unten) ── */}
      <path d="M16,68 Q24,80 32,70 Q40,80 48,68" fill={fur} stroke={OUTLINE} strokeWidth="1.5" strokeLinejoin="round" />

      {/* ── Körper (breit, oval) ── */}
      <ellipse cx="32" cy="50" rx="20" ry="17" fill={fur} stroke={OUTLINE} strokeWidth="1.5" />
      <ellipse cx="32" cy="54" rx="13" ry="11" fill={belly} />

      {/* ── Brustflossen (seitlich) ── */}
      <path d="M12,50 Q4,44 4,56 Q8,62 14,58" fill={fur} stroke={OUTLINE} strokeWidth="1.2" strokeLinejoin="round" />
      <path d="M52,50 Q60,44 60,56 Q56,62 50,58" fill={fur} stroke={OUTLINE} strokeWidth="1.2" strokeLinejoin="round" />

      {/* ── Blasloch ── */}
      <ellipse cx="32" cy="34" rx="3" ry="2" fill={OUTLINE} opacity="0.5" />

      {/* ── Wasserfontäne (warm) ── */}
      {mood === 'warm' && (
        <>
          <path d="M30,34 Q26,24 28,16" stroke={belly} strokeWidth="2.5" strokeLinecap="round" fill="none" />
          <path d="M32,34 Q32,22 32,14"  stroke={belly} strokeWidth="2.5" strokeLinecap="round" fill="none" />
          <path d="M34,34 Q38,24 36,16" stroke={belly} strokeWidth="2.5" strokeLinecap="round" fill="none" />
        </>
      )}

      <PetSnowflakes mood={mood} left={{ x: 2, y: 28 }} right={{ x: 57, y: 28 }} />
      <PetSun mood={mood} />
      <PetSweat isHot={isHot} y={16} />

      {/* ── Augen (freundlich, auf Körperhöhe) ── */}
      {mood === 'neutral' && (blinking ? (
        <>
          <line x1="19" y1="44" x2="27" y2="44" stroke={OUTLINE} strokeWidth="2" strokeLinecap="round" />
          <line x1="37" y1="44" x2="45" y2="44" stroke={OUTLINE} strokeWidth="2" strokeLinecap="round" />
        </>
      ) : (
        <>
          <circle cx="23" cy="44" r="3.5" fill={OUTLINE} />
          <circle cx="41" cy="44" r="3.5" fill={OUTLINE} />
          <circle cx="21.8" cy="42.8" r="1.2" fill="white" opacity="0.65" />
          <circle cx="39.8" cy="42.8" r="1.2" fill="white" opacity="0.65" />
        </>
      ))}

      <PetSunglasses
        mood={mood}
        frame={{ y: 37, w: 14, h: 13, rx: 4 }}
        leftX={13} rightX={33}
        leftTemple={[13, 44, 5, 47]}
        rightTemple={[47, 44, 55, 47]}
      />

      <PetWorriedBrows
        mood={mood}
        leftBrow={{ x1: 16, y1: 37, x2: 27, y2: 41 }}
        rightBrow={{ x1: 37, y1: 41, x2: 48, y2: 37 }}
      />
      {mood === 'cold' && (
        <>
          <circle cx="23" cy="45" r="3.5" fill={OUTLINE} />
          <circle cx="41" cy="45" r="3.5" fill={OUTLINE} />
          <circle cx="21.8" cy="43.8" r="1.2" fill="white" opacity="0.65" />
          <circle cx="39.8" cy="43.8" r="1.2" fill="white" opacity="0.65" />
        </>
      )}

      <PetFrozenEyes
        mood={mood}
        leftBox={{ l: 16, t: 37, r: 30, b: 51 }}
        rightBox={{ l: 34, t: 37, r: 48, b: 51 }}
      />

      <PetBlush mood={mood} leftCx={13} rightCx={51} cy={52} rx={5} ry={3} />

      {/* ── Mund ── */}
      {mood === 'neutral' && (
        <path d="M26,56 Q32,60 38,56" stroke={OUTLINE} strokeWidth="1.5" strokeLinecap="round" fill="none" />
      )}
      {mood === 'warm' && (
        <path d="M24,55 Q32,61 40,55" stroke={OUTLINE} strokeWidth="1.5" strokeLinecap="round" fill="none" />
      )}
      {mood === 'cold' && (
        <path d="M27,57 Q32,54 37,57" stroke={OUTLINE} strokeWidth="1.5" strokeLinecap="round" fill="none" />
      )}
      {mood === 'frozen' && (
        <path d="M25,57 Q28,53 32,57 Q36,61 39,57" stroke={OUTLINE} strokeWidth="1.5" strokeLinecap="round" fill="none" />
      )}

      <PetScarf mood={mood} x={11} y={60} width={42} knotCx={52} knotCy={65} />
    </PetSvg>
  );
}
