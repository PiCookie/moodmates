/**
 * Gen1-Style Penguin Pet
 *
 * Erkennungsmerkmale: Dunkler Frack mit hellem Bauch/Gesicht, Flossen, Orangeschnabel + -füße.
 *
 * Mood → temperature:
 *   warm    ≥ 22 °C  Sonnenbrille + Wangenrouge
 *   neutral  8–22 °C  runde Augen, Schnabel leicht geöffnet
 *   cold     0–8 °C  besorgte Augen, Schal, Schneeflocken, Zittern
 *   frozen    < 0 °C  X-Augen, Eiszapfen, Schal, starkes Zittern
 */

import type { PetProps } from './pet.shared';
import { resolveMood, BODY_FILL, OUTLINE } from './pet.shared';
import {
  PetSvg, PetShadow, PetIcicles, PetSun,
  PetSweat, PetSnowflakes, PetScarf, PetBlush,
  PetSunglasses, PetFrozenEyes, PetWorriedBrows,
} from './BasePet';

const PENGUIN_BODY = '#1e3a5f';
const ORANGE       = '#f97316';

export function PetPenguin({ temperature, size = 80, blinking = false, mood: moodOverride }: PetProps) {
  const mood = resolveMood(temperature, moodOverride);
  const isHot = temperature !== null && temperature >= 28;
  const face = BODY_FILL[mood];   // helles Bauch/Gesichts-Oval

  return (
    <PetSvg size={size} shivering={mood === 'cold' || mood === 'frozen'} ariaLabel={`Pinguin-Pet: ${mood}`}>
      <PetShadow cx={33} />
      <PetIcicles mood={mood} y={74} />

      {/* ── Flossen ── */}
      <ellipse cx="10" cy="56" rx="5" ry="11" fill={PENGUIN_BODY} stroke={OUTLINE} strokeWidth="1.5" transform="rotate(-25 10 56)" />
      <ellipse cx="54" cy="56" rx="5" ry="11" fill={PENGUIN_BODY} stroke={OUTLINE} strokeWidth="1.5" transform="rotate(25 54 56)" />

      {/* ── Körper (Frack) + heller Bauch ── */}
      <ellipse cx="32" cy="63" rx="16" ry="11" fill={PENGUIN_BODY} stroke={OUTLINE} strokeWidth="1.5" />
      <ellipse cx="32" cy="63" rx="10" ry="7.5" fill={face} />

      {/* ── Füße (orange) ── */}
      <ellipse cx="24" cy="73" rx="8" ry="3.5" fill={ORANGE} stroke={OUTLINE} strokeWidth="1" />
      <ellipse cx="40" cy="73" rx="8" ry="3.5" fill={ORANGE} stroke={OUTLINE} strokeWidth="1" />

      {/* ── Kopf (Frack) + helles Gesichts-Oval ── */}
      <circle cx="32" cy="33" r="20" fill={PENGUIN_BODY} stroke={OUTLINE} strokeWidth="1.5" />
      <ellipse cx="32" cy="36" rx="12" ry="14" fill={face} />

      <PetSnowflakes mood={mood} left={{ x: 5, y: 18 }} right={{ x: 60, y: 17 }} />
      <PetSun mood={mood} />
      <PetSweat isHot={isHot} y={14} />

      {/* ── Augen ── */}
      {mood === 'neutral' && (blinking ? (
        <>
          <line x1="22.5" y1="30" x2="29.5" y2="30" stroke={OUTLINE} strokeWidth="2.5" strokeLinecap="round" />
          <line x1="34.5" y1="30" x2="41.5" y2="30" stroke={OUTLINE} strokeWidth="2.5" strokeLinecap="round" />
        </>
      ) : (
        <>
          <circle cx="26" cy="30" r="3.5" fill={OUTLINE} />
          <circle cx="38" cy="30" r="3.5" fill={OUTLINE} />
          <circle cx="24.8" cy="28.8" r="1.2" fill="white" opacity="0.65" />
          <circle cx="36.8" cy="28.8" r="1.2" fill="white" opacity="0.65" />
        </>
      ))}

      <PetSunglasses
        mood={mood}
        frame={{ y: 24, w: 14, h: 12, rx: 4 }}
        leftX={14} rightX={38}
        leftTemple={[14, 30, 8, 33]}
        rightTemple={[52, 30, 58, 33]}
      />

      <PetWorriedBrows
        mood={mood}
        leftBrow={{ x1: 19, y1: 23, x2: 30, y2: 26 }}
        rightBrow={{ x1: 36, y1: 26, x2: 47, y2: 23 }}
      />
      {mood === 'cold' && (
        <>
          <circle cx="26" cy="31" r="3.5" fill={OUTLINE} />
          <circle cx="38" cy="31" r="3.5" fill={OUTLINE} />
          <circle cx="24.8" cy="29.8" r="1.2" fill="white" opacity="0.65" />
          <circle cx="36.8" cy="29.8" r="1.2" fill="white" opacity="0.65" />
        </>
      )}

      <PetFrozenEyes
        mood={mood}
        leftBox={{ l: 19, t: 24, r: 31, b: 36 }}
        rightBox={{ l: 35, t: 24, r: 47, b: 36 }}
      />

      <PetBlush mood={mood} leftCx={16} rightCx={48} cy={43} rx={6} ry={3.5} />

      {/* ── Schnabel ── */}
      <path d="M26,37 Q32,33 38,37 L35,42 L29,42 Z" fill={ORANGE} stroke={OUTLINE} strokeWidth="0.8" strokeLinejoin="round" />
      {mood === 'neutral' && (
        <path d="M29,42 L35,42 Q33,47 32,48 Q31,47 29,42 Z" fill="#ea580c" stroke={OUTLINE} strokeWidth="0.8" strokeLinejoin="round" />
      )}
      {mood === 'warm' && (
        <path d="M29,42 L35,42 Q33,50 32,51 Q31,50 29,42 Z" fill="#ea580c" stroke={OUTLINE} strokeWidth="0.8" strokeLinejoin="round" />
      )}
      {mood === 'cold' && (
        <path d="M29,42 L35,42 L32,44 Z" fill="#ea580c" stroke={OUTLINE} strokeWidth="0.8" strokeLinejoin="round" />
      )}
      {mood === 'frozen' && (
        <path d="M29,42 L35,42 Q34,43 32,42 Q30,44 29,42 Z" fill="#ea580c" stroke={OUTLINE} strokeWidth="0.8" strokeLinejoin="round" />
      )}

      <PetScarf mood={mood} x={10} y={51} width={44} knotCx={53} knotCy={56} />
    </PetSvg>
  );
}
