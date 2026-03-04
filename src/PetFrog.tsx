/**
 * Gen1-Style Frog Pet
 *
 * Erkennungsmerkmale:
 *   - Breiter, flacher Kopf mit hervorquellenden Kulleraugen
 *   - Grüner Körper (mood-tinted: warm=gelbgrün, cold=blaugrün, frozen=eisig)
 *   - Breites Frosch-Lächeln
 *   - Klebrige Zunge (warm) — klassisches Frosch-Zeichen
 *   - Kleine Nasenlöcher
 *   - Kurze Gliedmaßen
 *
 * Mood → temperature: identisch zu Katze/Hund
 *   warm    ≥ 22 °C  Sonnenbrille + Zunge + Wangenrouge + Sonne
 *   neutral  8–22 °C  Kulleraugen, breites Grinsen
 *   cold     0–8 °C  besorgte Augen, Schal, Schneeflocken, Zittern
 *   frozen    < 0 °C  X-Augen, Eiszapfen, Schal, starkes Zittern
 */

import type { Mood, PetProps } from './pet.shared';
import { getMood, OUTLINE } from './pet.shared';

// Grüntöne, die sich mit dem Mood verändern
const FROG_BODY: Record<Mood, string> = {
  frozen:  '#c7d2fe',  // eisiges Lila-Blau (gefroren)
  cold:    '#a5f3fc',  // kühles Cyan-Mint (kalt)
  neutral: '#86efac',  // frisches Hellgrün
  warm:    '#d9f99d',  // warmes Gelbgrün (sonnenbadender Frosch)
};

const FROG_DARK: Record<Mood, string> = {
  frozen:  '#6366f1',
  cold:    '#0891b2',
  neutral: '#16a34a',
  warm:    '#65a30d',
};

