/**
 * Gen1-Style Igel Pet
 *
 * Erkennungsmerkmale: Stachelrücken als halbkreisförmiges Stachelbündel
 * (Hauptmerkmal), runder Bauch, kleine Ohren, Stupsnase.
 *
 * Schichten (hinten → vorne):
 *   Stacheln → Körper → Kopf → Gesicht
 *
 * Mood → temperature:
 *   warm    ≥ 22 °C  Sonnenbrille + Wangenrouge
 *   neutral  8–22 °C  runde Augen, entspanntes Lächeln
 *   cold     0–8 °C  besorgte Augen, Schal, Schneeflocken, Zittern
 *   frozen    < 0 °C  X-Augen, Eiszapfen, Schal, starkes Zittern
 */

import type { Mood, PetProps } from './pet.shared';
import { getMood, OUTLINE } from './pet.shared';
import {
  PetSvg, PetShadow, PetIcicles, PetSun,
  PetSweat, PetSnowflakes, PetScarf, PetBlush,
  PetSunglasses, PetFrozenEyes, PetWorriedBrows,
} from './BasePet';

const IGEL_FUR: Record<Mood, string> = {
  frozen:  '#c7d2fe', // eisblau
  cold:    '#94a3b8', // kühles Grau
  neutral: '#a16207', // warmes Braun
  warm:    '#b45309', // satteres Braun
};

const IGEL_BELLY: Record<Mood, string> = {
  frozen:  '#e0e7ff',
  cold:    '#e2e8f0',
  neutral: '#fef3c7',
  warm:    '#fde68a',
};

const SPINE_COLOR: Record<Mood, string> = {
  frozen:  '#6366f1',
  cold:    '#64748b',
  neutral: '#57534e',
  warm:    '#44403c',
};

