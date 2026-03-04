/**
 * Gen1-Style Penguin Pet
 *
 * Erkennungsmerkmale:
 *   - Dunkler Körper (Frack) mit hellem Bauch/Gesicht-Oval
 *   - Kleine Flossen seitlich
 *   - Orangefarbener Schnabel + Füße
 *   - Runde Augen mit Glanz auf dem hellen Gesichts-Oval
 *
 * Mood → temperature: identisch zu Katze/Hund
 *   warm    ≥ 22 °C  Sonnenbrille + Wangenrouge + Sonne
 *   neutral  8–22 °C  runde Augen, kleines Lächeln
 *   cold     0–8 °C  besorgte Augen, Schal, Schneeflocken, Zittern
 *   frozen    < 0 °C  X-Augen, Eiszapfen, Schal, starkes Zittern
 */

import type { PetProps } from './pet.shared';
import { getMood, BODY_FILL, OUTLINE } from './pet.shared';

const PENGUIN_BODY = '#1e3a5f';
const ORANGE       = '#f97316';

export function PetPenguin({ temperature, size = 80, blinking = false }: PetProps) {
  const mood      = getMood(temperature);
  const isHot     = temperature !== null && temperature >= 28;
  const shivering = mood === 'cold' || mood === 'frozen';
  const face      = BODY_FILL[mood];   // helles Bauch/Gesichts-Oval, färbt sich mit Mood

  return (
    <svg
      width={size}
      height={Math.round(size * (88 / 66))}
      viewBox="0 0 66 88"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={shivering ? 'animate-shiver' : undefined}
      aria-label={`Pinguin-Maskottchen: ${mood}`}
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

      {/* ── Flossen — vor Körper + Kopf gezeichnet, damit diese sie überlagern ── */}
      {/* Linke Flosse */}
      <ellipse
        cx="10" cy="56" rx="5" ry="11"
        fill={PENGUIN_BODY} stroke={OUTLINE} strokeWidth="1.5"
        transform="rotate(-25 10 56)"
      />
      {/* Rechte Flosse */}
      <ellipse
        cx="54" cy="56" rx="5" ry="11"
        fill={PENGUIN_BODY} stroke={OUTLINE} strokeWidth="1.5"
        transform="rotate(25 54 56)"
      />

      {/* ── Körper (Frack) ── */}
      <ellipse cx="32" cy="63" rx="16" ry="11" fill={PENGUIN_BODY} stroke={OUTLINE} strokeWidth="1.5" />
      {/* Heller Bauch */}
      <ellipse cx="32" cy="63" rx="10" ry="7.5" fill={face} />

      {/* ── Füße (orange) ── */}
      <ellipse cx="24" cy="73" rx="8"  ry="3.5" fill={ORANGE} stroke={OUTLINE} strokeWidth="1" />
      <ellipse cx="40" cy="73" rx="8"  ry="3.5" fill={ORANGE} stroke={OUTLINE} strokeWidth="1" />

      {/* ── Kopf (Frack) ── */}
      <circle cx="32" cy="33" r="20" fill={PENGUIN_BODY} stroke={OUTLINE} strokeWidth="1.5" />
      {/* Helles Gesichts-Oval ── */}
      <ellipse cx="32" cy="36" rx="12" ry="14" fill={face} />

      {/* ── Schneeflocken (kalt + gefroren) ── */}
      {(mood === 'cold' || mood === 'frozen') && (
        <>
          <g stroke="#93c5fd" strokeWidth="1.2" strokeLinecap="round" opacity="0.75">
            <line x1="5" y1="14" x2="5" y2="22" />
            <line x1="1" y1="18" x2="9" y2="18" />
            <line x1="2.4" y1="15.4" x2="7.6" y2="20.6" />
            <line x1="7.6" y1="15.4" x2="2.4" y2="20.6" />
          </g>
          <g stroke="#bfdbfe" strokeWidth="1" strokeLinecap="round" opacity="0.55">
            <line x1="60" y1="14" x2="60" y2="20" />
            <line x1="57" y1="17" x2="63" y2="17" />
            <line x1="58.1" y1="15.1" x2="61.9" y2="18.9" />
            <line x1="61.9" y1="15.1" x2="58.1" y2="18.9" />
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
        <path d="M6,14 Q8,8 10,14 A3.5 3.5 0 0 1 6 14" fill="#93c5fd" opacity="0.85" />
      )}

      {/* ══════════════ AUGEN ══════════════ */}

      {/* neutral: runde Augen mit Glanz — beim Blinzeln horizontale Linie */}
      {mood === 'neutral' && (blinking ? (
        <>
          <line x1="22.5" y1="30" x2="29.5" y2="30" stroke={OUTLINE} strokeWidth="2.5" strokeLinecap="round" />
          <line x1="34.5" y1="30" x2="41.5" y2="30" stroke={OUTLINE} strokeWidth="2.5" strokeLinecap="round" />
        </>
      ) : (
        <>
          <circle cx="26" cy="30" r="3.5" fill={OUTLINE} />
          <circle cx="38" cy="30" r="3.5" fill={OUTLINE} />
          <circle cx="24.8" cy="28.8" r="1.2" fill="white" opacity="0.65" />
          <circle cx="36.8" cy="28.8" r="1.2" fill="white" opacity="0.65" />
        </>
      ))}

      {/* warm: Sonnenbrille */}
      {mood === 'warm' && (
        <>
          <line x1="14" y1="30" x2="8"  y2="33" stroke={OUTLINE} strokeWidth="1.5" strokeLinecap="round" />
          <line x1="52" y1="30" x2="58" y2="33" stroke={OUTLINE} strokeWidth="1.5" strokeLinecap="round" />
          <rect x="14" y="24" width="14" height="12" rx="4" fill={OUTLINE} />
          <rect x="38" y="24" width="14" height="12" rx="4" fill={OUTLINE} />
          <line x1="28" y1="29" x2="38" y2="29" stroke={OUTLINE} strokeWidth="2" strokeLinecap="round" />
          <rect x="16" y="26" width="4" height="3" rx="1" fill="white" opacity="0.22" />
          <rect x="40" y="26" width="4" height="3" rx="1" fill="white" opacity="0.22" />
        </>
      )}

      {/* cold: besorgte Augen */}
      {mood === 'cold' && (
        <>
          <line x1="19" y1="23" x2="30" y2="26" stroke={OUTLINE} strokeWidth="1.5" strokeLinecap="round" />
          <line x1="36" y1="26" x2="47" y2="23" stroke={OUTLINE} strokeWidth="1.5" strokeLinecap="round" />
          <circle cx="26" cy="31" r="3.5" fill={OUTLINE} />
          <circle cx="38" cy="31" r="3.5" fill={OUTLINE} />
          <circle cx="24.8" cy="29.8" r="1.2" fill="white" opacity="0.65" />
          <circle cx="36.8" cy="29.8" r="1.2" fill="white" opacity="0.65" />
        </>
      )}

      {/* frozen: X-Augen */}
      {mood === 'frozen' && (
        <>
          <line x1="19" y1="24" x2="31" y2="36" stroke={OUTLINE} strokeWidth="2.5" strokeLinecap="round" />
          <line x1="31" y1="24" x2="19" y2="36" stroke={OUTLINE} strokeWidth="2.5" strokeLinecap="round" />
          <line x1="35" y1="24" x2="47" y2="36" stroke={OUTLINE} strokeWidth="2.5" strokeLinecap="round" />
          <line x1="47" y1="24" x2="35" y2="36" stroke={OUTLINE} strokeWidth="2.5" strokeLinecap="round" />
        </>
      )}

      {/* ── Wangen-Rouge ── */}
      {mood === 'warm' && (
        <>
          <ellipse cx="16" cy="43" rx="6" ry="3.5" fill="#fca5a5" opacity="0.5" />
          <ellipse cx="48" cy="43" rx="6" ry="3.5" fill="#fca5a5" opacity="0.5" />
        </>
      )}
      {(mood === 'cold' || mood === 'frozen') && (
        <>
          <ellipse cx="16" cy="43" rx="6" ry="3.5" fill="#93c5fd" opacity="0.4" />
          <ellipse cx="48" cy="43" rx="6" ry="3.5" fill="#93c5fd" opacity="0.4" />
        </>
      )}

      {/* ── Schnabel: obere Mandibel (immer sichtbar) ── */}
      <path d="M26,37 Q32,33 38,37 L35,42 L29,42 Z" fill={ORANGE} stroke={OUTLINE} strokeWidth="0.8" strokeLinejoin="round" />

      {/* ── Schnabel: untere Mandibel — Öffnung zeigt die Stimmung ── */}
      {/* neutral: leicht geöffnet */}
      {mood === 'neutral' && (
        <path d="M29,42 L35,42 Q33,47 32,48 Q31,47 29,42 Z" fill="#ea580c" stroke={OUTLINE} strokeWidth="0.8" strokeLinejoin="round" />
      )}
      {/* warm: weit geöffnet (fröhlich) */}
      {mood === 'warm' && (
        <path d="M29,42 L35,42 Q33,50 32,51 Q31,50 29,42 Z" fill="#ea580c" stroke={OUTLINE} strokeWidth="0.8" strokeLinejoin="round" />
      )}
      {/* cold: fast geschlossen (verkniffen) */}
      {mood === 'cold' && (
        <path d="M29,42 L35,42 L32,44 Z" fill="#ea580c" stroke={OUTLINE} strokeWidth="0.8" strokeLinejoin="round" />
      )}
      {/* frozen: klappernder Schnabel (Zickzack-Linie) */}
      {mood === 'frozen' && (
        <path d="M29,42 L35,42 Q34,43 32,42 Q30,44 29,42 Z" fill="#ea580c" stroke={OUTLINE} strokeWidth="0.8" strokeLinejoin="round" />
      )}

      {/* ── Schal (kalt + gefroren) ── */}
      {(mood === 'cold' || mood === 'frozen') && (
        <>
          <rect x="10" y="51" width="44" height="10" rx="5" fill="#ef4444" />
          <rect x="10" y="55" width="44" height="3"  rx="1.5" fill="#dc2626" opacity="0.3" />
          <circle cx="53" cy="56" r="6"   fill="#ef4444" />
          <circle cx="53" cy="56" r="3.5" fill="#dc2626" opacity="0.35" />
        </>
      )}
    </svg>
  );
}
