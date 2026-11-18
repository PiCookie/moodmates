/**
 * Igel im Retro-Stil
 *
 * Erkennungsmerkmale: Stachelrücken als halbkreisförmiges Stachelbündel
 * (Hauptmerkmal), runder Bauch, kleine Ohren, Stupsnase.
 *
 * Schichten (hinten → vorne):
 *   Stacheln → Körper → Kopf → Gesicht
 *
 * Mood → temperature:
 *   warm    ≥ 22 °C  Sonnenbrille + Wangenrouge
 *   neutral  8–22 °C  runde Augen, entspanntes Lächeln
 *   cold     0–8 °C  besorgte Augen, Schal, Schneeflocken, Zittern
 *   frozen    < 0 °C  X-Augen, Eiszapfen, Schal, starkes Zittern
 */

import { useId } from 'react';
import type { Mood, AnimalProps } from '../shared';
import { resolveMood, OUTLINE } from '../shared';
import {
  PetSvg, PetShadow, PetIcicles, PetSun,
  PetSweat, PetSnowflakes, PetScarf, PetBlush,
  PetSunglasses, PetFrozenEyes, PetWorriedBrows,
} from '../petParts';

const IGEL_FUR: Record<Mood, string> = {
  frozen:  '#d3dcfe',
  cold:    '#c2ccd8',
  neutral: '#c8996a',
  warm:    '#d89c49',
};

const IGEL_BELLY: Record<Mood, string> = {
  frozen:  '#e0e7ff',
  cold:    '#e2e8f0',
  neutral: '#fef3c7',
  warm:    '#fde68a',
};

const IGEL_HEAD: Record<Mood, string> = {
  frozen:  '#d3dcfe', // EULE_FUR #c7d2fe + EULE_BELLY #e0e7ff @ 50%
  cold:    '#c2ccd8', // EULE_FUR #94a3b8 + EULE_BELLY #f1f5f9 @ 50%
  neutral: '#c8996a', // EULE_FUR #92400e + EULE_BELLY #fef3c7 @ 50%
  warm:    '#d89c49', // EULE_FUR #b45309 + EULE_BELLY #fde68a @ 50%
};

const IGEL_SNOUT: Record<Mood, string> = {
  frozen:  '#c7d2fe',
  cold:    '#94a3b8',
  neutral: '#a16207',
  warm:    '#b45309',
};

const SPINE_BASE: Record<Mood, string> = {
  frozen:  '#4338ca',
  cold:    '#334155',
  neutral: '#1c1917',
  warm:    '#0c0a09',
};

const SPINE_TIP: Record<Mood, string> = {
  frozen:  '#a5b4fc',
  cold:    '#94a3b8',
  neutral: '#a16207',
  warm:    '#92400e',
};

