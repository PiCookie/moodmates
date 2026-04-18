/**
 * Gen1-Style Pteranodon Pet
 *
 * Erkennungsmerkmale: Zwei große Flügeldreiecke dominieren das Bild (wie
 * überdimensionale Arme/Flossen), langer Kopfkamm, spitzer Schnabel.
 * Frontansicht — Flügel sind sofort erkennbar.
 *
 * Mood → temperature:
 *   warm    ≥ 22 °C  Flügelränder leuchten + Wangenrouge
 *   neutral  8–22 °C  Flügel offen, runde Augen
 *   cold     0–8 °C  Flügel enger, Schal, Schneeflocken, Zittern
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
  cold:    '#e0f2fe',
  neutral: '#38bdf8',
  warm:    '#fbbf24',
};

const WING: Record<Mood, string> = {
  frozen:  '#93c5fd',
  cold:    '#7dd3fc',
  neutral: '#0ea5e9',
  warm:    '#f97316',
};

export function PetPteranodon({ temperature, size = 80, blinking = false }: PetProps) {
  const mood  = getMood(temperature);
  const isHot = temperature !== null && temperature >= 28;
  const body  = BODY[mood];
  const wing  = WING[mood];

  // Flügel breiter bei warm/neutral, enger bei cold/frozen
  const wingOpen = mood === 'warm' || mood === 'neutral';

  return (
    <PetSvg size={size} shivering={mood === 'cold' || mood === 'frozen'} ariaLabel={`Pteranodon-Pet: ${mood}`}>
      <PetShadow cx={32} />
      <PetIcicles mood={mood} y={76} leftX={26} rightX={38} />

      {/* ── Flügel (vor Körper/Kopf, werden davon überlagert) ── */}
      {wingOpen ? (
        <>
          <polygon points="30,50  2,22  6,60" fill={wing} stroke={OUTLINE} strokeWidth="1.5" />
          <polygon points="34,50  64,22  60,60" fill={wing} stroke={OUTLINE} strokeWidth="1.5" />
        </>
      ) : (
        <>
          <polygon points="30,50  10,32  12,62" fill={wing} stroke={OUTLINE} strokeWidth="1.5" />
          <polygon points="34,50  56,32  54,62" fill={wing} stroke={OUTLINE} strokeWidth="1.5" />
        </>
      )}

      {/* Warm: leuchtende Flügelkanten */}
      {mood === 'warm' && (
        <>
          <line x1="2"  y1="22" x2="6"  y2="60" stroke="#fef9c3" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
          <line x1="64" y1="22" x2="60" y2="60" stroke="#fef9c3" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
        </>
      )}

      {/* ── Körper (klein, zwischen Flügeln) ── */}
      <ellipse cx="32" cy="62" rx="9" ry="7" fill={body} stroke={OUTLINE} strokeWidth="1.5" />

      {/* ── Kleine Füße ── */}
      <ellipse cx="27" cy="72" rx="6" ry="3" fill={body} stroke={OUTLINE} strokeWidth="1.5" />
      <ellipse cx="37" cy="72" rx="6" ry="3" fill={body} stroke={OUTLINE} strokeWidth="1.5" />

      {/* ── Kopfkamm (vor dem Kopf, wird überlagert) ── */}
      <polygon points="18,30 32,28 14,10" fill={wing} stroke={OUTLINE} strokeWidth="1.5" strokeLinejoin="round" />

      {/* ── Kopf ── */}
      <circle cx="32" cy="38" r="18" fill={body} stroke={OUTLINE} strokeWidth="1.5" />

      {/* ── Langer Schnabel (nach unten spitz) ── */}
      <polygon points="24,46 40,46 32,60" fill={body} stroke={OUTLINE} strokeWidth="1.5" strokeLinejoin="round" />
      {/* Schnabelspitze etwas dunkler */}
      <polygon points="28,54 36,54 32,60" fill={wing} opacity="0.4" />

      <PetSnowflakes mood={mood} left={{ x: 8, y: 22 }} right={{ x: 54, y: 18 }} />
      <PetSun mood={mood} />
      <PetSweat isHot={isHot} y={14} />

      {/* ── Augen ── */}
      {mood === 'neutral' && (blinking ? (
        <>
          <line x1="22" y1="34" x2="29" y2="34" stroke={OUTLINE} strokeWidth="2.5" strokeLinecap="round" />
          <line x1="35" y1="34" x2="42" y2="34" stroke={OUTLINE} strokeWidth="2.5" strokeLinecap="round" />
        </>
      ) : (
        <>
          <circle cx="25" cy="34" r="3.5" fill={OUTLINE} />
          <circle cx="39" cy="34" r="3.5" fill={OUTLINE} />
          <circle cx="23.5" cy="32.5" r="1.1" fill="white" opacity="0.7" />
          <circle cx="37.5" cy="32.5" r="1.1" fill="white" opacity="0.7" />
        </>
      ))}

      <PetSunglasses
        mood={mood}
        frame={{ y: 27, w: 13, h: 11, rx: 4 }}
        leftX={17} rightX={32}
        leftTemple={[17, 33, 10, 36]}
        rightTemple={[45, 33, 52, 36]}
      />
      <PetWorriedBrows
        mood={mood}
        leftBrow={{ x1: 19, y1: 26, x2: 30, y2: 29 }}
        rightBrow={{ x1: 36, y1: 29, x2: 47, y2: 26 }}
      />
      {mood === 'cold' && (
        <>
          <circle cx="25" cy="35" r="3.5" fill={OUTLINE} />
          <circle cx="39" cy="35" r="3.5" fill={OUTLINE} />
          <circle cx="23.5" cy="33.5" r="1.1" fill="white" opacity="0.65" />
          <circle cx="37.5" cy="33.5" r="1.1" fill="white" opacity="0.65" />
        </>
      )}
      <PetFrozenEyes
        mood={mood}
        leftBox={{ l: 19, t: 28, r: 31, b: 40 }}
        rightBox={{ l: 33, t: 28, r: 45, b: 40 }}
      />

      <PetBlush mood={mood} leftCx={16} rightCx={48} cy={44} rx={5} ry={3} />

      <PetScarf mood={mood} x={16} y={54} width={32} knotCx={46} knotCy={59} small />
    </PetSvg>
  );
}
