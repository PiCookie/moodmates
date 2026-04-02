/**
 * Gen1-Style Tiger Pet
 *
 * Erkennungsmerkmale: Orange Fell mit schwarzen Querstreifen auf Körper
 * und Kopf, runde Ohren mit weißen Innenseiten, Schnurrhaare.
 *
 * Schichten (hinten → vorne):
 *   Schwanz → Füße → Körper → Körperstreifen → Arme → Ohren → Kopf → Gesicht
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

const TIGER_FUR: Record<Mood, string> = {
  frozen:  '#c7d2fe',
  cold:    '#fed7aa',
  neutral: '#fb923c',
  warm:    '#ea580c',
};

const TIGER_DARK: Record<Mood, string> = {
  frozen:  '#4338ca',
  cold:    '#9a3412',
  neutral: '#9a3412',
  warm:    '#7c2d12',
};

const TIGER_STRIPE: Record<Mood, string> = {
  frozen:  '#3730a3',
  cold:    '#431407',
  neutral: '#1c1917',
  warm:    '#1c1917',
};

const TIGER_EAR_INNER = '#fff1f2';

export function PetTiger({ temperature, size = 80, blinking = false }: PetProps) {
  const mood   = getMood(temperature);
  const isHot  = temperature !== null && temperature >= 28;
  const fur    = TIGER_FUR[mood];
  const dark   = TIGER_DARK[mood];
  const stripe = TIGER_STRIPE[mood];

  return (
    <PetSvg size={size} shivering={mood === 'cold' || mood === 'frozen'} ariaLabel={`Tiger-Pet: ${mood}`}>
      <PetShadow cx={33} />
      <PetIcicles mood={mood} y={74} />

      {/* ── Schwanz (hinter Körper) ── */}
      {/* Round-Cap auf dark + fur → natürliche runde Spitze; black circle obendrauf = schwarze Spitze */}
      <path d="M44,72 Q58,65 59,51 Q60,39 52,35" stroke={dark}   strokeWidth="5" strokeLinecap="round" fill="none" />
      <path d="M44,72 Q58,65 59,51 Q60,39 52,35" stroke={fur}     strokeWidth="3" strokeLinecap="round" fill="none" />
      {/* Ringe als Dash-Muster direkt auf dem Pfad */}
      <path d="M44,72 Q58,65 59,51 Q60,39 52,35" stroke={stripe}  strokeWidth="3" strokeLinecap="butt" fill="none" strokeDasharray="5 8" strokeDashoffset="4" opacity="0.6" />
      {/* Schwarze Schwanzspitze */}
      <circle cx="52" cy="35" r="2.0" fill={stripe} />

      {/* ── Füße ── */}
      <ellipse cx="23" cy="74" rx="9"  ry="3.5" fill={fur} stroke={dark} strokeWidth="1.3" />
      <ellipse cx="41" cy="74" rx="9"  ry="3.5" fill={fur} stroke={dark} strokeWidth="1.3" />

      {/* ── Körper ── */}
      <ellipse cx="32" cy="63" rx="14" ry="13" fill={fur} stroke={dark} strokeWidth="1.5" />

      {/* ── Körperstreifen ── */}
      <path d="M22,57 Q32,54 42,57" stroke={stripe} strokeWidth="1.8" strokeLinecap="round" fill="none" opacity="0.55" />
      <path d="M20,64 Q32,61 44,64" stroke={stripe} strokeWidth="1.8" strokeLinecap="round" fill="none" opacity="0.55" />
      <path d="M21,71 Q32,68 43,71" stroke={stripe} strokeWidth="1.8" strokeLinecap="round" fill="none" opacity="0.45" />

      {/* ── Arme (vor Körper) ── */}
      <ellipse cx="15" cy="62" rx="5" ry="7" fill={fur} stroke={dark} strokeWidth="1.5" transform="rotate(-10 15 62)" />
      <ellipse cx="49" cy="62" rx="5" ry="7" fill={fur} stroke={dark} strokeWidth="1.5" transform="rotate(10 49 62)" />

      {/* ── Ohren (hinter Kopf) ── */}
      <circle cx="18" cy="20" r="7" fill={fur}             stroke={dark} strokeWidth="1.5" />
      <circle cx="46" cy="20" r="7" fill={fur}             stroke={dark} strokeWidth="1.5" />
      <circle cx="18" cy="20" r="4" fill={TIGER_EAR_INNER} />
      <circle cx="46" cy="20" r="4" fill={TIGER_EAR_INNER} />

      {/* ── Kopf ── */}
      <circle cx="32" cy="34" r="16" fill={fur} stroke={dark} strokeWidth="1.5" />

      {/* ── Heller Maulbereich ── */}
      <ellipse cx="32" cy="41" rx="10" ry="7" fill="white" opacity="0.25" />

      <PetSnowflakes mood={mood} left={{ x: 3, y: 22 }} right={{ x: 60, y: 22 }} />
      <PetSun mood={mood} />
      <PetSweat isHot={isHot} y={14} />

      {/* ── Kopfstreifen (Stirn) ── */}
      <line x1="27" y1="20" x2="29" y2="27" stroke={stripe} strokeWidth="1.6" strokeLinecap="round" opacity="0.6" />
      <line x1="32" y1="19" x2="32" y2="27" stroke={stripe} strokeWidth="1.6" strokeLinecap="round" opacity="0.6" />
      <line x1="37" y1="20" x2="35" y2="27" stroke={stripe} strokeWidth="1.6" strokeLinecap="round" opacity="0.6" />

      {/* ── Wangenstreifen ── */}
      <line x1="19" y1="36" x2="27" y2="37" stroke={stripe} strokeWidth="1.3" strokeLinecap="round" opacity="0.5" />
      <line x1="19" y1="39" x2="27" y2="39" stroke={stripe} strokeWidth="1.3" strokeLinecap="round" opacity="0.5" />
      <line x1="37" y1="37" x2="45" y2="36" stroke={stripe} strokeWidth="1.3" strokeLinecap="round" opacity="0.5" />
      <line x1="37" y1="39" x2="45" y2="39" stroke={stripe} strokeWidth="1.3" strokeLinecap="round" opacity="0.5" />

      {/* ── Augen ── */}
      {mood === 'neutral' && (blinking ? (
        <>
          <line x1="22" y1="31" x2="29" y2="31" stroke={OUTLINE} strokeWidth="2.5" strokeLinecap="round" />
          <line x1="35" y1="31" x2="42" y2="31" stroke={OUTLINE} strokeWidth="2.5" strokeLinecap="round" />
        </>
      ) : (
        <>
          <circle cx="25.5" cy="31" r="3.5" fill={OUTLINE} />
          <circle cx="38.5" cy="31" r="3.5" fill={OUTLINE} />
          <circle cx="24.3" cy="29.8" r="1.2" fill="white" opacity="0.65" />
          <circle cx="37.3" cy="29.8" r="1.2" fill="white" opacity="0.65" />
        </>
      ))}

      <PetSunglasses
        mood={mood}
        frame={{ y: 25, w: 14, h: 11, rx: 4 }}
        leftX={15} rightX={37}
        leftTemple={[15, 31, 7, 34]}
        rightTemple={[51, 31, 59, 34]}
      />

      <PetWorriedBrows
        mood={mood}
        leftBrow={{ x1: 18, y1: 23, x2: 30, y2: 26 }}
        rightBrow={{ x1: 34, y1: 26, x2: 46, y2: 23 }}
      />
      {mood === 'cold' && (
        <>
          <circle cx="25.5" cy="32" r="3.5" fill={OUTLINE} />
          <circle cx="38.5" cy="32" r="3.5" fill={OUTLINE} />
          <circle cx="24.3" cy="30.8" r="1.2" fill="white" opacity="0.65" />
          <circle cx="37.3" cy="30.8" r="1.2" fill="white" opacity="0.65" />
        </>
      )}

      <PetFrozenEyes
        mood={mood}
        leftBox={{ l: 20, t: 25, r: 31, b: 37 }}
        rightBox={{ l: 33, t: 25, r: 44, b: 37 }}
      />

      {/* ── Nase ── */}
      <ellipse cx="32" cy="40" rx="3" ry="2" fill={dark} opacity="0.85" />
      <ellipse cx="31" cy="39.2" rx="1.1" ry="0.8" fill="white" opacity="0.3" />

      {/* ── Schnurrhaare ── */}
      <line x1="18" y1="41" x2="28" y2="42" stroke={OUTLINE} strokeWidth="0.9" opacity="0.35" />
      <line x1="18" y1="44" x2="28" y2="44" stroke={OUTLINE} strokeWidth="0.9" opacity="0.35" />
      <line x1="36" y1="42" x2="46" y2="41" stroke={OUTLINE} strokeWidth="0.9" opacity="0.35" />
      <line x1="36" y1="44" x2="46" y2="44" stroke={OUTLINE} strokeWidth="0.9" opacity="0.35" />

      <PetBlush mood={mood} leftCx={16} rightCx={48} cy={43} rx={5} ry={3} />

      {/* ── Mund ── */}
      {(mood === 'neutral' || mood === 'warm') && (
        <path d="M29,45 Q32,49 35,45" stroke={OUTLINE} strokeWidth="1.5" strokeLinecap="round" fill="none" />
      )}
      {mood === 'cold' && (
        <path d="M29,47 Q32,43 35,47" stroke={OUTLINE} strokeWidth="1.5" strokeLinecap="round" fill="none" />
      )}
      {mood === 'frozen' && (
        <path d="M27,46 Q30,42 32,46 Q34,42 37,46" stroke={OUTLINE} strokeWidth="1.5" strokeLinecap="round" fill="none" />
      )}

      <PetScarf mood={mood} x={12} y={49} width={40} knotCx={51} knotCy={54} />
    </PetSvg>
  );
}
