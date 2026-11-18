/**
 * Pteranodon im Retro-Stil
 *
 * Erkennungsmerkmale: Große Lederflügel beiderseits, langer Schnabel,
 * spitzer Kopfkamm, kleiner Körper in der Mitte, kurze Füße.
 * Look-Details: Flügel leuchten (warm), Flügel hängen schlaff (frozen).
 *
 * Look (the ranges below are only an example, the app decides):
 *   warm    ≥ 22 °C  Wangenrouge + Sonne + leuchtende Flügelränder
 *   neutral  8–22 °C  Flügel offen, runde Augen, Lächeln
 *   cold     0–8 °C  Flügel enger, Schal, Schneeflocken, Zittern
 *   frozen    < 0 °C  X-Augen, Eiszapfen, Flügel hängen, starkes Zittern
 */

import type { Look, AnimalProps } from '../shared';
import { OUTLINE } from '../shared';
import {
  PetSvg, PetShadow, PetIcicles, PetSun,
  PetSweat, PetSnowflakes, PetScarf, PetBlush,
  PetSunglasses, PetFrozenEyes, PetWorriedBrows,
} from '../petParts';

const PTERO_BODY: Record<Look, string> = {
  frozen:  '#bfdbfe',
  cold:    '#e0f2fe',
  neutral: '#7dd3fc',
  warm:    '#fbbf24',
};

const PTERO_WING: Record<Look, string> = {
  frozen:  '#93c5fd',
  cold:    '#bae6fd',
  neutral: '#38bdf8',
  warm:    '#f97316',
};

export function Pteranodon({ mood, isHot, size = 80, blinking = false, ariaLabel }: AnimalProps) {
  const body  = PTERO_BODY[mood];
  const wing  = PTERO_WING[mood];

  // Flügelform hängt von Stimmung ab
  const wingOpenLeft  = mood === 'warm' || mood === 'neutral';
  const wingOpenRight = mood === 'warm' || mood === 'neutral';

  return (
    <PetSvg size={size} shivering={mood === 'cold' || mood === 'frozen'} ariaLabel={ariaLabel}>
      <PetShadow cx={33} />
      <PetIcicles mood={mood} y={80} leftX={24} rightX={36} />

      {/* ── Linker Flügel ── */}
      {wingOpenLeft ? (
        <polygon points="33,50 3,26 8,58" fill={wing} stroke={OUTLINE} strokeWidth="1.2" opacity="0.9" />
      ) : (
        <polygon points="33,50 10,40 14,62" fill={wing} stroke={OUTLINE} strokeWidth="1.2" opacity="0.9" />
      )}

      {/* ── Rechter Flügel ── */}
      {wingOpenRight ? (
        <polygon points="33,50 63,26 58,58" fill={wing} stroke={OUTLINE} strokeWidth="1.2" opacity="0.9" />
      ) : (
        <polygon points="33,50 56,40 52,62" fill={wing} stroke={OUTLINE} strokeWidth="1.2" opacity="0.9" />
      )}

      {/* Warm: leuchtender Flügelrand */}
      {mood === 'warm' && (
        <>
          <line x1="3"  y1="26" x2="8"  y2="58" stroke="#fef08a" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
          <line x1="63" y1="26" x2="58" y2="58" stroke="#fef08a" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
        </>
      )}

      {/* ── Körper ── */}
      <ellipse cx="33" cy="57" rx="10" ry="8" fill={body} stroke={OUTLINE} strokeWidth="1.5" />

      {/* ── Kleine Füße ── */}
      <line x1="28" y1="65" x2="26" y2="72" stroke={OUTLINE} strokeWidth="2" strokeLinecap="round" />
      <line x1="38" y1="65" x2="40" y2="72" stroke={OUTLINE} strokeWidth="2" strokeLinecap="round" />
      <line x1="26" y1="72" x2="23" y2="75" stroke={OUTLINE} strokeWidth="1.5" strokeLinecap="round" />
      <line x1="26" y1="72" x2="26" y2="76" stroke={OUTLINE} strokeWidth="1.5" strokeLinecap="round" />
      <line x1="40" y1="72" x2="43" y2="75" stroke={OUTLINE} strokeWidth="1.5" strokeLinecap="round" />
      <line x1="40" y1="72" x2="40" y2="76" stroke={OUTLINE} strokeWidth="1.5" strokeLinecap="round" />

      {/* ── Kopf ── */}
      <circle cx="33" cy="42" r="10" fill={body} stroke={OUTLINE} strokeWidth="1.5" />

      {/* ── Kopfkamm (spitz nach hinten-oben) ── */}
      <polygon points="24,38 34,34 26,26" fill={body} stroke={OUTLINE} strokeWidth="1" />

      {/* ── Langer Schnabel (nach rechts) ── */}
      <polygon points="33,40 33,46 52,43" fill={body} stroke={OUTLINE} strokeWidth="1" />
      {/* Schnabel-Nasenöffnung */}
      <circle cx="46" cy="43" r="1" fill={OUTLINE} opacity="0.4" />

      <PetSnowflakes mood={mood} left={{ x: 4, y: 16 }} right={{ x: 56, y: 16 }} />
      <PetSun mood={mood} cx={56} cy={10} />
      <PetSweat isHot={isHot} x={4} y={12} />

      {/* ── Auge (nur links sichtbar — Seitenansicht) ── */}
      {mood === 'neutral' && (blinking ? (
        <line x1="26" y1="40" x2="31" y2="40" stroke={OUTLINE} strokeWidth="2.5" strokeLinecap="round" />
      ) : (
        <>
          <circle cx="28" cy="40" r="3.5" fill={OUTLINE} />
          <circle cx="26.5" cy="38.5" r="1" fill="white" opacity="0.7" />
        </>
      ))}

      <PetSunglasses
        mood={mood}
        frame={{ y: 34, w: 10, h: 9, rx: 3 }}
        leftX={22} rightX={34}
        leftTemple={[22, 39, 14, 42]}
        rightTemple={[44, 39, 52, 42]}
        stegY={38}
      />

      <PetWorriedBrows
        mood={mood}
        leftBrow={{ x1: 22, y1: 33, x2: 32, y2: 36 }}
        rightBrow={{ x1: 34, y1: 36, x2: 42, y2: 33 }}
      />
      {mood === 'cold' && (
        <>
          <circle cx="28" cy="41" r="3.5" fill={OUTLINE} />
          <circle cx="26.5" cy="39.5" r="1" fill="white" opacity="0.65" />
        </>
      )}

      <PetFrozenEyes
        mood={mood}
        leftBox={{ l: 22, t: 34, r: 34, b: 46 }}
        rightBox={{ l: 34, t: 34, r: 46, b: 46 }}
      />

      <PetBlush mood={mood} leftCx={20} rightCx={42} cy={46} rx={4} ry={2.5} />

      {/* ── Mund (am Schnabelansatz) ── */}
      {(mood === 'neutral' || mood === 'warm') && (
        <path d="M28,47 Q33,50 38,47" stroke={OUTLINE} strokeWidth="1.5" strokeLinecap="round" fill="none" />
      )}
      {(mood === 'cold' || mood === 'frozen') && (
        <path d="M28,47 Q33,44 38,47" stroke={OUTLINE} strokeWidth="1.5" strokeLinecap="round" fill="none" />
      )}

      <PetScarf mood={mood} x={20} y={51} width={24} knotCx={42} knotCy={56} small />
    </PetSvg>
  );
}
