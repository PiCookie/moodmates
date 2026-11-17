/**
 * Gen1-Style Panda Pet
 *
 * Erkennungsmerkmale: Weiß-schwarzes Fell, schwarze Augenringe (das Panda-Merkmal),
 * schwarze Ohren und Arme.
 *
 * Mood → temperature:
 *   warm    ≥ 22 °C  Sonnenbrille + Wangenrouge
 *   neutral  8–22 °C  runde Augen, entspanntes Lächeln
 *   cold     0–8 °C  besorgte Augen, Schal, Schneeflocken, Zittern
 *   frozen    < 0 °C  X-Augen (weiß auf schwarz), Eiszapfen, Schal, starkes Zittern
 */

import type { Mood, PetProps } from './pet.shared';
import { resolveMood, OUTLINE } from './pet.shared';
import {
  PetSvg, PetShadow, PetIcicles, PetSun,
  PetSweat, PetSnowflakes, PetScarf, PetBlush,
  PetSunglasses, PetWorriedBrows,
} from './BasePet';

const PANDA_FUR: Record<Mood, string> = {
  frozen:  '#dbeafe',
  cold:    '#f1f5f9',
  neutral: '#f8f5f0',
  warm:    '#fef9c3',
};

const PANDA_BLACK = '#1e1e1e';
const PANDA_NOSE  = '#3d2b1f';

export function PetPanda({ temperature, size = 80, blinking = false, mood: moodOverride }: PetProps) {
  const mood = resolveMood(temperature, moodOverride);
  const isHot = temperature !== null && temperature >= 28;
  const fur = PANDA_FUR[mood];

  return (
    <PetSvg size={size} shivering={mood === 'cold' || mood === 'frozen'} ariaLabel={`Panda-Pet: ${mood}`}>
      <PetShadow cx={33} />
      <PetIcicles mood={mood} y={74} />

      {/* ── Körper ── */}
      <ellipse cx="32" cy="63" rx="16" ry="12" fill={fur} stroke={OUTLINE} strokeWidth="1.5" />

      {/* ── Schwarze Arme (vor Körper) ── */}
      <ellipse cx="14" cy="57" rx="6" ry="10" fill={PANDA_BLACK} stroke={OUTLINE} strokeWidth="1.5" transform="rotate(-15 14 57)" />
      <ellipse cx="50" cy="57" rx="6" ry="10" fill={PANDA_BLACK} stroke={OUTLINE} strokeWidth="1.5" transform="rotate(15 50 57)" />

      {/* ── Füße (schwarz) ── */}
      <ellipse cx="24" cy="74" rx="8" ry="3.5" fill={PANDA_BLACK} stroke={OUTLINE} strokeWidth="1" />
      <ellipse cx="40" cy="74" rx="8" ry="3.5" fill={PANDA_BLACK} stroke={OUTLINE} strokeWidth="1" />

      {/* ── Kopf ── */}
      <circle cx="32" cy="33" r="20" fill={fur} stroke={OUTLINE} strokeWidth="1.5" />

      {/* ── Schwarze Ohren ── */}
      <circle cx="16" cy="17" r="7" fill={PANDA_BLACK} stroke={OUTLINE} strokeWidth="1.5" />
      <circle cx="48" cy="17" r="7" fill={PANDA_BLACK} stroke={OUTLINE} strokeWidth="1.5" />

      <PetSnowflakes mood={mood} left={{ x: 4, y: 30 }} right={{ x: 60, y: 28 }} />
      <PetSun mood={mood} />
      <PetSweat isHot={isHot} y={14} />

      {/* ── Schwarze Augenringe (das Panda-Merkmal) ── */}
      <ellipse cx="24" cy="31" rx="6" ry="5" fill={PANDA_BLACK} />
      <ellipse cx="40" cy="31" rx="6" ry="5" fill={PANDA_BLACK} />

      {/* ── Augen ── */}
      {mood === 'neutral' && (blinking ? (
        <>
          <line x1="20" y1="31" x2="28" y2="31" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="36" y1="31" x2="44" y2="31" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
        </>
      ) : (
        <>
          <circle cx="24" cy="31" r="3.5" fill="white" />
          <circle cx="40" cy="31" r="3.5" fill="white" />
          <circle cx="24" cy="31" r="2"   fill={PANDA_BLACK} />
          <circle cx="40" cy="31" r="2"   fill={PANDA_BLACK} />
          <circle cx="22.8" cy="29.8" r="0.9" fill="white" opacity="0.8" />
          <circle cx="38.8" cy="29.8" r="0.9" fill="white" opacity="0.8" />
        </>
      ))}

      <PetSunglasses
        mood={mood}
        frame={{ y: 25, w: 14, h: 11, rx: 4 }}
        leftX={15} rightX={37}
        leftTemple={[15, 30, 8, 33]}
        rightTemple={[51, 30, 58, 33]}
      />

      <PetWorriedBrows
        mood={mood}
        leftBrow={{ x1: 17, y1: 22, x2: 29, y2: 25 }}
        rightBrow={{ x1: 35, y1: 25, x2: 47, y2: 22 }}
      />
      {mood === 'cold' && (
        <>
          <circle cx="24" cy="31" r="3.5" fill="white" />
          <circle cx="40" cy="31" r="3.5" fill="white" />
          <circle cx="24" cy="31" r="2"   fill={PANDA_BLACK} />
          <circle cx="40" cy="31" r="2"   fill={PANDA_BLACK} />
          <circle cx="22.8" cy="29.8" r="0.9" fill="white" opacity="0.8" />
          <circle cx="38.8" cy="29.8" r="0.9" fill="white" opacity="0.8" />
        </>
      )}

      {/* Frozen: weiße X-Augen auf den schwarzen Augenringen */}
      {mood === 'frozen' && (
        <>
          <line x1="19" y1="26" x2="29" y2="36" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="29" y1="26" x2="19" y2="36" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="35" y1="26" x2="45" y2="36" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="45" y1="26" x2="35" y2="36" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
        </>
      )}

      {/* ── Nase ── */}
      <ellipse cx="32" cy="39" rx="4" ry="2.5" fill={PANDA_NOSE} />
      <ellipse cx="30.8" cy="38" rx="1.5" ry="1" fill="white" opacity="0.3" />

      <PetBlush mood={mood} leftCx={14} rightCx={50} cy={43} rx={5} ry={3} />

      {/* ── Mund ── */}
      {mood === 'neutral' && (
        <path d="M28,44 Q32,48 36,44" stroke={OUTLINE} strokeWidth="1.5" strokeLinecap="round" fill="none" />
      )}
      {mood === 'warm' && (
        <path d="M27,44 Q32,50 37,44" stroke={OUTLINE} strokeWidth="1.5" strokeLinecap="round" fill="none" />
      )}
      {mood === 'cold' && (
        <path d="M28,46 Q32,42 36,46" stroke={OUTLINE} strokeWidth="1.5" strokeLinecap="round" fill="none" />
      )}
      {mood === 'frozen' && (
        <path d="M26,45 Q30,41 32,45 Q34,41 38,45" stroke={OUTLINE} strokeWidth="1.5" strokeLinecap="round" fill="none" />
      )}

      <PetScarf mood={mood} x={10} y={50} width={44} knotCx={53} knotCy={55} />
    </PetSvg>
  );
}
