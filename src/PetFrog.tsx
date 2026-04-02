/**
 * Gen1-Style Frog Pet
 *
 * Erkennungsmerkmale: Breiter Kopf, hervorquellende Kulleraugen, klebrige Zunge (warm).
 *
 * Mood → temperature:
 *   warm    ≥ 22 °C  Sonnenbrille + Zunge + Wangenrouge
 *   neutral  8–22 °C  Kulleraugen, breites Grinsen
 *   cold     0–8 °C  besorgte Augen, Schal, Schneeflocken, Zittern
 *   frozen    < 0 °C  X-Augen, Eiszapfen, Schal, starkes Zittern
 */

import { useRef } from 'react';
import type { Mood, PetProps } from './pet.shared';
import { getMood, OUTLINE } from './pet.shared';
import {
  PetSvg, PetShadow, PetIcicles, PetSun,
  PetSweat, PetSnowflakes, PetScarf, PetBlush,
  PetSunglasses, PetFrozenEyes, PetWorriedBrows,
} from './BasePet';

const FROG_BODY: Record<Mood, string> = {
  frozen:  '#c7d2fe',
  cold:    '#a5f3fc',
  neutral: '#86efac',
  warm:    '#d9f99d',
};

const FROG_DARK: Record<Mood, string> = {
  frozen:  '#6366f1',
  cold:    '#0891b2',
  neutral: '#16a34a',
  warm:    '#65a30d',
};

