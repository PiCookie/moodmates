/**
 * Gen1-Style Hamster Pet
 *
 * Erkennungsmerkmale: Aufgeblasene Backentaschen (das Markenzeichen),
 * runder kompakter Körper, kleine Stummelohren, heller Bauch.
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

const HAMSTER_FUR: Record<Mood, string> = {
  frozen:  '#e0f2fe',
  cold:    '#fef3c7',
  neutral: '#fbbf24',
  warm:    '#f59e0b',
};

const HAMSTER_BELLY: Record<Mood, string> = {
  frozen:  '#f0f9ff',
  cold:    '#fffbeb',
  neutral: '#fef9c3',
  warm:    '#fef08a',
};

const HAMSTER_EAR_INNER = '#fca5a5';

export function PetHamster({ temperature, size = 80, blinking = false }: PetProps) {
  const mood = getMood(temperature);
  const isHot = temperature !== null && temperature >= 28;
  const fur   = HAMSTER_FUR[mood];
  const belly = HAMSTER_BELLY[mood];

  return (
    <PetSvg size={size} shivering={mood === 'cold' || mood === 'frozen'} ariaLabel={`Hamster-Pet: ${mood}`}>
      <PetShadow cx={33} />
      <PetIcicles mood={mood} y={72} />

      {/* ── Arme ── */}
      <ellipse cx="13" cy="60" rx="5" ry="7" fill={fur} stroke={OUTLINE} strokeWidth="1.5" transform="rotate(-10 13 60)" />
      <ellipse cx="51" cy="60" rx="5" ry="7" fill={fur} stroke={OUTLINE} strokeWidth="1.5" transform="rotate(10 51 60)" />

      {/* ── Körper ── */}
      <ellipse cx="32" cy="64" rx="14" ry="12" fill={fur} stroke={OUTLINE} strokeWidth="1.5" />

      {/* ── Füße ── */}
      <ellipse cx="23" cy="74" rx="8" ry="3.5" fill={fur} stroke={OUTLINE} strokeWidth="1" />
      <ellipse cx="41" cy="74" rx="8" ry="3.5" fill={fur} stroke={OUTLINE} strokeWidth="1" />

      {/* ── Ohren (hinter Kopf) ── */}
      <circle cx="19" cy="18" r="7" fill={fur}              stroke={OUTLINE} strokeWidth="1.5" />
      <circle cx="45" cy="18" r="7" fill={fur}              stroke={OUTLINE} strokeWidth="1.5" />
      <circle cx="19" cy="18" r="4" fill={HAMSTER_EAR_INNER} />
      <circle cx="45" cy="18" r="4" fill={HAMSTER_EAR_INNER} />

      {/* ── Backentaschen (das Markenzeichen — vor Kopf für Tiefenwirkung) ── */}
      <ellipse cx="11" cy="42" rx="11" ry="9" fill={fur} stroke={OUTLINE} strokeWidth="1.5" />
      <ellipse cx="53" cy="42" rx="11" ry="9" fill={fur} stroke={OUTLINE} strokeWidth="1.5" />

      {/* ── Kopf ── */}
      <circle cx="32" cy="34" r="19" fill={fur} stroke={OUTLINE} strokeWidth="1.5" />

      {/* ── Heller Bauch/Gesichtsmitte ── */}
      <ellipse cx="32" cy="39" rx="12" ry="14" fill={belly} />

      <PetSnowflakes mood={mood} left={{ x: 4, y: 20 }} right={{ x: 60, y: 20 }} />
      <PetSun mood={mood} />
      <PetSweat isHot={isHot} y={14} />

      {/* ── Augen ── */}
      {mood === 'neutral' && (blinking ? (
        <>
          <line x1="24" y1="30" x2="30" y2="30" stroke={OUTLINE} strokeWidth="2.5" strokeLinecap="round" />
          <line x1="34" y1="30" x2="40" y2="30" stroke={OUTLINE} strokeWidth="2.5" strokeLinecap="round" />
        </>
      ) : (
        <>
          <circle cx="27" cy="30" r="3.5" fill={OUTLINE} />
          <circle cx="37" cy="30" r="3.5" fill={OUTLINE} />
          <circle cx="25.8" cy="28.8" r="1.2" fill="white" opacity="0.65" />
          <circle cx="35.8" cy="28.8" r="1.2" fill="white" opacity="0.65" />
        </>
      ))}

      <PetSunglasses
        mood={mood}
        frame={{ y: 24, w: 13, h: 12, rx: 4 }}
        leftX={18} rightX={33}
        leftTemple={[18, 30, 10, 33]}
        rightTemple={[46, 30, 54, 33]}
      />

      <PetWorriedBrows
        mood={mood}
        leftBrow={{ x1: 21, y1: 23, x2: 31, y2: 26 }}
        rightBrow={{ x1: 33, y1: 26, x2: 43, y2: 23 }}
      />
      {mood === 'cold' && (
        <>
          <circle cx="27" cy="31" r="3.5" fill={OUTLINE} />
          <circle cx="37" cy="31" r="3.5" fill={OUTLINE} />
          <circle cx="25.8" cy="29.8" r="1.2" fill="white" opacity="0.65" />
          <circle cx="35.8" cy="29.8" r="1.2" fill="white" opacity="0.65" />
        </>
      )}

      <PetFrozenEyes
        mood={mood}
        leftBox={{ l: 21, t: 24, r: 33, b: 36 }}
        rightBox={{ l: 31, t: 24, r: 43, b: 36 }}
      />

      {/* ── Nase ── */}
      <ellipse cx="32" cy="38" rx="3.5" ry="2.5" fill={OUTLINE} opacity="0.7" />
      <ellipse cx="30.8" cy="37" rx="1.3" ry="0.9" fill="white" opacity="0.35" />

      <PetBlush mood={mood} leftCx={16} rightCx={48} cy={44} rx={5} ry={3} />

      {/* ── Mund ── */}
      {mood === 'neutral' && (
        <path d="M29,42 Q32,46 35,42" stroke={OUTLINE} strokeWidth="1.5" strokeLinecap="round" fill="none" />
      )}
      {mood === 'warm' && (
        <path d="M28,42 Q32,47 36,42" stroke={OUTLINE} strokeWidth="1.5" strokeLinecap="round" fill="none" />
      )}
      {mood === 'cold' && (
        <path d="M29,44 Q32,40 35,44" stroke={OUTLINE} strokeWidth="1.5" strokeLinecap="round" fill="none" />
      )}
      {mood === 'frozen' && (
        <path d="M27,43 Q30,39 32,43 Q34,39 37,43" stroke={OUTLINE} strokeWidth="1.5" strokeLinecap="round" fill="none" />
      )}

      <PetScarf mood={mood} x={11} y={50} width={42} knotCx={52} knotCy={55} />
    </PetSvg>
  );
}
