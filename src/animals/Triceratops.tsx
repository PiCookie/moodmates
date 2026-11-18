/**
 * Triceratops im Retro-Stil
 *
 * Erkennungsmerkmale: 3 Hörner (2 lang, 1 kurz über Nase), breites Nackenschild,
 * gedrungener Körper, quadruped.
 * Mood-Details: Sonne auf Hornspitzen (warm), Nackenschild vereist (frozen).
 *
 * Mood → temperature:
 *   warm    ≥ 22 °C  Sonnenbrille zwischen Hörnern + Wangenrouge + Sonne
 *   neutral  8–22 °C  runde Augen, geschlossenes Lächeln
 *   cold     0–8 °C  besorgte Brauen, Schal, Schneeflocken, Zittern
 *   frozen    < 0 °C  X-Augen, Eiszapfen, Schal, starkes Zittern
 */

import type { Mood, AnimalProps } from '../shared';
import { resolveMood, OUTLINE } from '../shared';
import {
  PetSvg, PetShadow, PetIcicles, PetSun,
  PetSweat, PetSnowflakes, PetScarf, PetBlush,
  PetSunglasses, PetFrozenEyes, PetWorriedBrows,
} from '../petParts';

const TRIC_BODY: Record<Mood, string> = {
  frozen:  '#bfdbfe',
  cold:    '#d9f99d',
  neutral: '#84cc16',
  warm:    '#fbbf24',
};

const TRIC_HORN: Record<Mood, string> = {
  frozen:  '#93c5fd',
  cold:    '#65a30d',
  neutral: '#4d7c0f',
  warm:    '#d97706',
};

