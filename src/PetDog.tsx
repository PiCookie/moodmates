/**
 * Gen1-Style Dog Pet
 *
 * Erkennungsmerkmale: Hängeohren, runde Pupillenaugen, große Nase, Zunge (warm).
 *
 * Mood → temperature:
 *   warm    ≥ 22 °C  Sonnenbrille + Zunge + Wangenrouge
 *   neutral  8–22 °C  runde Augen, Hundelächeln
 *   cold     0–8 °C  besorgte Augen, Schal, Schneeflocken, Zittern
 *   frozen    < 0 °C  X-Augen, Eiszapfen, Schal, starkes Zittern
 */

import type { PetProps } from './pet.shared';
import { getMood, BODY_FILL, OUTLINE, PINK } from './pet.shared';
import {
  PetSvg, PetShadow, PetIcicles, PetSun,
  PetSweat, PetSnowflakes, PetScarf, PetBlush,
  PetSunglasses, PetFrozenEyes, PetWorriedBrows,
} from './BasePet';

export function PetDog({ temperature, size = 80, blinking = false }: PetProps) {
  const mood = getMood(temperature);
  const isHot = temperature !== null && temperature >= 28;
  const body = BODY_FILL[mood];

  return (
    <PetSvg size={size} shivering={mood === 'cold' || mood === 'frozen'} ariaLabel={`Hunde-Pet: ${mood}`}>
      <PetShadow cx={30} />
      <PetIcicles mood={mood} y={73} />

      {/* ── Schwanz ── */}
      <path d="M44,64 Q57,53 53,43" stroke={OUTLINE} strokeWidth="3" strokeLinecap="round" fill="none" />

      {/* ── Körper ── */}
      <ellipse cx="32" cy="65" rx="15" ry="9" fill={body} stroke={OUTLINE} strokeWidth="1.5" />

      {/* ── Pfoten + Füße ── */}
      <ellipse cx="12" cy="63" rx="7" ry="4.5" fill={body} stroke={OUTLINE} strokeWidth="1.5" />
      <ellipse cx="52" cy="63" rx="7" ry="4.5" fill={body} stroke={OUTLINE} strokeWidth="1.5" />
      <ellipse cx="23" cy="73" rx="8" ry="3.5" fill={body} stroke={OUTLINE} strokeWidth="1.5" />
      <ellipse cx="41" cy="73" rx="8" ry="3.5" fill={body} stroke={OUTLINE} strokeWidth="1.5" />

      {/* ── Hängeohren — vor dem Kopf, damit Kopf sie überlappt ── */}
      <path d="M14,24 Q3,32 5,47 Q8,55 15,53 Q21,49 19,30 Z"  fill={body} stroke={OUTLINE} strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M14,28 Q7,35 9,46 Q11,51 15,50 Q19,46 18,33 Z"  fill={PINK} />
      <path d="M52,24 Q63,32 61,47 Q58,55 51,53 Q45,49 47,30 Z" fill={body} stroke={OUTLINE} strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M52,28 Q59,35 57,46 Q55,51 51,50 Q47,46 48,33 Z" fill={PINK} />

      {/* ── Kopf ── */}
      <circle cx="32" cy="36" r="21" fill={body} stroke={OUTLINE} strokeWidth="1.5" />

      <PetSnowflakes mood={mood} left={{ x: 5, y: 18 }} right={{ x: 60, y: 17 }} />
      <PetSun mood={mood} />
      <PetSweat isHot={isHot} y={14} />

      {/* ── Augen ── */}
      {mood === 'neutral' && (blinking ? (
        <>
          <path d="M19,32 Q23,28 27,32" stroke={OUTLINE} strokeWidth="2.5" strokeLinecap="round" fill="none" />
          <path d="M37,32 Q41,28 45,32" stroke={OUTLINE} strokeWidth="2.5" strokeLinecap="round" fill="none" />
        </>
      ) : (
        <>
          <circle cx="23" cy="32" r="4" fill={OUTLINE} />
          <circle cx="41" cy="32" r="4" fill={OUTLINE} />
          <circle cx="24.5" cy="30.5" r="1.3" fill="white" opacity="0.65" />
          <circle cx="42.5" cy="30.5" r="1.3" fill="white" opacity="0.65" />
        </>
      ))}

      <PetSunglasses
        mood={mood}
        frame={{ y: 26, w: 14, h: 12, rx: 4 }}
        leftX={14} rightX={38}
        leftTemple={[14, 32, 8, 35]}
        rightTemple={[52, 32, 58, 35]}
      />

      <PetWorriedBrows
        mood={mood}
        leftBrow={{ x1: 18, y1: 24, x2: 29, y2: 27 }}
        rightBrow={{ x1: 37, y1: 27, x2: 48, y2: 24 }}
      />
      {mood === 'cold' && (
        <>
          <circle cx="23" cy="33" r="4" fill={OUTLINE} />
          <circle cx="41" cy="33" r="4" fill={OUTLINE} />
          <circle cx="24.5" cy="31.5" r="1.3" fill="white" opacity="0.65" />
          <circle cx="42.5" cy="31.5" r="1.3" fill="white" opacity="0.65" />
        </>
      )}

      <PetFrozenEyes
        mood={mood}
        leftBox={{ l: 18, t: 27, r: 29, b: 38 }}
        rightBox={{ l: 37, t: 27, r: 48, b: 38 }}
      />

      {/* ── Große Hundenase ── */}
      <ellipse cx="32" cy="41" rx="5.5" ry="4" fill={OUTLINE} />
      <ellipse cx="30.5" cy="39.5" rx="1.8" ry="1.2" fill="white" opacity="0.35" />

      <PetBlush mood={mood} leftCx={14} rightCx={50} cy={44} />

      {/* ── Mund ── */}
      {mood === 'neutral' && (
        <path d="M25,47 Q32,53 39,47" stroke={OUTLINE} strokeWidth="1.5" strokeLinecap="round" fill="none" />
      )}
      {mood === 'warm' && (
        <>
          <path d="M25,47 Q32,54 39,47" stroke={OUTLINE} strokeWidth="1.5" strokeLinecap="round" fill="none" />
          <ellipse cx="32" cy="51" rx="5" ry="3.5" fill="#f9a8d4" />
          <line x1="32" y1="47" x2="32" y2="51" stroke={OUTLINE} strokeWidth="1" strokeLinecap="round" />
        </>
      )}
      {mood === 'cold' && (
        <path d="M26,50 Q32,45 38,50" stroke={OUTLINE} strokeWidth="1.5" strokeLinecap="round" fill="none" />
      )}
      {mood === 'frozen' && (
        <path d="M23,48 Q27,44 31,48 Q35,52 39,48 Q43,44 47,48" stroke={OUTLINE} strokeWidth="1.5" strokeLinecap="round" fill="none" />
      )}

      <PetScarf mood={mood} x={10} y={53} width={44} knotCx={53} knotCy={58} />
    </PetSvg>
  );
}
