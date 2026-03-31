/**
 * Gen1-Style Lion Pet
 *
 * Erkennungsmerkmale: Orangefarbene Mähne, Schwanz mit Quaste, Schnurrhaare.
 * Abweichend: Sonne links (cx=8) statt rechts — Mähne belegt rechte Ecke.
 *
 * Mood → temperature:
 *   warm    ≥ 22 °C  Sonnenbrille + Zunge + Wangenrouge
 *   neutral  8–22 °C  runde Augen, breites Lächeln
 *   cold     0–8 °C  besorgte Augen, Schal, Schneeflocken, Zittern
 *   frozen    < 0 °C  X-Augen, Eiszapfen, Schal, starkes Zittern
 */

import type { Mood, PetProps } from './pet.shared';
import { getMood, OUTLINE } from './pet.shared';
import {
  PetSvg, PetShadow, PetIcicles, PetSweat,
  PetSnowflakes, PetScarf, PetBlush,
  PetSunglasses, PetFrozenEyes, PetWorriedBrows,
} from './BasePet';

const LION_BODY: Record<Mood, string> = {
  frozen:  '#e2e8f0',
  cold:    '#fef9c3',
  neutral: '#fef08a',
  warm:    '#fde047',
};

const LION_MANE = '#f97316';
const LION_NOSE = '#92400e';

