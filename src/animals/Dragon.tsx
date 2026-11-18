/**
 * Drachen im Retro-Stil
 *
 * Erkennungsmerkmale: Grüner Körper (mood-tinted), Hörner, Flügelstummel,
 * geschwungener Schwanz, Schlitzaugen.
 * Mood-Details: Feueratem (warm), Eisatem (frozen).
 *
 * Mood → temperature:
 *   warm    ≥ 22 °C  Sonnenbrille + Feueratem + Wangenrouge
 *   neutral  8–22 °C  Schlitzaugen, geschlossenes Lächeln
 *   cold     0–8 °C  besorgte Augen, Schal, Schneeflocken, Zittern
 *   frozen    < 0 °C  X-Augen, Eisatem, Eiszapfen, Schal, starkes Zittern
 */

import type { Mood, PetProps } from '../shared';
import { resolveMood, OUTLINE } from '../shared';
import {
  PetSvg, PetShadow, PetIcicles, PetSun,
  PetSweat, PetSnowflakes, PetScarf, PetBlush,
  PetSunglasses, PetFrozenEyes, PetWorriedBrows,
} from '../petParts';

const DRAGON_BODY: Record<Mood, string> = {
  frozen:  '#bfdbfe',
  cold:    '#bbf7d0',
  neutral: '#4ade80',
  warm:    '#fbbf24',
};

const DRAGON_HORN  = '#16a34a';  // dunkelgrüne Hörner
const DRAGON_SCALE = '#15803d';  // Schuppen-Akzente

