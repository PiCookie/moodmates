/**
 * Gen1-Style T-Rex Pet
 *
 * Erkennungsmerkmale: 3 Kopfstacheln, WINZIGE Ärmchen (der Gag), großer Kopf,
 * dicke Beine — klassische T-Rex-Proportionen im Chibi-Format.
 *
 * Mood → temperature:
 *   warm    ≥ 22 °C  Sonnenbrille + Wangenrouge + Feueratem
 *   neutral  8–22 °C  Zahnreihe sichtbar, runde Augen
 *   cold     0–8 °C  besorgte Brauen, Schal, Schneeflocken, Zittern
 *   frozen    < 0 °C  X-Augen, Eisatem, Eiszapfen, Schal, starkes Zittern
 */

import type { Mood, PetProps } from './pet.shared';
import { getMood, OUTLINE } from './pet.shared';
import {
  PetSvg, PetShadow, PetIcicles, PetSun,
  PetSweat, PetSnowflakes, PetScarf, PetBlush,
  PetSunglasses, PetFrozenEyes, PetWorriedBrows,
} from './BasePet';

const BODY: Record<Mood, string> = {
  frozen:  '#bfdbfe',
  cold:    '#bbf7d0',
  neutral: '#4ade80',
  warm:    '#fbbf24',
};