export function PetFrog({ temperature, size = 80, blinking = false }: PetProps) {
  const mood   = getMood(temperature);
  const isHot  = temperature !== null && temperature >= 28;
  const body   = FROG_BODY[mood];
  const dark   = FROG_DARK[mood];
  // Eindeutige Mask-ID — mehrere SVG-Instanzen können gleichzeitig im DOM sein
  const maskId = useRef(`fm-${Math.floor(Math.random() * 1e9)}`).current;

  return (
    <PetSvg size={size} shivering={mood === 'cold' || mood === 'frozen'} ariaLabel={`Frosch-Pet: ${mood}`}>
      <PetShadow cx={32} />
      <PetIcicles mood={mood} y={74} />

      {/* ── Körper ── */}
      <ellipse cx="32" cy="65" rx="15" ry="10" fill={body} stroke={dark} strokeWidth="1.5" />

      {/* ── Gliedmaßen ── */}
      <ellipse cx="11" cy="63" rx="8" ry="4.5" fill={body} stroke={dark} strokeWidth="1.5" />
      <ellipse cx="53" cy="63" rx="8" ry="4.5" fill={body} stroke={dark} strokeWidth="1.5" />
      <ellipse cx="22" cy="74" rx="9" ry="3.5" fill={body} stroke={dark} strokeWidth="1.5" />
      <ellipse cx="42" cy="74" rx="9" ry="3.5" fill={body} stroke={dark} strokeWidth="1.5" />

      {/* ── Kopf ── */}
      <ellipse cx="32" cy="43" rx="21" ry="17" fill={body} stroke={dark} strokeWidth="1.5" />

      {/* Mask: Augen-Outline nur außerhalb des Kopfes sichtbar */}
      <defs>
        <mask id={maskId}>
          <rect x="0" y="0" width="66" height="88" fill="white" />
          <ellipse cx="32" cy="43" rx="21" ry="17" fill="black" />
        </mask>
      </defs>

      {/* ── Augen-Kugeln — Fill ohne Stroke (keine Trennlinie), Outline via Mask ── */}
      <circle cx="20" cy="28" r="9" fill={body} />
      <circle cx="44" cy="28" r="9" fill={body} />
      <circle cx="20" cy="28" r="9" fill="none" stroke={dark} strokeWidth="1.5" mask={`url(#${maskId})`} />
      <circle cx="44" cy="28" r="9" fill="none" stroke={dark} strokeWidth="1.5" mask={`url(#${maskId})`} />

      <PetSnowflakes mood={mood} left={{ x: 3, y: 52 }} right={{ x: 60, y: 51 }} />
      <PetSun mood={mood} />
      <PetSweat isHot={isHot} y={44} />

      {/* ── Augen-Pupillen ── */}
      {mood === 'neutral' && (blinking ? (
        <>
          <ellipse cx="20" cy="29" rx="6" ry="2.5" fill={OUTLINE} />
          <ellipse cx="44" cy="29" rx="6" ry="2.5" fill={OUTLINE} />
        </>
      ) : (
        <>
          <circle cx="20" cy="29" r="6" fill={OUTLINE} />
          <circle cx="44" cy="29" r="6" fill={OUTLINE} />
          <circle cx="17.5" cy="26.5" r="2" fill="white" opacity="0.7" />
          <circle cx="41.5" cy="26.5" r="2" fill="white" opacity="0.7" />
        </>
      ))}

      {/* Frog sunglasses are larger (20×16 frames) to cover the bug-eyes */}
      <PetSunglasses
        mood={mood}
        frame={{ y: 20, w: 20, h: 16, rx: 6 }}
        leftX={10} rightX={36}
        leftTemple={[10, 28, 4, 32]}
        rightTemple={[56, 28, 62, 32]}
      />

      <PetWorriedBrows
        mood={mood}
        leftBrow={{ x1: 12, y1: 21, x2: 22, y2: 24 }}
        rightBrow={{ x1: 42, y1: 24, x2: 52, y2: 21 }}
      />
      {mood === 'cold' && (
        <>
          <circle cx="20" cy="30" r="6" fill={OUTLINE} />
          <circle cx="44" cy="30" r="6" fill={OUTLINE} />
          <circle cx="17.5" cy="27.5" r="2" fill="white" opacity="0.7" />
          <circle cx="41.5" cy="27.5" r="2" fill="white" opacity="0.7" />
        </>
      )}

      <PetFrozenEyes
        mood={mood}
        leftBox={{ l: 13, t: 21, r: 27, b: 35 }}
        rightBox={{ l: 37, t: 21, r: 51, b: 35 }}
      />

      {/* ── Nasenlöcher ── */}
      <circle cx="29" cy="44" r="1.5" fill={dark} opacity="0.6" />
      <circle cx="35" cy="44" r="1.5" fill={dark} opacity="0.6" />

      <PetBlush mood={mood} leftCx={13} rightCx={51} cy={50} rx={6} ry={3.5} />

      {/* ── Mund ── */}
      {mood === 'neutral' && (
        <path d="M16,51 Q32,62 48,51" stroke={OUTLINE} strokeWidth="1.5" strokeLinecap="round" fill="none" />
      )}
      {mood === 'warm' && (
        <>
          <path d="M16,51 Q32,63 48,51" stroke={OUTLINE} strokeWidth="1.5" strokeLinecap="round" fill="none" />
          <ellipse cx="32" cy="58" rx="8" ry="5" fill="#f9a8d4" />
          <ellipse cx="32" cy="62" rx="5" ry="3" fill="#f472b6" opacity="0.7" />
          <line x1="32" y1="51" x2="32" y2="58" stroke={OUTLINE} strokeWidth="1" strokeLinecap="round" />
        </>
      )}
      {mood === 'cold' && (
        <path d="M18,55 Q32,47 46,55" stroke={OUTLINE} strokeWidth="1.5" strokeLinecap="round" fill="none" />
      )}
      {mood === 'frozen' && (
        <path d="M16,52 Q21,48 26,52 Q31,56 36,52 Q41,48 46,52" stroke={OUTLINE} strokeWidth="1.5" strokeLinecap="round" fill="none" />
      )}

      <PetScarf mood={mood} x={10} y={58} width={44} knotCx={53} knotCy={63} />
    </PetSvg>
  );
}
