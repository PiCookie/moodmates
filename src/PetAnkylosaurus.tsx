/**
 * Gen1-Style Ankylosaurus Pet
 *
 * Erkennungsmerkmale: Gepanzerte Buckel-Reihe oben (sichtbarer Panzer),
 * runder dicker Körper, auffällige Keule am Schwanzende.
 *
 * Mood → temperature:
 *   warm    ≥ 22 °C  Sonnenbrille + Wangenrouge + Panzer-Glanz
 *   neutral  8–22 °C  runde Augen, Lächeln
 *   cold     0–8 °C  besorgte Brauen, Schal, Schneeflocken, Zittern
 *   frozen    < 0 °C  X-Augen, Eiszapfen, Schal, starkes Zittern
 */

import type { Mood, PetProps } from './pet.shared';
import { getMood, OUTLINE } from './pet.shared';
import {
  PetSvg, PetShadow, PetIcicles, PetSun,
  PetSweat, PetSnowflakes, PetScarf, PetBlush,
  PetSunglasses, PetFrozenEyes, PetWorriedBrows,
} from './BasePet';

const BODY: Record<Mood, string> = {
  frozen:  '#bfdbfe',
  cold:    '#d4d4aa',
  neutral: '#a8a29e',
  warm:    '#fbbf24',
};

const ARMOR: Record<Mood, string> = {
  frozen:  '#93c5fd',
  cold:    '#78716c',
  neutral: '#57534e',
  warm:    '#d97706',
};