export function PetIgel({ temperature, size = 80, blinking = false }: PetProps) {
  const mood  = getMood(temperature);
  const isHot = temperature !== null && temperature >= 28;
  const fur   = IGEL_FUR[mood];
  const belly = IGEL_BELLY[mood];
  const spine = SPINE_COLOR[mood];

  return (
    <PetSvg size={size} shivering={mood === 'cold' || mood === 'frozen'} ariaLabel={`Igel-Pet: ${mood}`}>
      <PetShadow cx={32} />
      <PetIcicles mood={mood} y={77} />

      {/* ── Stacheln (hinter dem Körper) ── */}
      {/* Äußerer Stachel-Halbkreis als Basis */}
      <ellipse cx="32" cy="54" rx="19" ry="16" fill={spine} />
      {/* Einzelne Stachel-Linien, fächerförmig */}
      <line x1="32" y1="38" x2="32" y2="26" stroke={spine} strokeWidth="2.5" strokeLinecap="round" />
      <line x1="38" y1="39" x2="40" y2="27" stroke={spine} strokeWidth="2.5" strokeLinecap="round" />
      <line x1="43" y1="42" x2="48" y2="31" stroke={spine} strokeWidth="2.5" strokeLinecap="round" />
      <line x1="47" y1="47" x2="54" y2="39" stroke={spine} strokeWidth="2.5" strokeLinecap="round" />
      <line x1="50" y1="54" x2="58" y2="50" stroke={spine} strokeWidth="2.5" strokeLinecap="round" />
      <line x1="26" y1="39" x2="24" y2="27" stroke={spine} strokeWidth="2.5" strokeLinecap="round" />
      <line x1="21" y1="42" x2="16" y2="31" stroke={spine} strokeWidth="2.5" strokeLinecap="round" />
      <line x1="17" y1="47" x2="10" y2="39" stroke={spine} strokeWidth="2.5" strokeLinecap="round" />
      <line x1="14" y1="54" x2="6"  y2="50" stroke={spine} strokeWidth="2.5" strokeLinecap="round" />

      {/* ── Füße ── */}
      <ellipse cx="24" cy="76" rx="7" ry="3" fill={fur} stroke={OUTLINE} strokeWidth="1" />
      <ellipse cx="40" cy="76" rx="7" ry="3" fill={fur} stroke={OUTLINE} strokeWidth="1" />

      {/* ── Körper (runder Bauch, überdeckt untere Stachelhälfte) ── */}
      <ellipse cx="32" cy="60" rx="16" ry="13" fill={fur}   stroke={OUTLINE} strokeWidth="1.5" />
      <ellipse cx="32" cy="63" rx="10" ry="8"  fill={belly} />

      {/* ── Kleine Ohren ── */}
      <ellipse cx="24" cy="37" rx="4" ry="5" fill={fur}   stroke={OUTLINE} strokeWidth="1.2" />
      <ellipse cx="40" cy="37" rx="4" ry="5" fill={fur}   stroke={OUTLINE} strokeWidth="1.2" />
      <ellipse cx="24" cy="37" rx="2.2" ry="3" fill={belly} />
      <ellipse cx="40" cy="37" rx="2.2" ry="3" fill={belly} />

      {/* ── Kopf ── */}
      <ellipse cx="32" cy="46" rx="13" ry="12" fill={fur} stroke={OUTLINE} strokeWidth="1.5" />

      {/* ── Helles Gesichtszentrum ── */}
      <ellipse cx="33" cy="49" rx="9" ry="8" fill={belly} opacity="0.55" />

      <PetSnowflakes mood={mood} left={{ x: 3, y: 30 }} right={{ x: 60, y: 30 }} />
      <PetSun mood={mood} />
      <PetSweat isHot={isHot} y={20} />

      {/* ── Augen ── */}
      {mood === 'neutral' && (blinking ? (
        <>
          <line x1="24" y1="44" x2="30" y2="44" stroke={OUTLINE} strokeWidth="2.5" strokeLinecap="round" />
          <line x1="34" y1="44" x2="40" y2="44" stroke={OUTLINE} strokeWidth="2.5" strokeLinecap="round" />
        </>
      ) : (
        <>
          <circle cx="27" cy="44" r="3.5" fill={OUTLINE} />
          <circle cx="37" cy="44" r="3.5" fill={OUTLINE} />
          <circle cx="25.8" cy="42.8" r="1.2" fill="white" opacity="0.65" />
          <circle cx="35.8" cy="42.8" r="1.2" fill="white" opacity="0.65" />
        </>
      ))}

      <PetSunglasses
        mood={mood}
        frame={{ y: 38, w: 13, h: 11, rx: 4 }}
        leftX={17} rightX={34}
        leftTemple={[17, 44, 9, 47]}
        rightTemple={[47, 44, 55, 47]}
      />

      <PetWorriedBrows
        mood={mood}
        leftBrow={{ x1: 20, y1: 37, x2: 31, y2: 40 }}
        rightBrow={{ x1: 33, y1: 40, x2: 44, y2: 37 }}
      />
      {mood === 'cold' && (
        <>
          <circle cx="27" cy="45" r="3.5" fill={OUTLINE} />
          <circle cx="37" cy="45" r="3.5" fill={OUTLINE} />
          <circle cx="25.8" cy="43.8" r="1.2" fill="white" opacity="0.65" />
          <circle cx="35.8" cy="43.8" r="1.2" fill="white" opacity="0.65" />
        </>
      )}

      <PetFrozenEyes
        mood={mood}
        leftBox={{ l: 21, t: 38, r: 33, b: 50 }}
        rightBox={{ l: 31, t: 38, r: 43, b: 50 }}
      />

      {/* ── Stupsnase ── */}
      <ellipse cx="32" cy="51" rx="3" ry="2" fill={OUTLINE} opacity="0.7" />
      <ellipse cx="31" cy="50.3" rx="1" ry="0.8" fill="white" opacity="0.3" />

      <PetBlush mood={mood} leftCx={18} rightCx={46} cy={52} rx={5} ry={3} />

      {/* ── Mund ── */}
      {mood === 'neutral' && (
        <path d="M27,55 Q32,59 37,55" stroke={OUTLINE} strokeWidth="1.5" strokeLinecap="round" fill="none" />
      )}
      {mood === 'warm' && (
        <path d="M26,55 Q32,60 38,55" stroke={OUTLINE} strokeWidth="1.5" strokeLinecap="round" fill="none" />
      )}
      {mood === 'cold' && (
        <path d="M28,57 Q32,53 36,57" stroke={OUTLINE} strokeWidth="1.5" strokeLinecap="round" fill="none" />
      )}
      {mood === 'frozen' && (
        <path d="M26,56 Q29,52 32,56 Q35,60 38,56" stroke={OUTLINE} strokeWidth="1.5" strokeLinecap="round" fill="none" />
      )}

      <PetScarf mood={mood} x={12} y={58} width={40} knotCx={51} knotCy={63} />
    </PetSvg>
  );
}
