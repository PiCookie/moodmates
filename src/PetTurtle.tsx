/**
 * Gen1-Style Turtle Pet
 *
 * Erkennungsmerkmale: Markanter Panzer, kleiner Kopf, kurze Stummel-Gliedmaßen.
 *
 * Mood → temperature:
 *   warm    ≥ 22 °C  Sonnenbrille + Wangenrouge
 *   neutral  8–22 °C  runde Augen, kleines Lächeln
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

const TURTLE_BODY: Record<Mood, string> = {
  frozen:  '#e0e7ff',
  cold:    '#ccfbf1',
  neutral: '#bbf7d0',
  warm:    '#d9f99d',
};

const TURTLE_DARK: Record<Mood, string> = {
  frozen:  '#6366f1',
  cold:    '#0d9488',
  neutral: '#15803d',
  warm:    '#65a30d',
};

export function PetTurtle({ temperature, size = 80, blinking = false }: PetProps) {
  const mood = getMood(temperature);
  const isHot = temperature !== null && temperature >= 28;
  const body = TURTLE_BODY[mood];
  const dark = TURTLE_DARK[mood];

  return (
    <PetSvg size={size} shivering={mood === 'cold' || mood === 'frozen'} ariaLabel={`Schildkröten-Maskottchen: ${mood}`}>
      <PetShadow cx={33} />
      <PetIcicles mood={mood} y={74} />

      {/* ── Schwanz ── */}
      <ellipse cx="50" cy="67" rx="5" ry="3" fill={body} stroke={dark} strokeWidth="1.5" />

      {/* ── Gliedmaßen + Füße ── */}
      <ellipse cx="9"  cy="60" rx="7" ry="4.5" fill={body} stroke={dark} strokeWidth="1.5" />
      <ellipse cx="57" cy="60" rx="7" ry="4.5" fill={body} stroke={dark} strokeWidth="1.5" />
      <ellipse cx="22" cy="75" rx="8" ry="3.5" fill={body} stroke={dark} strokeWidth="1.5" />
      <ellipse cx="42" cy="75" rx="8" ry="3.5" fill={body} stroke={dark} strokeWidth="1.5" />

      {/* ── Panzer-Kuppel ── */}
      <ellipse cx="32" cy="58" rx="21" ry="14" fill={body} stroke={dark} strokeWidth="1.5" />

      {/* ── Panzer-Muster ── */}
      <ellipse cx="32" cy="57" rx="7" ry="6"  fill="none" stroke={dark} strokeWidth="1" opacity="0.45" />
      <path d="M24,47 Q32,44 40,47" fill="none" stroke={dark} strokeWidth="1" opacity="0.35" />
      <path d="M12,55 Q18,50 25,52" fill="none" stroke={dark} strokeWidth="1" opacity="0.35" />
      <path d="M39,52 Q46,50 52,55" fill="none" stroke={dark} strokeWidth="1" opacity="0.35" />
      <path d="M15,63 Q22,68 30,65" fill="none" stroke={dark} strokeWidth="1" opacity="0.35" />
      <path d="M34,65 Q42,68 49,63" fill="none" stroke={dark} strokeWidth="1" opacity="0.35" />

      <PetSnowflakes mood={mood} left={{ x: 3, y: 44 }} right={{ x: 62, y: 39 }} />
      <PetSun mood={mood} />
      <PetSweat isHot={isHot} y={36} />

      {/* ── Kopf ── */}
      <circle cx="32" cy="30" r="13" fill={body} stroke={dark} strokeWidth="1.5" />

      {/* ── Augen ── */}
      {mood === 'neutral' && (blinking ? (
        <>
          <line x1="23" y1="27" x2="29" y2="27" stroke={OUTLINE} strokeWidth="2.5" strokeLinecap="round" />
          <line x1="35" y1="27" x2="41" y2="27" stroke={OUTLINE} strokeWidth="2.5" strokeLinecap="round" />
        </>
      ) : (
        <>
          <circle cx="26" cy="27" r="3.5" fill={OUTLINE} />
          <circle cx="38" cy="27" r="3.5" fill={OUTLINE} />
          <circle cx="24.8" cy="25.8" r="1.2" fill="white" opacity="0.65" />
          <circle cx="36.8" cy="25.8" r="1.2" fill="white" opacity="0.65" />
        </>
      ))}

      <PetSunglasses
        mood={mood}
        frame={{ y: 21, w: 13, h: 11, rx: 4 }}
        leftX={17} rightX={36}
        leftTemple={[17, 27, 11, 30]}
        rightTemple={[49, 27, 55, 30]}
      />

      <PetWorriedBrows
        mood={mood}
        leftBrow={{ x1: 20, y1: 22, x2: 30, y2: 25 }}
        rightBrow={{ x1: 34, y1: 25, x2: 44, y2: 22 }}
      />
      {mood === 'cold' && (
        <>
          <circle cx="26" cy="28" r="3.5" fill={OUTLINE} />
          <circle cx="38" cy="28" r="3.5" fill={OUTLINE} />
          <circle cx="24.8" cy="26.8" r="1.2" fill="white" opacity="0.65" />
          <circle cx="36.8" cy="26.8" r="1.2" fill="white" opacity="0.65" />
        </>
      )}

      <PetFrozenEyes
        mood={mood}
        leftBox={{ l: 20, t: 23, r: 31, b: 34 }}
        rightBox={{ l: 33, t: 23, r: 44, b: 34 }}
      />

      {/* ── Nasenlöcher ── */}
      <circle cx="29.5" cy="33" r="1.3" fill={dark} opacity="0.6" />
      <circle cx="34.5" cy="33" r="1.3" fill={dark} opacity="0.6" />

      <PetBlush mood={mood} leftCx={18} rightCx={46} cy={35} rx={5} ry={3} />

      {/* ── Mund ── */}
      {(mood === 'neutral' || mood === 'warm') && (
        <path d="M27,37 Q32,41 37,37" stroke={OUTLINE} strokeWidth="1.5" strokeLinecap="round" fill="none" />
      )}
      {mood === 'cold' && (
        <path d="M27,39 Q32,35 37,39" stroke={OUTLINE} strokeWidth="1.5" strokeLinecap="round" fill="none" />
      )}
      {mood === 'frozen' && (
        <path d="M24,37 Q27,34 30,37 Q33,40 36,37 Q39,34 42,37" stroke={OUTLINE} strokeWidth="1.5" strokeLinecap="round" fill="none" />
      )}

      {/* small=true: thinner scarf for the compact turtle neck */}
      <PetScarf mood={mood} x={16} y={40} width={32} knotCx={47} knotCy={44} small />
    </PetSvg>
  );
}
