/**
 * Gen1-Style Fuchs Pet
 *
 * Erkennungsmerkmale: Spitze Ohren mit weißen Innenseiten, buschiger
 * Schwanz mit weißer Spitze (Hauptmerkmal), orange-weißes Fell,
 * charakteristische weiße Gesichtsmaske.
 *
 * Schichten (hinten → vorne):
 *   Schwanz → Füße → Körper → Kopf → Ohren → Gesicht
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

const FUCHS_FUR: Record<Mood, string> = {
  frozen:  '#a5b4fc', // eisiges Lila-Orange
  cold:    '#fb923c', // gedämpftes Orange
  neutral: '#ea580c', // klassisches Fuchsorange
  warm:    '#c2410c', // sattes Dunkelorange
};

const FUCHS_WHITE = '#f8fafc'; // Bauch, Gesichtsmaske, Schwanzspitze, Ohrinnen
const TAIL_TIP    = '#f1f5f9'; // leicht getönte weiße Schwanzspitze

export function PetFuchs({ temperature, size = 80, blinking = false }: PetProps) {
  const mood  = getMood(temperature);
  const isHot = temperature !== null && temperature >= 28;
  const fur   = FUCHS_FUR[mood];

  return (
    <PetSvg size={size} shivering={mood === 'cold' || mood === 'frozen'} ariaLabel={`Fuchs-Pet: ${mood}`}>
      <PetShadow cx={32} />
      <PetIcicles mood={mood} y={77} />

      {/* ── Buschiger Schwanz (hinter dem Körper, nach rechts) ── */}
      <ellipse cx="52" cy="65" rx="10" ry="7" fill={fur} stroke={OUTLINE} strokeWidth="1.2" transform="rotate(-20 52 65)" />
      {/* Weiße Schwanzspitze */}
      <ellipse cx="58" cy="60" rx="5" ry="4" fill={TAIL_TIP} stroke={OUTLINE} strokeWidth="1" transform="rotate(-20 58 60)" />

      {/* ── Füße ── */}
      <ellipse cx="23" cy="75" rx="8" ry="3.5" fill={fur} stroke={OUTLINE} strokeWidth="1" />
      <ellipse cx="40" cy="75" rx="8" ry="3.5" fill={fur} stroke={OUTLINE} strokeWidth="1" />

      {/* ── Körper ── */}
      <ellipse cx="32" cy="63" rx="15" ry="12" fill={fur}        stroke={OUTLINE} strokeWidth="1.5" />
      <ellipse cx="32" cy="66" rx="9"  ry="7.5" fill={FUCHS_WHITE} />

      {/* ── Spitze Ohren (vor dem Kopf) ── */}
      <path d="M20,33 L16,18 L26,27" fill={fur}        stroke={OUTLINE} strokeWidth="1.3" strokeLinejoin="round" />
      <path d="M44,33 L48,18 L38,27" fill={fur}        stroke={OUTLINE} strokeWidth="1.3" strokeLinejoin="round" />
      {/* Weiße Ohrinnen */}
      <path d="M20,31 L17,20 L25,28" fill={FUCHS_WHITE} />
      <path d="M44,31 L47,20 L39,28" fill={FUCHS_WHITE} />

      {/* ── Kopf ── */}
      <ellipse cx="32" cy="42" rx="14" ry="13" fill={fur} stroke={OUTLINE} strokeWidth="1.5" />

      {/* ── Weiße Gesichtsmaske (Hauptcharakter) ── */}
      <ellipse cx="32" cy="46" rx="9" ry="8" fill={FUCHS_WHITE} opacity="0.85" />

      <PetSnowflakes mood={mood} left={{ x: 3, y: 28 }} right={{ x: 57, y: 28 }} />
      <PetSun mood={mood} />
      <PetSweat isHot={isHot} y={16} />

      {/* ── Augen ── */}
      {mood === 'neutral' && (blinking ? (
        <>
          <line x1="23" y1="39" x2="29" y2="39" stroke={OUTLINE} strokeWidth="2.5" strokeLinecap="round" />
          <line x1="35" y1="39" x2="41" y2="39" stroke={OUTLINE} strokeWidth="2.5" strokeLinecap="round" />
        </>
      ) : (
        <>
          <circle cx="26" cy="39" r="3.5" fill={OUTLINE} />
          <circle cx="38" cy="39" r="3.5" fill={OUTLINE} />
          <circle cx="24.8" cy="37.8" r="1.2" fill="white" opacity="0.65" />
          <circle cx="36.8" cy="37.8" r="1.2" fill="white" opacity="0.65" />
        </>
      ))}

      <PetSunglasses
        mood={mood}
        frame={{ y: 33, w: 13, h: 11, rx: 4 }}
        leftX={17} rightX={34}
        leftTemple={[17, 39, 9, 42]}
        rightTemple={[47, 39, 55, 42]}
      />

      <PetWorriedBrows
        mood={mood}
        leftBrow={{ x1: 19, y1: 31, x2: 30, y2: 35 }}
        rightBrow={{ x1: 34, y1: 35, x2: 45, y2: 31 }}
      />
      {mood === 'cold' && (
        <>
          <circle cx="26" cy="40" r="3.5" fill={OUTLINE} />
          <circle cx="38" cy="40" r="3.5" fill={OUTLINE} />
          <circle cx="24.8" cy="38.8" r="1.2" fill="white" opacity="0.65" />
          <circle cx="36.8" cy="38.8" r="1.2" fill="white" opacity="0.65" />
        </>
      )}

      <PetFrozenEyes
        mood={mood}
        leftBox={{ l: 20, t: 33, r: 32, b: 45 }}
        rightBox={{ l: 32, t: 33, r: 44, b: 45 }}
      />

      {/* ── Nase (dunkel, fuchstypisch) ── */}
      <ellipse cx="32" cy="47" rx="2.5" ry="1.8" fill={OUTLINE} opacity="0.8" />
      <ellipse cx="31.2" cy="46.3" rx="0.9" ry="0.7" fill="white" opacity="0.3" />

      <PetBlush mood={mood} leftCx={17} rightCx={47} cy={49} rx={5} ry={3} />

      {/* ── Mund ── */}
      {mood === 'neutral' && (
        <path d="M27,50 Q32,55 37,50" stroke={OUTLINE} strokeWidth="1.5" strokeLinecap="round" fill="none" />
      )}
      {mood === 'warm' && (
        <path d="M26,50 Q32,56 38,50" stroke={OUTLINE} strokeWidth="1.5" strokeLinecap="round" fill="none" />
      )}
      {mood === 'cold' && (
        <path d="M28,52 Q32,48 36,52" stroke={OUTLINE} strokeWidth="1.5" strokeLinecap="round" fill="none" />
      )}
      {mood === 'frozen' && (
        <path d="M26,51 Q29,47 32,51 Q35,55 38,51" stroke={OUTLINE} strokeWidth="1.5" strokeLinecap="round" fill="none" />
      )}

      <PetScarf mood={mood} x={11} y={54} width={40} knotCx={50} knotCy={59} />
    </PetSvg>
  );
}
