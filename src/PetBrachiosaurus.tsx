/**
 * Gen1-Style Brachiosaurus Pet
 *
 * Erkennungsmerkmale: Langer dicker Hals, kleiner Kopf weit oben links,
 * großer Körper unten rechts — der Kontrast ist das Erkennungsmerkmal.
 * (3/4-Seitenansicht, weil der Hals die dominante Achse ist)
 *
 * Mood → temperature:
 *   warm    ≥ 22 °C  Sonne + Wangenrouge + Lächeln
 *   neutral  8–22 °C  runde Augen, Lächeln
 *   cold     0–8 °C  besorgte Brauen, Schal am Halsansatz, Schneeflocken, Zittern
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
  cold:    '#bbf7d0',
  neutral: '#86efac',
  warm:    '#fcd34d',
};

export function PetBrachiosaurus({ temperature, size = 80, blinking = false }: PetProps) {
  const mood  = getMood(temperature);
  const isHot = temperature !== null && temperature >= 28;
  const body  = BODY[mood];

  return (
    <PetSvg size={size} shivering={mood === 'cold' || mood === 'frozen'} ariaLabel={`Brachiosaurus-Pet: ${mood}`}>
      <PetShadow cx={38} />
      <PetIcicles mood={mood} y={74} leftX={22} rightX={44} />

      {/* ── Schwanz (kurz, nach rechts) ── */}
      <path d="M54,62 C62,58 64,50 60,44" stroke={body} strokeWidth="4" strokeLinecap="round" fill="none" />
      <ellipse cx="60" cy="42" rx="4" ry="3" fill={body} stroke={OUTLINE} strokeWidth="1" />

      {/* ── Körper (rechte Seite) ── */}
      <ellipse cx="38" cy="63" rx="18" ry="11" fill={body} stroke={OUTLINE} strokeWidth="1.5" />

      {/* ── 4 Beine ── */}
      <ellipse cx="24" cy="74" rx="7" ry="3.5" fill={body} stroke={OUTLINE} strokeWidth="1.5" />
      <ellipse cx="34" cy="76" rx="7" ry="3.5" fill={body} stroke={OUTLINE} strokeWidth="1.5" />
      <ellipse cx="44" cy="76" rx="7" ry="3.5" fill={body} stroke={OUTLINE} strokeWidth="1.5" />
      <ellipse cx="54" cy="74" rx="7" ry="3.5" fill={body} stroke={OUTLINE} strokeWidth="1.5" />

      {/* ── Langer dicker Hals (gefüllter Pfad) ── */}
      <path
        d="M 26,54 Q 12,38 10,16 L 20,12 Q 22,34 32,52 Z"
        fill={body}
        stroke={OUTLINE}
        strokeWidth="1.5"
        strokeLinejoin="round"
      />

      {/* ── Kleiner Kopf oben links ── */}
      <circle cx="13" cy="13" r="12" fill={body} stroke={OUTLINE} strokeWidth="1.5" />

      <PetSnowflakes mood={mood} left={{ x: 2, y: 30 }} right={{ x: 56, y: 14 }} />
      <PetSun mood={mood} cx={58} cy={10} />
      <PetSweat isHot={isHot} x={2} y={8} />

      {/* ── Augen (klein, weil kleiner Kopf) ── */}
      {mood === 'neutral' && (blinking ? (
        <>
          <line x1="6"  y1="11" x2="11" y2="11" stroke={OUTLINE} strokeWidth="2" strokeLinecap="round" />
          <line x1="15" y1="11" x2="20" y2="11" stroke={OUTLINE} strokeWidth="2" strokeLinecap="round" />
        </>
      ) : (
        <>
          <circle cx="8"  cy="11" r="3" fill={OUTLINE} />
          <circle cx="18" cy="11" r="3" fill={OUTLINE} />
          <circle cx="6.8" cy="9.8" r="0.9" fill="white" opacity="0.7" />
          <circle cx="16.8" cy="9.8" r="0.9" fill="white" opacity="0.7" />
        </>
      ))}

      <PetSunglasses
        mood={mood}
        frame={{ y: 5, w: 10, h: 9, rx: 3 }}
        leftX={3} rightX={15}
        leftTemple={[3, 10, -2, 13]}
        rightTemple={[25, 10, 30, 13]}
      />
      <PetWorriedBrows
        mood={mood}
        leftBrow={{ x1: 4, y1: 5, x2: 12, y2: 7 }}
        rightBrow={{ x1: 14, y1: 7, x2: 22, y2: 5 }}
      />
      {mood === 'cold' && (
        <>
          <circle cx="8"  cy="12" r="3" fill={OUTLINE} />
          <circle cx="18" cy="12" r="3" fill={OUTLINE} />
          <circle cx="6.8" cy="10.8" r="0.9" fill="white" opacity="0.65" />
          <circle cx="16.8" cy="10.8" r="0.9" fill="white" opacity="0.65" />
        </>
      )}
      <PetFrozenEyes
        mood={mood}
        leftBox={{ l: 4, t: 6, r: 12, b: 18 }}
        rightBox={{ l: 14, t: 6, r: 22, b: 18 }}
      />

      {/* ── Nase + Mund ── */}
      <circle cx="13" cy="18" r="1.8" fill={OUTLINE} opacity="0.4" />
      <PetBlush mood={mood} leftCx={4} rightCx={22} cy={18} rx={3} ry={2} />
      {(mood === 'neutral' || mood === 'warm') && (
        <path d="M8,21 Q13,25 18,21" stroke={OUTLINE} strokeWidth="1.2" strokeLinecap="round" fill="none" />
      )}
      {(mood === 'cold' || mood === 'frozen') && (
        <path d="M8,22 Q13,18 18,22" stroke={OUTLINE} strokeWidth="1.2" strokeLinecap="round" fill="none" />
      )}

      {/* ── Schal sitzt am Halsansatz ── */}
      <PetScarf mood={mood} x={8} y={22} width={18} knotCx={24} knotCy={27} small />
    </PetSvg>
  );
}