export function Hedgehog({ temperature, size = 80, blinking = false, mood: moodOverride, ariaLabel }: AnimalProps) {
  const mood   = resolveMood(temperature, moodOverride);
  const isHot  = temperature !== null && temperature >= 28;
  const fur    = IGEL_FUR[mood];
  const belly  = IGEL_BELLY[mood];
  const head   = IGEL_HEAD[mood];
  const snout  = IGEL_SNOUT[mood];
  const spineBase  = SPINE_BASE[mood];
  const spineTip   = SPINE_TIP[mood];
  const clipId = useId();

  return (
    <PetSvg size={size} shivering={mood === 'cold' || mood === 'frozen'} ariaLabel={ariaLabel}>
      <PetShadow cx={32} />
      <PetIcicles mood={mood} y={77} />

      {/* ── Stacheln (hinter dem Körper) ── */}
      {/* Äußerer Stachel-Halbkreis als Basis */}
      <ellipse cx="32" cy="54" rx="19" ry="16" fill={`url(#${clipId}-spine)`} />
      {/* Einzelne Stachel-Linien, fächerförmig */}
      <line x1="32" y1="38" x2="32" y2="26" stroke={`url(#${clipId}-spine)`} strokeWidth="2.5" strokeLinecap="round" />
      <line x1="38" y1="39" x2="40" y2="27" stroke={`url(#${clipId}-spine)`} strokeWidth="2.5" strokeLinecap="round" />
      <line x1="43" y1="42" x2="48" y2="31" stroke={`url(#${clipId}-spine)`} strokeWidth="2.5" strokeLinecap="round" />
      <line x1="47" y1="47" x2="54" y2="39" stroke={`url(#${clipId}-spine)`} strokeWidth="2.5" strokeLinecap="round" />
      <line x1="50" y1="54" x2="58" y2="50" stroke={`url(#${clipId}-spine)`} strokeWidth="2.5" strokeLinecap="round" />
      <line x1="26" y1="39" x2="24" y2="27" stroke={`url(#${clipId}-spine)`} strokeWidth="2.5" strokeLinecap="round" />
      <line x1="21" y1="42" x2="16" y2="31" stroke={`url(#${clipId}-spine)`} strokeWidth="2.5" strokeLinecap="round" />
      <line x1="17" y1="47" x2="10" y2="39" stroke={`url(#${clipId}-spine)`} strokeWidth="2.5" strokeLinecap="round" />
      <line x1="14" y1="54" x2="6"  y2="50" stroke={`url(#${clipId}-spine)`} strokeWidth="2.5" strokeLinecap="round" />

      {/* ── Füße ── */}
      <ellipse cx="24" cy="72" rx="7" ry="3" fill={fur} stroke={OUTLINE} strokeWidth="1" />
      <ellipse cx="40" cy="72" rx="7" ry="3" fill={fur} stroke={OUTLINE} strokeWidth="1" />

      {/* ── Körper (runder Bauch, überdeckt untere Stachelhälfte) ── */}
      <ellipse cx="32" cy="60" rx="16" ry="13" fill={fur}   stroke={OUTLINE} strokeWidth="1.5" />
      <ellipse cx="32" cy="63" rx="10" ry="8"  fill={belly} />

      {/* ── Arme (vor dem Körper) ── */}
      <ellipse cx="16" cy="61" rx="6" ry="4" fill={fur} stroke={OUTLINE} strokeWidth="1.2" />
      <ellipse cx="48" cy="61" rx="6" ry="4" fill={fur} stroke={OUTLINE} strokeWidth="1.2" />

      <defs>
        <clipPath id={clipId}>
          <path d="M24,38 Q32,32 40,38 Q44,48 38,57 Q32,63 26,57 Q20,48 24,38 Z" />
        </clipPath>
        <radialGradient id={`${clipId}-spine`} cx="32" cy="54" r="28" gradientUnits="userSpaceOnUse">
          <stop offset="0%"   stopColor={spineBase} />
          <stop offset="100%" stopColor={spineTip}  />
        </radialGradient>
      </defs>

      {/* ── Kleine Ohren (Kreise, oben an den Kopfseiten) ── */}
      <circle cx="23" cy="40" r="4" fill={fur} stroke={OUTLINE} strokeWidth="1.2" />
      <circle cx="41" cy="40" r="4" fill={fur} stroke={OUTLINE} strokeWidth="1.2" />

      {/* ── Kopf (oben schmal, Wangen breiter, Schnauze spitz) ── */}
      <path d="M24,38 Q32,32 40,38 Q44,48 38,57 Q32,63 26,57 Q20,48 24,38 Z" fill={head} stroke={OUTLINE} strokeWidth="1.5" strokeLinejoin="round" />

      <PetSnowflakes mood={mood} left={{ x: 3, y: 30 }} right={{ x: 60, y: 30 }} />
      <PetSun mood={mood} />
      <PetSweat isHot={isHot} y={20} />

      {/* ── Schnauze (dunkel, untere Kopfhälfte) ── */}
      <path d="M26,52 Q24,59 32,63 Q40,59 38,52 Q32,50 26,52 Z" fill={snout} />

      {/* ── Augen (seitlich, auf Wangenhöhe) ── */}
      {mood === 'neutral' && (blinking ? (
        <>
          <line x1="21" y1="49" x2="30" y2="49" stroke={OUTLINE} strokeWidth="2" strokeLinecap="round" />
          <line x1="34" y1="49" x2="43" y2="49" stroke={OUTLINE} strokeWidth="2" strokeLinecap="round" />
        </>
      ) : (
        <>
          <circle cx="26" cy="49" r="5.5" fill={snout} clipPath={`url(#${clipId})`} />
          <circle cx="38" cy="49" r="5.5" fill={snout} clipPath={`url(#${clipId})`} />
          <circle cx="26" cy="49" r="3.5" fill={OUTLINE} />
          <circle cx="38" cy="49" r="3.5" fill={OUTLINE} />
          <circle cx="24.8" cy="47.8" r="1.2" fill="white" opacity="0.65" />
          <circle cx="36.8" cy="47.8" r="1.2" fill="white" opacity="0.65" />
        </>
      ))}

      <PetSunglasses
        mood={mood}
        frame={{ y: 43, w: 13, h: 12, rx: 4 }}
        leftX={17} rightX={34}
        leftTemple={[17, 49, 9, 52]}
        rightTemple={[47, 49, 55, 52]}
      />

      <PetWorriedBrows
        mood={mood}
        leftBrow={{ x1: 19, y1: 43, x2: 29, y2: 46 }}
        rightBrow={{ x1: 35, y1: 46, x2: 45, y2: 43 }}
      />
      {mood === 'cold' && (
        <>
          <circle cx="26" cy="50" r="5.5" fill={snout} clipPath={`url(#${clipId})`} />
          <circle cx="38" cy="50" r="5.5" fill={snout} clipPath={`url(#${clipId})`} />
          <circle cx="26" cy="50" r="3.5" fill={OUTLINE} />
          <circle cx="38" cy="50" r="3.5" fill={OUTLINE} />
          <circle cx="24.8" cy="48.8" r="1.2" fill="white" opacity="0.65" />
          <circle cx="36.8" cy="48.8" r="1.2" fill="white" opacity="0.65" />
        </>
      )}

      <PetFrozenEyes
        mood={mood}
        leftBox={{ l: 19, t: 43, r: 33, b: 56 }}
        rightBox={{ l: 31, t: 43, r: 45, b: 56 }}
      />

      {/* ── Nase (am äußersten Schnauzenspitz) ── */}
      <ellipse cx="32" cy="62" rx="2.5" ry="1.8" fill={OUTLINE} opacity="0.9" />
      <ellipse cx="31.2" cy="61.4" rx="0.9" ry="0.7" fill="white" opacity="0.4" />

      <PetBlush mood={mood} leftCx={19} rightCx={45} cy={54} rx={4} ry={3} />

      {/* ── Schnurrhaare ── */}
      <line x1="26" y1="55" x2="12" y2="52" stroke={OUTLINE} strokeWidth="0.9" strokeLinecap="round" opacity="0.6" />
      <line x1="26" y1="57" x2="12" y2="57" stroke={OUTLINE} strokeWidth="0.9" strokeLinecap="round" opacity="0.6" />
      <line x1="26" y1="59" x2="12" y2="62" stroke={OUTLINE} strokeWidth="0.9" strokeLinecap="round" opacity="0.6" />
      <line x1="38" y1="55" x2="52" y2="52" stroke={OUTLINE} strokeWidth="0.9" strokeLinecap="round" opacity="0.6" />
      <line x1="38" y1="57" x2="52" y2="57" stroke={OUTLINE} strokeWidth="0.9" strokeLinecap="round" opacity="0.6" />
      <line x1="38" y1="59" x2="52" y2="62" stroke={OUTLINE} strokeWidth="0.9" strokeLinecap="round" opacity="0.6" />

      <PetScarf mood={mood} x={12} y={63} width={40} knotCx={51} knotCy={68} />
    </PetSvg>
  );
}
