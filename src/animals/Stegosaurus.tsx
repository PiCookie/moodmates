/**
 * Stegosaurus im Retro-Stil
 *
 * Erkennungsmerkmale: Doppelreihe Rückenplatten, Stachelschwanz (Thagomizer),
 * kleiner Kopf im Verhältnis zum Körper, quadruped.
 * Mood-Details: Platten leuchten warm (warm), Platten vereist (frozen).
 *
 * Mood → temperature:
 *   warm    ≥ 22 °C  Platten in Warmton + Sonnenbrille + Wangenrouge
 *   neutral  8–22 °C  Normalplatten, runde Augen, Lächeln
 *   cold     0–8 °C  besorgte Brauen, Schal, Schneeflocken, Zittern
 *   frozen    < 0 °C  X-Augen, Eiszapfen, vereiste Platten, starkes Zittern
 */

import type { Mood, PetProps } from '../shared';
import { resolveMood, OUTLINE } from '../shared';
import {
  PetSvg, PetShadow, PetIcicles, PetSun,
  PetSweat, PetSnowflakes, PetScarf, PetBlush,
  PetSunglasses, PetFrozenEyes, PetWorriedBrows,
} from '../petParts';

const STEG_BODY: Record<Mood, string> = {
  frozen:  '#bfdbfe',
  cold:    '#d9f99d',
  neutral: '#86efac',
  warm:    '#fcd34d',
};

const STEG_PLATE: Record<Mood, string> = {
  frozen:  '#93c5fd',
  cold:    '#4ade80',
  neutral: '#22c55e',
  warm:    '#f97316',
};

