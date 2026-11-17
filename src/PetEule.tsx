/**
 * Gen1-Style Eule Pet
 *
 * Erkennungsmerkmale: Riesige runde Augen (Hauptmerkmal), Federbüschel-Ohren,
 * runder kompakter Körper, kleiner Schnabel. Blinzel-Animation besonders
 * auffällig durch die übergroßen Augen.
 *
 * Schichten (hinten → vorne):
 *   Körper → Flügel → Kopf → Federbüschel → Gesicht
 *
 * Mood → temperature:
 *   warm    ≥ 22 °C  Sonnenbrille + Wangenrouge
 *   neutral  8–22 °C  riesige Augen, entspannter Ausdruck
 *   cold     0–8 °C  besorgte Augen, Schal, Schneeflocken, Zittern
 *   frozen    < 0 °C  X-Augen, Eiszapfen, Schal, starkes Zittern
 */

import type { Mood, PetProps } from './pet.shared';
import { resolveMood, OUTLINE } from './pet.shared';
import {
  PetSvg, PetShadow, PetIcicles, PetSun,
  PetSweat, PetSnowflakes, PetScarf, PetBlush,
  PetSunglasses, PetFrozenEyes, PetWorriedBrows,
} from './BasePet';

const EULE_FUR: Record<Mood, string> = {
  frozen:  '#c7d2fe', // eisblau
  cold:    '#94a3b8', // kühles Grau
  neutral: '#92400e', // warmes Braun
  warm:    '#b45309', // satteres Braun
};

const EULE_BELLY: Record<Mood, string> = {
  frozen:  '#e0e7ff',
  cold:    '#f1f5f9',
  neutral: '#fef3c7',
  warm:    '#fde68a',
};

const EYE_RING: Record<Mood, string> = {
  frozen:  '#4338ca',
  cold:    '#475569',
  neutral: '#78350f',
  warm:    '#92400e',
};

