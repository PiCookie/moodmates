/**
 * Gen1-Style Turtle Pet
 *
 * Erkennungsmerkmale:
 *   - Markanter Panzer (Kuppel mit Schuppenmuster)
 *   - Kleiner Kopf, der aus dem Panzer ragt
 *   - Kurze Stummel-Gliedmaßen seitlich + Füße unten
 *
 * Mood → temperature: identisch zu Frosch
 *   warm    ≥ 22 °C  Sonnenbrille + Wangenrouge + Sonne
 *   neutral  8–22 °C  runde Augen, kleines Lächeln
 *   cold     0–8 °C  besorgte Augen, Schal, Schneeflocken, Zittern
 *   frozen    < 0 °C  X-Augen, Eiszapfen, Schal, starkes Zittern
 */

import type { Mood, PetProps } from './pet.shared';
import { getMood, OUTLINE } from './pet.shared';

const TURTLE_BODY: Record<Mood, string> = {
  frozen:  '#e0e7ff',
  cold:    '#ccfbf1',
  neutral: '#bbf7d0',
  warm:    '#d9f99d',
};

const TURTLE_DARK: Record<Mood, string> = {
  frozen:  '#6366f1',
  cold:    '#0d9488',
  neutral: '#15803d',
  warm:    '#65a30d',
};

