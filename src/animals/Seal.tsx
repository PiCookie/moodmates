/**
 * Robbe im Retro-Stil
 *
 * Erkennungsmerkmale: Tropfenförmiger Körper, kurze Vorderflossen,
 * gespreiztes Heckflossenpaar, runde Knopfaugen, breite Schnauzbartlinien.
 *
 * Schichten (hinten → vorne):
 *   Heckflossen → Körper → Bauch → Vorderflossen → Kopf → Gesicht
 *
 * Mood → temperature:
 *   warm    ≥ 22 °C  Sonnenbrille + Wangenrouge
 *   neutral  8–22 °C  runde Augen, entspanntes Lächeln
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

const ROBBE_FUR: Record<Mood, string> = {
  frozen:  '#bfdbfe', // eisblau
  cold:    '#94a3b8', // kältliches Grau
  neutral: '#64748b', // slate-grau
  warm:    '#78716c', // warmgrau/braun
};

const ROBBE_BELLY: Record<Mood, string> = {
  frozen:  '#dbeafe',
  cold:    '#e2e8f0',
  neutral: '#cbd5e1',
  warm:    '#d6d3d1',
};

export function Seal({ temperature, size = 80, blinking = false, mood: moodOverride, ariaLabel }: AnimalProps) {
  const mood  = resolveMood(temperature, moodOverride);
  const isHot = temperature !== null && temperature >= 28;
  const fur   = ROBBE_FUR[mood];
  const belly = ROBBE_BELLY[mood];

  return (
    <PetSvg size={size} shivering={mood === 'cold' || mood === 'frozen'} ariaLabel={ariaLabel}>
      <PetShadow cx={33} />
      <PetIcicles mood={mood} y={76} />

      {/* ── Heckflossen (hinter Körper, gespreizt) ── */}
      <ellipse cx="18" cy="74" rx="10" ry="4" fill={fur} stroke={OUTLINE} strokeWidth="1.3" transform="rotate(-20 18 74)" />
      <ellipse cx="46" cy="74" rx="10" ry="4" fill={fur} stroke={OUTLINE} strokeWidth="1.3" transform="rotate(20 46 74)" />

      {/* ── Körper (tropfenförmig, breit) ── */}
      <ellipse cx="32" cy="60" rx="16" ry="18" fill={fur} stroke={OUTLINE} strokeWidth="1.5" />

      {/* ── Heller Bauchbereich ── */}
      <ellipse cx="32" cy="62" rx="10" ry="13" fill={belly} />

      {/* ── Vorderflossen (kurze Stummel, an den Seiten) ── */}
      <ellipse cx="12" cy="56" rx="5" ry="8" fill={fur} stroke={OUTLINE} strokeWidth="1.3" transform="rotate(-20 12 56)" />
      <ellipse cx="52" cy="56" rx="5" ry="8" fill={fur} stroke={OUTLINE} strokeWidth="1.3" transform="rotate(20 52 56)" />

      {/* ── Kopf (rund, sitzt direkt auf dem Körper) ── */}
      <circle cx="32" cy="34" r="14" fill={fur} stroke={OUTLINE} strokeWidth="1.5" />

      {/* ── Heller Maulbereich ── */}
      <ellipse cx="32" cy="40" rx="8" ry="6" fill={belly} opacity="0.7" />

      <PetSnowflakes mood={mood} left={{ x: 5, y: 22 }} right={{ x: 59, y: 22 }} />
      <PetSun mood={mood} />
      <PetSweat isHot={isHot} y={14} />

      {/* ── Augen ── */}
      {mood === 'neutral' && (blinking ? (
        <>
          <line x1="22" y1="30" x2="29" y2="30" stroke={OUTLINE} strokeWidth="2.5" strokeLinecap="round" />
          <line x1="35" y1="30" x2="42" y2="30" stroke={OUTLINE} strokeWidth="2.5" strokeLinecap="round" />
        </>
      ) : (
        <>
          <circle cx="25.5" cy="30" r="4" fill={OUTLINE} />
          <circle cx="38.5" cy="30" r="4" fill={OUTLINE} />
          <circle cx="24"   cy="28.5" r="1.4" fill="white" opacity="0.65" />
          <circle cx="37"   cy="28.5" r="1.4" fill="white" opacity="0.65" />
        </>
      ))}

      <PetSunglasses
        mood={mood}
        frame={{ y: 24, w: 14, h: 12, rx: 4 }}
        leftX={15} rightX={35}
        leftTemple={[15, 30, 7, 33]}
        rightTemple={[49, 30, 57, 33]}
      />

      <PetWorriedBrows
        mood={mood}
        leftBrow={{ x1: 17, y1: 23, x2: 29, y2: 26 }}
        rightBrow={{ x1: 35, y1: 26, x2: 47, y2: 23 }}
      />
      {mood === 'cold' && (
        <>
          <circle cx="25.5" cy="31" r="4" fill={OUTLINE} />
          <circle cx="38.5" cy="31" r="4" fill={OUTLINE} />
          <circle cx="24"   cy="29.5" r="1.4" fill="white" opacity="0.65" />
          <circle cx="37"   cy="29.5" r="1.4" fill="white" opacity="0.65" />
        </>
      )}

      <PetFrozenEyes
        mood={mood}
        leftBox={{ l: 19, t: 24, r: 32, b: 37 }}
        rightBox={{ l: 33, t: 24, r: 46, b: 37 }}
      />

      {/* ── Nase (kleine ovale Knopfnase) ── */}
      <ellipse cx="32" cy="39" rx="2.5" ry="1.8" fill={OUTLINE} />
      <ellipse cx="31.2" cy="38.3" rx="0.9" ry="0.7" fill="white" opacity="0.3" />

      {/* ── Schnauzbartlinien (Hauptmerkmal) ── */}
      <line x1="15" y1="40" x2="29" y2="41.5" stroke={OUTLINE} strokeWidth="1.0" strokeLinecap="round" opacity="0.4" />
      <line x1="15" y1="43" x2="29" y2="43"   stroke={OUTLINE} strokeWidth="1.0" strokeLinecap="round" opacity="0.4" />
      <line x1="15" y1="46" x2="29" y2="44.5" stroke={OUTLINE} strokeWidth="1.0" strokeLinecap="round" opacity="0.4" />
      <line x1="35" y1="41.5" x2="49" y2="40" stroke={OUTLINE} strokeWidth="1.0" strokeLinecap="round" opacity="0.4" />
      <line x1="35" y1="43"   x2="49" y2="43" stroke={OUTLINE} strokeWidth="1.0" strokeLinecap="round" opacity="0.4" />
      <line x1="35" y1="44.5" x2="49" y2="46" stroke={OUTLINE} strokeWidth="1.0" strokeLinecap="round" opacity="0.4" />

      <PetBlush mood={mood} leftCx={15} rightCx={49} cy={45} rx={5} ry={3} />

      {/* ── Mund ── */}
      {mood === 'neutral' && (
        <path d="M29,43 Q32,47 35,43" stroke={OUTLINE} strokeWidth="1.5" strokeLinecap="round" fill="none" />
      )}
      {mood === 'warm' && (
        <path d="M28,43 Q32,48 36,43" stroke={OUTLINE} strokeWidth="1.5" strokeLinecap="round" fill="none" />
      )}
      {mood === 'cold' && (
        <path d="M29,45 Q32,41 35,45" stroke={OUTLINE} strokeWidth="1.5" strokeLinecap="round" fill="none" />
      )}
      {mood === 'frozen' && (
        <path d="M27,44 Q30,40 32,44 Q34,40 37,44" stroke={OUTLINE} strokeWidth="1.5" strokeLinecap="round" fill="none" />
      )}

      <PetScarf mood={mood} x={11} y={46} width={42} knotCx={52} knotCy={51} />
    </PetSvg>
  );
}
