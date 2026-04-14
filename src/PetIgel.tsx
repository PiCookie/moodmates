/**
 * Gen1-Style Igel Pet
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

import type { Mood, PetProps } from './pet.shared';
import { getMood, OUTLINE } from './pet.shared';
import {
  PetSvg, PetShadow, PetIcicles, PetSun,
  PetSweat, PetSnowflakes, PetScarf, PetBlush,
  PetSunglasses, PetFrozenEyes, PetWorriedBrows,
} from './BasePet';

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

const SPINE_COLOR: Record<Mood, string> = {
  frozen:  '#6366f1',
  cold:    '#64748b',
  neutral: '#57534e',
  warm:    '#44403c',
};

export function PetIgel({ temperature, size = 80, blinking = false }: PetProps) {
  const mood  = getMood(temperature);
  const isHot = temperature !== null && temperature >= 28;
  const fur   = IGEL_FUR[mood];
  const belly = IGEL_BELLY[mood];
  const head  = IGEL_HEAD[mood];
  const snout = IGEL_SNOUT[mood];
  const spine = SPINE_COLOR[mood];

  return (
    <PetSvg size={size} shivering={mood === 'cold' || mood === 'frozen'} ariaLabel={`Igel-Pet: ${mood}`}>
      <PetShadow cx={32} />
      <PetIcicles mood={mood} y={77} />

      {/* ── Stacheln (hinter dem Körper) ── */}
      {/* Äußerer Stachel-Halbkreis als Basis */}
      <ellipse cx="32" cy="54" rx="19" ry="16" fill={spine} />
      {/* Einzelne Stachel-Linien, fächerförmig */}
      <line x1="32" y1="38" x2="32" y2="26" stroke={spine} strokeWidth="2.5" strokeLinecap="round" />
      <line x1="38" y1="39" x2="40" y2="27" stroke={spine} strokeWidth="2.5" strokeLinecap="round" />
      <line x1="43" y1="42" x2="48" y2="31" stroke={spine} strokeWidth="2.5" strokeLinecap="round" />
      <line x1="47" y1="47" x2="54" y2="39" stroke={spine} strokeWidth="2.5" strokeLinecap="round" />
      <line x1="50" y1="54" x2="58" y2="50" stroke={spine} strokeWidth="2.5" strokeLinecap="round" />
      <line x1="26" y1="39" x2="24" y2="27" stroke={spine} strokeWidth="2.5" strokeLinecap="round" />
      <line x1="21" y1="42" x2="16" y2="31" stroke={spine} strokeWidth="2.5" strokeLinecap="round" />
      <line x1="17" y1="47" x2="10" y2="39" stroke={spine} strokeWidth="2.5" strokeLinecap="round" />
      <line x1="14" y1="54" x2="6"  y2="50" stroke={spine} strokeWidth="2.5" strokeLinecap="round" />

      {/* ── Füße ── */}
      <ellipse cx="24" cy="72" rx="7" ry="3" fill={fur} stroke={OUTLINE} strokeWidth="1" />
      <ellipse cx="40" cy="72" rx="7" ry="3" fill={fur} stroke={OUTLINE} strokeWidth="1" />

      {/* ── Körper (runder Bauch, überdeckt untere Stachelhälfte) ── */}
      <ellipse cx="32" cy="60" rx="16" ry="13" fill={fur}   stroke={OUTLINE} strokeWidth="1.5" />
      <ellipse cx="32" cy="63" rx="10" ry="8"  fill={belly} />

      {/* ── Arme (vor dem Körper) ── */}
      <ellipse cx="16" cy="61" rx="6" ry="4" fill={fur} stroke={OUTLINE} strokeWidth="1.2" />
      <ellipse cx="48" cy="61" rx="6" ry="4" fill={fur} stroke={OUTLINE} strokeWidth="1.2" />

      {/* ── Kleine Ohren ── */}
      <ellipse cx="24" cy="37" rx="4" ry="5" fill={fur}   stroke={OUTLINE} strokeWidth="1.2" />
      <ellipse cx="40" cy="37" rx="4" ry="5" fill={fur}   stroke={OUTLINE} strokeWidth="1.2" />
      <ellipse cx="24" cy="37" rx="2.2" ry="3" fill={belly} />
      <ellipse cx="40" cy="37" rx="2.2" ry="3" fill={belly} />

      {/* ── Kopf ── */}
      <ellipse cx="32" cy="46" rx="13" ry="12" fill={head} stroke={OUTLINE} strokeWidth="1.5" />

      <PetSnowflakes mood={mood} left={{ x: 3, y: 30 }} right={{ x: 60, y: 30 }} />
      <PetSun mood={mood} />
      <PetSweat isHot={isHot} y={20} />

      {/* ── Schnauze ── */}
      <path d="M27,45 Q25,54 32,58 Q39,54 37,45 Q32,43 27,45 Z" fill={snout} />

      {/* ── Augen ── */}
      {mood === 'neutral' && (blinking ? (
        <>
          <line x1="24" y1="43" x2="29" y2="43" stroke={OUTLINE} strokeWidth="2" strokeLinecap="round" />
          <line x1="35" y1="43" x2="40" y2="43" stroke={OUTLINE} strokeWidth="2" strokeLinecap="round" />
        </>
      ) : (
        <>
          <circle cx="26" cy="43" r="3.5" fill={snout} />
          <circle cx="38" cy="43" r="3.5" fill={snout} />
          <circle cx="26" cy="43" r="2" fill={OUTLINE} />
          <circle cx="38" cy="43" r="2" fill={OUTLINE} />
          <circle cx="25.5" cy="42.5" r="0.7" fill="white" opacity="0.65" />
          <circle cx="37.5" cy="42.5" r="0.7" fill="white" opacity="0.65" />
        </>
      ))}

      <PetSunglasses
        mood={mood}
        frame={{ y: 37, w: 13, h: 11, rx: 4 }}
        leftX={17} rightX={34}
        leftTemple={[17, 43, 9, 46]}
        rightTemple={[47, 43, 55, 46]}
      />

      <PetWorriedBrows
        mood={mood}
        leftBrow={{ x1: 18, y1: 36, x2: 28, y2: 39 }}
        rightBrow={{ x1: 36, y1: 39, x2: 46, y2: 36 }}
      />
      {mood === 'cold' && (
        <>
          <circle cx="26" cy="44" r="3.5" fill={snout} />
          <circle cx="38" cy="44" r="3.5" fill={snout} />
          <circle cx="26" cy="44" r="2" fill={OUTLINE} />
          <circle cx="38" cy="44" r="2" fill={OUTLINE} />
          <circle cx="25.5" cy="43.5" r="0.7" fill="white" opacity="0.65" />
          <circle cx="37.5" cy="43.5" r="0.7" fill="white" opacity="0.65" />
        </>
      )}

      <PetFrozenEyes
        mood={mood}
        leftBox={{ l: 19, t: 37, r: 30, b: 48 }}
        rightBox={{ l: 34, t: 37, r: 45, b: 48 }}
      />

      {/* ── Nase ── */}
      <ellipse cx="32" cy="53" rx="2.5" ry="1.8" fill={OUTLINE} opacity="0.9" />
      <ellipse cx="31.2" cy="52.4" rx="0.9" ry="0.7" fill="white" opacity="0.4" />

      <PetBlush mood={mood} leftCx={18} rightCx={46} cy={52} rx={5} ry={3} />

      {/* ── Schnurrhaare ── */}
      <line x1="27" y1="50" x2="13" y2="47" stroke={OUTLINE} strokeWidth="0.9" strokeLinecap="round" opacity="0.6" />
      <line x1="27" y1="52" x2="13" y2="52" stroke={OUTLINE} strokeWidth="0.9" strokeLinecap="round" opacity="0.6" />
      <line x1="27" y1="54" x2="13" y2="57" stroke={OUTLINE} strokeWidth="0.9" strokeLinecap="round" opacity="0.6" />
      <line x1="37" y1="50" x2="51" y2="47" stroke={OUTLINE} strokeWidth="0.9" strokeLinecap="round" opacity="0.6" />
      <line x1="37" y1="52" x2="51" y2="52" stroke={OUTLINE} strokeWidth="0.9" strokeLinecap="round" opacity="0.6" />
      <line x1="37" y1="54" x2="51" y2="57" stroke={OUTLINE} strokeWidth="0.9" strokeLinecap="round" opacity="0.6" />

      {/* ── Mund ── */}
      {mood === 'neutral' && (
        <path d="M29,55 Q32,57 35,55" stroke={OUTLINE} strokeWidth="1.5" strokeLinecap="round" fill="none" />
      )}
      {mood === 'warm' && (
        <path d="M28,55 Q32,58 36,55" stroke={OUTLINE} strokeWidth="1.5" strokeLinecap="round" fill="none" />
      )}
      {mood === 'cold' && (
        <path d="M29,56 Q32,53 35,56" stroke={OUTLINE} strokeWidth="1.5" strokeLinecap="round" fill="none" />
      )}
      {mood === 'frozen' && (
        <path d="M27,55 Q29,52 32,55 Q35,58 37,55" stroke={OUTLINE} strokeWidth="1.5" strokeLinecap="round" fill="none" />
      )}

      <PetScarf mood={mood} x={12} y={58} width={40} knotCx={51} knotCy={63} />
    </PetSvg>
  );
}
