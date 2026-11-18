/**
 * Ankylosaurus im Retro-Stil
 *
 * Erkennungsmerkmale: Breiter gepanzerter Körper mit ovalen Schutzplatten auf
 * dem Rücken, markante Keule am Schwanzende (Thagomizer-Keule), kurze Beine,
 * kleiner Kopf mit seitlichen Hörnchen.
 * Look-Details: Panzerplatten leuchten (warm), vereist (frozen).
 *
 * Look (the ranges below are only an example, the app decides):
 *   warm    ≥ 22 °C  Sonnenbrille + Wangenrouge + Panzer-Glanz
 *   neutral  8–22 °C  Standardpanzer, runde Augen, Lächeln
 *   cold     0–8 °C  besorgte Brauen, Schal, Schneeflocken, Zittern
 *   frozen    < 0 °C  X-Augen, Eiszapfen, gefrorener Panzer, starkes Zittern
 */

import type { Look, AnimalProps } from '../shared';
import { OUTLINE } from '../shared';
import {
  PetSvg, PetShadow, PetIcicles, PetSun,
  PetSweat, PetSnowflakes, PetScarf, PetBlush,
  PetSunglasses, PetFrozenEyes, PetWorriedBrows,
} from '../petParts';

const ANKY_BODY: Record<Look, string> = {
  frozen:  '#bfdbfe',
  cold:    '#d9f99d',
  neutral: '#86efac',
  warm:    '#fcd34d',
};

const ANKY_ARMOR: Record<Look, string> = {
  frozen:  '#93c5fd',
  cold:    '#4ade80',
  neutral: '#16a34a',
  warm:    '#d97706',
};

