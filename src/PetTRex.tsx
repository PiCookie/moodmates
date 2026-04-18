/**
 * Gen1-Style T-Rex Pet
 *
 * Erkennungsmerkmale: Riesenkopf, winzige Arme, massige Beine, Stachelschwanz.
 * Mood-Details: Feueratem (warm), Eisatem (frozen).
 *
 * Mood → temperature:
 *   warm    ≥ 22 °C  Sonnenbrille + Feueratem + Wangenrouge
 *   neutral  8–22 °C  runde Augen, geschlossenes Lächeln
 *   cold     0–8 °C  besorgte Brauen, Schal, Schneeflocken, Zittern
 *   frozen    < 0 °C  X-Augen, Eisatem, Eiszapfen, Schal, starkes Zittern
 */

import type { Mood, PetProps } from './pet.shared';
import { getMood, OUTLINE } from './pet.shared';
import {
  PetSvg, PetShadow, PetIcicles, PetSun,
  PetSweat, PetSnowflakes, PetScarf, PetBlush,
  PetSunglasses, PetFrozenEyes, PetWorriedBrows,
} from './BasePet';

const TREX_BODY: Record<Mood, string> = {
  frozen:  '#bfdbfe',
  cold:    '#bbf7d0',
  neutral: '#4ade80',
  warm:    '#fbbf24',
};