export function PetAnkylosaurus({ temperature, size = 80, blinking = false }: PetProps) {
  const mood  = getMood(temperature);
  const isHot = temperature !== null && temperature >= 28;
  const body  = BODY[mood];
  const armor = ARMOR[mood];

  return (
    <PetSvg size={size} shivering={mood === 'cold' || mood === 'frozen'} ariaLabel={`Ankylosaurus-Pet: ${mood}`}>
      <PetShadow cx={32} />
      <PetIcicles mood={mood} y={74} />

      {/* ── Schwanz ── */}
      <path d="M44,66 Q58,62 60,52" stroke={body} strokeWidth="4" strokeLinecap="round" fill="none" />
      {/* Keule (groß und unverkennbar) */}
      <ellipse cx="62" cy="49" rx="8" ry="6" fill={armor} stroke={OUTLINE} strokeWidth="1.5" />
      {/* Keulenstacheln */}
      <line x1="62" y1="43" x2="62" y2="39" stroke={OUTLINE} strokeWidth="2" strokeLinecap="round" />
      <line x1="68" y1="46" x2="72" y2="44" stroke={OUTLINE} strokeWidth="2" strokeLinecap="round" />
      <line x1="68" y1="52" x2="72" y2="54" stroke={OUTLINE} strokeWidth="2" strokeLinecap="round" />

      {/* ── Panzer-Buckel-Reihe (wie Stacheln, oben, Basen unter Kopf) ── */}
      <ellipse cx="14" cy="22" rx="6" ry="8"  fill={armor} stroke={OUTLINE} strokeWidth="1.5" />
      <ellipse cx="24" cy="18" rx="6" ry="9"  fill={armor} stroke={OUTLINE} strokeWidth="1.5" />
      <ellipse cx="34" cy="16" rx="6" ry="10" fill={armor} stroke={OUTLINE} strokeWidth="1.5" />
      <ellipse cx="44" cy="18" rx="6" ry="9"  fill={armor} stroke={OUTLINE} strokeWidth="1.5" />
      <ellipse cx="54" cy="22" rx="6" ry="8"  fill={armor} stroke={OUTLINE} strokeWidth="1.5" />

      {/* Panzer-Glanz bei warm */}
      {mood === 'warm' && (
        <>
          <circle cx="24" cy="14" r="2" fill="#fef9c3" opacity="0.6" />
          <circle cx="34" cy="10" r="2" fill="#fef9c3" opacity="0.6" />
          <circle cx="44" cy="14" r="2" fill="#fef9c3" opacity="0.6" />
        </>
      )}

      {/* ── Kopf (überlagert Buckel-Basen) ── */}
      <circle cx="32" cy="38" r="21" fill={body} stroke={OUTLINE} strokeWidth="1.5" />

      <PetSnowflakes mood={mood} left={{ x: 5, y: 34 }} right={{ x: 56, y: 30 }} />
      <PetSun mood={mood} />
      <PetSweat isHot={isHot} y={14} />

      {/* ── Augen ── */}
      {mood === 'neutral' && (blinking ? (
        <>
          <line x1="21" y1="34" x2="29" y2="34" stroke={OUTLINE} strokeWidth="2.5" strokeLinecap="round" />
          <line x1="35" y1="34" x2="43" y2="34" stroke={OUTLINE} strokeWidth="2.5" strokeLinecap="round" />
        </>
      ) : (
        <>
          <circle cx="25" cy="34" r="4" fill={OUTLINE} />
          <circle cx="39" cy="34" r="4" fill={OUTLINE} />
          <circle cx="23.5" cy="32.5" r="1.3" fill="white" opacity="0.7" />
          <circle cx="37.5" cy="32.5" r="1.3" fill="white" opacity="0.7" />
        </>
      ))}

      <PetSunglasses
        mood={mood}
        frame={{ y: 27, w: 14, h: 12, rx: 4 }}
        leftX={16} rightX={36}
        leftTemple={[16, 33, 8, 36]}
        rightTemple={[50, 33, 58, 36]}
      />
      <PetWorriedBrows
        mood={mood}
        leftBrow={{ x1: 18, y1: 25, x2: 30, y2: 29 }}
        rightBrow={{ x1: 36, y1: 29, x2: 48, y2: 25 }}
      />
      {mood === 'cold' && (
        <>
          <circle cx="25" cy="35" r="4" fill={OUTLINE} />
          <circle cx="39" cy="35" r="4" fill={OUTLINE} />
          <circle cx="23.5" cy="33.5" r="1.3" fill="white" opacity="0.65" />
          <circle cx="37.5" cy="33.5" r="1.3" fill="white" opacity="0.65" />
        </>
      )}
      <PetFrozenEyes
        mood={mood}
        leftBox={{ l: 18, t: 27, r: 32, b: 41 }}
        rightBox={{ l: 34, t: 27, r: 48, b: 41 }}
      />

      {/* ── Nase ── */}
      <circle cx="32" cy="43" r="2.5" fill={OUTLINE} opacity="0.45" />

      <PetBlush mood={mood} leftCx={14} rightCx={50} cy={48} />

      {/* ── Mund ── */}
      {(mood === 'neutral' || mood === 'warm') && (
        <path d="M22,48 Q32,54 42,48" stroke={OUTLINE} strokeWidth="1.5" strokeLinecap="round" fill="none" />
      )}
      {(mood === 'cold' || mood === 'frozen') && (
        <path d="M22,50 Q32,46 42,50" stroke={OUTLINE} strokeWidth="1.5" strokeLinecap="round" fill="none" />
      )}

      {/* ── Kurzer breiter Körper ── */}
      <ellipse cx="32" cy="65" rx="15" ry="9" fill={body} stroke={OUTLINE} strokeWidth="1.5" />

      {/* ── 4 kurze stämmige Beine ── */}
      <ellipse cx="20" cy="74" rx="8" ry="3.5" fill={body} stroke={OUTLINE} strokeWidth="1.5" />
      <ellipse cx="44" cy="74" rx="8" ry="3.5" fill={body} stroke={OUTLINE} strokeWidth="1.5" />

      <PetScarf mood={mood} x={10} y={54} width={44} knotCx={53} knotCy={59} />
    </PetSvg>
  );
}