export function PetLion({ temperature, size = 80, blinking = false }: PetProps) {
  const mood = getMood(temperature);
  const isHot = temperature !== null && temperature >= 28;
  const body = LION_BODY[mood];

  return (
    <PetSvg size={size} shivering={mood === 'cold' || mood === 'frozen'} ariaLabel={`Löwen-Maskottchen: ${mood}`}>
      <PetShadow cx={32} />
      <PetIcicles mood={mood} y={74} />

      {/* ── Schwanz mit Quaste ── */}
      <path d="M43,66 Q60,56 62,42 Q64,30 56,26" stroke={LION_MANE} strokeWidth="3" strokeLinecap="round" fill="none" />
      <circle cx="56" cy="25" r="5" fill={LION_MANE} />

      {/* ── Körper + Pfoten + Füße ── */}
      <ellipse cx="32" cy="67" rx="14" ry="9" fill={body} stroke={OUTLINE} strokeWidth="1.5" />
      <ellipse cx="11" cy="63" rx="7"  ry="4.5" fill={body} stroke={OUTLINE} strokeWidth="1.5" />
      <ellipse cx="53" cy="63" rx="7"  ry="4.5" fill={body} stroke={OUTLINE} strokeWidth="1.5" />
      <ellipse cx="22" cy="75" rx="8"  ry="3.5" fill={body} stroke={OUTLINE} strokeWidth="1.5" />
      <ellipse cx="42" cy="75" rx="8"  ry="3.5" fill={body} stroke={OUTLINE} strokeWidth="1.5" />

      {/* ── Mähne ── */}
      <circle cx="32" cy="37" r="22" fill={LION_MANE} stroke="#ea580c" strokeWidth="1" />

      {/* ── Ohren ── */}
      <circle cx="17" cy="18" r="7" fill={body}     stroke={OUTLINE} strokeWidth="1.5" />
      <circle cx="17" cy="18" r="4" fill="#fca5a5" />
      <circle cx="47" cy="18" r="7" fill={body}     stroke={OUTLINE} strokeWidth="1.5" />
      <circle cx="47" cy="18" r="4" fill="#fca5a5" />

      {/* ── Kopf ── */}
      <circle cx="32" cy="37" r="16" fill={body} stroke={OUTLINE} strokeWidth="1.5" />

      {/* Lion only has a single snowflake group (mane occupies right corner) */}
      <PetSnowflakes mood={mood} left={{ x: 4, y: 18 }} />

      {/* Lion sun is on the left side (right side occupied by tail quaste) */}
      {mood === 'warm' && (
        <g opacity="0.9">
          <circle cx="8" cy="10" r="5" fill="#fbbf24" />
          <line x1="8"  y1="2"  x2="8"  y2="0"   stroke="#fbbf24" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="14" y1="5"  x2="16" y2="3.4"  stroke="#fbbf24" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="16" y1="11" x2="18" y2="11"   stroke="#fbbf24" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="2"  y1="5"  x2="0"  y2="3.4"  stroke="#fbbf24" strokeWidth="1.5" strokeLinecap="round" />
        </g>
      )}

      <PetSweat isHot={isHot} x={60} y={14} />

      {/* ── Augen ── */}
      {mood === 'neutral' && (blinking ? (
        <>
          <line x1="21" y1="31" x2="28" y2="31" stroke={OUTLINE} strokeWidth="2.5" strokeLinecap="round" />
          <line x1="36" y1="31" x2="43" y2="31" stroke={OUTLINE} strokeWidth="2.5" strokeLinecap="round" />
        </>
      ) : (
        <>
          <circle cx="24.5" cy="31"   r="4"   fill={OUTLINE} />
          <circle cx="39.5" cy="31"   r="4"   fill={OUTLINE} />
          <circle cx="23"   cy="29.5" r="1.4" fill="white" opacity="0.65" />
          <circle cx="38"   cy="29.5" r="1.4" fill="white" opacity="0.65" />
        </>
      ))}

      <PetSunglasses
        mood={mood}
        frame={{ y: 25, w: 14, h: 12, rx: 4 }}
        leftX={14} rightX={38}
        leftBügel={[14, 31, 8, 34]}
        rightBügel={[52, 31, 58, 34]}
      />

      <PetWorriedBrows
        mood={mood}
        leftBrow={{ x1: 18, y1: 24, x2: 29, y2: 27 }}
        rightBrow={{ x1: 35, y1: 27, x2: 46, y2: 24 }}
      />
      {mood === 'cold' && (
        <>
          <circle cx="24.5" cy="32"   r="4"   fill={OUTLINE} />
          <circle cx="39.5" cy="32"   r="4"   fill={OUTLINE} />
          <circle cx="23"   cy="30.5" r="1.4" fill="white" opacity="0.65" />
          <circle cx="38"   cy="30.5" r="1.4" fill="white" opacity="0.65" />
        </>
      )}

      <PetFrozenEyes
        mood={mood}
        leftBox={{ l: 18, t: 26, r: 30, b: 38 }}
        rightBox={{ l: 34, t: 26, r: 46, b: 38 }}
      />

      {/* ── Große Löwennase ── */}
      <ellipse cx="32" cy="41" rx="5" ry="4" fill={LION_NOSE} />
      <ellipse cx="30.5" cy="39.5" rx="1.8" ry="1.2" fill="white" opacity="0.3" />

      {/* ── Schnurrhaare ── */}
      <line x1="3"  y1="38" x2="18" y2="41" stroke={OUTLINE} strokeWidth="1" strokeLinecap="round" opacity="0.5" />
      <line x1="3"  y1="44" x2="18" y2="43" stroke={OUTLINE} strokeWidth="1" strokeLinecap="round" opacity="0.5" />
      <line x1="46" y1="41" x2="61" y2="38" stroke={OUTLINE} strokeWidth="1" strokeLinecap="round" opacity="0.5" />
      <line x1="46" y1="43" x2="61" y2="44" stroke={OUTLINE} strokeWidth="1" strokeLinecap="round" opacity="0.5" />

      <PetBlush mood={mood} leftCx={14} rightCx={50} cy={44} />

      {/* ── Mund ── */}
      {mood === 'neutral' && (
        <path d="M25,48 Q32,54 39,48" stroke={OUTLINE} strokeWidth="1.5" strokeLinecap="round" fill="none" />
      )}
      {mood === 'warm' && (
        <>
          <path d="M25,48 Q32,54 39,48" stroke={OUTLINE} strokeWidth="1.5" strokeLinecap="round" fill="none" />
          <ellipse cx="32" cy="52" rx="5" ry="3.5" fill="#f9a8d4" />
          <line x1="32" y1="48" x2="32" y2="52" stroke={OUTLINE} strokeWidth="1" strokeLinecap="round" />
        </>
      )}
      {mood === 'cold' && (
        <path d="M25,50 Q32,45 39,50" stroke={OUTLINE} strokeWidth="1.5" strokeLinecap="round" fill="none" />
      )}
      {mood === 'frozen' && (
        <path d="M22,48 Q26,44 30,48 Q34,52 38,48 Q42,44 46,48" stroke={OUTLINE} strokeWidth="1.5" strokeLinecap="round" fill="none" />
      )}

      <PetScarf mood={mood} x={12} y={52} width={42} knotCx={53} knotCy={57} />
    </PetSvg>
  );
}
