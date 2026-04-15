/**
 * Gen1-Style Seepferdchen Pet
 *
 * Erkennungsmerkmale: Aufrechte Körperhaltung, Krone/Kamm oben
 * (Hauptmerkmal), langer Schnauzenröhren, segmentierter Körper,
 * eingerollter Schwanz unten.
 *
 * Schichten (hinten → vorne):
 *   Schwanz → Körper → Rückenflosse → Kopf → Krone → Gesicht
 *
 * Mood → temperature:
 *   warm    ≥ 22 °C  Sonnenbrille + Wangenrouge
 *   neutral  8–22 °C  runde Augen, entspannter Ausdruck
 *   cold     0–8 °C  besorgte Augen, Schal, Schneeflocken, Zittern
 *   frozen    < 0 °C  X-Augen, Eiszapfen, Schal, starkes Zittern
 */

import { useId } from 'react';
import type { Mood, PetProps } from './pet.shared';
import { getMood, OUTLINE } from './pet.shared';
import {
  PetSvg, PetShadow, PetIcicles, PetSun,
  PetSweat, PetSnowflakes, PetScarf, PetBlush,
  PetSunglasses, PetFrozenEyes, PetWorriedBrows,
} from './BasePet';

const SEE_FUR: Record<Mood, string> = {
  frozen:  '#bfdbfe',
  cold:    '#93c5fd',
  neutral: '#f59e0b',
  warm:    '#d97706',
};

const SEE_BELLY: Record<Mood, string> = {
  frozen:  '#eff6ff',
  cold:    '#dbeafe',
  neutral: '#fde68a',
  warm:    '#fcd34d',
};

const SEE_CROWN: Record<Mood, string> = {
  frozen:  '#6366f1',
  cold:    '#2563eb',
  neutral: '#92400e',
  warm:    '#78350f',
};

