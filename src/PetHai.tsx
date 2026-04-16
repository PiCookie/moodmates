/**
 * Gen1-Style Hai Pet
 *
 * Erkennungsmerkmale: Großer runder Kopf (Chibi-Stil), riesiges offenes Maul
 * mit Zähnen und Zunge, dreieckige Rückenflosse, V-Schwanzflosse.
 *
 * Mood → temperature:
 *   warm    ≥ 22 °C  Sonnenbrille + Wangenrouge + breites Grinsen
 *   neutral  8–22 °C  runde Augen, offenes Maul mit Zähnen + Zunge
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

const HAI_FUR: Record<Mood, string> = {
  frozen:  '#bfdbfe',
  cold:    '#7dd3fc',
  neutral: '#94a3b8',
  warm:    '#64748b',
};

const HAI_BELLY: Record<Mood, string> = {
  frozen:  '#f0f9ff',
  cold:    '#f0f9ff',
  neutral: '#f8fafc',
  warm:    '#f1f5f9',
};

export function PetHai({ temperature, size = 80, blinking = false }: PetProps) {
  const mood  = getMood(temperature);
  const isHot = temperature !== null && temperature >= 28;
  const fur   = HAI_FUR[mood];
  const belly = HAI_BELLY[mood];

  return (
    <PetSvg size={size} shivering={mood === 'cold' || mood === 'frozen'} ariaLabel={`Hai-Pet: ${mood}`}>
      <PetShadow cx={32} />
      <PetIcicles mood={mood} y={77} />

      {/* ── Schwanzflosse (V-Form, unten) ── */}
      <path d="M20,66 Q26,77 32,68 Q38,77 44,66 Z" fill={fur} stroke={OUTLINE} strokeWidth="1.5" strokeLinejoin="round" />

      {/* ── Rückenflosse (dreieckig, Hauptmerkmal) ── */}
      <path d="M26,22 L32,10 L38,22" fill={fur} stroke={OUTLINE} strokeWidth="1.5" strokeLinejoin="round" />

      {/* ── Körper (großer runder Kopf, Chibi-Stil) ── */}
      <ellipse cx="32" cy="44" rx="21" ry="23" fill={fur} stroke={OUTLINE} strokeWidth="1.5" />
      {/* Bauch: kompaktes Oval, Augen sitzen klar darüber */}
      <ellipse cx="32" cy="40" rx="10" ry="9" fill={belly} />

      {/* ── Brustflossen (seitlich, geschwungen) ── */}
      <path d="M11,46 Q2,41 2,53 Q6,59 13,55" fill={fur} stroke={OUTLINE} strokeWidth="1.2" strokeLinejoin="round" />
      <path d="M53,46 Q62,41 62,53 Q58,59 51,55" fill={fur} stroke={OUTLINE} strokeWidth="1.2" strokeLinejoin="round" />

      <PetSnowflakes mood={mood} left={{ x: 2, y: 24 }} right={{ x: 54, y: 24 }} />
      <PetSun mood={mood} />
      <PetSweat isHot={isHot} y={12} />

      {/* ── Augen ── */}
      {mood === 'neutral' && (blinking ? (
        <>
          <line x1="17" y1="33" x2="28" y2="33" stroke={OUTLINE} strokeWidth="2.5" strokeLinecap="round" />
          <line x1="36" y1="33" x2="47" y2="33" stroke={OUTLINE} strokeWidth="2.5" strokeLinecap="round" />
        </>
      ) : (
        <>
          <circle cx="22" cy="33" r="5.5" fill={OUTLINE} />
          <circle cx="42" cy="33" r="5.5" fill={OUTLINE} />
          <circle cx="20" cy="31" r="2" fill="white" opacity="0.7" />
          <circle cx="40" cy="31" r="2" fill="white" opacity="0.7" />
        </>
      ))}

      <PetSunglasses
        mood={mood}
        frame={{ y: 26, w: 14, h: 14, rx: 4 }}
        leftX={13} rightX={35}
        leftTemple={[13, 34, 4, 37]}
        rightTemple={[49, 34, 58, 37]}
      />

      <PetWorriedBrows
        mood={mood}
        leftBrow={{ x1: 14, y1: 26, x2: 28, y2: 30 }}
        rightBrow={{ x1: 36, y1: 30, x2: 50, y2: 26 }}
      />
      {mood === 'cold' && (
        <>
          <circle cx="22" cy="33" r="5" fill={OUTLINE} />
          <circle cx="42" cy="33" r="5" fill={OUTLINE} />
          <circle cx="20" cy="31" r="1.8" fill="white" opacity="0.65" />
          <circle cx="40" cy="31" r="1.8" fill="white" opacity="0.65" />
        </>
      )}

      <PetFrozenEyes
        mood={mood}
        leftBox={{ l: 13, t: 25, r: 31, b: 43 }}
        rightBox={{ l: 33, t: 25, r: 51, b: 43 }}
      />

      <PetBlush mood={mood} leftCx={12} rightCx={52} cy={44} rx={7} ry={4} />

      {/* ── Mund ── */}
      {(mood === 'neutral' || mood === 'warm') && (
        <>
          {/* Maul-Innenraum (bleibt innerhalb des Körpers) */}
          <path
            d={mood === 'warm'
              ? "M12,46 Q32,65 52,46 Q46,61 32,64 Q18,61 12,46 Z"
              : "M13,46 Q32,64 51,46 Q46,60 32,63 Q18,60 13,46 Z"}
            fill={OUTLINE} opacity="0.85"
          />
          {/* Zunge (vor den unteren Zähnen gezeichnet → liegt dahinter) */}
          <ellipse cx="32" cy="57" rx="8" ry="3.5" fill="#f87171" />
          {/* Untere Zähne: entlang Kieferkurve, gleiche Zahnhöhe wie oben */}
          <path
            d={mood === 'warm'
              ? "M12,46 Q17,59 18,59 Q21,55 24,60 Q27,56 30,61 Q33,57 36,61 Q39,56 42,60 Q45,59 48,59 Q51,59 52,46 Q47,62 32,65 Q17,62 12,46 Z"
              : "M13,46 Q18,58 19,58 Q22,54 25,59 Q28,55 31,60 Q34,56 37,60 Q40,55 43,59 Q46,58 49,58 Q50,58 51,46 Q46,60 32,63 Q18,60 13,46 Z"}
            fill="white" stroke={OUTLINE} strokeWidth="1.2" strokeLinejoin="round"
          />
          {/* Obere Zähne + Lippe als eine Form: Z schließt die Oberkante = Lipplinie */}
          <path
            d={mood === 'warm'
              ? "M12,46 Q15,54 18,46 Q21,54 24,46 Q27,54 30,46 Q33,54 36,46 Q39,54 42,46 Q45,54 48,46 Q50,53 52,46 Z"
              : "M13,46 Q16,54 19,46 Q22,54 25,46 Q28,54 31,46 Q34,54 37,46 Q40,54 43,46 Q46,53 50,46 Z"}
            fill="white" stroke={OUTLINE} strokeWidth="1.5" strokeLinejoin="round"
          />
        </>
      )}
      {mood === 'cold' && (
        <path d="M24,55 Q32,52 40,55" stroke={OUTLINE} strokeWidth="1.5" strokeLinecap="round" fill="none" />
      )}
      {mood === 'frozen' && (
        <path d="M22,55 Q26,51 32,55 Q38,59 42,55" stroke={OUTLINE} strokeWidth="1.5" strokeLinecap="round" fill="none" />
      )}

      <PetScarf mood={mood} x={9} y={63} width={46} knotCx={55} knotCy={68} />
    </PetSvg>
  );
}