export function PetTurtle({ temperature, size = 80, blinking = false }: PetProps) {
  const mood      = getMood(temperature);
  const isHot     = temperature !== null && temperature >= 28;
  const shivering = mood === 'cold' || mood === 'frozen';
  const body      = TURTLE_BODY[mood];
  const dark      = TURTLE_DARK[mood];

  return (
    <svg
      width={size}
      height={Math.round(size * (88 / 66))}
      viewBox="0 0 66 88"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={shivering ? 'animate-shiver' : undefined}
      aria-label={`Schildkröten-Maskottchen: ${mood}`}
    >
      {/* ── Schatten ── */}
      <ellipse cx="33" cy="86" rx="16" ry="2" fill="rgba(0,0,0,0.15)" />

      {/* ── Eiszapfen (gefroren) ── */}
      {mood === 'frozen' && (
        <>
          <polygon points="19,74 25,74 22,84" fill="#93c5fd" />
          <polygon points="29,74 37,74 33,86" fill="#bfdbfe" />
          <polygon points="41,74 47,74 44,84" fill="#93c5fd" />
        </>
      )}

      {/* ── Schwanz (kleiner Stummel) ── */}
      <ellipse cx="50" cy="67" rx="5" ry="3" fill={body} stroke={dark} strokeWidth="1.5" />

      {/* ── Gliedmaßen (Arme seitlich) ── */}
      <ellipse cx="9"  cy="60" rx="7" ry="4.5" fill={body} stroke={dark} strokeWidth="1.5" />
      <ellipse cx="57" cy="60" rx="7" ry="4.5" fill={body} stroke={dark} strokeWidth="1.5" />

      {/* ── Füße (unter dem Panzer, wie beim Pinguin) ── */}
      <ellipse cx="22" cy="75" rx="8" ry="3.5" fill={body} stroke={dark} strokeWidth="1.5" />
      <ellipse cx="42" cy="75" rx="8" ry="3.5" fill={body} stroke={dark} strokeWidth="1.5" />

      {/* ── Panzer-Kuppel ── */}
      <ellipse cx="32" cy="58" rx="21" ry="14" fill={body} stroke={dark} strokeWidth="1.5" />

      {/* ── Panzer-Muster (Schuppen-Linien) ── */}
      <ellipse cx="32" cy="57" rx="7" ry="6" fill="none" stroke={dark} strokeWidth="1" opacity="0.45" />
      <path d="M24,47 Q32,44 40,47"     fill="none" stroke={dark} strokeWidth="1" opacity="0.35" />
      <path d="M12,55 Q18,50 25,52"     fill="none" stroke={dark} strokeWidth="1" opacity="0.35" />
      <path d="M39,52 Q46,50 52,55"     fill="none" stroke={dark} strokeWidth="1" opacity="0.35" />
      <path d="M15,63 Q22,68 30,65"     fill="none" stroke={dark} strokeWidth="1" opacity="0.35" />
      <path d="M34,65 Q42,68 49,63"     fill="none" stroke={dark} strokeWidth="1" opacity="0.35" />

      {/* ── Schneeflocken (kalt + gefroren) ── */}
      {(mood === 'cold' || mood === 'frozen') && (
        <>
          <g stroke="#93c5fd" strokeWidth="1.2" strokeLinecap="round" opacity="0.75">
            <line x1="3" y1="40" x2="3" y2="48" />
            <line x1="-1" y1="44" x2="7" y2="44" />
            <line x1="0.4" y1="41.4" x2="5.6" y2="46.6" />
            <line x1="5.6" y1="41.4" x2="0.4" y2="46.6" />
          </g>
          <g stroke="#bfdbfe" strokeWidth="1" strokeLinecap="round" opacity="0.55">
            <line x1="62" y1="36" x2="62" y2="42" />
            <line x1="59" y1="39" x2="65" y2="39" />
            <line x1="60.1" y1="37.1" x2="63.9" y2="40.9" />
            <line x1="63.9" y1="37.1" x2="60.1" y2="40.9" />
          </g>
        </>
      )}

      {/* ── Sonne (warm) ── */}
      {mood === 'warm' && (
        <g opacity="0.9">
          <circle cx="58" cy="12" r="5" fill="#fbbf24" />
          <line x1="58" y1="4"   x2="58" y2="2"   stroke="#fbbf24" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="64" y1="7"   x2="66" y2="5.4"  stroke="#fbbf24" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="66" y1="13"  x2="66" y2="13"   stroke="#fbbf24" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="64" y1="18"  x2="66" y2="20"   stroke="#fbbf24" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="52" y1="7"   x2="50" y2="5.4"  stroke="#fbbf24" strokeWidth="1.5" strokeLinecap="round" />
        </g>
      )}

      {/* ── Schweiß-Tropfen (sehr heiß ≥ 28 °C) ── */}
      {isHot && (
        <path d="M6,36 Q8,30 10,36 A3.5 3.5 0 0 1 6 36" fill="#93c5fd" opacity="0.85" />
      )}

      {/* ── Kopf ── */}
      <circle cx="32" cy="30" r="13" fill={body} stroke={dark} strokeWidth="1.5" />

      {/* ══════════════ AUGEN ══════════════ */}

      {mood === 'neutral' && (blinking ? (
        <>
          <line x1="23" y1="27" x2="29" y2="27" stroke={OUTLINE} strokeWidth="2.5" strokeLinecap="round" />
          <line x1="35" y1="27" x2="41" y2="27" stroke={OUTLINE} strokeWidth="2.5" strokeLinecap="round" />
        </>
      ) : (
        <>
          <circle cx="26" cy="27" r="3.5" fill={OUTLINE} />
          <circle cx="38" cy="27" r="3.5" fill={OUTLINE} />
          <circle cx="24.8" cy="25.8" r="1.2" fill="white" opacity="0.65" />
          <circle cx="36.8" cy="25.8" r="1.2" fill="white" opacity="0.65" />
        </>
      ))}

      {mood === 'warm' && (
        <>
          <line x1="17" y1="27" x2="11" y2="30" stroke={OUTLINE} strokeWidth="1.5" strokeLinecap="round" />
          <line x1="49" y1="27" x2="55" y2="30" stroke={OUTLINE} strokeWidth="1.5" strokeLinecap="round" />
          <rect x="17" y="21" width="13" height="11" rx="4" fill={OUTLINE} />
          <rect x="36" y="21" width="13" height="11" rx="4" fill={OUTLINE} />
          <line x1="30" y1="26" x2="36" y2="26" stroke={OUTLINE} strokeWidth="2" strokeLinecap="round" />
          <rect x="19" y="23" width="4" height="3" rx="1" fill="white" opacity="0.22" />
          <rect x="38" y="23" width="4" height="3" rx="1" fill="white" opacity="0.22" />
        </>
      )}

      {mood === 'cold' && (
        <>
          <line x1="20" y1="22" x2="30" y2="25" stroke={OUTLINE} strokeWidth="1.5" strokeLinecap="round" />
          <line x1="34" y1="25" x2="44" y2="22" stroke={OUTLINE} strokeWidth="1.5" strokeLinecap="round" />
          <circle cx="26" cy="28" r="3.5" fill={OUTLINE} />
          <circle cx="38" cy="28" r="3.5" fill={OUTLINE} />
          <circle cx="24.8" cy="26.8" r="1.2" fill="white" opacity="0.65" />
          <circle cx="36.8" cy="26.8" r="1.2" fill="white" opacity="0.65" />
        </>
      )}

      {mood === 'frozen' && (
        <>
          <line x1="20" y1="23" x2="31" y2="34" stroke={OUTLINE} strokeWidth="2.5" strokeLinecap="round" />
          <line x1="31" y1="23" x2="20" y2="34" stroke={OUTLINE} strokeWidth="2.5" strokeLinecap="round" />
          <line x1="33" y1="23" x2="44" y2="34" stroke={OUTLINE} strokeWidth="2.5" strokeLinecap="round" />
          <line x1="44" y1="23" x2="33" y2="34" stroke={OUTLINE} strokeWidth="2.5" strokeLinecap="round" />
        </>
      )}

      {/* ── Nasenlöcher ── */}
      <circle cx="29.5" cy="33" r="1.3" fill={dark} opacity="0.6" />
      <circle cx="34.5" cy="33" r="1.3" fill={dark} opacity="0.6" />

      {/* ── Wangen-Rouge ── */}
      {mood === 'warm' && (
        <>
          <ellipse cx="18" cy="35" rx="5" ry="3" fill="#fca5a5" opacity="0.5" />
          <ellipse cx="46" cy="35" rx="5" ry="3" fill="#fca5a5" opacity="0.5" />
        </>
      )}
      {(mood === 'cold' || mood === 'frozen') && (
        <>
          <ellipse cx="18" cy="35" rx="5" ry="3" fill="#93c5fd" opacity="0.4" />
          <ellipse cx="46" cy="35" rx="5" ry="3" fill="#93c5fd" opacity="0.4" />
        </>
      )}

      {/* ── Mund ── */}
      {(mood === 'neutral' || mood === 'warm') && (
        <path d="M27,37 Q32,41 37,37" stroke={OUTLINE} strokeWidth="1.5" strokeLinecap="round" fill="none" />
      )}
      {mood === 'cold' && (
        <path d="M27,39 Q32,35 37,39" stroke={OUTLINE} strokeWidth="1.5" strokeLinecap="round" fill="none" />
      )}
      {mood === 'frozen' && (
        <path
          d="M24,37 Q27,34 30,37 Q33,40 36,37 Q39,34 42,37"
          stroke={OUTLINE} strokeWidth="1.5" strokeLinecap="round" fill="none"
        />
      )}

      {/* ── Schal (kalt + gefroren) ── */}
      {(mood === 'cold' || mood === 'frozen') && (
        <>
          <rect x="16" y="40" width="32" height="9" rx="4.5" fill="#ef4444" />
          <rect x="16" y="44" width="32" height="3"  rx="1.5" fill="#dc2626" opacity="0.3" />
          <circle cx="47" cy="44" r="5"   fill="#ef4444" />
          <circle cx="47" cy="44" r="3"   fill="#dc2626" opacity="0.35" />
        </>
      )}
    </svg>
  );
}