export function PetTRex({ temperature, size = 80, blinking = false }: PetProps) {
  const mood  = getMood(temperature);
  const isHot = temperature !== null && temperature >= 28;
  const body  = TREX_BODY[mood];

  return (
    <PetSvg size={size} shivering={mood === 'cold' || mood === 'frozen'} ariaLabel={`T-Rex-Pet: ${mood}`}>
      <PetShadow cx={32} />
      <PetIcicles mood={mood} y={74} />

      {/* ── Schwanz ── */}
      <path d="M46,65 C58,62 64,52 60,42" stroke={body} strokeWidth="6" strokeLinecap="round" fill="none" />
      {/* Schwanzspitzen */}
      <polygon points="57,39 61,45 64,38" fill={body} stroke={OUTLINE} strokeWidth="1" />

      {/* ── Körper ── */}
      <ellipse cx="30" cy="60" rx="14" ry="11" fill={body} stroke={OUTLINE} strokeWidth="1.5" />

      {/* ── Bauch (heller) ── */}
      <ellipse cx="28" cy="61" rx="8" ry="7" fill="white" opacity="0.25" />

      {/* ── Beine ── */}
      <ellipse cx="22" cy="73" rx="7" ry="4" fill={body} stroke={OUTLINE} strokeWidth="1" />
      <ellipse cx="38" cy="73" rx="7" ry="4" fill={body} stroke={OUTLINE} strokeWidth="1" />
      {/* Krallen */}
      <line x1="18" y1="76" x2="16" y2="79" stroke={OUTLINE} strokeWidth="1.5" strokeLinecap="round" />
      <line x1="22" y1="77" x2="22" y2="80" stroke={OUTLINE} strokeWidth="1.5" strokeLinecap="round" />
      <line x1="26" y1="76" x2="28" y2="79" stroke={OUTLINE} strokeWidth="1.5" strokeLinecap="round" />

      {/* ── Winzige Ärmchen ── */}
      <line x1="17" y1="54" x2="10" y2="60" stroke={body} strokeWidth="4" strokeLinecap="round" />
      <line x1="10" y1="60" x2="8"  y2="64" stroke={OUTLINE} strokeWidth="1.2" strokeLinecap="round" />
      <line x1="10" y1="60" x2="12" y2="65" stroke={OUTLINE} strokeWidth="1.2" strokeLinecap="round" />

      {/* ── Kopf (dominant groß) ── */}
      <ellipse cx="28" cy="32" rx="22" ry="18" fill={body} stroke={OUTLINE} strokeWidth="1.5" />

      {/* ── Stirnzacken ── */}
      <polygon points="14,17 18,10 22,17" fill={body} stroke={OUTLINE} strokeWidth="1" />
      <polygon points="24,14 28,6 32,14"  fill={body} stroke={OUTLINE} strokeWidth="1" />
      <polygon points="34,16 38,10 42,16" fill={body} stroke={OUTLINE} strokeWidth="1" />

      <PetSnowflakes mood={mood} left={{ x: 4, y: 18 }} right={{ x: 54, y: 18 }} />
      <PetSun mood={mood} cx={56} cy={10} />
      <PetSweat isHot={isHot} x={4} y={12} />

      {/* ── Augen ── */}
      {mood === 'neutral' && (blinking ? (
        <>
          <line x1="17" y1="28" x2="25" y2="28" stroke={OUTLINE} strokeWidth="2.5" strokeLinecap="round" />
          <line x1="31" y1="28" x2="39" y2="28" stroke={OUTLINE} strokeWidth="2.5" strokeLinecap="round" />
        </>
      ) : (
        <>
          <circle cx="21" cy="28" r="4" fill={OUTLINE} />
          <circle cx="35" cy="28" r="4" fill={OUTLINE} />
          <circle cx="19.5" cy="26.5" r="1.2" fill="white" opacity="0.7" />
          <circle cx="33.5" cy="26.5" r="1.2" fill="white" opacity="0.7" />
        </>
      ))}

      <PetSunglasses
        mood={mood}
        frame={{ y: 21, w: 14, h: 11, rx: 4 }}
        leftX={13} rightX={29}
        leftTemple={[13, 27, 4, 30]}
        rightTemple={[43, 27, 52, 30]}
      />

      <PetWorriedBrows
        mood={mood}
        leftBrow={{ x1: 14, y1: 20, x2: 28, y2: 24 }}
        rightBrow={{ x1: 30, y1: 24, x2: 44, y2: 20 }}
      />
      {mood === 'cold' && (
        <>
          <circle cx="21" cy="29" r="4" fill={OUTLINE} />
          <circle cx="35" cy="29" r="4" fill={OUTLINE} />
          <circle cx="19.5" cy="27.5" r="1.2" fill="white" opacity="0.65" />
          <circle cx="33.5" cy="27.5" r="1.2" fill="white" opacity="0.65" />
        </>
      )}

      <PetFrozenEyes
        mood={mood}
        leftBox={{ l: 15, t: 22, r: 27, b: 34 }}
        rightBox={{ l: 29, t: 22, r: 41, b: 34 }}
      />

      {/* ── Schnauze / Maul ── */}
      <ellipse cx="28" cy="42" rx="10" ry="6" fill={body} stroke={OUTLINE} strokeWidth="1" />
      <circle cx="24" cy="40" r="1.8" fill={OUTLINE} opacity="0.45" />
      <circle cx="32" cy="40" r="1.8" fill={OUTLINE} opacity="0.45" />

      <PetBlush mood={mood} leftCx={10} rightCx={46} cy={40} rx={5} ry={3} />

      {/* ── Mund + Atem-Effekte ── */}
      {mood === 'neutral' && (
        <path d="M21,46 Q28,51 35,46" stroke={OUTLINE} strokeWidth="1.5" strokeLinecap="round" fill="none" />
      )}
      {mood === 'warm' && (
        <>
          <path d="M21,46 Q28,51 35,46" stroke={OUTLINE} strokeWidth="1.5" strokeLinecap="round" fill="none" />
          {/* Feueratem */}
          <path d="M25,47 Q22,54 25,60 Q28,55 28,50 Q28,56 31,61 Q33,54 30,47" fill="#f97316" opacity="0.85" />
        </>
      )}
      {mood === 'cold' && (
        <path d="M21,47 Q28,43 35,47" stroke={OUTLINE} strokeWidth="1.5" strokeLinecap="round" fill="none" />
      )}
      {mood === 'frozen' && (
        <>
          <path d="M21,47 Q28,43 35,47" stroke={OUTLINE} strokeWidth="1.5" strokeLinecap="round" fill="none" />
          {/* Eisatem */}
          <circle cx="24" cy="53" r="2.2" fill="#93c5fd" opacity="0.75" />
          <circle cx="28" cy="57" r="2.8" fill="#93c5fd" opacity="0.75" />
          <circle cx="32" cy="53" r="2.2" fill="#93c5fd" opacity="0.75" />
        </>
      )}

      <PetScarf mood={mood} x={8} y={48} width={38} knotCx={44} knotCy={53} />
    </PetSvg>
  );
}
