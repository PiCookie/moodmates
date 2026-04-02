/**
 * Gen1-Style Elefant Pet
 *
 * Erkennungsmerkmale: Langer Rüssel (Hauptmerkmal), große Fächerohren,
 * Stoßzähne (neutral/warm), mood-tinted Grautöne.
 *
 * Mood → temperature:
 *   warm    ≥ 22 °C  Sonnenbrille + Wangenrouge + Stoßzähne
 *   neutral  8–22 °C  runde Augen, Stoßzähne, entspanntes Lächeln
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

const ELEFANT_FUR: Record<Mood, string> = {
  frozen:  '#bfdbfe',
  cold:    '#cbd5e1',
  neutral: '#94a3b8',
  warm:    '#a8a29e',
};

const ELEFANT_EAR_INNER: Record<Mood, string> = {
  frozen:  '#dbeafe',
  cold:    '#e2e8f0',
  neutral: '#b4bec8',
  warm:    '#c4b5a5',
};

export function PetElefant({ temperature, size = 80, blinking = false }: PetProps) {
  const mood  = getMood(temperature);
  const isHot = temperature !== null && temperature >= 28;
  const fur   = ELEFANT_FUR[mood];
  const earInner = ELEFANT_EAR_INNER[mood];

  return (
    <PetSvg size={size} shivering={mood === 'cold' || mood === 'frozen'} ariaLabel={`Elefant-Pet: ${mood}`}>
      <PetShadow cx={32} />
      <PetIcicles mood={mood} y={74} />

      {/* ── Schwanz ── */}
      <path d="M44,62 Q53,56 51,48" stroke={fur} strokeWidth="3" strokeLinecap="round" fill="none" />

      {/* ── Arme/Beine ── */}
      <ellipse cx="14" cy="63" rx="5" ry="7" fill={fur} stroke={OUTLINE} strokeWidth="1.5" transform="rotate(-8 14 63)" />
      <ellipse cx="50" cy="63" rx="5" ry="7" fill={fur} stroke={OUTLINE} strokeWidth="1.5" transform="rotate(8 50 63)" />

      {/* ── Körper — ry=13 damit Oberkante (y=50) bündig mit Kopfunterkante liegt ── */}
      <ellipse cx="32" cy="63" rx="14" ry="13" fill={fur} stroke={OUTLINE} strokeWidth="1.5" />

      {/* ── Füße ── */}
      <ellipse cx="22" cy="77" rx="9"  ry="3.5" fill={fur} stroke={OUTLINE} strokeWidth="1" />
      <ellipse cx="42" cy="77" rx="9"  ry="3.5" fill={fur} stroke={OUTLINE} strokeWidth="1" />

      {/* ── Ohren (hinter Kopf, großes Fächer) ── */}
      <ellipse cx="12" cy="34" rx="11" ry="14" fill={fur}      stroke={OUTLINE} strokeWidth="1.5" />
      <ellipse cx="54" cy="34" rx="11" ry="14" fill={fur}      stroke={OUTLINE} strokeWidth="1.5" />
      <ellipse cx="12" cy="34" rx="7"  ry="9"  fill={earInner} />
      <ellipse cx="54" cy="34" rx="7"  ry="9"  fill={earInner} />

      {/* ── Kopf (überdeckt Ohransatz) ── */}
      <circle cx="32" cy="35" r="15" fill={fur} stroke={OUTLINE} strokeWidth="1.5" />

      {/* ── Schal ── */}
      <PetScarf mood={mood} x={11} y={50} width={42} knotCx={52} knotCy={55} />

      {/* ── Rüssel (Hauptmerkmal) — nach Kopf + Schal, hängt weit nach links ── */}
      {/* Startpunkt (32,45) liegt im Kopfkreis, starke Links-Kurve verhindert Halswirkung */}
      <path d="M32,45 Q18,57 20,68" stroke={fur}     strokeWidth="9" strokeLinecap="round" fill="none" />
      <path d="M32,45 Q18,57 20,68" stroke={OUTLINE} strokeWidth="1.5" strokeLinecap="round" fill="none" />

      <PetSnowflakes mood={mood} left={{ x: 4, y: 18 }} right={{ x: 61, y: 18 }} />
      <PetSun mood={mood} />
      <PetSweat isHot={isHot} y={13} />

      {/* ── Stoßzähne (neutral + warm) ── */}
      {(mood === 'neutral' || mood === 'warm') && (
        <>
          <path d="M25,47 Q18,53 17,57" stroke="#f5efe0" strokeWidth="3.5" strokeLinecap="round" fill="none" />
          <path d="M39,47 Q46,53 47,57" stroke="#f5efe0" strokeWidth="3.5" strokeLinecap="round" fill="none" />
        </>
      )}

      {/* ── Augen ── */}
      {mood === 'neutral' && (blinking ? (
        <>
          <line x1="23" y1="30" x2="30" y2="30" stroke={OUTLINE} strokeWidth="2.5" strokeLinecap="round" />
          <line x1="34" y1="30" x2="41" y2="30" stroke={OUTLINE} strokeWidth="2.5" strokeLinecap="round" />
        </>
      ) : (
        <>
          <circle cx="26.5" cy="30" r="3.5" fill={OUTLINE} />
          <circle cx="37.5" cy="30" r="3.5" fill={OUTLINE} />
          <circle cx="25.3" cy="28.8" r="1.2" fill="white" opacity="0.65" />
          <circle cx="36.3" cy="28.8" r="1.2" fill="white" opacity="0.65" />
        </>
      ))}

      <PetSunglasses
        mood={mood}
        frame={{ y: 24, w: 13, h: 12, rx: 4 }}
        leftX={18} rightX={33}
        leftTemple={[18, 30, 10, 33]}
        rightTemple={[46, 30, 55, 33]}
      />

      <PetWorriedBrows
        mood={mood}
        leftBrow={{ x1: 20, y1: 23, x2: 31, y2: 26 }}
        rightBrow={{ x1: 33, y1: 26, x2: 44, y2: 23 }}
      />
      {mood === 'cold' && (
        <>
          <circle cx="26.5" cy="31" r="3.5" fill={OUTLINE} />
          <circle cx="37.5" cy="31" r="3.5" fill={OUTLINE} />
          <circle cx="25.3" cy="29.8" r="1.2" fill="white" opacity="0.65" />
          <circle cx="36.3" cy="29.8" r="1.2" fill="white" opacity="0.65" />
        </>
      )}

      <PetFrozenEyes
        mood={mood}
        leftBox={{ l: 22, t: 25, r: 31, b: 35 }}
        rightBox={{ l: 33, t: 25, r: 42, b: 35 }}
      />

      {/* ── Nüstern (auf dem Rüsselansatz sichtbar) ── */}
      <ellipse cx="29" cy="44" rx="2" ry="1.5" fill={OUTLINE} opacity="0.45" />
      <ellipse cx="35" cy="44" rx="2" ry="1.5" fill={OUTLINE} opacity="0.45" />

      <PetBlush mood={mood} leftCx={18} rightCx={46} cy={42} rx={5} ry={3} />
    </PetSvg>
  );
}
