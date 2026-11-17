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
import { resolveMood, OUTLINE } from './pet.shared';
import {
  PetSvg, PetShadow, PetIcicles, PetSun, PetSweat,
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

export function PetLion({ temperature, size = 80, blinking = false, mood: moodOverride }: PetProps) {
  const mood = resolveMood(temperature, moodOverride);
  const isHot = temperature !== null && temperature >= 28;
  const body = LION_BODY[mood];

  return (
    <PetSvg size={size} shivering={mood === 'cold' || mood === 'frozen'} ariaLabel={`Löwen-Pet: ${mood}`}>
      <PetShadow cx={32} />
      <PetIcicles mood={mood} y={74} />

      {/* ── Schwanz mit Quaste (Outline-Technik) ── */}
      <path d="M43,66 Q60,56 62,42 Q64,30 56,26" stroke={OUTLINE}   strokeWidth="5" strokeLinecap="round" fill="none" />
      <path d="M43,66 Q60,56 62,42 Q64,30 56,26" stroke={LION_MANE} strokeWidth="3" strokeLinecap="round" fill="none" />
      <circle cx="56" cy="25" r="5" fill={LION_MANE} stroke={OUTLINE} strokeWidth="1.5" />

      {/* ── Körper + Pfoten + Füße ── */}
      <ellipse cx="32" cy="67" rx="14" ry="9" fill={body} stroke={OUTLINE} strokeWidth="1.5" />
      <ellipse cx="15" cy="63" rx="7"  ry="4.5" fill={body} stroke={OUTLINE} strokeWidth="1.5" />
      <ellipse cx="49" cy="63" rx="7"  ry="4.5" fill={body} stroke={OUTLINE} strokeWidth="1.5" />
      <ellipse cx="22" cy="75" rx="8"  ry="3.5" fill={body} stroke={OUTLINE} strokeWidth="1.5" />
      <ellipse cx="42" cy="75" rx="8"  ry="3.5" fill={body} stroke={OUTLINE} strokeWidth="1.5" />

      {/* ── Mähne ── */}
      <circle cx="32" cy="40" r="22" fill={LION_MANE} stroke="#ea580c" strokeWidth="1" />

      {/* ── Ohren ── */}
      <circle cx="17" cy="23" r="7" fill={body}     stroke={OUTLINE} strokeWidth="1.5" />
      <circle cx="17" cy="23" r="4" fill="#fca5a5" />
      <circle cx="47" cy="23" r="7" fill={body}     stroke={OUTLINE} strokeWidth="1.5" />
      <circle cx="47" cy="23" r="4" fill="#fca5a5" />

      {/* ── Kopf ── */}
      <circle cx="32" cy="40" r="16" fill={body} stroke={OUTLINE} strokeWidth="1.5" />

      {/* Lion only has a single snowflake group (mane occupies right corner) */}
      <PetSnowflakes mood={mood} left={{ x: 4, y: 18 }} />

      {/* Sonne links (cx=8) — Mähne belegt rechte Ecke */}
      <PetSun mood={mood} cx={8} cy={10} />

      <PetSweat isHot={isHot} x={60} y={14} />

      {/* ── Augen ── */}
      {mood === 'neutral' && (blinking ? (
        <>
          <line x1="21" y1="34" x2="28" y2="34" stroke={OUTLINE} strokeWidth="2.5" strokeLinecap="round" />
          <line x1="36" y1="34" x2="43" y2="34" stroke={OUTLINE} strokeWidth="2.5" strokeLinecap="round" />
        </>
      ) : (
        <>
          <circle cx="24.5" cy="34"   r="4"   fill={OUTLINE} />
          <circle cx="39.5" cy="34"   r="4"   fill={OUTLINE} />
          <circle cx="23"   cy="32.5" r="1.4" fill="white" opacity="0.65" />
          <circle cx="38"   cy="32.5" r="1.4" fill="white" opacity="0.65" />
        </>
      ))}

      <PetSunglasses
        mood={mood}
        frame={{ y: 28, w: 14, h: 12, rx: 4 }}
        leftX={14} rightX={38}
        leftTemple={[14, 34, 8, 37]}
        rightTemple={[52, 34, 58, 37]}
      />

      <PetWorriedBrows
        mood={mood}
        leftBrow={{ x1: 18, y1: 27, x2: 29, y2: 30 }}
        rightBrow={{ x1: 35, y1: 30, x2: 46, y2: 27 }}
      />
      {mood === 'cold' && (
        <>
          <circle cx="24.5" cy="35"   r="4"   fill={OUTLINE} />
          <circle cx="39.5" cy="35"   r="4"   fill={OUTLINE} />
          <circle cx="23"   cy="33.5" r="1.4" fill="white" opacity="0.65" />
          <circle cx="38"   cy="33.5" r="1.4" fill="white" opacity="0.65" />
        </>
      )}

      <PetFrozenEyes
        mood={mood}
        leftBox={{ l: 18, t: 29, r: 30, b: 41 }}
        rightBox={{ l: 34, t: 29, r: 46, b: 41 }}
      />

      {/* ── Große Löwennase ── */}
      <ellipse cx="32" cy="44" rx="5" ry="4" fill={LION_NOSE} />
      <ellipse cx="30.5" cy="42.5" rx="1.8" ry="1.2" fill="white" opacity="0.3" />

      {/* ── Schnurrhaare ── */}
      <line x1="3"  y1="41" x2="18" y2="44" stroke={OUTLINE} strokeWidth="1" strokeLinecap="round" opacity="0.5" />
      <line x1="3"  y1="47" x2="18" y2="46" stroke={OUTLINE} strokeWidth="1" strokeLinecap="round" opacity="0.5" />
      <line x1="46" y1="44" x2="61" y2="41" stroke={OUTLINE} strokeWidth="1" strokeLinecap="round" opacity="0.5" />
      <line x1="46" y1="46" x2="61" y2="47" stroke={OUTLINE} strokeWidth="1" strokeLinecap="round" opacity="0.5" />

      <PetBlush mood={mood} leftCx={14} rightCx={50} cy={47} />

      {/* ── Mund ── */}
      {mood === 'neutral' && (
        <path d="M25,51 Q32,57 39,51" stroke={OUTLINE} strokeWidth="1.5" strokeLinecap="round" fill="none" />
      )}
      {mood === 'warm' && (
        <>
          <path d="M25,51 Q32,57 39,51" stroke={OUTLINE} strokeWidth="1.5" strokeLinecap="round" fill="none" />
          <ellipse cx="32" cy="55" rx="5" ry="3.5" fill="#f9a8d4" />
          <line x1="32" y1="51" x2="32" y2="55" stroke={OUTLINE} strokeWidth="1" strokeLinecap="round" />
        </>
      )}
      {mood === 'cold' && (
        <path d="M25,53 Q32,48 39,53" stroke={OUTLINE} strokeWidth="1.5" strokeLinecap="round" fill="none" />
      )}
      {mood === 'frozen' && (
        <path d="M22,51 Q26,47 30,51 Q34,55 38,51 Q42,47 46,51" stroke={OUTLINE} strokeWidth="1.5" strokeLinecap="round" fill="none" />
      )}

      <PetScarf mood={mood} x={12} y={55} width={42} knotCx={53} knotCy={60} />
    </PetSvg>
  );
}
