/**
 * Lama/Alpaka im Retro-Stil
 *
 * Erkennungsmerkmale: Langer Hals (Hauptmerkmal), flauschiger Körper,
 * lange schmale Ohren, hochnäsiger Ausdruck (Schnauze leicht nach oben gedreht).
 *
 * Schichten (hinten → vorne):
 *   Füße → Körper → Hals → Ohren → Kopf → Schnauze → Gesicht
 *
 * Look (the ranges below are only an example, the app decides):
 *   warm    ≥ 22 °C  Sonnenbrille + Wangenrouge
 *   neutral  8–22 °C  runde Augen, entspanntes Lächeln
 *   cold     0–8 °C  besorgte Augen, Schal, Schneeflocken, Zittern
 *   frozen    < 0 °C  X-Augen, Eiszapfen, Schal, starkes Zittern
 */

import type { Look, AnimalProps } from '../shared';
import { OUTLINE } from '../shared';
import {
  PetSvg, PetShadow, PetIcicles, PetSun,
  PetSweat, PetSnowflakes, PetScarf, PetBlush,
  PetSunglasses, PetFrozenEyes, PetWorriedBrows,
} from '../petParts';

const LAMA_FUR: Record<Look, string> = {
  frozen:  '#c7d2fe', // eisblau
  cold:    '#e0f2fe', // hellblau-weiß
  neutral: '#f5f0e8', // cremeweiß
  warm:    '#fef3c7', // warmes Cremegelb
};

const LAMA_BELLY: Record<Look, string> = {
  frozen:  '#dbeafe',
  cold:    '#f0f9ff',
  neutral: '#fffbeb',
  warm:    '#fef9f0',
};

const LAMA_EAR_INNER = '#fecdd3';

