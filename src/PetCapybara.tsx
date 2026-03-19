/**
 * Gen1-Style Capybara Pet
 *
 * Erkennungsmerkmale:
 *   - Großer, tonnenförmiger Körper
 *   - Breite, markante Schnauze (rechteckig-rund — das Capybara-Markenzeichen)
 *   - Kleine runde Ohren oben am Kopf
 *   - Kleine Augen hoch am Kopf (halbaquatische Adaptation)
 *   - Kurze, stämmige Beine
 *
 * Mood → temperature: identisch zu den anderen Tieren
 *   warm    ≥ 22 °C  Sonnenbrille + Wangenrouge + Sonne
 *   neutral  8–22 °C  runde Augen, kleines Lächeln
 *   cold     0–8 °C  besorgte Augen, Schal, Schneeflocken, Zittern
 *   frozen    < 0 °C  X-Augen, Eiszapfen, Schal, starkes Zittern
 */

import type { Mood, PetProps } from './pet.shared';
import { getMood, OUTLINE } from './pet.shared';

const CAPY_BODY: Record<Mood, string> = {
  frozen:  '#ccd8e8',
  cold:    '#b8c4cc',
  neutral: '#c4956a',
  warm:    '#d4a040',
};

const CAPY_DARK: Record<Mood, string> = {
  frozen:  '#4a5870',
  cold:    '#4a5870',
  neutral: '#7a4e1e',
  warm:    '#8b5e1a',
};

