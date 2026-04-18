/**
 * Gen1-Style Triceratops Pet
 *
 * Erkennungsmerkmale: Farbiges Nackenschild (vor dem Kopf gezeichnet),
 * 2 lange Stirnhörner + 1 kurzes Nasenhorn, runder Kopf.
 *
 * Mood → temperature:
 *   warm    ≥ 22 °C  Sonnenbrille + Wangenrouge + leuchtende Hornspitzen
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
  cold:    '#d9f99d',
  neutral: '#a3e635',
  warm:    '#fbbf24',
};

const FRILL: Record<Mood, string> = {
  frozen:  '#93c5fd',
  cold:    '#fb923c',
  neutral: '#ef4444',
  warm:    '#f97316',
};

const HORN: Record<Mood, string> = {
  frozen:  '#7dd3fc',
  cold:    '#65a30d',
  neutral: '#4d7c0f',
  warm:    '#92400e',
};

export function PetTriceratops({ temperature, size = 80, blinking = false }: PetProps) {
  const mood  = getMood(temperature);
  const isHot = temperature !== null && temperature >= 28;
  const body  = BODY[mood];
  const frill = FRILL[mood];
  const horn  = HORN[mood];

  return (
    <PetSvg size={size} shivering={mood === 'cold' || mood === 'frozen'} ariaLabel={`Triceratops-Pet: ${mood}`}>
      <PetShadow cx={32} />
      <PetIcicles mood={mood} y={74} />

      {/* ── Schwanz ── */}
      <path d="M44,66 Q58,60 54,48" stroke={body} strokeWidth="3.5" strokeLinecap="round" fill="none" />

      {/* ── Nackenschild (vor dem Kopf, wird von Kopf überlagert) ── */}
      <circle cx="32" cy="33" r="28" fill={frill} stroke={OUTLINE} strokeWidth="1.5" />
      <circle cx="32" cy="33" r="22" fill={body} opacity="0.6" />

      {/* ── 2 lange Stirnhörner (oben, Basen unter Kopf) ── */}
      <polygon points="16,30 22,30 18,8"  fill={horn} stroke={OUTLINE} strokeWidth="1.5" strokeLinejoin="round" />
      <polygon points="42,30 48,30 46,8"  fill={horn} stroke={OUTLINE} strokeWidth="1.5" strokeLinejoin="round" />
      {/* Hornspitzen-Glanz bei warm */}
      {mood === 'warm' && (
        <>
          <circle cx="18" cy="8"  r="2.5" fill="#fef08a" opacity="0.9" />
          <circle cx="46" cy="8"  r="2.5" fill="#fef08a" opacity="0.9" />
        </>
      )}

      {/* ── Kopf ── */}
      <circle cx="32" cy="37" r="21" fill={body} stroke={OUTLINE} strokeWidth="1.5" />

      {/* ── Kurzes Nasenhorn (auf dem Kopf) ── */}
      <polygon points="28,30 36,30 32,20" fill={horn} stroke={OUTLINE} strokeWidth="1.5" strokeLinejoin="round" />

      <PetSnowflakes mood={mood} left={{ x: 5, y: 16 }} right={{ x: 58, y: 16 }} />
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
      <ellipse cx="32" cy="65" rx="13" ry="9" fill={body} stroke={OUTLINE} strokeWidth="1.5" />

      {/* ── Beine (4, kurz sichtbar) ── */}
      <ellipse cx="22" cy="74" rx="7" ry="3.5" fill={body} stroke={OUTLINE} strokeWidth="1.5" />
      <ellipse cx="42" cy="74" rx="7" ry="3.5" fill={body} stroke={OUTLINE} strokeWidth="1.5" />

      <PetScarf mood={mood} x={10} y={54} width={44} knotCx={53} knotCy={59} />
    </PetSvg>
  );
}
