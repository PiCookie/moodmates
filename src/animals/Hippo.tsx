/**
 * Nilpferd im Retro-Stil
 *
 * Erkennungsmerkmale: Riesige breite Schnauze (Hauptmerkmal), runder Körper,
 * winzige Augen hoch am Kopf, kleine runde Ohren oben auf dem Kopf.
 * Warm: weit aufgerissenes Maul mit sichtbaren Zähnen.
 *
 * Mood → temperature:
 *   warm    ≥ 22 °C  Sonnenbrille + offenes Maul mit Zähnen + Wangenrouge
 *   neutral  8–22 °C  runde Augen, geschlossenes Maul
 *   cold     0–8 °C  besorgte Augen, Schal, Schneeflocken, Zittern
 *   frozen    < 0 °C  X-Augen, Eiszapfen, Schal, starkes Zittern
 */

import type { Mood, AnimalProps } from '../shared';
import { resolveMood, OUTLINE } from '../shared';
import {
  PetSvg, PetShadow, PetIcicles, PetSun,
  PetSweat, PetSnowflakes, PetScarf, PetBlush,
  PetSunglasses, PetFrozenEyes, PetWorriedBrows,
} from '../petParts';

const NILPFERD_FUR: Record<Mood, string> = {
  frozen:  '#bfdbfe',
  cold:    '#cbd5e1',
  neutral: '#94a3b8',
  warm:    '#7c8fa0',
};

const NILPFERD_MUZZLE: Record<Mood, string> = {
  frozen:  '#dbeafe',
  cold:    '#e2e8f0',
  neutral: '#b4bec8',
  warm:    '#a8b8c4',
};

