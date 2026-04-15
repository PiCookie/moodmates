/**
 * Gen1-Style Delfin Pet
 *
 * Erkennungsmerkmale: Geschwungene Rückenflosse, lächelnde Schnauze
 * (Hauptmerkmal), heller Bauch, V-Schwanzflosse.
 *
 * Mood → temperature:
 *   warm    ≥ 22 °C  Sonnenbrille + Wangenrouge
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

const DELFIN_FUR: Record<Mood, string> = {
  frozen:  '#bfdbfe',
  cold:    '#93c5fd',
  neutral: '#64748b',
  warm:    '#475569',
};

const DELFIN_BELLY: Record<Mood, string> = {
  frozen:  '#f0f9ff',
  cold:    '#e0f2fe',
  neutral: '#e2e8f0',
  warm:    '#cbd5e1',
};

export function PetDelfin({ temperature, size = 80, blinking = false }: PetProps) {
  const mood  = getMood(temperature);
  const isHot = temperature !== null && temperature >= 28;
  const fur   = DELFIN_FUR[mood];
  const belly = DELFIN_BELLY[mood];

  return (
    <PetSvg size={size} shivering={mood === 'cold' || mood === 'frozen'} ariaLabel={`Delfin-Pet: ${mood}`}>
      <PetShadow cx={32} />
      <PetIcicles mood={mood} y={77} />

      {/* ── Schwanzflosse (V-Form) ── */}
      <path d="M20,70 Q27,80 32,71 Q37,80 44,70" fill={fur} stroke={OUTLINE} strokeWidth="1.5" strokeLinejoin="round" />

      {/* ── Körper ── */}
      <ellipse cx="32" cy="50" rx="15" ry="20" fill={fur} stroke={OUTLINE} strokeWidth="1.5" />
      <ellipse cx="32" cy="54" rx="9"  ry="14" fill={belly} />

      {/* ── Brustflossen (seitlich) ── */}
      <path d="M17,52 Q8,47 7,58 Q11,64 17,60" fill={fur} stroke={OUTLINE} strokeWidth="1.2" strokeLinejoin="round" />
      <path d="M47,52 Q56,47 57,58 Q53,64 47,60" fill={fur} stroke={OUTLINE} strokeWidth="1.2" strokeLinejoin="round" />

      {/* ── Rückenflosse (geschwungen, nicht so spitz wie Hai) ── */}
      <path d="M25,33 Q28,20 35,22 Q38,30 38,33" fill={fur} stroke={OUTLINE} strokeWidth="1.5" strokeLinejoin="round" />

      {/* ── Schnauze (lächelnde Schnauze, Hauptmerkmal) ── */}
      <path d="M24,46 Q20,54 32,62 Q44,54 40,46 Q32,43 24,46 Z" fill={belly} />

      <PetSnowflakes mood={mood} left={{ x: 2, y: 26 }} right={{ x: 56, y: 26 }} />
      <PetSun mood={mood} />
      <PetSweat isHot={isHot} y={14} />

      {/* ── Augen ── */}
      {mood === 'neutral' && (blinking ? (
        <>
          <line x1="21" y1="42" x2="28" y2="42" stroke={OUTLINE} strokeWidth="2" strokeLinecap="round" />
          <line x1="36" y1="42" x2="43" y2="42" stroke={OUTLINE} strokeWidth="2" strokeLinecap="round" />
        </>
      ) : (
        <>
          <circle cx="25" cy="42" r="3.5" fill={OUTLINE} />
          <circle cx="39" cy="42" r="3.5" fill={OUTLINE} />
          <circle cx="23.8" cy="40.8" r="1.2" fill="white" opacity="0.65" />
          <circle cx="37.8" cy="40.8" r="1.2" fill="white" opacity="0.65" />
        </>
      ))}

      <PetSunglasses
        mood={mood}
        frame={{ y: 35, w: 13, h: 13, rx: 4 }}
        leftX={15} rightX={33}
        leftTemple={[15, 42, 7, 45]}
        rightTemple={[46, 42, 54, 45]}
      />

      <PetWorriedBrows
        mood={mood}
        leftBrow={{ x1: 18, y1: 35, x2: 28, y2: 39 }}
        rightBrow={{ x1: 36, y1: 39, x2: 46, y2: 35 }}
      />
      {mood === 'cold' && (
        <>
          <circle cx="25" cy="43" r="3.5" fill={OUTLINE} />
          <circle cx="39" cy="43" r="3.5" fill={OUTLINE} />
          <circle cx="23.8" cy="41.8" r="1.2" fill="white" opacity="0.65" />
          <circle cx="37.8" cy="41.8" r="1.2" fill="white" opacity="0.65" />
        </>
      )}

      <PetFrozenEyes
        mood={mood}
        leftBox={{ l: 18, t: 35, r: 32, b: 49 }}
        rightBox={{ l: 32, t: 35, r: 46, b: 49 }}
      />

      {/* ── Nase ── */}
      <ellipse cx="32" cy="56" rx="2" ry="1.5" fill={OUTLINE} opacity="0.6" />

      <PetBlush mood={mood} leftCx={16} rightCx={48} cy={51} rx={5} ry={3} />

      {/* ── Mund (natürliches Delfin-Lächeln) ── */}
      {mood === 'neutral' && (
        <path d="M26,58 Q32,63 38,58" stroke={OUTLINE} strokeWidth="1.5" strokeLinecap="round" fill="none" />
      )}
      {mood === 'warm' && (
        <path d="M24,57 Q32,64 40,57" stroke={OUTLINE} strokeWidth="1.5" strokeLinecap="round" fill="none" />
      )}
      {mood === 'cold' && (
        <path d="M27,59 Q32,56 37,59" stroke={OUTLINE} strokeWidth="1.5" strokeLinecap="round" fill="none" />
      )}
      {mood === 'frozen' && (
        <path d="M25,59 Q28,55 32,59 Q36,63 39,59" stroke={OUTLINE} strokeWidth="1.5" strokeLinecap="round" fill="none" />
      )}

      <PetScarf mood={mood} x={13} y={62} width={38} knotCx={50} knotCy={67} />
    </PetSvg>
  );
}
