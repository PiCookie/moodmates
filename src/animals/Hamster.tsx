/**
 * Hamster im Retro-Stil (Feldhamster)
 *
 * Erkennungsmerkmale: Sehr breites Gesicht durch volle Backentaschen (Hauptmerkmal),
 * einfarbiges braun-oranges Gesicht, kleine runde Ohren,
 * kleine schwarze Knopfaugen hoch am Kopf.
 *
 * Mood → temperature:
 *   warm    ≥ 22 °C  Sonnenbrille + Wangenrouge
 *   neutral  8–22 °C  Knopfaugen, entspanntes Lächeln
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

const HAMSTER_FUR: Record<Mood, string> = {
  frozen:  '#9fc8e8',
  cold:    '#d4aa7c',
  neutral: '#d08a45',
  warm:    '#b87530',
};

const EAR_INNER = '#e8a090';

export function Hamster({ temperature, size = 80, blinking = false, mood: moodOverride, ariaLabel }: AnimalProps) {
  const mood  = resolveMood(temperature, moodOverride);
  const isHot = temperature !== null && temperature >= 28;
  const fur   = HAMSTER_FUR[mood];

  return (
    <PetSvg size={size} shivering={mood === 'cold' || mood === 'frozen'} ariaLabel={ariaLabel}>
      <PetShadow cx={33} />
      <PetIcicles mood={mood} y={75} />

      {/* ── Füße ── */}
      <ellipse cx="23" cy="75" rx="8" ry="3.5" fill={fur} stroke={OUTLINE} strokeWidth="1" />
      <ellipse cx="43" cy="75" rx="8" ry="3.5" fill={fur} stroke={OUTLINE} strokeWidth="1" />

      {/* ── Körper — cy=62 damit Oberkante (y=50) etwas in den Kopf hineinragt ── */}
      <ellipse cx="33" cy="62" rx="14" ry="12" fill={fur} stroke={OUTLINE} strokeWidth="1.5" />

      {/* ── Vorderpfoten ── */}
      <ellipse cx="19" cy="59" rx="4" ry="5" fill={fur} stroke={OUTLINE} strokeWidth="1.5" transform="rotate(-10 19 59)" />
      <ellipse cx="47" cy="59" rx="4" ry="5" fill={fur} stroke={OUTLINE} strokeWidth="1.5" transform="rotate(10 47 59)" />

      {/* ── Ohren ── */}
      <circle cx="21" cy="22" r="8"   fill={fur}      stroke={OUTLINE} strokeWidth="1.5" />
      <circle cx="45" cy="22" r="8"   fill={fur}      stroke={OUTLINE} strokeWidth="1.5" />
      <circle cx="21" cy="22" r="4.5" fill={EAR_INNER} />
      <circle cx="45" cy="22" r="4.5" fill={EAR_INNER} />

      {/* ── Gesicht: breite Ellipse für volle Backentaschen, einfarbig ── */}
      <ellipse cx="33" cy="38" rx="22" ry="14" fill={fur} stroke={OUTLINE} strokeWidth="1.5" />

      <PetSnowflakes mood={mood} left={{ x: 2, y: 24 }} right={{ x: 59, y: 24 }} />
      <PetSun mood={mood} />
      <PetSweat isHot={isHot} y={13} />

      {/* ── Augen (kleine schwarze Knopfaugen, hoch am Kopf) ── */}
      {mood === 'neutral' && (blinking ? (
        <>
          <line x1="26" y1="29" x2="31" y2="29" stroke={OUTLINE} strokeWidth="2" strokeLinecap="round" />
          <line x1="35" y1="29" x2="40" y2="29" stroke={OUTLINE} strokeWidth="2" strokeLinecap="round" />
        </>
      ) : (
        <>
          <circle cx="28.5" cy="29" r="3"   fill={OUTLINE} />
          <circle cx="37.5" cy="29" r="3"   fill={OUTLINE} />
          <circle cx="27.5" cy="28" r="1.1" fill="white" opacity="0.65" />
          <circle cx="36.5" cy="28" r="1.1" fill="white" opacity="0.65" />
        </>
      ))}

      <PetSunglasses
        mood={mood}
        frame={{ y: 25, w: 11, h: 11, rx: 4 }}
        leftX={23} rightX={32}
        leftTemple={[23, 31, 8, 34]}
        rightTemple={[43, 31, 52, 34]}
      />

      <PetWorriedBrows
        mood={mood}
        leftBrow={{ x1: 22, y1: 22, x2: 31, y2: 25 }}
        rightBrow={{ x1: 35, y1: 25, x2: 44, y2: 22 }}
      />
      {mood === 'cold' && (
        <>
          <circle cx="28.5" cy="30" r="3"   fill={OUTLINE} />
          <circle cx="37.5" cy="30" r="3"   fill={OUTLINE} />
          <circle cx="27.5" cy="29" r="1.1" fill="white" opacity="0.65" />
          <circle cx="36.5" cy="29" r="1.1" fill="white" opacity="0.65" />
        </>
      )}

      <PetFrozenEyes
        mood={mood}
        leftBox={{ l: 24, t: 23, r: 34, b: 35 }}
        rightBox={{ l: 34, t: 23, r: 44, b: 35 }}
      />

      {/* ── Nase (rosa, klein) ── */}
      <ellipse cx="33" cy="42" rx="3" ry="2.2" fill={EAR_INNER} />
      <ellipse cx="32" cy="41.3" rx="1.1" ry="0.7" fill="white" opacity="0.3" />

      {/* ── Schnurrhaare ── */}
      <line x1="18" y1="43" x2="28" y2="44" stroke={OUTLINE} strokeWidth="0.8" strokeLinecap="round" opacity="0.45" />
      <line x1="18" y1="46" x2="28" y2="45" stroke={OUTLINE} strokeWidth="0.8" strokeLinecap="round" opacity="0.45" />
      <line x1="38" y1="44" x2="48" y2="43" stroke={OUTLINE} strokeWidth="0.8" strokeLinecap="round" opacity="0.45" />
      <line x1="38" y1="45" x2="48" y2="46" stroke={OUTLINE} strokeWidth="0.8" strokeLinecap="round" opacity="0.45" />

      <PetBlush mood={mood} leftCx={14} rightCx={52} cy={49} rx={5} ry={3} />

      {/* ── Mund ── */}
      {mood === 'neutral' && (
        <path d="M30,45 Q33,49 36,45" stroke={OUTLINE} strokeWidth="1.5" strokeLinecap="round" fill="none" />
      )}
      {mood === 'warm' && (
        <path d="M29,45 Q33,50 37,45" stroke={OUTLINE} strokeWidth="1.5" strokeLinecap="round" fill="none" />
      )}
      {mood === 'cold' && (
        <path d="M30,47 Q33,43 36,47" stroke={OUTLINE} strokeWidth="1.5" strokeLinecap="round" fill="none" />
      )}
      {mood === 'frozen' && (
        <path d="M28,46 Q31,42 33,46 Q35,42 38,46" stroke={OUTLINE} strokeWidth="1.5" strokeLinecap="round" fill="none" />
      )}

      <PetScarf mood={mood} x={9} y={53} width={48} knotCx={55} knotCy={58} />
    </PetSvg>
  );
}
