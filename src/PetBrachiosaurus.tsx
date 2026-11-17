/**
 * Gen1-Style Brachiosaurus Pet
 *
 * Erkennungsmerkmale: Langer geschwungener Hals, kleiner Kopf weit oben,
 * massiger Körper unten, kurzer Schwanz rechts, vierbeinig.
 * Mood-Details: Kopf reckt sich zur Sonne (warm), hängt schlaff (frozen).
 *
 * Mood → temperature:
 *   warm    ≥ 22 °C  Sonnenbrille + Wangenrouge + Sonne
 *   neutral  8–22 °C  runde Augen, Lächeln
 *   cold     0–8 °C  besorgte Brauen, Schal am Hals, Schneeflocken, Zittern
 *   frozen    < 0 °C  X-Augen, Eiszapfen, Schal, starkes Zittern
 */

import type { Mood, PetProps } from './pet.shared';
import { resolveMood, OUTLINE } from './pet.shared';
import {
  PetSvg, PetShadow, PetIcicles, PetSun,
  PetSweat, PetSnowflakes, PetScarf, PetBlush,
  PetSunglasses, PetFrozenEyes, PetWorriedBrows,
} from './BasePet';

const BRACHIO_BODY: Record<Mood, string> = {
  frozen:  '#bfdbfe',
  cold:    '#bbf7d0',
  neutral: '#4ade80',
  warm:    '#fbbf24',
};

export function PetBrachiosaurus({ temperature, size = 80, blinking = false, mood: moodOverride }: PetProps) {
  const mood  = resolveMood(temperature, moodOverride);
  const isHot = temperature !== null && temperature >= 28;
  const body  = BRACHIO_BODY[mood];

  return (
    <PetSvg size={size} shivering={mood === 'cold' || mood === 'frozen'} ariaLabel={`Brachiosaurus-Pet: ${mood}`}>
      <PetShadow cx={36} />
      <PetIcicles mood={mood} y={74} leftX={20} rightX={42} />

      {/* ── Schwanz (kurz, nach rechts) ── */}
      <path d="M52,62 C60,58 64,52 60,46" stroke={body} strokeWidth="5" strokeLinecap="round" fill="none" />
      <ellipse cx="59" cy="44" rx="4" ry="3" fill={body} stroke={OUTLINE} strokeWidth="1" />

      {/* ── Körper ── */}
      <ellipse cx="34" cy="64" rx="18" ry="11" fill={body} stroke={OUTLINE} strokeWidth="1.5" />

      {/* ── Bauch ── */}
      <ellipse cx="32" cy="67" rx="11" ry="7" fill="white" opacity="0.2" />

      {/* ── 4 kurze Beine ── */}
      <ellipse cx="20" cy="74" rx="6" ry="3.5" fill={body} stroke={OUTLINE} strokeWidth="1" />
      <ellipse cx="30" cy="76" rx="6" ry="3.5" fill={body} stroke={OUTLINE} strokeWidth="1" />
      <ellipse cx="40" cy="76" rx="6" ry="3.5" fill={body} stroke={OUTLINE} strokeWidth="1" />
      <ellipse cx="50" cy="74" rx="6" ry="3.5" fill={body} stroke={OUTLINE} strokeWidth="1" />

      {/* ── Langer Hals (gefüllter Pfad, verjüngend nach oben) ── */}
      <path
        d="M 26,55 Q 14,42 12,20 L 20,18 Q 22,38 30,52 Z"
        fill={body}
        stroke={OUTLINE}
        strokeWidth="1.5"
        strokeLinejoin="round"
      />

      {/* ── Kleiner Kopf oben ── */}
      <ellipse cx="14" cy="15" rx="10" ry="8" fill={body} stroke={OUTLINE} strokeWidth="1.5" />

      <PetSnowflakes mood={mood} left={{ x: 4, y: 30 }} right={{ x: 54, y: 20 }} />
      <PetSun mood={mood} cx={56} cy={10} />
      <PetSweat isHot={isHot} x={3} y={10} />

      {/* ── Augen (klein, wegen kleinem Kopf) ── */}
      {mood === 'neutral' && (blinking ? (
        <>
          <line x1="7"  y1="13" x2="12" y2="13" stroke={OUTLINE} strokeWidth="2" strokeLinecap="round" />
          <line x1="16" y1="13" x2="21" y2="13" stroke={OUTLINE} strokeWidth="2" strokeLinecap="round" />
        </>
      ) : (
        <>
          <circle cx="9"  cy="13" r="3" fill={OUTLINE} />
          <circle cx="19" cy="13" r="3" fill={OUTLINE} />
          <circle cx="7.8" cy="11.8" r="0.9" fill="white" opacity="0.7" />
          <circle cx="17.8" cy="11.8" r="0.9" fill="white" opacity="0.7" />
        </>
      ))}

      <PetSunglasses
        mood={mood}
        frame={{ y: 8, w: 10, h: 9, rx: 3 }}
        leftX={4} rightX={16}
        leftTemple={[4, 13, -2, 16]}
        rightTemple={[26, 13, 32, 16]}
      />

      <PetWorriedBrows
        mood={mood}
        leftBrow={{ x1: 5, y1: 8, x2: 13, y2: 10 }}
        rightBrow={{ x1: 15, y1: 10, x2: 23, y2: 8 }}
      />
      {mood === 'cold' && (
        <>
          <circle cx="9"  cy="14" r="3" fill={OUTLINE} />
          <circle cx="19" cy="14" r="3" fill={OUTLINE} />
          <circle cx="7.8" cy="12.8" r="0.9" fill="white" opacity="0.65" />
          <circle cx="17.8" cy="12.8" r="0.9" fill="white" opacity="0.65" />
        </>
      )}

      <PetFrozenEyes
        mood={mood}
        leftBox={{ l: 5, t: 9, r: 13, b: 19 }}
        rightBox={{ l: 15, t: 9, r: 23, b: 19 }}
      />

      {/* ── Schnauze ── */}
      <ellipse cx="14" cy="20" rx="5" ry="3.5" fill={body} stroke={OUTLINE} strokeWidth="1" />
      <circle cx="12" cy="19" r="1.2" fill={OUTLINE} opacity="0.4" />
      <circle cx="16" cy="19" r="1.2" fill={OUTLINE} opacity="0.4" />

      <PetBlush mood={mood} leftCx={5} rightCx={23} cy={19} rx={3} ry={2} />

      {/* ── Mund ── */}
      {(mood === 'neutral' || mood === 'warm') && (
        <path d="M10,23 Q14,26 18,23" stroke={OUTLINE} strokeWidth="1.5" strokeLinecap="round" fill="none" />
      )}
      {(mood === 'cold' || mood === 'frozen') && (
        <path d="M10,23 Q14,20 18,23" stroke={OUTLINE} strokeWidth="1.5" strokeLinecap="round" fill="none" />
      )}

      {/* Schal sitzt am Halsansatz */}
      <PetScarf mood={mood} x={10} y={24} width={18} knotCx={26} knotCy={29} small />
    </PetSvg>
  );
}
