/**
 * Gen1-Style Roter Panda Pet
 *
 * Erkennungsmerkmale: Rostbraunes Fell, buschiger geringelter Schwanz,
 * Waschbär-ähnliches Gesicht mit weißen Wangenflecken, dunkle Augenringe.
 *
 * Schichten (hinten → vorne):
 *   Schwanz → Füße → Körper → Arme → Ohren → Kopf → Muster → Gesicht
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

const ROTER_PANDA_FUR: Record<Mood, string> = {
  frozen:  '#c7d2fe',
  cold:    '#fca5a5',
  neutral: '#b45309',
  warm:    '#92400e',
};

const ROTER_PANDA_DARK: Record<Mood, string> = {
  frozen:  '#4338ca',
  cold:    '#7f1d1d',
  neutral: '#7c2d12',
  warm:    '#431407',
};

const ROTER_PANDA_STRIPE: Record<Mood, string> = {
  frozen:  '#312e81',
  cold:    '#450a0a',
  neutral: '#1c0a06',
  warm:    '#1c0a06',
};

/** Dunkle Augenringe — Waschbär-Hauptmerkmal */
const EYE_MASK = '#2d1002';
/** Helle Wangen/Maulbereich */
const MUZZLE   = '#fef9f0';
/** Weiße Ohreninnenseite */
const EAR_INNER = '#fef2f2';

