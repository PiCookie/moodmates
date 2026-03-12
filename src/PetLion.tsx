/**
 * Gen1-Style Lion Pet
 *
 * Erkennungsmerkmale:
 *   - Markante orangefarbene Mähne (großer Kreis hinter dem Kopf)
 *   - Runder Kopf mit großer Nase und Schnurrhaaren
 *   - Schwanz mit Quaste
 *   - Pfoten seitlich + Füße unten
 *
 * Mood → temperature: identisch zu Katze/Hund
 *   warm    ≥ 22 °C  Sonnenbrille + Zunge + Wangenrouge
 *   neutral  8–22 °C  runde Augen, breites Lächeln
 *   cold     0–8 °C  besorgte Augen, Schal, Schneeflocken, Zittern
 *   frozen    < 0 °C  X-Augen, Eiszapfen, Schal, starkes Zittern
 */

import type { Mood, PetProps } from './pet.shared';
import { getMood, OUTLINE } from './pet.shared';

const LION_BODY: Record<Mood, string> = {
  frozen:  '#e2e8f0',
  cold:    '#fef9c3',
  neutral: '#fef08a',
  warm:    '#fde047',
};

const LION_MANE = '#f97316';
const LION_NOSE = '#92400e';

export function PetLion({ temperature, size = 80, blinking = false }: PetProps) {
  const mood      = getMood(temperature);
  const isHot     = temperature !== null && temperature >= 28;
  const shivering = mood === 'cold' || mood === 'frozen';
  const body      = LION_BODY[mood];

  return (
    <svg
      width={size}
      height={Math.round(size * (88 / 66))}
      viewBox="0 0 66 88"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={shivering ? 'animate-shiver' : undefined}
      aria-label={`Löwen-Maskottchen: ${mood}`}
    >
      {/* ── Schatten ── */}
      <ellipse cx="32" cy="86" rx="16" ry="2" fill="rgba(0,0,0,0.15)" />

      {/* ── Eiszapfen (gefroren) ── */}
      {mood === 'frozen' && (
        <>
          <polygon points="19,74 25,74 22,84" fill="#93c5fd" />
          <polygon points="29,74 37,74 33,86" fill="#bfdbfe" />
          <polygon points="41,74 47,74 44,84" fill="#93c5fd" />
        </>
      )}

      {/* ── Schwanz mit Quaste ── */}
      <path
        d="M43,66 Q60,56 62,42 Q64,30 56,26"
        stroke={LION_MANE} strokeWidth="3" strokeLinecap="round" fill="none"
      />
      <circle cx="56" cy="25" r="5" fill={LION_MANE} />

      {/* ── Körper ── */}
      <ellipse cx="32" cy="67" rx="14" ry="9" fill={body} stroke={OUTLINE} strokeWidth="1.5" />

      {/* ── Pfoten (Arme) ── */}
      <ellipse cx="11" cy="63" rx="7" ry="4.5" fill={body} stroke={OUTLINE} strokeWidth="1.5" />
      <ellipse cx="53" cy="63" rx="7" ry="4.5" fill={body} stroke={OUTLINE} strokeWidth="1.5" />

      {/* ── Füße (unter dem Körper, wie beim Pinguin) ── */}
      <ellipse cx="22" cy="75" rx="8" ry="3.5" fill={body} stroke={OUTLINE} strokeWidth="1.5" />
      <ellipse cx="42" cy="75" rx="8" ry="3.5" fill={body} stroke={OUTLINE} strokeWidth="1.5" />

      {/* ── Mähne (großer oranger Kreis hinter dem Kopf) ── */}
      <circle cx="32" cy="37" r="22" fill={LION_MANE} stroke="#ea580c" strokeWidth="1" />

      {/* ── Ohren (über der Mähne) ── */}
      <circle cx="17" cy="18" r="7" fill={body}     stroke={OUTLINE} strokeWidth="1.5" />
      <circle cx="17" cy="18" r="4" fill="#fca5a5" />
      <circle cx="47" cy="18" r="7" fill={body}     stroke={OUTLINE} strokeWidth="1.5" />
      <circle cx="47" cy="18" r="4" fill="#fca5a5" />

      {/* ── Kopf ── */}
      <circle cx="32" cy="37" r="16" fill={body} stroke={OUTLINE} strokeWidth="1.5" />

      {/* ── Schneeflocken (kalt + gefroren) ── */}
      {(mood === 'cold' || mood === 'frozen') && (
        <g stroke="#93c5fd" strokeWidth="1.2" strokeLinecap="round" opacity="0.75">
          <line x1="4" y1="14" x2="4" y2="22" />
          <line x1="0" y1="18" x2="8" y2="18" />
          <line x1="1.4" y1="15.4" x2="6.6" y2="20.6" />
          <line x1="6.6" y1="15.4" x2="1.4" y2="20.6" />
        </g>
      )}

      {/* ── Sonne (warm) ── */}
      {mood === 'warm' && (
        <g opacity="0.9">
          <circle cx="8" cy="10" r="5" fill="#fbbf24" />
          <line x1="8" y1="2"   x2="8" y2="0"   stroke="#fbbf24" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="14" y1="5"  x2="16" y2="3.4" stroke="#fbbf24" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="16" y1="11" x2="18" y2="11"  stroke="#fbbf24" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="2"  y1="5"  x2="0"  y2="3.4" stroke="#fbbf24" strokeWidth="1.5" strokeLinecap="round" />
        </g>
      )}

      {/* ── Schweiß-Tropfen (sehr heiß ≥ 28 °C) ── */}
      {isHot && (
        <path d="M60,14 Q62,8 64,14 A3.5 3.5 0 0 1 60 14" fill="#93c5fd" opacity="0.85" />
      )}

      {/* ══════════════ AUGEN ══════════════ */}

      {mood === 'neutral' && (blinking ? (
        <>
          <line x1="21" y1="31" x2="28" y2="31" stroke={OUTLINE} strokeWidth="2.5" strokeLinecap="round" />
          <line x1="36" y1="31" x2="43" y2="31" stroke={OUTLINE} strokeWidth="2.5" strokeLinecap="round" />
        </>
      ) : (
        <>
          <circle cx="24.5" cy="31" r="4"   fill={OUTLINE} />
          <circle cx="39.5" cy="31" r="4"   fill={OUTLINE} />
          <circle cx="23"   cy="29.5" r="1.4" fill="white" opacity="0.65" />
          <circle cx="38"   cy="29.5" r="1.4" fill="white" opacity="0.65" />
        </>
      ))}

      {mood === 'warm' && (
        <>
          <line x1="14" y1="31" x2="8"  y2="34" stroke={OUTLINE} strokeWidth="1.5" strokeLinecap="round" />
          <line x1="52" y1="31" x2="58" y2="34" stroke={OUTLINE} strokeWidth="1.5" strokeLinecap="round" />
          <rect x="14" y="25" width="14" height="12" rx="4" fill={OUTLINE} />
          <rect x="38" y="25" width="14" height="12" rx="4" fill={OUTLINE} />
          <line x1="28" y1="30" x2="38" y2="30" stroke={OUTLINE} strokeWidth="2" strokeLinecap="round" />
          <rect x="16" y="27" width="4" height="3" rx="1" fill="white" opacity="0.22" />
          <rect x="40" y="27" width="4" height="3" rx="1" fill="white" opacity="0.22" />
        </>
      )}

      {mood === 'cold' && (
        <>
          <line x1="18" y1="24" x2="29" y2="27" stroke={OUTLINE} strokeWidth="1.5" strokeLinecap="round" />
          <line x1="35" y1="27" x2="46" y2="24" stroke={OUTLINE} strokeWidth="1.5" strokeLinecap="round" />
          <circle cx="24.5" cy="32" r="4"   fill={OUTLINE} />
          <circle cx="39.5" cy="32" r="4"   fill={OUTLINE} />
          <circle cx="23"   cy="30.5" r="1.4" fill="white" opacity="0.65" />
          <circle cx="38"   cy="30.5" r="1.4" fill="white" opacity="0.65" />
        </>
      )}

      {mood === 'frozen' && (
        <>
          <line x1="18" y1="26" x2="30" y2="38" stroke={OUTLINE} strokeWidth="2.5" strokeLinecap="round" />
          <line x1="30" y1="26" x2="18" y2="38" stroke={OUTLINE} strokeWidth="2.5" strokeLinecap="round" />
          <line x1="34" y1="26" x2="46" y2="38" stroke={OUTLINE} strokeWidth="2.5" strokeLinecap="round" />
          <line x1="46" y1="26" x2="34" y2="38" stroke={OUTLINE} strokeWidth="2.5" strokeLinecap="round" />
        </>
      )}

      {/* ── Große Löwen-Nase ── */}
      <ellipse cx="32" cy="41" rx="5" ry="4" fill={LION_NOSE} />
      <ellipse cx="30.5" cy="39.5" rx="1.8" ry="1.2" fill="white" opacity="0.3" />

      {/* ── Schnurrhaare ── */}
      <line x1="3"  y1="38" x2="18" y2="41" stroke={OUTLINE} strokeWidth="1" strokeLinecap="round" opacity="0.5" />
      <line x1="3"  y1="44" x2="18" y2="43" stroke={OUTLINE} strokeWidth="1" strokeLinecap="round" opacity="0.5" />
      <line x1="46" y1="41" x2="61" y2="38" stroke={OUTLINE} strokeWidth="1" strokeLinecap="round" opacity="0.5" />
      <line x1="46" y1="43" x2="61" y2="44" stroke={OUTLINE} strokeWidth="1" strokeLinecap="round" opacity="0.5" />

      {/* ── Wangen-Rouge ── */}
      {mood === 'warm' && (
        <>
          <ellipse cx="14" cy="44" rx="7" ry="4" fill="#fca5a5" opacity="0.5" />
          <ellipse cx="50" cy="44" rx="7" ry="4" fill="#fca5a5" opacity="0.5" />
        </>
      )}
      {(mood === 'cold' || mood === 'frozen') && (
        <>
          <ellipse cx="14" cy="44" rx="7" ry="4" fill="#93c5fd" opacity="0.4" />
          <ellipse cx="50" cy="44" rx="7" ry="4" fill="#93c5fd" opacity="0.4" />
        </>
      )}

      {/* ── Mund ── */}
      {mood === 'neutral' && (
        <path d="M25,48 Q32,54 39,48" stroke={OUTLINE} strokeWidth="1.5" strokeLinecap="round" fill="none" />
      )}
      {mood === 'warm' && (
        <>
          <path d="M25,48 Q32,54 39,48" stroke={OUTLINE} strokeWidth="1.5" strokeLinecap="round" fill="none" />
          <ellipse cx="32" cy="52" rx="5" ry="3.5" fill="#f9a8d4" />
          <line x1="32" y1="48" x2="32" y2="52" stroke={OUTLINE} strokeWidth="1" strokeLinecap="round" />
        </>
      )}
      {mood === 'cold' && (
        <path d="M25,50 Q32,45 39,50" stroke={OUTLINE} strokeWidth="1.5" strokeLinecap="round" fill="none" />
      )}
      {mood === 'frozen' && (
        <path
          d="M22,48 Q26,44 30,48 Q34,52 38,48 Q42,44 46,48"
          stroke={OUTLINE} strokeWidth="1.5" strokeLinecap="round" fill="none"
        />
      )}

      {/* ── Schal (kalt + gefroren) ── */}
      {(mood === 'cold' || mood === 'frozen') && (
        <>
          <rect x="12" y="52" width="42" height="10" rx="5" fill="#ef4444" />
          <rect x="12" y="56" width="42" height="3"  rx="1.5" fill="#dc2626" opacity="0.3" />
          <circle cx="53" cy="57" r="6"   fill="#ef4444" />
          <circle cx="53" cy="57" r="3.5" fill="#dc2626" opacity="0.35" />
        </>
      )}
    </svg>
  );
}