export function PetCapybara({ temperature, size = 80, blinking = false }: PetProps) {
  const mood      = getMood(temperature);
  const isHot     = temperature !== null && temperature >= 28;
  const shivering = mood === 'cold' || mood === 'frozen';
  const body      = CAPY_BODY[mood];
  const dark      = CAPY_DARK[mood];

  return (
    <svg
      width={size}
      height={Math.round(size * (88 / 66))}
      viewBox="0 0 66 88"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={shivering ? 'animate-shiver' : undefined}
      aria-label={`Capybara-Maskottchen: ${mood}`}
    >
      {/* ── Schatten ── */}
      <ellipse cx="33" cy="86" rx="18" ry="2" fill="rgba(0,0,0,0.15)" />

      {/* ── Eiszapfen (gefroren) ── */}
      {mood === 'frozen' && (
        <>
          <polygon points="17,70 23,70 20,80" fill="#93c5fd" />
          <polygon points="29,70 37,70 33,82" fill="#bfdbfe" />
          <polygon points="43,70 49,70 46,80" fill="#93c5fd" />
        </>
      )}

      {/* ── Füße (peeking out unter dem Körper) ── */}
      <ellipse cx="19" cy="73" rx="9" ry="3.5" fill={body} stroke={dark} strokeWidth="1.5" />
      <ellipse cx="47" cy="73" rx="9" ry="3.5" fill={body} stroke={dark} strokeWidth="1.5" />

      {/* ── Vorderpfoten (seitliche Stummel, hinter Körper gerendert) ── */}
      <ellipse cx="11" cy="52" rx="8" ry="4" fill={body} stroke={dark} strokeWidth="1.5" />
      <ellipse cx="55" cy="52" rx="8" ry="4" fill={body} stroke={dark} strokeWidth="1.5" />

      {/* ── Körper (oval, länglich) ── */}
      <ellipse cx="33" cy="53" rx="19" ry="15" fill={body} stroke={dark} strokeWidth="1.5" />

      {/* ── Schneeflocken (kalt + gefroren) ── */}
      {(mood === 'cold' || mood === 'frozen') && (
        <>
          <g stroke="#93c5fd" strokeWidth="1.2" strokeLinecap="round" opacity="0.75">
            <line x1="3"  y1="40" x2="3"  y2="48" />
            <line x1="-1" y1="44" x2="7"  y2="44" />
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
          <line x1="58" y1="4"  x2="58" y2="2"   stroke="#fbbf24" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="64" y1="7"  x2="66" y2="5.4"  stroke="#fbbf24" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="66" y1="13" x2="66" y2="13"   stroke="#fbbf24" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="64" y1="18" x2="66" y2="20"   stroke="#fbbf24" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="52" y1="7"  x2="50" y2="5.4"  stroke="#fbbf24" strokeWidth="1.5" strokeLinecap="round" />
        </g>
      )}

      {/* ── Schweiß-Tropfen (sehr heiß ≥ 28 °C) ── */}
      {isHot && (
        <path d="M6,36 Q8,30 10,36 A3.5 3.5 0 0 1 6 36" fill="#93c5fd" opacity="0.85" />
      )}

      {/* ── Ohren (vor Kopf gerendert → Kopf überlappt Basis) ── */}
      <circle cx="21" cy="23" r="5.5" fill={body} stroke={dark} strokeWidth="1.5" />
      <circle cx="45" cy="23" r="5.5" fill={body} stroke={dark} strokeWidth="1.5" />
      <circle cx="21" cy="23" r="3"   fill={dark} opacity="0.2" />
      <circle cx="45" cy="23" r="3"   fill={dark} opacity="0.2" />

      {/* ── Kopf ── */}
      <ellipse cx="33" cy="29" rx="17" ry="9" fill={body} stroke={dark} strokeWidth="1.5" />

      {/* ── Breite Schnauze (Capybara-Markenzeichen) ── */}
      <ellipse cx="33" cy="38" rx="13" ry="7" fill={body} stroke={dark} strokeWidth="1.5" />

      {/* ══════════════ AUGEN ══════════════ */}

      {mood === 'neutral' && (blinking ? (
        <>
          <line x1="20" y1="27" x2="27" y2="27" stroke={OUTLINE} strokeWidth="2.5" strokeLinecap="round" />
          <line x1="39" y1="27" x2="46" y2="27" stroke={OUTLINE} strokeWidth="2.5" strokeLinecap="round" />
        </>
      ) : (
        <>
          <circle cx="24" cy="27" r="3" fill={OUTLINE} />
          <circle cx="42" cy="27" r="3" fill={OUTLINE} />
          <circle cx="23" cy="25.8" r="1" fill="white" opacity="0.65" />
          <circle cx="41" cy="25.8" r="1" fill="white" opacity="0.65" />
        </>
      ))}

      {mood === 'warm' && (
        <>
          <line x1="19" y1="26" x2="13" y2="28" stroke={OUTLINE} strokeWidth="1.5" strokeLinecap="round" />
          <line x1="47" y1="26" x2="53" y2="28" stroke={OUTLINE} strokeWidth="1.5" strokeLinecap="round" />
          <rect x="19" y="22" width="12" height="9" rx="3.5" fill={OUTLINE} />
          <rect x="35" y="22" width="12" height="9" rx="3.5" fill={OUTLINE} />
          <line x1="31" y1="26" x2="35" y2="26" stroke={OUTLINE} strokeWidth="2" strokeLinecap="round" />
          <rect x="21" y="24" width="4" height="3" rx="1" fill="white" opacity="0.22" />
          <rect x="37" y="24" width="4" height="3" rx="1" fill="white" opacity="0.22" />
        </>
      )}

      {mood === 'cold' && (
        <>
          <line x1="19" y1="22" x2="28" y2="25" stroke={OUTLINE} strokeWidth="1.5" strokeLinecap="round" />
          <line x1="38" y1="25" x2="47" y2="22" stroke={OUTLINE} strokeWidth="1.5" strokeLinecap="round" />
          <circle cx="24" cy="28" r="3" fill={OUTLINE} />
          <circle cx="42" cy="28" r="3" fill={OUTLINE} />
          <circle cx="23" cy="26.8" r="1" fill="white" opacity="0.65" />
          <circle cx="41" cy="26.8" r="1" fill="white" opacity="0.65" />
        </>
      )}

      {mood === 'frozen' && (
        <>
          <line x1="20" y1="23" x2="29" y2="32" stroke={OUTLINE} strokeWidth="2.5" strokeLinecap="round" />
          <line x1="29" y1="23" x2="20" y2="32" stroke={OUTLINE} strokeWidth="2.5" strokeLinecap="round" />
          <line x1="37" y1="23" x2="46" y2="32" stroke={OUTLINE} strokeWidth="2.5" strokeLinecap="round" />
          <line x1="46" y1="23" x2="37" y2="32" stroke={OUTLINE} strokeWidth="2.5" strokeLinecap="round" />
        </>
      )}

      {/* ── Nasenlöcher (auf der breiten Schnauze) ── */}
      <ellipse cx="28" cy="43" rx="2" ry="1.5" fill={dark} opacity="0.55" />
      <ellipse cx="38" cy="43" rx="2" ry="1.5" fill={dark} opacity="0.55" />

      {/* ── Wangen-Rouge ── */}
      {mood === 'warm' && (
        <>
          <ellipse cx="16" cy="35" rx="5" ry="3" fill="#fca5a5" opacity="0.5" />
          <ellipse cx="50" cy="35" rx="5" ry="3" fill="#fca5a5" opacity="0.5" />
        </>
      )}
      {(mood === 'cold' || mood === 'frozen') && (
        <>
          <ellipse cx="16" cy="35" rx="5" ry="3" fill="#93c5fd" opacity="0.4" />
          <ellipse cx="50" cy="35" rx="5" ry="3" fill="#93c5fd" opacity="0.4" />
        </>
      )}

      {/* ── Mund ── */}
      {mood === 'neutral' && (
        <path d="M26,45 Q33,49 40,45" stroke={OUTLINE} strokeWidth="1.5" strokeLinecap="round" fill="none" />
      )}
      {mood === 'warm' && (
        <>
          <path d="M26,45 Q33,49 40,45" stroke={OUTLINE} strokeWidth="1.5" strokeLinecap="round" fill="none" />
          <ellipse cx="33" cy="47" rx="4" ry="2" fill="#f87171" opacity="0.85" />
        </>
      )}
      {mood === 'cold' && (
        <path d="M26,47 Q33,43 40,47" stroke={OUTLINE} strokeWidth="1.5" strokeLinecap="round" fill="none" />
      )}
      {mood === 'frozen' && (
        <path
          d="M24,45 Q27,42 30,45 Q33,48 36,45 Q39,42 42,45"
          stroke={OUTLINE} strokeWidth="1.5" strokeLinecap="round" fill="none"
        />
      )}

      {/* ── Schal (kalt + gefroren) ── */}
      {(mood === 'cold' || mood === 'frozen') && (
        <>
          <rect x="16" y="47" width="34" height="9" rx="4.5" fill="#ef4444" />
          <rect x="16" y="51" width="34" height="3"  rx="1.5" fill="#dc2626" opacity="0.3" />
          <circle cx="48" cy="51" r="5"   fill="#ef4444" />
          <circle cx="48" cy="51" r="3"   fill="#dc2626" opacity="0.35" />
        </>
      )}
    </svg>
  );
}