export function Triceratops({ temperature, size = 80, blinking = false, mood: moodOverride, ariaLabel }: AnimalProps) {
  const mood  = resolveMood(temperature, moodOverride);
  const isHot = temperature !== null && temperature >= 28;
  const body  = TRIC_BODY[mood];
  const horn  = TRIC_HORN[mood];

  return (
    <PetSvg size={size} shivering={mood === 'cold' || mood === 'frozen'} ariaLabel={ariaLabel}>
      <PetShadow cx={32} />
      <PetIcicles mood={mood} y={73} leftX={18} rightX={40} />

      {/* ── Schwanz ── */}
      <path d="M50,62 C60,58 62,48 56,42" stroke={body} strokeWidth="5" strokeLinecap="round" fill="none" />
      <polygon points="53,39 57,45 61,40" fill={body} stroke={OUTLINE} strokeWidth="1" />

      {/* ── Körper (breit, gedrungen) ── */}
      <ellipse cx="32" cy="62" rx="18" ry="12" fill={body} stroke={OUTLINE} strokeWidth="1.5" />

      {/* ── Bauch (heller) ── */}
      <ellipse cx="30" cy="64" rx="10" ry="8" fill="white" opacity="0.2" />

      {/* ── Beine (alle 4 sichtbar) ── */}
      <ellipse cx="18" cy="74" rx="6" ry="3.5" fill={body} stroke={OUTLINE} strokeWidth="1" />
      <ellipse cx="28" cy="75" rx="6" ry="3.5" fill={body} stroke={OUTLINE} strokeWidth="1" />
      <ellipse cx="38" cy="75" rx="6" ry="3.5" fill={body} stroke={OUTLINE} strokeWidth="1" />
      <ellipse cx="46" cy="73" rx="6" ry="3.5" fill={body} stroke={OUTLINE} strokeWidth="1" />

      {/* ── Nackenschild (hinter Kopf) ── */}
      <ellipse cx="24" cy="28" rx="15" ry="12" fill={body} stroke={OUTLINE} strokeWidth="1.5" />
      {/* Schild-Muster */}
      <ellipse cx="24" cy="28" rx="10" ry="8" fill="none" stroke={OUTLINE} strokeWidth="0.8" opacity="0.35" />
      <ellipse cx="24" cy="28" rx="5"  ry="4" fill="none" stroke={OUTLINE} strokeWidth="0.8" opacity="0.25" />

      {/* ── Kopf ── */}
      <ellipse cx="30" cy="38" rx="16" ry="14" fill={body} stroke={OUTLINE} strokeWidth="1.5" />

      {/* ── Hörner ── */}
      {/* Linkes Haupthorn */}
      <polygon points="20,28 24,28 21,12" fill={horn} stroke={OUTLINE} strokeWidth="1" />
      {/* Rechtes Haupthorn */}
      <polygon points="33,26 37,26 35,10" fill={horn} stroke={OUTLINE} strokeWidth="1" />
      {/* Nasenhorn (kurz) */}
      <polygon points="27,28 31,28 29,22" fill={horn} stroke={OUTLINE} strokeWidth="1" />

      {/* Sonne reflektiert auf Hornspitzen (warm) */}
      {mood === 'warm' && (
        <>
          <circle cx="21" cy="12" r="2.5" fill="#fef08a" opacity="0.8" />
          <circle cx="35" cy="10" r="2.5" fill="#fef08a" opacity="0.8" />
        </>
      )}

      <PetSnowflakes mood={mood} left={{ x: 4, y: 22 }} right={{ x: 54, y: 22 }} />
      <PetSun mood={mood} cx={57} cy={12} />
      <PetSweat isHot={isHot} x={5} y={14} />

      {/* ── Augen ── */}
      {mood === 'neutral' && (blinking ? (
        <>
          <line x1="20" y1="36" x2="27" y2="36" stroke={OUTLINE} strokeWidth="2.5" strokeLinecap="round" />
          <line x1="33" y1="36" x2="40" y2="36" stroke={OUTLINE} strokeWidth="2.5" strokeLinecap="round" />
        </>
      ) : (
        <>
          <circle cx="23" cy="36" r="4" fill={OUTLINE} />
          <circle cx="37" cy="36" r="4" fill={OUTLINE} />
          <circle cx="21.5" cy="34.5" r="1.2" fill="white" opacity="0.7" />
          <circle cx="35.5" cy="34.5" r="1.2" fill="white" opacity="0.7" />
        </>
      ))}

      <PetSunglasses
        mood={mood}
        frame={{ y: 29, w: 13, h: 11, rx: 4 }}
        leftX={15} rightX={30}
        leftTemple={[15, 35, 6, 38]}
        rightTemple={[43, 35, 52, 38]}
      />

      <PetWorriedBrows
        mood={mood}
        leftBrow={{ x1: 16, y1: 28, x2: 30, y2: 32 }}
        rightBrow={{ x1: 32, y1: 32, x2: 44, y2: 28 }}
      />
      {mood === 'cold' && (
        <>
          <circle cx="23" cy="37" r="4" fill={OUTLINE} />
          <circle cx="37" cy="37" r="4" fill={OUTLINE} />
          <circle cx="21.5" cy="35.5" r="1.2" fill="white" opacity="0.65" />
          <circle cx="35.5" cy="35.5" r="1.2" fill="white" opacity="0.65" />
        </>
      )}

      <PetFrozenEyes
        mood={mood}
        leftBox={{ l: 17, t: 30, r: 29, b: 42 }}
        rightBox={{ l: 31, t: 30, r: 43, b: 42 }}
      />

      {/* ── Schnauze ── */}
      <ellipse cx="30" cy="48" rx="8" ry="5" fill={body} stroke={OUTLINE} strokeWidth="1" />
      <circle cx="27" cy="46" r="1.5" fill={OUTLINE} opacity="0.45" />
      <circle cx="33" cy="46" r="1.5" fill={OUTLINE} opacity="0.45" />

      <PetBlush mood={mood} leftCx={14} rightCx={46} cy={46} rx={5} ry={3} />

      {/* ── Mund ── */}
      {(mood === 'neutral' || mood === 'warm') && (
        <path d="M24,52 Q30,56 36,52" stroke={OUTLINE} strokeWidth="1.5" strokeLinecap="round" fill="none" />
      )}
      {(mood === 'cold' || mood === 'frozen') && (
        <path d="M24,52 Q30,48 36,52" stroke={OUTLINE} strokeWidth="1.5" strokeLinecap="round" fill="none" />
      )}

      <PetScarf mood={mood} x={10} y={53} width={36} knotCx={44} knotCy={58} />
    </PetSvg>
  );
}