export function PetRoterPanda({ temperature, size = 80, blinking = false }: PetProps) {
  const mood   = getMood(temperature);
  const isHot  = temperature !== null && temperature >= 28;
  const fur    = ROTER_PANDA_FUR[mood];
  const dark   = ROTER_PANDA_DARK[mood];
  const stripe = ROTER_PANDA_STRIPE[mood];

  return (
    <PetSvg size={size} shivering={mood === 'cold' || mood === 'frozen'} ariaLabel={`Roter-Panda-Pet: ${mood}`}>
      <PetShadow cx={33} />
      <PetIcicles mood={mood} y={74} />

      {/* ── Buschiger Schwanz (hinter Körper, voluminös mit Ringen) ── */}
      <path d="M44,72 Q56,67 57,52 Q57,39 50,35" stroke={OUTLINE} strokeWidth="13" strokeLinecap="round" fill="none" />
      <path d="M44,72 Q56,67 57,52 Q57,39 50,35" stroke={fur}     strokeWidth="11" strokeLinecap="round" fill="none" />
      {/* Dunkle Ringe via Dash-Muster direkt auf dem Pfad */}
      <path d="M44,72 Q56,67 57,52 Q57,39 50,35" stroke={stripe}  strokeWidth="11" strokeLinecap="butt"  fill="none" strokeDasharray="7 10" strokeDashoffset="2" opacity="0.75" />

      {/* ── Füße ── */}
      <ellipse cx="23" cy="74" rx="8.5" ry="3.5" fill={fur} stroke={dark} strokeWidth="1.3" />
      <ellipse cx="41" cy="74" rx="8.5" ry="3.5" fill={fur} stroke={dark} strokeWidth="1.3" />

      {/* ── Körper ── */}
      <ellipse cx="32" cy="62" rx="13" ry="14" fill={fur} stroke={dark} strokeWidth="1.5" />

      {/* ── Arme (vor Körper) ── */}
      <ellipse cx="15" cy="61" rx="5" ry="7" fill={fur} stroke={dark} strokeWidth="1.5" transform="rotate(-10 15 61)" />
      <ellipse cx="49" cy="61" rx="5" ry="7" fill={fur} stroke={dark} strokeWidth="1.5" transform="rotate(10 49 61)" />

      {/* ── Spitze Ohren (hinter Kopf) ── */}
      <ellipse cx="20" cy="18" rx="5.5" ry="7" fill={fur}     stroke={dark}    strokeWidth="1.5" transform="rotate(-15 20 18)" />
      <ellipse cx="44" cy="18" rx="5.5" ry="7" fill={fur}     stroke={dark}    strokeWidth="1.5" transform="rotate(15 44 18)" />
      <ellipse cx="20" cy="18" rx="3"   ry="4" fill={EAR_INNER}                                  transform="rotate(-15 20 18)" />
      <ellipse cx="44" cy="18" rx="3"   ry="4" fill={EAR_INNER}                                  transform="rotate(15 44 18)" />

      {/* ── Kopf ── */}
      <circle cx="32" cy="33" r="15" fill={fur} stroke={dark} strokeWidth="1.5" />

      {/* ── Heller Maulbereich (Waschbär-Weiß) ── */}
      <ellipse cx="32" cy="40" rx="10" ry="7" fill={MUZZLE} opacity="0.85" />

      {/* ── Dunkle Augenringe (Hauptmerkmal) ── */}
      <ellipse cx="24" cy="31" rx="5.5" ry="5" fill={EYE_MASK} opacity="0.85" />
      <ellipse cx="40" cy="31" rx="5.5" ry="5" fill={EYE_MASK} opacity="0.85" />

      <PetSnowflakes mood={mood} left={{ x: 3, y: 20 }} right={{ x: 60, y: 20 }} />
      <PetSun mood={mood} />
      <PetSweat isHot={isHot} y={14} />

      {/* ── Stirnstreifen (charakteristisches Muster) ── */}
      <line x1="28" y1="20" x2="30" y2="26" stroke={stripe} strokeWidth="1.4" strokeLinecap="round" opacity="0.5" />
      <line x1="32" y1="19" x2="32" y2="26" stroke={stripe} strokeWidth="1.4" strokeLinecap="round" opacity="0.5" />
      <line x1="36" y1="20" x2="34" y2="26" stroke={stripe} strokeWidth="1.4" strokeLinecap="round" opacity="0.5" />

      {/* ── Augen (weiß auf dunklen Ringen) ── */}
      {mood === 'neutral' && (blinking ? (
        <>
          <line x1="20" y1="31" x2="28" y2="31" stroke="white" strokeWidth="2" strokeLinecap="round" />
          <line x1="36" y1="31" x2="44" y2="31" stroke="white" strokeWidth="2" strokeLinecap="round" />
        </>
      ) : (
        <>
          <circle cx="24" cy="31" r="3"   fill="white"   opacity="0.9" />
          <circle cx="40" cy="31" r="3"   fill="white"   opacity="0.9" />
          <circle cx="24" cy="31" r="1.7" fill={OUTLINE} />
          <circle cx="40" cy="31" r="1.7" fill={OUTLINE} />
          <circle cx="23" cy="30" r="0.7" fill="white"   opacity="0.7" />
          <circle cx="39" cy="30" r="0.7" fill="white"   opacity="0.7" />
        </>
      ))}

      <PetSunglasses
        mood={mood}
        frame={{ y: 25, w: 13, h: 11, rx: 4 }}
        leftX={16} rightX={37}
        leftTemple={[16, 31, 8, 34]}
        rightTemple={[50, 31, 58, 34]}
      />

      <PetWorriedBrows
        mood={mood}
        leftBrow={{ x1: 17, y1: 23, x2: 29, y2: 26 }}
        rightBrow={{ x1: 35, y1: 26, x2: 47, y2: 23 }}
      />
      {mood === 'cold' && (
        <>
          <circle cx="24" cy="32" r="3"   fill="white"   opacity="0.9" />
          <circle cx="40" cy="32" r="3"   fill="white"   opacity="0.9" />
          <circle cx="24" cy="32" r="1.7" fill={OUTLINE} />
          <circle cx="40" cy="32" r="1.7" fill={OUTLINE} />
        </>
      )}

      {/* ── Frozen: weiße X-Augen auf dunklen Ringen ── */}
      {mood === 'frozen' && (
        <>
          <line x1="20" y1="27" x2="28" y2="35" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="28" y1="27" x2="20" y2="35" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="36" y1="27" x2="44" y2="35" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="44" y1="27" x2="36" y2="35" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
        </>
      )}

      {/* ── Nase ── */}
      <ellipse cx="32" cy="39" rx="2.5" ry="1.8" fill={OUTLINE} opacity="0.8" />
      <ellipse cx="31.1" cy="38.3" rx="1" ry="0.7" fill="white" opacity="0.3" />

      <PetBlush mood={mood} leftCx={15} rightCx={49} cy={43} rx={5} ry={3} />

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

      <PetScarf mood={mood} x={14} y={47} width={36} knotCx={49} knotCy={52} small />
    </PetSvg>
  );
}
