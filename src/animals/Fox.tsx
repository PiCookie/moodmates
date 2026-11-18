/**
 * Fuchs im Retro-Stil
 *
 * Erkennungsmerkmale: Spitze Ohren mit weißen Innenseiten, buschiger
 * Schwanz mit weißer Spitze (Hauptmerkmal), orange-weißes Fell,
 * charakteristische weiße Gesichtsmaske.
 *
 * Schichten (hinten → vorne):
 *   Schwanz → Füße → Körper → Kopf → Ohren → Gesicht
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

const FUCHS_FUR: Record<Look, string> = {
  frozen:  '#a5b4fc', // eisiges Lila-Orange
  cold:    '#fb923c', // gedämpftes Orange
  neutral: '#ea580c', // klassisches Fuchsorange
  warm:    '#c2410c', // sattes Dunkelorange
};

const FUCHS_WHITE = '#f8fafc'; // Bauch, Gesichtsmaske, Schwanzspitze, Ohrinnen
const TAIL_TIP    = '#f1f5f9'; // leicht getönte weiße Schwanzspitze

export function Fox({ mood, isHot, size = 80, blinking = false, ariaLabel }: AnimalProps) {
  const fur   = FUCHS_FUR[mood];

  return (
    <PetSvg size={size} shivering={mood === 'cold' || mood === 'frozen'} ariaLabel={ariaLabel}>
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

      {/* ── Arme (vor dem Körper) ── */}
      <ellipse cx="17" cy="64" rx="5" ry="7" fill={fur} stroke={OUTLINE} strokeWidth="1.2" transform="rotate(-10 17 64)" />
      <ellipse cx="47" cy="64" rx="5" ry="7" fill={fur} stroke={OUTLINE} strokeWidth="1.2" transform="rotate(10 47 64)" />

      {/* ── Spitze Ohren (hinter dem Kopf) ── */}
      <path d="M20,38 L16,23 L26,32" fill={fur}        stroke={OUTLINE} strokeWidth="1.3" strokeLinejoin="round" />
      <path d="M44,38 L48,23 L38,32" fill={fur}        stroke={OUTLINE} strokeWidth="1.3" strokeLinejoin="round" />
      {/* Weiße Ohrinnen */}
      <path d="M20,36 L17,25 L25,33" fill={FUCHS_WHITE} />
      <path d="M44,36 L47,25 L39,33" fill={FUCHS_WHITE} />

      {/* ── Kopf ── */}
      <ellipse cx="32" cy="42" rx="14" ry="13" fill={fur} stroke={OUTLINE} strokeWidth="1.5" />

      {/* ── Spitze Schnauze (weiß) ── */}
      <path d="M22,40 Q20,52 32,60 Q44,52 42,40 Q32,37 22,40 Z" fill={FUCHS_WHITE} opacity="0.9" />

      {/* ── Nasenrücken von Augen bis Nasenspitze (orange) ── */}
      <path d="M27,38 Q26,48 32,50 Q38,48 37,38 Q32,35 27,38 Z" fill={fur} />


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

      {/* ── Nase (dunkel, prominent, an der Schnauzenspitze) ── */}
      <ellipse cx="32" cy="52" rx="3.5" ry="2.5" fill={OUTLINE} opacity="0.9" />
      <ellipse cx="31" cy="51" rx="1.2" ry="0.9" fill="white" opacity="0.3" />

      <PetBlush mood={mood} leftCx={17} rightCx={47} cy={49} rx={5} ry={3} />

      {/* ── Mund ── */}
      {mood === 'neutral' && (
        <path d="M28,55 Q32,58 36,55" stroke={OUTLINE} strokeWidth="1.5" strokeLinecap="round" fill="none" />
      )}
      {mood === 'warm' && (
        <path d="M27,55 Q32,59 37,55" stroke={OUTLINE} strokeWidth="1.5" strokeLinecap="round" fill="none" />
      )}
      {mood === 'cold' && (
        <path d="M28,57 Q32,53 36,57" stroke={OUTLINE} strokeWidth="1.5" strokeLinecap="round" fill="none" />
      )}
      {mood === 'frozen' && (
        <path d="M26,56 Q29,52 32,56 Q35,60 38,56" stroke={OUTLINE} strokeWidth="1.5" strokeLinecap="round" fill="none" />
      )}

      <PetScarf mood={mood} x={11} y={58} width={40} knotCx={50} knotCy={63} />
    </PetSvg>
  );
}