export function Ankylosaurus({ mood, isHot, size = 80, blinking = false, ariaLabel }: AnimalProps) {
  const body  = ANKY_BODY[mood];
  const armor = ANKY_ARMOR[mood];

  return (
    <PetSvg size={size} shivering={mood === 'cold' || mood === 'frozen'} ariaLabel={ariaLabel}>
      <PetShadow cx={30} />
      <PetIcicles mood={mood} y={74} leftX={14} rightX={36} />

      {/* ── Schwanz mit Keule ── */}
      <path d="M50,62 C58,58 62,52 60,46" stroke={body} strokeWidth="5" strokeLinecap="round" fill="none" />
      {/* Keule (oval) */}
      <ellipse cx="62" cy="43" rx="7" ry="5" fill={armor} stroke={OUTLINE} strokeWidth="1.5" />
      {/* Keule-Stacheln */}
      <line x1="62" y1="38" x2="62" y2="35" stroke={OUTLINE} strokeWidth="1.5" strokeLinecap="round" />
      <line x1="67" y1="41" x2="70" y2="39" stroke={OUTLINE} strokeWidth="1.5" strokeLinecap="round" />
      <line x1="67" y1="46" x2="70" y2="48" stroke={OUTLINE} strokeWidth="1.5" strokeLinecap="round" />

      {/* ── Körper (breiter, abgeflachter) ── */}
      <ellipse cx="30" cy="63" rx="22" ry="10" fill={body} stroke={OUTLINE} strokeWidth="1.5" />

      {/* ── Panzerplatten auf dem Rücken (ovale Schuppen in zwei Reihen) ── */}
      {/* Hintere Reihe */}
      <ellipse cx="44" cy="55" rx="5" ry="3.5" fill={armor} stroke={OUTLINE} strokeWidth="1" opacity="0.9" />
      <ellipse cx="36" cy="54" rx="5" ry="3.5" fill={armor} stroke={OUTLINE} strokeWidth="1" opacity="0.9" />
      <ellipse cx="28" cy="53" rx="5" ry="3.5" fill={armor} stroke={OUTLINE} strokeWidth="1" opacity="0.9" />
      <ellipse cx="20" cy="54" rx="5" ry="3.5" fill={armor} stroke={OUTLINE} strokeWidth="1" opacity="0.9" />
      {/* Vordere Reihe (kleiner) */}
      <ellipse cx="40" cy="58" rx="3.5" ry="2.5" fill={armor} stroke={OUTLINE} strokeWidth="0.8" opacity="0.7" />
      <ellipse cx="32" cy="57" rx="3.5" ry="2.5" fill={armor} stroke={OUTLINE} strokeWidth="0.8" opacity="0.7" />
      <ellipse cx="24" cy="58" rx="3.5" ry="2.5" fill={armor} stroke={OUTLINE} strokeWidth="0.8" opacity="0.7" />

      {/* Panzer-Glanz bei warm */}
      {mood === 'warm' && (
        <>
          <ellipse cx="36" cy="53" rx="2" ry="1.2" fill="#fef9c3" opacity="0.5" />
          <ellipse cx="28" cy="52" rx="2" ry="1.2" fill="#fef9c3" opacity="0.5" />
          <ellipse cx="44" cy="54" rx="2" ry="1.2" fill="#fef9c3" opacity="0.5" />
        </>
      )}

      {/* ── 4 kurze, stämmige Beine ── */}
      <ellipse cx="14" cy="73" rx="6" ry="3.5" fill={body} stroke={OUTLINE} strokeWidth="1" />
      <ellipse cx="24" cy="75" rx="6" ry="3.5" fill={body} stroke={OUTLINE} strokeWidth="1" />
      <ellipse cx="36" cy="75" rx="6" ry="3.5" fill={body} stroke={OUTLINE} strokeWidth="1" />
      <ellipse cx="46" cy="73" rx="6" ry="3.5" fill={body} stroke={OUTLINE} strokeWidth="1" />

      {/* ── Kleiner Kopf (links, tief positioniert) ── */}
      <ellipse cx="11" cy="57" rx="10" ry="9" fill={body} stroke={OUTLINE} strokeWidth="1.5" />

      {/* ── Seitliche Kopfhörnchen ── */}
      <polygon points="3,51 7,51 4,44"  fill={armor} stroke={OUTLINE} strokeWidth="1" />
      <polygon points="15,51 19,51 17,44" fill={armor} stroke={OUTLINE} strokeWidth="1" />

      <PetSnowflakes mood={mood} left={{ x: 3, y: 22 }} right={{ x: 52, y: 22 }} />
      <PetSun mood={mood} cx={56} cy={12} />
      <PetSweat isHot={isHot} x={3} y={14} />

      {/* ── Augen ── */}
      {mood === 'neutral' && (blinking ? (
        <>
          <line x1="5"  y1="54" x2="10" y2="54" stroke={OUTLINE} strokeWidth="2.5" strokeLinecap="round" />
          <line x1="13" y1="54" x2="18" y2="54" stroke={OUTLINE} strokeWidth="2.5" strokeLinecap="round" />
        </>
      ) : (
        <>
          <circle cx="7"  cy="54" r="3.5" fill={OUTLINE} />
          <circle cx="16" cy="54" r="3.5" fill={OUTLINE} />
          <circle cx="5.5" cy="52.5" r="1" fill="white" opacity="0.7" />
          <circle cx="14.5" cy="52.5" r="1" fill="white" opacity="0.7" />
        </>
      ))}

      <PetSunglasses
        mood={mood}
        frame={{ y: 48, w: 11, h: 10, rx: 3 }}
        leftX={2} rightX={15}
        leftTemple={[2, 53, -4, 56]}
        rightTemple={[26, 53, 32, 56]}
      />

      <PetWorriedBrows
        mood={mood}
        leftBrow={{ x1: 3, y1: 47, x2: 12, y2: 50 }}
        rightBrow={{ x1: 14, y1: 50, x2: 21, y2: 47 }}
      />
      {mood === 'cold' && (
        <>
          <circle cx="7"  cy="55" r="3.5" fill={OUTLINE} />
          <circle cx="16" cy="55" r="3.5" fill={OUTLINE} />
          <circle cx="5.5" cy="53.5" r="1" fill="white" opacity="0.65" />
          <circle cx="14.5" cy="53.5" r="1" fill="white" opacity="0.65" />
        </>
      )}

      <PetFrozenEyes
        mood={mood}
        leftBox={{ l: 2, t: 48, r: 12, b: 60 }}
        rightBox={{ l: 13, t: 48, r: 23, b: 60 }}
      />

      {/* ── Schnauze ── */}
      <ellipse cx="11" cy="64" rx="6" ry="4" fill={body} stroke={OUTLINE} strokeWidth="1" />
      <circle cx="9"  cy="62.5" r="1.2" fill={OUTLINE} opacity="0.4" />
      <circle cx="13" cy="62.5" r="1.2" fill={OUTLINE} opacity="0.4" />

      <PetBlush mood={mood} leftCx={2} rightCx={20} cy={62} rx={3.5} ry={2.5} />

      {/* ── Mund ── */}
      {(mood === 'neutral' || mood === 'warm') && (
        <path d="M6,67 Q11,71 16,67" stroke={OUTLINE} strokeWidth="1.5" strokeLinecap="round" fill="none" />
      )}
      {(mood === 'cold' || mood === 'frozen') && (
        <path d="M6,67 Q11,64 16,67" stroke={OUTLINE} strokeWidth="1.5" strokeLinecap="round" fill="none" />
      )}

      <PetScarf mood={mood} x={-2} y={66} width={28} knotCx={24} knotCy={70} small />
    </PetSvg>
  );
}
