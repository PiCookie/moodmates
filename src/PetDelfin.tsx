/**
 * Gen1-Style Delfin Pet
 *
 * Erkennungsmerkmale: Kopf und Körper als eine organische Form (kein Hals),
 * schmales Rostrum zeigt nach vorne/unten, charakteristisches Dauerlächeln,
 * symmetrische Rückenflosse oben.
 *
 * Schichten (hinten → vorne):
 *   Schwanzflosse → Brustflossen → Rückenflosse → Körper/Kopf (ein Pfad)
 *   → Bauch → Rostrum → Gesicht
 *
 * Mood → temperature:
 *   warm    ≥ 22 °C  Sonnenbrille + Wangenrouge + Zunge
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

const DELFIN_FUR: Record<Mood, string> = {
  frozen:  '#bfdbfe',
  cold:    '#93c5fd',
  neutral: '#64748b',
  warm:    '#475569',
};

const DELFIN_BELLY: Record<Mood, string> = {
  frozen:  '#f0f9ff',
  cold:    '#e0f2fe',
  neutral: '#e2e8f0',
  warm:    '#cbd5e1',
};

export function PetDelfin({ temperature, size = 80, blinking = false }: PetProps) {
  const mood  = getMood(temperature);
  const isHot = temperature !== null && temperature >= 28;
  const fur   = DELFIN_FUR[mood];
  const belly = DELFIN_BELLY[mood];

  return (
    <PetSvg size={size} shivering={mood === 'cold' || mood === 'frozen'} ariaLabel={`Delfin-Pet: ${mood}`}>
      <PetShadow cx={32} />
      <PetIcicles mood={mood} y={77} />

      {/* ── Schwanzflosse (V-Form) ── */}
      <path d="M20,62 Q26,74 32,64 Q38,74 44,62" fill={fur} stroke={OUTLINE} strokeWidth="1.5" strokeLinejoin="round" />

      {/* ── Brustflossen ── */}
      <path d="M20,40 Q9,35 8,46 Q12,52 20,49"  fill={fur} stroke={OUTLINE} strokeWidth="1.2" strokeLinejoin="round" />
      <path d="M44,40 Q55,35 56,46 Q52,52 44,49" fill={fur} stroke={OUTLINE} strokeWidth="1.2" strokeLinejoin="round" />

      {/* ── Rückenflosse (zentriert, symmetrisch) ── */}
      <path d="M26,20 Q24,7 32,5 Q40,7 38,20" fill={fur} stroke={OUTLINE} strokeWidth="1.5" strokeLinejoin="round" />

      {/* ── Körper + Kopf als ein organischer Pfad (kein Hals) ── */}
      <path
        d="M32,15 Q20,14 19,28 Q18,40 22,52 Q26,62 32,64 Q38,62 42,52 Q46,40 45,28 Q44,14 32,15 Z"
        fill={fur} stroke={OUTLINE} strokeWidth="1.5"
      />

      {/* ── Bauch (heller Längsstreifen) ── */}
      <ellipse cx="32" cy="44" rx="9" ry="22" fill={belly} />

      {/* ── Rostrum (zentriert, zeigt nach vorne/unten) ── */}
      <path d="M24,33 Q32,50 40,33 Q36,30 32,29 Q28,30 24,33 Z"
        fill={fur} stroke={OUTLINE} strokeWidth="1.2" strokeLinejoin="round" />
      <path d="M25,34 Q32,48 39,34 Q35,31 32,30 Q29,31 25,34 Z" fill={belly} />

      <PetSnowflakes mood={mood} left={{ x: 2, y: 14 }} right={{ x: 52, y: 14 }} />
      <PetSun mood={mood} />
      <PetSweat isHot={isHot} y={6} />

      {/* ── Augen (seitlich im Kopfbereich) ── */}
      {mood === 'neutral' && (blinking ? (
        <>
          <line x1="19" y1="25" x2="28" y2="25" stroke={OUTLINE} strokeWidth="2.2" strokeLinecap="round" />
          <line x1="36" y1="25" x2="45" y2="25" stroke={OUTLINE} strokeWidth="2.2" strokeLinecap="round" />
        </>
      ) : (
        <>
          <circle cx="23" cy="25" r="4" fill={OUTLINE} />
          <circle cx="41" cy="25" r="4" fill={OUTLINE} />
          <circle cx="21.5" cy="23.5" r="1.4" fill="white" opacity="0.7" />
          <circle cx="39.5" cy="23.5" r="1.4" fill="white" opacity="0.7" />
        </>
      ))}

      <PetSunglasses
        mood={mood}
        frame={{ y: 18, w: 12, h: 12, rx: 4 }}
        leftX={14} rightX={31}
        leftTemple={[14, 25, 6, 28]}
        rightTemple={[43, 25, 51, 28]}
      />

      <PetWorriedBrows
        mood={mood}
        leftBrow={{ x1: 16, y1: 18, x2: 28, y2: 22 }}
        rightBrow={{ x1: 34, y1: 22, x2: 46, y2: 18 }}
      />
      {mood === 'cold' && (
        <>
          <circle cx="23" cy="26" r="4" fill={OUTLINE} />
          <circle cx="41" cy="26" r="4" fill={OUTLINE} />
          <circle cx="21.5" cy="24.5" r="1.4" fill="white" opacity="0.7" />
          <circle cx="39.5" cy="24.5" r="1.4" fill="white" opacity="0.7" />
        </>
      )}

      <PetFrozenEyes
        mood={mood}
        leftBox={{ l: 15, t: 18, r: 31, b: 34 }}
        rightBox={{ l: 33, t: 18, r: 49, b: 34 }}
      />

      <PetBlush mood={mood} leftCx={13} rightCx={51} cy={33} rx={4} ry={3} />

      {/* ── Delfin-Lächeln auf dem Rostrum ── */}
      {mood === 'neutral' && (
        <path d="M26,36 Q32,42 38,36" stroke={OUTLINE} strokeWidth="1.5" strokeLinecap="round" fill="none" />
      )}
      {mood === 'warm' && (
        <>
          <path d="M25,36 Q32,43 39,36" stroke={OUTLINE} strokeWidth="1.5" strokeLinecap="round" fill="none" />
          <ellipse cx="32" cy="42" rx="3" ry="2" fill="#f87171" />
        </>
      )}
      {mood === 'cold' && (
        <path d="M27,34 Q32,31 37,34" stroke={OUTLINE} strokeWidth="1.5" strokeLinecap="round" fill="none" />
      )}
      {mood === 'frozen' && (
        <path d="M25,35 Q29,31 32,35 Q35,39 39,35" stroke={OUTLINE} strokeWidth="1.5" strokeLinecap="round" fill="none" />
      )}

      {/* ── Nasenspitze ── */}
      <circle cx="32" cy="47" r="1.5" fill={OUTLINE} opacity="0.5" />

      <PetScarf mood={mood} x={18} y={38} width={28} knotCx={45} knotCy={43} />
    </PetSvg>
  );
}
