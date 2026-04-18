/**
 * Gen1-Style Stegosaurus Pet
 *
 * Erkennungsmerkmale: 5 große Rückenplatten als Dreieck-Reihe oben im Bild
 * (wie Katzenohren, aber 5 statt 2), normaler runder Kopf darunter.
 *
 * Mood → temperature:
 *   warm    ≥ 22 °C  Sonnenbrille + Wangenrouge + Platten leuchten
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
  cold:    '#99f6e4',
  neutral: '#2dd4bf',
  warm:    '#fbbf24',
};

const PLATE: Record<Mood, string> = {
  frozen:  '#7dd3fc',
  cold:    '#0d9488',
  neutral: '#0f766e',
  warm:    '#f97316',
};

export function PetStegosaurus({ temperature, size = 80, blinking = false }: PetProps) {
  const mood  = getMood(temperature);
  const isHot = temperature !== null && temperature >= 28;
  const body  = BODY[mood];
  const plate = PLATE[mood];

  return (
    <PetSvg size={size} shivering={mood === 'cold' || mood === 'frozen'} ariaLabel={`Stegosaurus-Pet: ${mood}`}>
      <PetShadow cx={32} />
      <PetIcicles mood={mood} y={74} />

      {/* ── Schwanz mit Stachel ── */}
      <path d="M44,66 Q58,62 56,50" stroke={body} strokeWidth="3.5" strokeLinecap="round" fill="none" />
      <polygon points="54,47 58,50 60,44" fill={plate} stroke={OUTLINE} strokeWidth="1" />

      {/* ── 5 Rückenplatten (Basen unter Kopf versteckt, wie Katzenohren) ── */}
      <polygon points="10,26 16,26 13,8"  fill={plate} stroke={OUTLINE} strokeWidth="1.5" strokeLinejoin="round" />
      <polygon points="20,23 27,23 23,5"  fill={plate} stroke={OUTLINE} strokeWidth="1.5" strokeLinejoin="round" />
      <polygon points="29,21 39,21 34,2"  fill={plate} stroke={OUTLINE} strokeWidth="1.5" strokeLinejoin="round" />
      <polygon points="41,23 48,23 45,5"  fill={plate} stroke={OUTLINE} strokeWidth="1.5" strokeLinejoin="round" />
      <polygon points="50,26 56,26 53,8"  fill={plate} stroke={OUTLINE} strokeWidth="1.5" strokeLinejoin="round" />

      {/* Platten-Glanz bei warm */}
      {mood === 'warm' && (
        <>
          <line x1="13" y1="8"  x2="13" y2="4"  stroke="#fef9c3" strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />
          <line x1="23" y1="5"  x2="23" y2="1"  stroke="#fef9c3" strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />
          <line x1="34" y1="2"  x2="34" y2="-2" stroke="#fef9c3" strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />
          <line x1="45" y1="5"  x2="45" y2="1"  stroke="#fef9c3" strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />
          <line x1="53" y1="8"  x2="53" y2="4"  stroke="#fef9c3" strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />
        </>
      )}

      {/* ── Kopf ── */}
      <circle cx="32" cy="38" r="21" fill={body} stroke={OUTLINE} strokeWidth="1.5" />

      <PetSnowflakes mood={mood} left={{ x: 4, y: 32 }} right={{ x: 60, y: 30 }} />
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

      {/* ── Körper ── */}
      <ellipse cx="32" cy="65" rx="14" ry="9" fill={body} stroke={OUTLINE} strokeWidth="1.5" />

      {/* ── 4 kurze Beine ── */}
      <ellipse cx="22" cy="74" rx="7" ry="3.5" fill={body} stroke={OUTLINE} strokeWidth="1.5" />
      <ellipse cx="42" cy="74" rx="7" ry="3.5" fill={body} stroke={OUTLINE} strokeWidth="1.5" />

      <PetScarf mood={mood} x={10} y={54} width={44} knotCx={53} knotCy={59} />
    </PetSvg>
  );
}
