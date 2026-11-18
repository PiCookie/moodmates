/**
 * Kugelfisch im Retro-Stil
 *
 * Erkennungsmerkmale: Kugelrunder Körper mit Stacheln (Hauptmerkmal),
 * riesige Augen, kleine Seitenflossen.
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

const KUGEL_FUR: Record<Mood, string> = {
  frozen:  '#bfdbfe',
  cold:    '#7dd3fc',
  neutral: '#fbbf24',
  warm:    '#f59e0b',
};

const KUGEL_BELLY: Record<Mood, string> = {
  frozen:  '#eff6ff',
  cold:    '#e0f2fe',
  neutral: '#fef9c3',
  warm:    '#fef3c7',
};

const KUGEL_SPINE: Record<Mood, string> = {
  frozen:  '#6366f1',
  cold:    '#0284c7',
  neutral: '#92400e',
  warm:    '#78350f',
};

export function Pufferfish({ temperature, size = 80, blinking = false, mood: moodOverride, ariaLabel }: AnimalProps) {
  const mood  = resolveMood(temperature, moodOverride);
  const isHot = temperature !== null && temperature >= 28;
  const fur   = KUGEL_FUR[mood];
  const belly = KUGEL_BELLY[mood];
  const spine = KUGEL_SPINE[mood];

  return (
    <PetSvg size={size} shivering={mood === 'cold' || mood === 'frozen'} ariaLabel={ariaLabel}>
      <PetShadow cx={32} />
      <PetIcicles mood={mood} y={77} />

      {/* ── Stacheln (rundum verteilt, 12 Richtungen) ── */}
      <line x1="52" y1="50" x2="60" y2="50" stroke={spine} strokeWidth="2" strokeLinecap="round" />
      <line x1="49" y1="40" x2="56" y2="36" stroke={spine} strokeWidth="2" strokeLinecap="round" />
      <line x1="42" y1="33" x2="46" y2="26" stroke={spine} strokeWidth="2" strokeLinecap="round" />
      <line x1="32" y1="30" x2="32" y2="22" stroke={spine} strokeWidth="2" strokeLinecap="round" />
      <line x1="22" y1="33" x2="18" y2="26" stroke={spine} strokeWidth="2" strokeLinecap="round" />
      <line x1="15" y1="40" x2="8"  y2="36" stroke={spine} strokeWidth="2" strokeLinecap="round" />
      <line x1="12" y1="50" x2="4"  y2="50" stroke={spine} strokeWidth="2" strokeLinecap="round" />
      <line x1="15" y1="60" x2="8"  y2="64" stroke={spine} strokeWidth="2" strokeLinecap="round" />
      <line x1="22" y1="67" x2="18" y2="74" stroke={spine} strokeWidth="2" strokeLinecap="round" />
      <line x1="32" y1="70" x2="32" y2="78" stroke={spine} strokeWidth="2" strokeLinecap="round" />
      <line x1="42" y1="67" x2="46" y2="74" stroke={spine} strokeWidth="2" strokeLinecap="round" />
      <line x1="49" y1="60" x2="56" y2="64" stroke={spine} strokeWidth="2" strokeLinecap="round" />

      {/* ── Körper (kugelrund) ── */}
      <circle cx="32" cy="50" r="20" fill={fur} stroke={OUTLINE} strokeWidth="1.5" />
      <ellipse cx="32" cy="54" rx="13" ry="11" fill={belly} />

      {/* ── Kleine Seitenflossen ── */}
      <ellipse cx="11" cy="52" rx="5" ry="3" fill={fur} stroke={OUTLINE} strokeWidth="1" transform="rotate(-20 11 52)" />
      <ellipse cx="53" cy="52" rx="5" ry="3" fill={fur} stroke={OUTLINE} strokeWidth="1" transform="rotate(20 53 52)" />

      <PetSnowflakes mood={mood} left={{ x: 2, y: 28 }} right={{ x: 56, y: 28 }} />
      <PetSun mood={mood} />
      <PetSweat isHot={isHot} y={18} />

      {/* ── Augen (groß, charakteristisch) ── */}
      {mood === 'neutral' && (blinking ? (
        <>
          <line x1="20" y1="43" x2="30" y2="43" stroke={OUTLINE} strokeWidth="2.5" strokeLinecap="round" />
          <line x1="34" y1="43" x2="44" y2="43" stroke={OUTLINE} strokeWidth="2.5" strokeLinecap="round" />
        </>
      ) : (
        <>
          <circle cx="25" cy="43" r="5"   fill="white"   stroke={OUTLINE} strokeWidth="1" />
          <circle cx="39" cy="43" r="5"   fill="white"   stroke={OUTLINE} strokeWidth="1" />
          <circle cx="25" cy="43" r="3"   fill={OUTLINE} />
          <circle cx="39" cy="43" r="3"   fill={OUTLINE} />
          <circle cx="23.5" cy="41.5" r="1" fill="white" opacity="0.65" />
          <circle cx="37.5" cy="41.5" r="1" fill="white" opacity="0.65" />
        </>
      ))}

      <PetSunglasses
        mood={mood}
        frame={{ y: 36, w: 14, h: 14, rx: 5 }}
        leftX={14} rightX={33}
        leftTemple={[14, 43, 6, 46]}
        rightTemple={[47, 43, 55, 46]}
      />

      <PetWorriedBrows
        mood={mood}
        leftBrow={{ x1: 18, y1: 36, x2: 29, y2: 40 }}
        rightBrow={{ x1: 35, y1: 40, x2: 46, y2: 36 }}
      />
      {mood === 'cold' && (
        <>
          <circle cx="25" cy="44" r="5"   fill="white"   stroke={OUTLINE} strokeWidth="1" />
          <circle cx="39" cy="44" r="5"   fill="white"   stroke={OUTLINE} strokeWidth="1" />
          <circle cx="25" cy="44" r="3"   fill={OUTLINE} />
          <circle cx="39" cy="44" r="3"   fill={OUTLINE} />
          <circle cx="23.5" cy="42.5" r="1" fill="white" opacity="0.65" />
          <circle cx="37.5" cy="42.5" r="1" fill="white" opacity="0.65" />
        </>
      )}

      <PetFrozenEyes
        mood={mood}
        leftBox={{ l: 17, t: 36, r: 33, b: 52 }}
        rightBox={{ l: 31, t: 36, r: 47, b: 52 }}
      />

      <PetBlush mood={mood} leftCx={14} rightCx={50} cy={52} rx={5} ry={3} />

      {/* ── Mund ── */}
      {mood === 'neutral' && (
        <ellipse cx="32" cy="58" rx="3" ry="2" fill={OUTLINE} opacity="0.7" />
      )}
      {mood === 'warm' && (
        <path d="M28,57 Q32,62 36,57" stroke={OUTLINE} strokeWidth="1.5" strokeLinecap="round" fill="none" />
      )}
      {mood === 'cold' && (
        <path d="M29,59 Q32,56 35,59" stroke={OUTLINE} strokeWidth="1.5" strokeLinecap="round" fill="none" />
      )}
      {mood === 'frozen' && (
        <path d="M27,58 Q29,55 32,58 Q35,61 37,58" stroke={OUTLINE} strokeWidth="1.5" strokeLinecap="round" fill="none" />
      )}

      <PetScarf mood={mood} x={12} y={58} width={40} knotCx={51} knotCy={63} />
    </PetSvg>
  );
}