export function PetTRex({ temperature, size = 80, blinking = false }: PetProps) {
  const mood  = getMood(temperature);
  const isHot = temperature !== null && temperature >= 28;
  const body  = BODY[mood];

  return (
    <PetSvg size={size} shivering={mood === 'cold' || mood === 'frozen'} ariaLabel={`T-Rex-Pet: ${mood}`}>
      <PetShadow cx={32} />
      <PetIcicles mood={mood} y={74} />

      {/* ── Schwanz ── */}
      <path d="M44,66 Q60,60 56,46" stroke={body} strokeWidth="3.5" strokeLinecap="round" fill="none" />

      {/* ── 3 Kopfstacheln (Basen unter Kopf versteckt) ── */}
      <polygon points="16,24 23,24 19,8"  fill={body} stroke={OUTLINE} strokeWidth="1.5" strokeLinejoin="round" />
      <polygon points="29,21 39,21 34,4"  fill={body} stroke={OUTLINE} strokeWidth="1.5" strokeLinejoin="round" />
      <polygon points="43,24 50,24 47,8"  fill={body} stroke={OUTLINE} strokeWidth="1.5" strokeLinejoin="round" />

      {/* ── Großer Kopf ── */}
      <circle cx="33" cy="37" r="22" fill={body} stroke={OUTLINE} strokeWidth="1.5" />

      <PetSnowflakes mood={mood} left={{ x: 5, y: 20 }} right={{ x: 58, y: 18 }} />
      <PetSun mood={mood} />
      <PetSweat isHot={isHot} y={14} />

      {/* ── Augen ── */}
      {mood === 'neutral' && (blinking ? (
        <>
          <line x1="21" y1="33" x2="29" y2="33" stroke={OUTLINE} strokeWidth="2.5" strokeLinecap="round" />
          <line x1="37" y1="33" x2="45" y2="33" stroke={OUTLINE} strokeWidth="2.5" strokeLinecap="round" />
        </>
      ) : (
        <>
          <circle cx="25" cy="33" r="4" fill={OUTLINE} />
          <circle cx="41" cy="33" r="4" fill={OUTLINE} />
          <circle cx="23.5" cy="31.5" r="1.3" fill="white" opacity="0.7" />
          <circle cx="39.5" cy="31.5" r="1.3" fill="white" opacity="0.7" />
        </>
      ))}

      <PetSunglasses
        mood={mood}
        frame={{ y: 26, w: 14, h: 12, rx: 4 }}
        leftX={16} rightX={36}
        leftTemple={[16, 32, 8, 36]}
        rightTemple={[50, 32, 58, 36]}
      />
      <PetWorriedBrows
        mood={mood}
        leftBrow={{ x1: 18, y1: 24, x2: 30, y2: 28 }}
        rightBrow={{ x1: 36, y1: 28, x2: 48, y2: 24 }}
      />
      {mood === 'cold' && (
        <>
          <circle cx="25" cy="34" r="4" fill={OUTLINE} />
          <circle cx="41" cy="34" r="4" fill={OUTLINE} />
          <circle cx="23.5" cy="32.5" r="1.3" fill="white" opacity="0.65" />
          <circle cx="39.5" cy="32.5" r="1.3" fill="white" opacity="0.65" />
        </>
      )}
      <PetFrozenEyes
        mood={mood}
        leftBox={{ l: 18, t: 26, r: 32, b: 40 }}
        rightBox={{ l: 34, t: 26, r: 48, b: 40 }}
      />

      {/* ── Nase ── */}
      <circle cx="33" cy="42" r="2.5" fill={OUTLINE} opacity="0.45" />

      <PetBlush mood={mood} leftCx={14} rightCx={52} cy={48} />

      {/* ── Maul mit Zähnen ── */}
      {(mood === 'neutral' || mood === 'warm') && (
        <>
          <path d="M17,47 Q33,44 49,47" stroke={OUTLINE} strokeWidth="1.5" strokeLinecap="round" fill="none" />
          <polygon points="20,47 23,47 21.5,52" fill="white" />
          <polygon points="25,47 28,47 26.5,52" fill="white" />
          <polygon points="30,47 33,47 31.5,52" fill="white" />
          <polygon points="35,47 38,47 36.5,52" fill="white" />
          <polygon points="40,47 43,47 41.5,52" fill="white" />
          <polygon points="45,47 48,47 46.5,52" fill="white" />
        </>
      )}
      {(mood === 'cold') && (
        <path d="M17,48 Q33,44 49,48" stroke={OUTLINE} strokeWidth="1.5" strokeLinecap="round" fill="none" />
      )}
      {mood === 'warm' && (
        /* Feueratem */
        <path d="M28,53 Q24,60 28,66 Q32,60 32,55 Q32,61 36,66 Q39,59 35,53" fill="#f97316" opacity="0.85" />
      )}
      {mood === 'frozen' && (
        <>
          <path d="M17,48 Q33,44 49,48" stroke={OUTLINE} strokeWidth="1.5" strokeLinecap="round" fill="none" />
          <circle cx="26" cy="55" r="2.5" fill="#93c5fd" opacity="0.8" />
          <circle cx="33" cy="58" r="3"   fill="#93c5fd" opacity="0.8" />
          <circle cx="40" cy="55" r="2.5" fill="#93c5fd" opacity="0.8" />
        </>
      )}

      {/* ── Körper ── */}
      <ellipse cx="33" cy="65" rx="14" ry="9" fill={body} stroke={OUTLINE} strokeWidth="1.5" />

      {/* ── WINZIGE Ärmchen (der Gag) ── */}
      <ellipse cx="16" cy="63" rx="6" ry="4" fill={body} stroke={OUTLINE} strokeWidth="1.5" />
      <line x1="12" y1="66" x2="10" y2="69" stroke={OUTLINE} strokeWidth="1.2" strokeLinecap="round" />
      <line x1="16" y1="67" x2="16" y2="70" stroke={OUTLINE} strokeWidth="1.2" strokeLinecap="round" />
      <ellipse cx="50" cy="63" rx="6" ry="4" fill={body} stroke={OUTLINE} strokeWidth="1.5" />
      <line x1="54" y1="66" x2="56" y2="69" stroke={OUTLINE} strokeWidth="1.2" strokeLinecap="round" />
      <line x1="50" y1="67" x2="50" y2="70" stroke={OUTLINE} strokeWidth="1.2" strokeLinecap="round" />

      {/* ── Dicke Beine ── */}
      <ellipse cx="22" cy="74" rx="9" ry="4"  fill={body} stroke={OUTLINE} strokeWidth="1.5" />
      <ellipse cx="44" cy="74" rx="9" ry="4"  fill={body} stroke={OUTLINE} strokeWidth="1.5" />

      <PetScarf mood={mood} x={10} y={53} width={46} knotCx={55} knotCy={58} />
    </PetSvg>
  );
}
