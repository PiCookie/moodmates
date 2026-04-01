/**
 * Gen1-Style Hase Pet
 *
 * Erkennungsmerkmale: Lange aufrechte Ohren mit pinken Innenseiten,
 * Stupsnase, weißer Schwanzstummel.
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

const HASE_FUR: Record<Mood, string> = {
  frozen:  '#dbeafe',
  cold:    '#f1f5f9',
  neutral: '#f5efe5',
  warm:    '#fef9c3',
};

const HASE_EAR_INNER = '#fca5a5';
const HASE_NOSE      = '#f9a8d4';

export function PetHase({ temperature, size = 80, blinking = false }: PetProps) {
  const mood = getMood(temperature);
  const isHot = temperature !== null && temperature >= 28;
  const fur = HASE_FUR[mood];

  return (
    <PetSvg size={size} shivering={mood === 'cold' || mood === 'frozen'} ariaLabel={`Hasen-Pet: ${mood}`}>
      <PetShadow cx={33} />
      <PetIcicles mood={mood} y={74} />

      {/* ── Ohren (hinter Kopf) ── */}
      <ellipse cx="23" cy="13" rx="6.5" ry="15" fill={fur}           stroke={OUTLINE} strokeWidth="1.5" />
      <ellipse cx="41" cy="13" rx="6.5" ry="15" fill={fur}           stroke={OUTLINE} strokeWidth="1.5" />
      <ellipse cx="23" cy="14" rx="3"   ry="11" fill={HASE_EAR_INNER} />
      <ellipse cx="41" cy="14" rx="3"   ry="11" fill={HASE_EAR_INNER} />

      {/* ── Arme ── */}
      <ellipse cx="13" cy="61" rx="5" ry="8" fill={fur} stroke={OUTLINE} strokeWidth="1.5" transform="rotate(-10 13 61)" />
      <ellipse cx="51" cy="61" rx="5" ry="8" fill={fur} stroke={OUTLINE} strokeWidth="1.5" transform="rotate(10 51 61)" />

      {/* ── Schwanzstummel ── */}
      <circle cx="46" cy="61" r="5" fill="white" stroke={OUTLINE} strokeWidth="1" />

      {/* ── Körper ── */}
      <ellipse cx="32" cy="65" rx="15" ry="11" fill={fur} stroke={OUTLINE} strokeWidth="1.5" />

      {/* ── Füße ── */}
      <ellipse cx="22" cy="75" rx="9"  ry="3.5" fill={fur} stroke={OUTLINE} strokeWidth="1" />
      <ellipse cx="42" cy="75" rx="9"  ry="3.5" fill={fur} stroke={OUTLINE} strokeWidth="1" />

      {/* ── Kopf (überdeckt Ohransatz) ── */}
      <circle cx="32" cy="37" r="18" fill={fur} stroke={OUTLINE} strokeWidth="1.5" />

      <PetSnowflakes mood={mood} left={{ x: 4, y: 20 }} right={{ x: 60, y: 20 }} />
      <PetSun mood={mood} />
      <PetSweat isHot={isHot} y={15} />

      {/* ── Augen ── */}
      {mood === 'neutral' && (blinking ? (
        <>
          <line x1="23" y1="33" x2="30" y2="33" stroke={OUTLINE} strokeWidth="2.5" strokeLinecap="round" />
          <line x1="34" y1="33" x2="41" y2="33" stroke={OUTLINE} strokeWidth="2.5" strokeLinecap="round" />
        </>
      ) : (
        <>
          <circle cx="26.5" cy="33" r="3.5" fill={OUTLINE} />
          <circle cx="37.5" cy="33" r="3.5" fill={OUTLINE} />
          <circle cx="25.3" cy="31.8" r="1.2" fill="white" opacity="0.65" />
          <circle cx="36.3" cy="31.8" r="1.2" fill="white" opacity="0.65" />
        </>
      ))}

      <PetSunglasses
        mood={mood}
        frame={{ y: 27, w: 14, h: 12, rx: 4 }}
        leftX={16} rightX={32}
        leftTemple={[16, 33, 8, 36]}
        rightTemple={[46, 33, 54, 36]}
      />

      <PetWorriedBrows
        mood={mood}
        leftBrow={{ x1: 19, y1: 26, x2: 30, y2: 29 }}
        rightBrow={{ x1: 34, y1: 29, x2: 45, y2: 26 }}
      />
      {mood === 'cold' && (
        <>
          <circle cx="26.5" cy="34" r="3.5" fill={OUTLINE} />
          <circle cx="37.5" cy="34" r="3.5" fill={OUTLINE} />
          <circle cx="25.3" cy="32.8" r="1.2" fill="white" opacity="0.65" />
          <circle cx="36.3" cy="32.8" r="1.2" fill="white" opacity="0.65" />
        </>
      )}

      <PetFrozenEyes
        mood={mood}
        leftBox={{ l: 21, t: 27, r: 32, b: 39 }}
        rightBox={{ l: 33, t: 27, r: 44, b: 39 }}
      />

      {/* ── Stupsnase ── */}
      <ellipse cx="32" cy="41" rx="3.5" ry="2.5" fill={HASE_NOSE} />

      <PetBlush mood={mood} leftCx={16} rightCx={48} cy={45} rx={6} ry={3.5} />

      {/* ── Mund ── */}
      {mood === 'neutral' && (
        <>
          <line x1="32" y1="43" x2="32" y2="46" stroke={OUTLINE} strokeWidth="1.2" strokeLinecap="round" />
          <path d="M29,46 Q32,50 35,46" stroke={OUTLINE} strokeWidth="1.5" strokeLinecap="round" fill="none" />
        </>
      )}
      {mood === 'warm' && (
        <>
          <line x1="32" y1="43" x2="32" y2="46" stroke={OUTLINE} strokeWidth="1.2" strokeLinecap="round" />
          <path d="M28,46 Q32,51 36,46" stroke={OUTLINE} strokeWidth="1.5" strokeLinecap="round" fill="none" />
        </>
      )}
      {mood === 'cold' && (
        <path d="M29,48 Q32,44 35,48" stroke={OUTLINE} strokeWidth="1.5" strokeLinecap="round" fill="none" />
      )}
      {mood === 'frozen' && (
        <path d="M27,47 Q30,43 32,47 Q34,43 37,47" stroke={OUTLINE} strokeWidth="1.5" strokeLinecap="round" fill="none" />
      )}

      <PetScarf mood={mood} x={11} y={52} width={42} knotCx={52} knotCy={57} />
    </PetSvg>
  );
}