export function Stegosaurus({ temperature, size = 80, blinking = false, mood: moodOverride }: PetProps) {
  const mood  = resolveMood(temperature, moodOverride);
  const isHot = temperature !== null && temperature >= 28;
  const body  = STEG_BODY[mood];
  const plate = STEG_PLATE[mood];

  return (
    <PetSvg size={size} shivering={mood === 'cold' || mood === 'frozen'} ariaLabel={`Stegosaurus: ${mood}`}>
      <PetShadow cx={33} />
      <PetIcicles mood={mood} y={73} leftX={17} rightX={39} />

      {/* ── Stachelschwanz (Thagomizer) ── */}
      <path d="M52,60 C62,56 66,46 60,38" stroke={body} strokeWidth="5" strokeLinecap="round" fill="none" />
      {/* 4 Stacheln */}
      <line x1="60" y1="38" x2="65" y2="32" stroke={OUTLINE} strokeWidth="2" strokeLinecap="round" />
      <line x1="60" y1="38" x2="66" y2="38" stroke={OUTLINE} strokeWidth="2" strokeLinecap="round" />
      <line x1="60" y1="38" x2="63" y2="44" stroke={OUTLINE} strokeWidth="2" strokeLinecap="round" />

      {/* ── Körper (massig) ── */}
      <ellipse cx="33" cy="60" rx="20" ry="13" fill={body} stroke={OUTLINE} strokeWidth="1.5" />

      {/* ── Bauch ── */}
      <ellipse cx="31" cy="63" rx="12" ry="8" fill="white" opacity="0.2" />

      {/* ── Beine ── */}
      <ellipse cx="18" cy="73" rx="6" ry="3.5" fill={body} stroke={OUTLINE} strokeWidth="1" />
      <ellipse cx="28" cy="75" rx="6" ry="3.5" fill={body} stroke={OUTLINE} strokeWidth="1" />
      <ellipse cx="38" cy="75" rx="6" ry="3.5" fill={body} stroke={OUTLINE} strokeWidth="1" />
      <ellipse cx="48" cy="73" rx="6" ry="3.5" fill={body} stroke={OUTLINE} strokeWidth="1" />

      {/* ── Rückenplatten (2 Reihen, nach vorne kleiner werdend) ── */}
      {/* Hintere Platten (größer) */}
      <polygon points="38,56 42,56 42,42 39,44" fill={plate} stroke={OUTLINE} strokeWidth="1" opacity="0.9" />
      <polygon points="44,54 48,54 48,41 45,43" fill={plate} stroke={OUTLINE} strokeWidth="1" opacity="0.9" />
      {/* Mittlere Platten */}
      <polygon points="30,53 34,53 33,40 30,43" fill={plate} stroke={OUTLINE} strokeWidth="1" opacity="0.85" />
      {/* Vordere Platten (kleiner) */}
      <polygon points="22,52 26,52 25,42 22,44" fill={plate} stroke={OUTLINE} strokeWidth="1" opacity="0.8" />
      {/* Plate-Glanz bei warm */}
      {mood === 'warm' && (
        <>
          <line x1="40" y1="46" x2="40" y2="43" stroke="#fef9c3" strokeWidth="1" strokeLinecap="round" opacity="0.6" />
          <line x1="46" y1="45" x2="46" y2="42" stroke="#fef9c3" strokeWidth="1" strokeLinecap="round" opacity="0.6" />
          <line x1="32" y1="44" x2="32" y2="41" stroke="#fef9c3" strokeWidth="1" strokeLinecap="round" opacity="0.6" />
        </>
      )}

      {/* ── Kleiner Kopf ── */}
      <circle cx="16" cy="36" r="13" fill={body} stroke={OUTLINE} strokeWidth="1.5" />

      <PetSnowflakes mood={mood} left={{ x: 3, y: 18 }} right={{ x: 55, y: 18 }} />
      <PetSun mood={mood} cx={57} cy={10} />
      <PetSweat isHot={isHot} x={3} y={12} />

      {/* ── Augen ── */}
      {mood === 'neutral' && (blinking ? (
        <>
          <line x1="9"  y1="33" x2="15" y2="33" stroke={OUTLINE} strokeWidth="2.5" strokeLinecap="round" />
          <line x1="19" y1="33" x2="25" y2="33" stroke={OUTLINE} strokeWidth="2.5" strokeLinecap="round" />
        </>
      ) : (
        <>
          <circle cx="12" cy="33" r="3.5" fill={OUTLINE} />
          <circle cx="22" cy="33" r="3.5" fill={OUTLINE} />
          <circle cx="10.5" cy="31.5" r="1" fill="white" opacity="0.7" />
          <circle cx="20.5" cy="31.5" r="1" fill="white" opacity="0.7" />
        </>
      ))}

      <PetSunglasses
        mood={mood}
        frame={{ y: 27, w: 11, h: 10, rx: 3 }}
        leftX={5} rightX={18}
        leftTemple={[5, 32, -2, 35]}
        rightTemple={[29, 32, 36, 35]}
      />

      <PetWorriedBrows
        mood={mood}
        leftBrow={{ x1: 6, y1: 26, x2: 17, y2: 29 }}
        rightBrow={{ x1: 19, y1: 29, x2: 28, y2: 26 }}
      />
      {mood === 'cold' && (
        <>
          <circle cx="12" cy="34" r="3.5" fill={OUTLINE} />
          <circle cx="22" cy="34" r="3.5" fill={OUTLINE} />
          <circle cx="10.5" cy="32.5" r="1" fill="white" opacity="0.65" />
          <circle cx="20.5" cy="32.5" r="1" fill="white" opacity="0.65" />
        </>
      )}

      <PetFrozenEyes
        mood={mood}
        leftBox={{ l: 7, t: 27, r: 17, b: 39 }}
        rightBox={{ l: 18, t: 27, r: 28, b: 39 }}
      />

      {/* ── Schnauze ── */}
      <ellipse cx="16" cy="44" rx="6" ry="4" fill={body} stroke={OUTLINE} strokeWidth="1" />
      <circle cx="14" cy="43" r="1.2" fill={OUTLINE} opacity="0.45" />
      <circle cx="18" cy="43" r="1.2" fill={OUTLINE} opacity="0.45" />

      <PetBlush mood={mood} leftCx={5} rightCx={27} cy={43} rx={4} ry={2.5} />

      {/* ── Mund ── */}
      {(mood === 'neutral' || mood === 'warm') && (
        <path d="M11,48 Q16,52 21,48" stroke={OUTLINE} strokeWidth="1.5" strokeLinecap="round" fill="none" />
      )}
      {(mood === 'cold' || mood === 'frozen') && (
        <path d="M11,48 Q16,44 21,48" stroke={OUTLINE} strokeWidth="1.5" strokeLinecap="round" fill="none" />
      )}

      <PetScarf mood={mood} x={2} y={49} width={28} knotCx={28} knotCy={54} small />
    </PetSvg>
  );
}