export function Llama({ mood, isHot, size = 80, blinking = false, ariaLabel }: AnimalProps) {
  const fur   = LAMA_FUR[mood];
  const belly = LAMA_BELLY[mood];

  return (
    <PetSvg size={size} shivering={mood === 'cold' || mood === 'frozen'} ariaLabel={ariaLabel}>
      <PetShadow cx={32} />
      <PetIcicles mood={mood} y={75} />

      {/* ── Füße ── */}
      <ellipse cx="22" cy="74" rx="8"  ry="3.5" fill={fur} stroke={OUTLINE} strokeWidth="1" />
      <ellipse cx="42" cy="74" rx="8"  ry="3.5" fill={fur} stroke={OUTLINE} strokeWidth="1" />

      {/* ── Körper — flauschig, leicht aufgebläht ── */}
      <ellipse cx="32" cy="62" rx="14" ry="11"  fill={fur}   stroke={OUTLINE} strokeWidth="1.5" />
      <ellipse cx="32" cy="64" rx="9"  ry="7.5" fill={belly} />

      {/* ── Langer Hals — offener Pfad ohne untere Kante, liegt vor dem Körper ── */}
      <path d="M25,61 L25,35 Q25,33 27,33 L37,33 Q39,33 39,35 L39,61" fill={fur} stroke={OUTLINE} strokeWidth="1.5" />

      {/* ── Lange schmale Ohren (hinter Kopf) ── */}
      <ellipse cx="24" cy="14" rx="3.5" ry="9"  fill={fur}          stroke={OUTLINE}    strokeWidth="1.5" transform="rotate(-8 24 14)" />
      <ellipse cx="40" cy="14" rx="3.5" ry="9"  fill={fur}          stroke={OUTLINE}    strokeWidth="1.5" transform="rotate(8 40 14)"  />
      <ellipse cx="24" cy="14" rx="2"   ry="5.5" fill={LAMA_EAR_INNER}                  transform="rotate(-8 24 14)" />
      <ellipse cx="40" cy="14" rx="2"   ry="5.5" fill={LAMA_EAR_INNER}                  transform="rotate(8 40 14)"  />

      {/* ── Kopf (leicht länglich für das Lama-Profil) ── */}
      <ellipse cx="32" cy="28" rx="12" ry="11"  fill={fur}   stroke={OUTLINE} strokeWidth="1.5" />

      {/* ── Hochnäsige Schnauze (leicht nach oben gedreht — Hauptcharakter) ── */}
      <ellipse cx="32" cy="36" rx="5"  ry="4.5" fill={belly} stroke={OUTLINE} strokeWidth="1.2" transform="rotate(-12 32 36)" />
      {/* Nasenlöcher am oberen Ende der Schnauze → hochnäsig */}
      <circle cx="30" cy="33.5" r="1"  fill={OUTLINE} opacity="0.55" />
      <circle cx="34" cy="32.5" r="1"  fill={OUTLINE} opacity="0.55" />

      <PetSnowflakes mood={mood} left={{ x: 4, y: 22 }} right={{ x: 59, y: 22 }} />
      <PetSun mood={mood} />
      <PetSweat isHot={isHot} y={13} />

      {/* ── Augen — hoch am Kopf, leicht hochnäsige Stellung ── */}
      {mood === 'neutral' && (blinking ? (
        <>
          <line x1="22" y1="24" x2="29" y2="24" stroke={OUTLINE} strokeWidth="2.5" strokeLinecap="round" />
          <line x1="35" y1="24" x2="42" y2="24" stroke={OUTLINE} strokeWidth="2.5" strokeLinecap="round" />
        </>
      ) : (
        <>
          <circle cx="25.5" cy="24" r="3.5" fill={OUTLINE} />
          <circle cx="38.5" cy="24" r="3.5" fill={OUTLINE} />
          <circle cx="24.3" cy="22.8" r="1.2" fill="white" opacity="0.65" />
          <circle cx="37.3" cy="22.8" r="1.2" fill="white" opacity="0.65" />
        </>
      ))}

      <PetSunglasses
        mood={mood}
        frame={{ y: 18, w: 13, h: 11, rx: 4 }}
        leftX={16} rightX={33}
        leftTemple={[16, 24, 8, 27]}
        rightTemple={[46, 24, 54, 27]}
      />

      <PetWorriedBrows
        mood={mood}
        leftBrow={{ x1: 18, y1: 17, x2: 29, y2: 20 }}
        rightBrow={{ x1: 35, y1: 20, x2: 46, y2: 17 }}
      />
      {mood === 'cold' && (
        <>
          <circle cx="25.5" cy="25" r="3.5" fill={OUTLINE} />
          <circle cx="38.5" cy="25" r="3.5" fill={OUTLINE} />
          <circle cx="24.3" cy="23.8" r="1.2" fill="white" opacity="0.65" />
          <circle cx="37.3" cy="23.8" r="1.2" fill="white" opacity="0.65" />
        </>
      )}

      <PetFrozenEyes
        mood={mood}
        leftBox={{ l: 20, t: 19, r: 31, b: 30 }}
        rightBox={{ l: 33, t: 19, r: 44, b: 30 }}
      />

      <PetBlush mood={mood} leftCx={16} rightCx={48} cy={30} rx={5} ry={3} />

      {/* ── Mund ── */}
      {mood === 'neutral' && (
        <path d="M29,40 Q32,44 35,40" stroke={OUTLINE} strokeWidth="1.5" strokeLinecap="round" fill="none" />
      )}
      {mood === 'warm' && (
        <path d="M28,40 Q32,45 36,40" stroke={OUTLINE} strokeWidth="1.5" strokeLinecap="round" fill="none" />
      )}
      {mood === 'cold' && (
        <path d="M29,42 Q32,38 35,42" stroke={OUTLINE} strokeWidth="1.5" strokeLinecap="round" fill="none" />
      )}
      {mood === 'frozen' && (
        <path d="M27,41 Q30,37 32,41 Q34,37 37,41" stroke={OUTLINE} strokeWidth="1.5" strokeLinecap="round" fill="none" />
      )}

      {/* ── Schal am Hals ── */}
      <PetScarf mood={mood} x={16} y={51} width={32} knotCx={47} knotCy={56} small />
    </PetSvg>
  );
}