export function PetSeepferdchen({ temperature, size = 80, blinking = false }: PetProps) {
  const mood   = getMood(temperature);
  const isHot  = temperature !== null && temperature >= 28;
  const fur    = SEE_FUR[mood];
  const belly  = SEE_BELLY[mood];
  const crown  = SEE_CROWN[mood];
  const clipId = useId();

  return (
    <PetSvg size={size} shivering={mood === 'cold' || mood === 'frozen'} ariaLabel={`Seepferdchen-Pet: ${mood}`}>
      <defs>
        <clipPath id={clipId}>
          <ellipse cx="32" cy="54" rx="13" ry="16" />
        </clipPath>
      </defs>

      <PetShadow cx={32} />
      <PetIcicles mood={mood} y={77} />

      {/* ── Eingerollter Schwanz (unten, Erkennungsmerkmal) ── */}
      <path d="M32,68 Q44,72 42,78 Q40,83 34,80 Q30,78 32,74" fill="none" stroke={fur} strokeWidth="5" strokeLinecap="round" />
      <path d="M32,68 Q44,72 42,78 Q40,83 34,80 Q30,78 32,74" fill="none" stroke={OUTLINE} strokeWidth="6" strokeLinecap="round" />
      <path d="M32,68 Q44,72 42,78 Q40,83 34,80 Q30,78 32,74" fill="none" stroke={fur} strokeWidth="4" strokeLinecap="round" />

      {/* ── Körper (oval, segmentiert) ── */}
      <ellipse cx="32" cy="54" rx="13" ry="16" fill={fur} stroke={OUTLINE} strokeWidth="1.5" />
      <ellipse cx="32" cy="56" rx="8"  ry="11" fill={belly} />

      {/* ── Körper-Segmente (horizontal, geclippt) ── */}
      <g clipPath={`url(#${clipId})`}>
        <line x1="10" y1="46" x2="54" y2="46" stroke={crown} strokeWidth="1" opacity="0.35" />
        <line x1="10" y1="51" x2="54" y2="51" stroke={crown} strokeWidth="1" opacity="0.35" />
        <line x1="10" y1="56" x2="54" y2="56" stroke={crown} strokeWidth="1" opacity="0.35" />
        <line x1="10" y1="61" x2="54" y2="61" stroke={crown} strokeWidth="1" opacity="0.35" />
        <line x1="10" y1="66" x2="54" y2="66" stroke={crown} strokeWidth="1" opacity="0.35" />
      </g>

      {/* ── Rückenflosse (rechte Seite, dünn) ── */}
      <path d="M44,44 Q54,50 52,58 Q50,64 44,62" fill={fur} stroke={OUTLINE} strokeWidth="1.2" strokeLinejoin="round" />

      {/* ── Kleine Brustflossen ── */}
      <ellipse cx="18" cy="50" rx="5" ry="3" fill={fur} stroke={OUTLINE} strokeWidth="1" transform="rotate(15 18 50)" />

      {/* ── Kopf ── */}
      <circle cx="32" cy="32" r="12" fill={fur} stroke={OUTLINE} strokeWidth="1.5" />

      {/* ── Krone / Kamm (Hauptmerkmal) ── */}
      <path d="M22,24 L24,14 L27,22 L30,12 L32,21 L34,12 L37,22 L40,14 L42,24"
        fill={crown} stroke={OUTLINE} strokeWidth="1" strokeLinejoin="round" />

      <PetSnowflakes mood={mood} left={{ x: 2, y: 22 }} right={{ x: 55, y: 22 }} />
      <PetSun mood={mood} />
      <PetSweat isHot={isHot} y={10} />

      {/* ── Schnauzenröhren (lang, nach vorne) ── */}
      <path d="M40,36 Q50,38 52,40" stroke={fur} strokeWidth="4" strokeLinecap="round" fill="none" />
      <path d="M40,36 Q50,38 52,40" stroke={OUTLINE} strokeWidth="5" strokeLinecap="round" fill="none" />
      <path d="M40,36 Q50,38 52,40" stroke={fur} strokeWidth="3" strokeLinecap="round" fill="none" />
      {/* Nasenspitze */}
      <circle cx="52" cy="40" r="2" fill={OUTLINE} opacity="0.7" />

      {/* ── Augen ── */}
      {mood === 'neutral' && (blinking ? (
        <>
          <line x1="22" y1="31" x2="29" y2="31" stroke={OUTLINE} strokeWidth="2" strokeLinecap="round" />
          <line x1="35" y1="31" x2="40" y2="31" stroke={OUTLINE} strokeWidth="2" strokeLinecap="round" />
        </>
      ) : (
        <>
          <circle cx="26" cy="31" r="3.5" fill={OUTLINE} />
          <circle cx="38" cy="31" r="3.5" fill={OUTLINE} />
          <circle cx="24.8" cy="29.8" r="1.2" fill="white" opacity="0.65" />
          <circle cx="36.8" cy="29.8" r="1.2" fill="white" opacity="0.65" />
        </>
      ))}

      <PetSunglasses
        mood={mood}
        frame={{ y: 24, w: 13, h: 13, rx: 4 }}
        leftX={16} rightX={33}
        leftTemple={[16, 31, 8, 34]}
        rightTemple={[46, 31, 54, 34]}
      />

      <PetWorriedBrows
        mood={mood}
        leftBrow={{ x1: 19, y1: 24, x2: 29, y2: 28 }}
        rightBrow={{ x1: 35, y1: 28, x2: 45, y2: 24 }}
      />
      {mood === 'cold' && (
        <>
          <circle cx="26" cy="32" r="3.5" fill={OUTLINE} />
          <circle cx="38" cy="32" r="3.5" fill={OUTLINE} />
          <circle cx="24.8" cy="30.8" r="1.2" fill="white" opacity="0.65" />
          <circle cx="36.8" cy="30.8" r="1.2" fill="white" opacity="0.65" />
        </>
      )}

      <PetFrozenEyes
        mood={mood}
        leftBox={{ l: 19, t: 24, r: 33, b: 38 }}
        rightBox={{ l: 31, t: 24, r: 45, b: 38 }}
      />

      <PetBlush mood={mood} leftCx={19} rightCx={45} cy={38} rx={4} ry={3} />

      <PetScarf mood={mood} x={17} y={44} width={30} knotCx={46} knotCy={49} />
    </PetSvg>
  );
}