export function Dragon({ temperature, size = 80, blinking = false, mood: moodOverride }: PetProps) {
  const mood = resolveMood(temperature, moodOverride);
  const isHot = temperature !== null && temperature >= 28;
  const body = DRAGON_BODY[mood];
  // Schuppen passen sich der Mood-Farbe an
  const scaleColor = mood === 'frozen' ? '#3b82f6' : mood === 'cold' ? '#059669' : mood === 'warm' ? '#d97706' : DRAGON_SCALE;

  return (
    <PetSvg size={size} shivering={mood === 'cold' || mood === 'frozen'} ariaLabel={`Drachen: ${mood}`}>
      <PetShadow cx={33} />
      <PetIcicles mood={mood} y={74} />

      {/* ── Schwanz (hinter Körper) ── */}
      <path d="M45,66 C56,68 62,60 58,50" stroke={body} strokeWidth="5" strokeLinecap="round" fill="none" />
      <polygon points="55,46 51,53 59,52" fill={body} stroke={OUTLINE} strokeWidth="1" />

      {/* ── Flügelstummel ── */}
      <polygon points="16,52 4,38 15,64" fill={body} stroke={OUTLINE} strokeWidth="1.5" />
      <polygon points="50,52 62,38 51,64" fill={body} stroke={OUTLINE} strokeWidth="1.5" />

      {/* ── Körper ── */}
      <ellipse cx="32" cy="63" rx="14" ry="10" fill={body} stroke={OUTLINE} strokeWidth="1.5" />

      {/* ── Schuppen-Reihe auf Körper ── */}
      <ellipse cx="26" cy="57" rx="3" ry="2" fill={scaleColor} opacity="0.6" />
      <ellipse cx="32" cy="55" rx="3" ry="2" fill={scaleColor} opacity="0.6" />
      <ellipse cx="38" cy="57" rx="3" ry="2" fill={scaleColor} opacity="0.6" />

      {/* ── Füße ── */}
      <ellipse cx="23" cy="73" rx="8" ry="3.5" fill={body} stroke={OUTLINE} strokeWidth="1" />
      <ellipse cx="41" cy="73" rx="8" ry="3.5" fill={body} stroke={OUTLINE} strokeWidth="1" />

      {/* ── Kopf ── */}
      <circle cx="32" cy="33" r="20" fill={body} stroke={OUTLINE} strokeWidth="1.5" />

      {/* ── Hörner ── */}
      <polygon points="20,15 24,15 22,5" fill={DRAGON_HORN} stroke={OUTLINE} strokeWidth="1" />
      <polygon points="40,15 44,15 42,5" fill={DRAGON_HORN} stroke={OUTLINE} strokeWidth="1" />

      <PetSnowflakes mood={mood} left={{ x: 5, y: 22 }} right={{ x: 58, y: 22 }} />
      <PetSun mood={mood} />
      <PetSweat isHot={isHot} y={14} />

      {/* ── Augen ── */}
      {mood === 'neutral' && (blinking ? (
        <>
          <line x1="21" y1="30" x2="29" y2="30" stroke={OUTLINE} strokeWidth="2.5" strokeLinecap="round" />
          <line x1="35" y1="30" x2="43" y2="30" stroke={OUTLINE} strokeWidth="2.5" strokeLinecap="round" />
        </>
      ) : (
        <>
          <circle cx="25" cy="30" r="4" fill={OUTLINE} />
          <circle cx="39" cy="30" r="4" fill={OUTLINE} />
          {/* Vertikale Schlitzpupille — Erkennungszeichen des Drachen */}
          <ellipse cx="25" cy="30" rx="1.2" ry="2.8" fill="#ff6b00" opacity="0.75" />
          <ellipse cx="39" cy="30" rx="1.2" ry="2.8" fill="#ff6b00" opacity="0.75" />
          <circle cx="23.5" cy="28.5" r="1.1" fill="white" opacity="0.65" />
          <circle cx="37.5" cy="28.5" r="1.1" fill="white" opacity="0.65" />
        </>
      ))}

      <PetSunglasses
        mood={mood}
        frame={{ y: 23, w: 14, h: 12, rx: 4 }}
        leftX={17} rightX={33}
        leftTemple={[17, 29, 8, 32]}
        rightTemple={[47, 29, 58, 32]}
      />

      <PetWorriedBrows
        mood={mood}
        leftBrow={{ x1: 18, y1: 22, x2: 30, y2: 25 }}
        rightBrow={{ x1: 34, y1: 25, x2: 46, y2: 22 }}
      />
      {mood === 'cold' && (
        <>
          <circle cx="25" cy="31" r="4" fill={OUTLINE} />
          <circle cx="39" cy="31" r="4" fill={OUTLINE} />
          <circle cx="23.5" cy="29.5" r="1.1" fill="white" opacity="0.65" />
          <circle cx="37.5" cy="29.5" r="1.1" fill="white" opacity="0.65" />
        </>
      )}

      <PetFrozenEyes
        mood={mood}
        leftBox={{ l: 19, t: 24, r: 31, b: 36 }}
        rightBox={{ l: 33, t: 24, r: 45, b: 36 }}
      />

      {/* ── Schnauze ── */}
      <ellipse cx="32" cy="42" rx="7" ry="4.5" fill={body} stroke={OUTLINE} strokeWidth="1" />
      <circle cx="29.5" cy="40.5" r="1.5" fill={OUTLINE} opacity="0.5" />
      <circle cx="34.5" cy="40.5" r="1.5" fill={OUTLINE} opacity="0.5" />

      <PetBlush mood={mood} leftCx={15} rightCx={49} cy={43} rx={5} ry={3} />

      {/* ── Mund + Atem-Effekte ── */}
      {mood === 'neutral' && (
        <path d="M27,46 Q32,50 37,46" stroke={OUTLINE} strokeWidth="1.5" strokeLinecap="round" fill="none" />
      )}
      {mood === 'warm' && (
        <>
          <path d="M27,46 Q32,50 37,46" stroke={OUTLINE} strokeWidth="1.5" strokeLinecap="round" fill="none" />
          {/* Feueratem */}
          <path d="M30,47 Q27,53 30,58 Q32,54 32,50 Q32,55 35,59 Q37,53 34,47" fill="#f97316" opacity="0.85" />
        </>
      )}
      {mood === 'cold' && (
        <path d="M27,47 Q32,43 37,47" stroke={OUTLINE} strokeWidth="1.5" strokeLinecap="round" fill="none" />
      )}
      {mood === 'frozen' && (
        <>
          <path d="M27,47 Q32,43 37,47" stroke={OUTLINE} strokeWidth="1.5" strokeLinecap="round" fill="none" />
          {/* Eisatem */}
          <circle cx="28" cy="53" r="2.2" fill="#93c5fd" opacity="0.75" />
          <circle cx="32" cy="56" r="2.8" fill="#93c5fd" opacity="0.75" />
          <circle cx="36" cy="53" r="2.2" fill="#93c5fd" opacity="0.75" />
        </>
      )}

      <PetScarf mood={mood} x={10} y={50} width={40} knotCx={49} knotCy={55} />
    </PetSvg>
  );
}
