/**
 * Gen1-Style Cat Pet
 *
 * Mood → temperature:
 *   warm    ≥ 22 °C  Sonnenbrille + Katzenlächeln
 *   neutral  8–22 °C  Strich-Augen (-.-), Katzenlächeln
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

export function PetCat({ temperature, size = 80, blinking = false }: PetProps) {
  const mood = getMood(temperature);
  const isHot = temperature !== null && temperature >= 28;
  const body = BODY_FILL[mood];

  return (
    <PetSvg size={size} shivering={mood === 'cold' || mood === 'frozen'} ariaLabel={`Katzen-Maskottchen: ${mood}`}>
      <PetShadow cx={30} />
      <PetIcicles mood={mood} y={73} />

      {/* ── Ohren  /\_/\  ── */}
      <polygon points="6,22 16,4 26,22"   fill={body} stroke={OUTLINE} strokeWidth="1.5" strokeLinejoin="round" />
      <polygon points="10,21 16,9 22,21"  fill={PINK} />
      <polygon points="40,22 51,4 61,22"  fill={body} stroke={OUTLINE} strokeWidth="1.5" strokeLinejoin="round" />
      <polygon points="44,21 51,9 57,21"  fill={PINK} />

      {/* ── Kopf ── */}
      <circle cx="32" cy="38" r="23" fill={body} stroke={OUTLINE} strokeWidth="1.5" />

      {/* ── Schwanz ── */}
      <path d="M46,66 Q62,58 58,46" stroke={OUTLINE} strokeWidth="3" strokeLinecap="round" fill="none" />

      {/* ── Körper ── */}
      <ellipse cx="32" cy="65" rx="14" ry="9" fill={body} stroke={OUTLINE} strokeWidth="1.5" />

      {/* ── Pfoten + Füße ── */}
      <ellipse cx="12" cy="63" rx="7"  ry="4.5" fill={body} stroke={OUTLINE} strokeWidth="1.5" />
      <ellipse cx="52" cy="63" rx="7"  ry="4.5" fill={body} stroke={OUTLINE} strokeWidth="1.5" />
      <ellipse cx="23" cy="73" rx="8"  ry="3.5" fill={body} stroke={OUTLINE} strokeWidth="1.5" />
      <ellipse cx="41" cy="73" rx="8"  ry="3.5" fill={body} stroke={OUTLINE} strokeWidth="1.5" />

      {/* ── Schnurrhaare ── */}
      <line x1="2"  y1="37" x2="17" y2="39" stroke={OUTLINE} strokeWidth="1" strokeLinecap="round" opacity="0.6" />
      <line x1="2"  y1="43" x2="17" y2="41" stroke={OUTLINE} strokeWidth="1" strokeLinecap="round" opacity="0.6" />
      <line x1="47" y1="39" x2="62" y2="37" stroke={OUTLINE} strokeWidth="1" strokeLinecap="round" opacity="0.6" />
      <line x1="47" y1="41" x2="62" y2="43" stroke={OUTLINE} strokeWidth="1" strokeLinecap="round" opacity="0.6" />

      <PetSnowflakes mood={mood} left={{ x: 5, y: 24 }} right={{ x: 60, y: 17 }} />
      <PetSun mood={mood} />
      <PetSweat isHot={isHot} y={14} />

      {/* ── Augen ── */}
      {mood === 'neutral' && (blinking ? (
        <>
          <rect x="19" y="33" width="9" height="1" rx="0.5" fill={OUTLINE} />
          <rect x="38" y="33" width="9" height="1" rx="0.5" fill={OUTLINE} />
        </>
      ) : (
        <>
          <rect x="19" y="32" width="9" height="3" rx="1.5" fill={OUTLINE} />
          <rect x="38" y="32" width="9" height="3" rx="1.5" fill={OUTLINE} />
        </>
      ))}

      <PetSunglasses
        mood={mood}
        frame={{ y: 27, w: 14, h: 12, rx: 4 }}
        leftX={14} rightX={38}
        leftTemple={[14, 33, 8, 36]}
        rightTemple={[52, 33, 58, 36]}
      />

      <PetWorriedBrows
        mood={mood}
        leftBrow={{ x1: 18, y1: 25, x2: 29, y2: 28 }}
        rightBrow={{ x1: 37, y1: 28, x2: 48, y2: 25 }}
      />
      {/* Schräge Strich-Augen (kalt) */}
      {mood === 'cold' && (
        <>
          <line x1="19" y1="35" x2="29" y2="31" stroke={OUTLINE} strokeWidth="3" strokeLinecap="round" />
          <line x1="37" y1="31" x2="47" y2="35" stroke={OUTLINE} strokeWidth="3" strokeLinecap="round" />
        </>
      )}

      <PetFrozenEyes
        mood={mood}
        leftBox={{ l: 19, t: 28, r: 30, b: 39 }}
        rightBox={{ l: 36, t: 28, r: 47, b: 39 }}
      />

      {/* ── Nase ── */}
      <circle cx="32" cy="40" r="2.5" fill={PINK} />

      <PetBlush mood={mood} leftCx={14} rightCx={50} cy={46} />

      {/* ── Mund ── */}
      {(mood === 'warm' || mood === 'neutral') && (
        <path d="M26,45 Q29,50 32,45 Q35,50 38,45" stroke={OUTLINE} strokeWidth="1.5" strokeLinecap="round" fill="none" />
      )}
      {mood === 'cold' && (
        <path d="M26,49 Q32,44 38,49" stroke={OUTLINE} strokeWidth="1.5" strokeLinecap="round" fill="none" />
      )}
      {mood === 'frozen' && (
        <path d="M23,47 Q27,43 31,47 Q35,51 39,47 Q43,43 47,47" stroke={OUTLINE} strokeWidth="1.5" strokeLinecap="round" fill="none" />
      )}

      <PetScarf mood={mood} x={10} y={53} width={44} knotCx={53} knotCy={58} />
    </PetSvg>
  );
}