export function PetEule({ temperature, size = 80, blinking = false, mood: moodOverride }: PetProps) {
  const mood    = resolveMood(temperature, moodOverride);
  const isHot   = temperature !== null && temperature >= 28;
  const fur     = EULE_FUR[mood];
  const belly   = EULE_BELLY[mood];
  const eyeRing = EYE_RING[mood];

  return (
    <PetSvg size={size} shivering={mood === 'cold' || mood === 'frozen'} ariaLabel={`Eule-Pet: ${mood}`}>
      <PetShadow cx={32} />
      <PetIcicles mood={mood} y={77} />

      {/* ── Füße / Krallen ── */}
      <ellipse cx="24" cy="75" rx="7" ry="3" fill={fur} stroke={OUTLINE} strokeWidth="1" />
      <ellipse cx="40" cy="75" rx="7" ry="3" fill={fur} stroke={OUTLINE} strokeWidth="1" />
      {/* Krallen-Linien */}
      <line x1="19" y1="75" x2="17" y2="78" stroke={OUTLINE} strokeWidth="1.2" strokeLinecap="round" />
      <line x1="24" y1="76" x2="24" y2="79" stroke={OUTLINE} strokeWidth="1.2" strokeLinecap="round" />
      <line x1="29" y1="75" x2="31" y2="78" stroke={OUTLINE} strokeWidth="1.2" strokeLinecap="round" />
      <line x1="35" y1="75" x2="33" y2="78" stroke={OUTLINE} strokeWidth="1.2" strokeLinecap="round" />
      <line x1="40" y1="76" x2="40" y2="79" stroke={OUTLINE} strokeWidth="1.2" strokeLinecap="round" />
      <line x1="45" y1="75" x2="47" y2="78" stroke={OUTLINE} strokeWidth="1.2" strokeLinecap="round" />

      {/* ── Körper (rundlich, kompakt) ── */}
      <ellipse cx="32" cy="63" rx="16" ry="13" fill={fur}   stroke={OUTLINE} strokeWidth="1.5" />
      <ellipse cx="32" cy="66" rx="10" ry="8"  fill={belly} />

      {/* ── Flügel-Andeutungen an den Seiten ── */}
      <ellipse cx="14" cy="60" rx="5" ry="9" fill={fur} stroke={OUTLINE} strokeWidth="1.2" transform="rotate(-15 14 60)" />
      <ellipse cx="50" cy="60" rx="5" ry="9" fill={fur} stroke={OUTLINE} strokeWidth="1.2" transform="rotate(15 50 60)" />

      {/* ── Kopf (groß, rund) ── */}
      <circle cx="32" cy="40" r="18" fill={fur} stroke={OUTLINE} strokeWidth="1.5" />

      {/* ── Federbüschel-Ohren (oben am Kopf) ── */}
      <path d="M20,24 Q18,14 22,18 Q20,12 25,17 Q23,11 28,17" fill={fur} stroke={OUTLINE} strokeWidth="1.2" />
      <path d="M44,24 Q46,14 42,18 Q44,12 39,17 Q41,11 36,17" fill={fur} stroke={OUTLINE} strokeWidth="1.2" />

      {/* ── Helles Gesichtszentrum ── */}
      <ellipse cx="32" cy="43" rx="14" ry="12" fill={belly} opacity="0.5" />

      {/* ── Große Augenringe (charakteristisch) ── */}
      <circle cx="24" cy="40" r="8" fill={eyeRing} opacity="0.25" />
      <circle cx="40" cy="40" r="8" fill={eyeRing} opacity="0.25" />

      <PetSnowflakes mood={mood} left={{ x: 3, y: 25 }} right={{ x: 60, y: 25 }} />
      <PetSun mood={mood} />
      <PetSweat isHot={isHot} y={14} />

      {/* ── Augen (riesig — Hauptmerkmal) ── */}
      {mood === 'neutral' && (blinking ? (
        <>
          <line x1="18" y1="40" x2="30" y2="40" stroke={OUTLINE} strokeWidth="3" strokeLinecap="round" />
          <line x1="34" y1="40" x2="46" y2="40" stroke={OUTLINE} strokeWidth="3" strokeLinecap="round" />
        </>
      ) : (
        <>
          <circle cx="24" cy="40" r="6" fill="white"   stroke={OUTLINE} strokeWidth="1" />
          <circle cx="40" cy="40" r="6" fill="white"   stroke={OUTLINE} strokeWidth="1" />
          <circle cx="24" cy="40" r="3.5" fill={OUTLINE} />
          <circle cx="40" cy="40" r="3.5" fill={OUTLINE} />
          <circle cx="22.5" cy="38.5" r="1.3" fill="white" opacity="0.7" />
          <circle cx="38.5" cy="38.5" r="1.3" fill="white" opacity="0.7" />
        </>
      ))}

      <PetSunglasses
        mood={mood}
        frame={{ y: 33, w: 15, h: 13, rx: 5 }}
        leftX={14} rightX={33}
        leftTemple={[14, 40, 6, 43]}
        rightTemple={[48, 40, 56, 43]}
      />

      <PetWorriedBrows
        mood={mood}
        leftBrow={{ x1: 16, y1: 29, x2: 28, y2: 33 }}
        rightBrow={{ x1: 36, y1: 33, x2: 48, y2: 29 }}
      />
      {mood === 'cold' && (
        <>
          <circle cx="24" cy="41" r="6" fill="white"   stroke={OUTLINE} strokeWidth="1" />
          <circle cx="40" cy="41" r="6" fill="white"   stroke={OUTLINE} strokeWidth="1" />
          <circle cx="24" cy="41" r="3.5" fill={OUTLINE} />
          <circle cx="40" cy="41" r="3.5" fill={OUTLINE} />
          <circle cx="22.5" cy="39.5" r="1.3" fill="white" opacity="0.65" />
          <circle cx="38.5" cy="39.5" r="1.3" fill="white" opacity="0.65" />
        </>
      )}

      <PetFrozenEyes
        mood={mood}
        leftBox={{ l: 16, t: 32, r: 32, b: 48 }}
        rightBox={{ l: 32, t: 32, r: 48, b: 48 }}
      />

      {/* ── Schnabel ── */}
      <path d="M29,47 L32,52 L35,47 Z" fill="#d97706" stroke={OUTLINE} strokeWidth="0.8" />

      <PetBlush mood={mood} leftCx={14} rightCx={50} cy={47} rx={5} ry={3} />

      <PetScarf mood={mood} x={11} y={56} width={42} knotCx={52} knotCy={61} />
    </PetSvg>
  );
}