export function Hippo({ temperature, size = 80, blinking = false, mood: moodOverride, ariaLabel }: AnimalProps) {
  const mood  = resolveMood(temperature, moodOverride);
  const isHot = temperature !== null && temperature >= 28;
  const fur    = NILPFERD_FUR[mood];
  const muzzle = NILPFERD_MUZZLE[mood];

  return (
    <PetSvg size={size} shivering={mood === 'cold' || mood === 'frozen'} ariaLabel={ariaLabel}>
      <PetShadow cx={32} />
      <PetIcicles mood={mood} y={73} />

      {/* ── Körper (rund, ähnlich Elefant) ── */}
      <ellipse cx="32" cy="66" rx="15" ry="13" fill={fur} stroke={OUTLINE} strokeWidth="1.5" />

      {/* ── Arme (vor Körper) ── */}
      <ellipse cx="15" cy="64" rx="5" ry="7" fill={fur} stroke={OUTLINE} strokeWidth="1.5" transform="rotate(-10 15 64)" />
      <ellipse cx="49" cy="64" rx="5" ry="7" fill={fur} stroke={OUTLINE} strokeWidth="1.5" transform="rotate(10 49 64)" />

      {/* ── Füße ── */}
      <ellipse cx="22" cy="77" rx="9"  ry="3.5" fill={fur} stroke={OUTLINE} strokeWidth="1" />
      <ellipse cx="42" cy="77" rx="9"  ry="3.5" fill={fur} stroke={OUTLINE} strokeWidth="1" />

      {/* ── Ohren oben auf dem Kopf (hinter Kopf) ── */}
      <circle cx="19" cy="22" r="6.5" fill={fur}       stroke={OUTLINE} strokeWidth="1.5" />
      <circle cx="45" cy="22" r="6.5" fill={fur}       stroke={OUTLINE} strokeWidth="1.5" />
      <circle cx="19" cy="22" r="3.5" fill="#fca5a5" />
      <circle cx="45" cy="22" r="3.5" fill="#fca5a5" />

      {/* ── Kopf (breite ovale Form) ── */}
      <ellipse cx="32" cy="36" rx="17" ry="15" fill={fur} stroke={OUTLINE} strokeWidth="1.5" />

      {/* ── Riesige Schnauze (Hauptmerkmal) ── */}
      <ellipse cx="32" cy="52" rx="14" ry="9" fill={muzzle} stroke={OUTLINE} strokeWidth="1.5" />

      <PetSnowflakes mood={mood} left={{ x: 4, y: 16 }} right={{ x: 61, y: 16 }} />
      <PetSun mood={mood} />
      <PetSweat isHot={isHot} y={12} />

      {/* ── Augen (klein, hoch oben) ── */}
      {mood === 'neutral' && (blinking ? (
        <>
          <line x1="21" y1="29" x2="27" y2="29" stroke={OUTLINE} strokeWidth="2.5" strokeLinecap="round" />
          <line x1="37" y1="29" x2="43" y2="29" stroke={OUTLINE} strokeWidth="2.5" strokeLinecap="round" />
        </>
      ) : (
        <>
          <circle cx="24" cy="29" r="3" fill={OUTLINE} />
          <circle cx="40" cy="29" r="3" fill={OUTLINE} />
          <circle cx="22.9" cy="27.9" r="1.1" fill="white" opacity="0.65" />
          <circle cx="38.9" cy="27.9" r="1.1" fill="white" opacity="0.65" />
        </>
      ))}

      <PetSunglasses
        mood={mood}
        frame={{ y: 23, w: 12, h: 11, rx: 4 }}
        leftX={16} rightX={34}
        leftTemple={[16, 28, 8, 31]}
        rightTemple={[46, 28, 54, 31]}
      />

      <PetWorriedBrows
        mood={mood}
        leftBrow={{ x1: 17, y1: 21, x2: 28, y2: 24 }}
        rightBrow={{ x1: 36, y1: 24, x2: 47, y2: 21 }}
      />
      {mood === 'cold' && (
        <>
          <circle cx="24" cy="30" r="3" fill={OUTLINE} />
          <circle cx="40" cy="30" r="3" fill={OUTLINE} />
          <circle cx="22.9" cy="28.9" r="1.1" fill="white" opacity="0.65" />
          <circle cx="38.9" cy="28.9" r="1.1" fill="white" opacity="0.65" />
        </>
      )}

      <PetFrozenEyes
        mood={mood}
        leftBox={{ l: 20, t: 24, r: 28, b: 34 }}
        rightBox={{ l: 36, t: 24, r: 44, b: 34 }}
      />

      {/* ── Nasenlöcher oben auf der Schnauze ── */}
      <ellipse cx="27" cy="48" rx="2.5" ry="1.5" fill={OUTLINE} opacity="0.4" />
      <ellipse cx="37" cy="48" rx="2.5" ry="1.5" fill={OUTLINE} opacity="0.4" />

      <PetBlush mood={mood} leftCx={14} rightCx={50} cy={44} rx={5} ry={3} />

      {/* ── Mund ── */}
      {mood === 'neutral' && (
        <path d="M26,54 Q32,58 38,54" stroke={OUTLINE} strokeWidth="1.5" strokeLinecap="round" fill="none" />
      )}
      {mood === 'warm' && (
        <>
          {/* Weit aufgerissenes Maul */}
          <path d="M22,54 Q32,64 42,54" stroke={OUTLINE} strokeWidth="1.5" strokeLinecap="round" fill="none" />
          {/* Zähne */}
          <rect x="25" y="54" width="7" height="5" rx="2" fill="white" />
          <rect x="34" y="54" width="7" height="5" rx="2" fill="white" />
          <rect x="25" y="54" width="7" height="5" rx="2" stroke={OUTLINE} strokeWidth="0.8" fill="none" />
          <rect x="34" y="54" width="7" height="5" rx="2" stroke={OUTLINE} strokeWidth="0.8" fill="none" />
        </>
      )}
      {mood === 'cold' && (
        <path d="M26,56 Q32,52 38,56" stroke={OUTLINE} strokeWidth="1.5" strokeLinecap="round" fill="none" />
      )}
      {mood === 'frozen' && (
        <path d="M24,55 Q27,51 30,55 Q33,51 36,55 Q39,51 42,55" stroke={OUTLINE} strokeWidth="1.5" strokeLinecap="round" fill="none" />
      )}

      <PetScarf mood={mood} x={11} y={58} width={42} knotCx={52} knotCy={63} />
    </PetSvg>
  );
}