export function PetFrog({ temperature, size = 80, blinking = false }: PetProps) {
  const mood      = getMood(temperature);
  const isHot     = temperature !== null && temperature >= 28;
  const shivering = mood === 'cold' || mood === 'frozen';
  const body      = FROG_BODY[mood];
  const dark      = FROG_DARK[mood];

  return (
    <svg
      width={size}
      height={Math.round(size * (88 / 66))}
      viewBox="0 0 66 88"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={shivering ? 'animate-shiver' : undefined}
      aria-label={`Frosch-Maskottchen: ${mood}`}
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

      {/* ── Körper ── */}
      <ellipse cx="32" cy="65" rx="15" ry="10" fill={body} stroke={dark} strokeWidth="1.5" />

      {/* ── Gliedmaßen (Arme + Beine) ── */}
      <ellipse cx="11" cy="63" rx="8" ry="4.5" fill={body} stroke={dark} strokeWidth="1.5" />
      <ellipse cx="53" cy="63" rx="8" ry="4.5" fill={body} stroke={dark} strokeWidth="1.5" />

      {/* ── Augen-Kugeln — VOR dem Kopf, damit sie herausragen ── */}
      {/* Linker Augapfel */}
      <circle cx="20" cy="28" r="9" fill={body} stroke={dark} strokeWidth="1.5" />
      {/* Rechter Augapfel */}
      <circle cx="44" cy="28" r="9" fill={body} stroke={dark} strokeWidth="1.5" />

      {/* ── Kopf (überlagert die Unterseite der Augenkugeln) ── */}
      <ellipse cx="32" cy="43" rx="21" ry="17" fill={body} stroke={dark} strokeWidth="1.5" />

      {/* ── Schneeflocken (kalt + gefroren) ── */}
      {(mood === 'cold' || mood === 'frozen') && (
        <>
          <g stroke="#93c5fd" strokeWidth="1.2" strokeLinecap="round" opacity="0.75">
            <line x1="3" y1="48" x2="3" y2="56" />
            <line x1="-1" y1="52" x2="7" y2="52" />
            <line x1="0.4" y1="49.4" x2="5.6" y2="54.6" />
            <line x1="5.6" y1="49.4" x2="0.4" y2="54.6" />
          </g>
          <g stroke="#bfdbfe" strokeWidth="1" strokeLinecap="round" opacity="0.55">
            <line x1="60" y1="48" x2="60" y2="54" />
            <line x1="57" y1="51" x2="63" y2="51" />
            <line x1="58.1" y1="49.1" x2="61.9" y2="52.9" />
            <line x1="61.9" y1="49.1" x2="58.1" y2="52.9" />
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
        <path d="M6,44 Q8,38 10,44 A3.5 3.5 0 0 1 6 44" fill="#93c5fd" opacity="0.85" />
      )}

      {/* ══════════════ AUGEN-PUPILLEN (je nach Mood) ══════════════ */}

      {/* neutral: große runde Pupillen mit Glanz — beim Blinzeln flache Ellipse */}
      {mood === 'neutral' && (blinking ? (
        <>
          <ellipse cx="20" cy="29" rx="6" ry="2.5" fill={OUTLINE} />
          <ellipse cx="44" cy="29" rx="6" ry="2.5" fill={OUTLINE} />
        </>
      ) : (
        <>
          <circle cx="20" cy="29" r="6" fill={OUTLINE} />
          <circle cx="44" cy="29" r="6" fill={OUTLINE} />
          <circle cx="17.5" cy="26.5" r="2" fill="white" opacity="0.7" />
          <circle cx="41.5" cy="26.5" r="2" fill="white" opacity="0.7" />
        </>
      ))}

      {/* warm: Sonnenbrille (über die großen Augenkugeln) */}
      {mood === 'warm' && (
        <>
          <line x1="10" y1="28" x2="4"  y2="32" stroke={OUTLINE} strokeWidth="1.5" strokeLinecap="round" />
          <line x1="56" y1="28" x2="62" y2="32" stroke={OUTLINE} strokeWidth="1.5" strokeLinecap="round" />
          <rect x="10" y="20" width="20" height="16" rx="6" fill={OUTLINE} />
          <rect x="36" y="20" width="20" height="16" rx="6" fill={OUTLINE} />
          <line x1="30" y1="27" x2="36" y2="27" stroke={OUTLINE} strokeWidth="2" strokeLinecap="round" />
          <rect x="12" y="22" width="5" height="4" rx="1.5" fill="white" opacity="0.22" />
          <rect x="38" y="22" width="5" height="4" rx="1.5" fill="white" opacity="0.22" />
        </>
      )}

      {/* cold: besorgte Augen mit Brauen auf den Augenkugeln */}
      {mood === 'cold' && (
        <>
          {/* Besorgte Brauen */}
          <line x1="12" y1="21" x2="22" y2="24" stroke={OUTLINE} strokeWidth="1.5" strokeLinecap="round" />
          <line x1="42" y1="24" x2="52" y2="21" stroke={OUTLINE} strokeWidth="1.5" strokeLinecap="round" />
          {/* Traurige Pupillen */}
          <circle cx="20" cy="30" r="6" fill={OUTLINE} />
          <circle cx="44" cy="30" r="6" fill={OUTLINE} />
          <circle cx="17.5" cy="27.5" r="2" fill="white" opacity="0.7" />
          <circle cx="41.5" cy="27.5" r="2" fill="white" opacity="0.7" />
        </>
      )}

      {/* frozen: X-Augen über die Augenkugeln */}
      {mood === 'frozen' && (
        <>
          <line x1="13" y1="21" x2="27" y2="35" stroke={OUTLINE} strokeWidth="2.5" strokeLinecap="round" />
          <line x1="27" y1="21" x2="13" y2="35" stroke={OUTLINE} strokeWidth="2.5" strokeLinecap="round" />
          <line x1="37" y1="21" x2="51" y2="35" stroke={OUTLINE} strokeWidth="2.5" strokeLinecap="round" />
          <line x1="51" y1="21" x2="37" y2="35" stroke={OUTLINE} strokeWidth="2.5" strokeLinecap="round" />
        </>
      )}

      {/* ── Nasenlöcher (kleine Punkte) ── */}
      <circle cx="29" cy="44" r="1.5" fill={dark} opacity="0.6" />
      <circle cx="35" cy="44" r="1.5" fill={dark} opacity="0.6" />

      {/* ── Wangen-Rouge ── */}
      {mood === 'warm' && (
        <>
          <ellipse cx="13" cy="50" rx="6" ry="3.5" fill="#fca5a5" opacity="0.5" />
          <ellipse cx="51" cy="50" rx="6" ry="3.5" fill="#fca5a5" opacity="0.5" />
        </>
      )}
      {(mood === 'cold' || mood === 'frozen') && (
        <>
          <ellipse cx="13" cy="50" rx="6" ry="3.5" fill="#93c5fd" opacity="0.4" />
          <ellipse cx="51" cy="50" rx="6" ry="3.5" fill="#93c5fd" opacity="0.4" />
        </>
      )}

      {/* ── Mund ── */}
      {/* neutral: breites Frosch-Grinsen */}
      {mood === 'neutral' && (
        <path
          d="M16,51 Q32,62 48,51"
          stroke={OUTLINE} strokeWidth="1.5" strokeLinecap="round" fill="none"
        />
      )}
      {/* warm: weit geöffnetes Maul + klebrige Zunge */}
      {mood === 'warm' && (
        <>
          <path
            d="M16,51 Q32,63 48,51"
            stroke={OUTLINE} strokeWidth="1.5" strokeLinecap="round" fill="none"
          />
          {/* Klebrige Zunge rollt heraus */}
          <ellipse cx="32" cy="58" rx="8" ry="5" fill="#f9a8d4" />
          <ellipse cx="32" cy="62" rx="5" ry="3" fill="#f472b6" opacity="0.7" />
          <line x1="32" y1="51" x2="32" y2="58" stroke={OUTLINE} strokeWidth="1" strokeLinecap="round" />
        </>
      )}
      {/* cold: breiter Schmollmund */}
      {mood === 'cold' && (
        <path
          d="M18,55 Q32,47 46,55"
          stroke={OUTLINE} strokeWidth="1.5" strokeLinecap="round" fill="none"
        />
      )}
      {/* frozen: zitternde Wellenlinie */}
      {mood === 'frozen' && (
        <path
          d="M16,52 Q21,48 26,52 Q31,56 36,52 Q41,48 46,52"
          stroke={OUTLINE} strokeWidth="1.5" strokeLinecap="round" fill="none"
        />
      )}

      {/* ── Schal (kalt + gefroren) ── */}
      {(mood === 'cold' || mood === 'frozen') && (
        <>
          <rect x="10" y="58" width="44" height="10" rx="5" fill="#ef4444" />
          <rect x="10" y="62" width="44" height="3"  rx="1.5" fill="#dc2626" opacity="0.3" />
          <circle cx="53" cy="63" r="6"   fill="#ef4444" />
          <circle cx="53" cy="63" r="3.5" fill="#dc2626" opacity="0.35" />
        </>
      )}
    </svg>
  );
}
