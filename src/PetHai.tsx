/**
 * Gen1-Style Hai Pet
 *
 * Erkennungsmerkmale: Dreieckige Rückenflosse (Hauptmerkmal), breite
 * Brustflossen, weißer Bauch, V-Schwanzflosse. Warm: sichtbare Zähne.
 *
 * Mood → temperature:
 *   warm    ≥ 22 °C  Sonnenbrille + Wangenrouge + Zähne
 *   neutral  8–22 °C  runde Augen, entspannter Ausdruck
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

const HAI_FUR: Record<Mood, string> = {
  frozen:  '#bfdbfe',
  cold:    '#7dd3fc',
  neutral: '#94a3b8',
  warm:    '#64748b',
};

const HAI_BELLY: Record<Mood, string> = {
  frozen:  '#f0f9ff',
  cold:    '#f0f9ff',
  neutral: '#f8fafc',
  warm:    '#f1f5f9',
};

export function PetHai({ temperature, size = 80, blinking = false }: PetProps) {
  const mood  = getMood(temperature);
  const isHot = temperature !== null && temperature >= 28;
  const fur   = HAI_FUR[mood];
  const belly = HAI_BELLY[mood];

  return (
    <PetSvg size={size} shivering={mood === 'cold' || mood === 'frozen'} ariaLabel={`Hai-Pet: ${mood}`}>
      <PetShadow cx={32} />
      <PetIcicles mood={mood} y={77} />

      {/* ── Schwanzflosse (V-Form, unten) ── */}
      <path d="M22,70 Q27,80 32,72 Q37,80 42,70" fill={fur} stroke={OUTLINE} strokeWidth="1.5" strokeLinejoin="round" />

      {/* ── Körper (Torpedo-oval) ── */}
      <ellipse cx="32" cy="51" rx="16" ry="20" fill={fur} stroke={OUTLINE} strokeWidth="1.5" />
      <ellipse cx="32" cy="56" rx="10" ry="13" fill={belly} />

      {/* ── Brustflossen (seitlich, geschwungen) ── */}
      <path d="M16,52 Q6,46 5,57 Q9,63 16,59" fill={fur} stroke={OUTLINE} strokeWidth="1.2" strokeLinejoin="round" />
      <path d="M48,52 Q58,46 59,57 Q55,63 48,59" fill={fur} stroke={OUTLINE} strokeWidth="1.2" strokeLinejoin="round" />

      {/* ── Rückenflosse (dreieckig, Hauptmerkmal) ── */}
      <path d="M26,33 L32,16 L38,33" fill={fur} stroke={OUTLINE} strokeWidth="1.5" strokeLinejoin="round" />

      <PetSnowflakes mood={mood} left={{ x: 2, y: 26 }} right={{ x: 56, y: 26 }} />
      <PetSun mood={mood} />
      <PetSweat isHot={isHot} y={14} />

      {/* ── Augen (seitlich am Körper) ── */}
      {mood === 'neutral' && (blinking ? (
        <>
          <line x1="20" y1="43" x2="28" y2="43" stroke={OUTLINE} strokeWidth="2" strokeLinecap="round" />
          <line x1="36" y1="43" x2="44" y2="43" stroke={OUTLINE} strokeWidth="2" strokeLinecap="round" />
        </>
      ) : (
        <>
          <circle cx="24" cy="43" r="3.5" fill={OUTLINE} />
          <circle cx="40" cy="43" r="3.5" fill={OUTLINE} />
          <circle cx="22.8" cy="41.8" r="1.2" fill="white" opacity="0.65" />
          <circle cx="38.8" cy="41.8" r="1.2" fill="white" opacity="0.65" />
        </>
      ))}

      <PetSunglasses
        mood={mood}
        frame={{ y: 36, w: 13, h: 13, rx: 4 }}
        leftX={14} rightX={33}
        leftTemple={[14, 43, 6, 46]}
        rightTemple={[46, 43, 54, 46]}
      />

      <PetWorriedBrows
        mood={mood}
        leftBrow={{ x1: 17, y1: 36, x2: 28, y2: 40 }}
        rightBrow={{ x1: 36, y1: 40, x2: 47, y2: 36 }}
      />
      {mood === 'cold' && (
        <>
          <circle cx="24" cy="44" r="3.5" fill={OUTLINE} />
          <circle cx="40" cy="44" r="3.5" fill={OUTLINE} />
          <circle cx="22.8" cy="42.8" r="1.2" fill="white" opacity="0.65" />
          <circle cx="38.8" cy="42.8" r="1.2" fill="white" opacity="0.65" />
        </>
      )}

      <PetFrozenEyes
        mood={mood}
        leftBox={{ l: 17, t: 36, r: 31, b: 50 }}
        rightBox={{ l: 33, t: 36, r: 47, b: 50 }}
      />

      <PetBlush mood={mood} leftCx={15} rightCx={49} cy={52} rx={5} ry={3} />

      {/* ── Mund ── */}
      {mood === 'neutral' && (
        <path d="M25,58 Q32,63 39,58" stroke={OUTLINE} strokeWidth="1.5" strokeLinecap="round" fill="none" />
      )}
      {mood === 'warm' && (
        <>
          <path d="M23,57 Q32,64 41,57" stroke={OUTLINE} strokeWidth="1.5" strokeLinecap="round" fill="none" />
          <path d="M25,59 Q28.5,63 32,59 Q35.5,63 39,59" fill="white" stroke={OUTLINE} strokeWidth="0.8" />
        </>
      )}
      {mood === 'cold' && (
        <path d="M27,59 Q32,56 37,59" stroke={OUTLINE} strokeWidth="1.5" strokeLinecap="round" fill="none" />
      )}
      {mood === 'frozen' && (
        <path d="M25,59 Q28,55 32,59 Q36,63 39,59" stroke={OUTLINE} strokeWidth="1.5" strokeLinecap="round" fill="none" />
      )}

      <PetScarf mood={mood} x={12} y={63} width={40} knotCx={51} knotCy={68} />
    </PetSvg>
  );
}
