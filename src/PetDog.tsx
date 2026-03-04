/**
 * Gen1-Style Dog Pet
 *
 * Erkennungsmerkmale:
 *   - Hängeohren (floppy ears), die seitlich herabhängen
 *   - Runde Pupillenaugen mit Glanz
 *   - Große ovale Nase
 *   - Keine Schnurrhaare
 *   - Zunge rausstrecken (warm) — klassisches Hundezeichen
 *   - Kurzer Stummelschwanz
 *
 * Mood → temperature: identisch zur Katze
 *   warm    ≥ 22 °C  Sonnenbrille + Zunge + Wangenrouge
 *   neutral  8–22 °C  runde Augen, Hundelächeln
 *   cold     0–8 °C  besorgte Augen, Schal, Schneeflocken, Zittern
 *   frozen    < 0 °C  X-Augen, Eiszapfen, Schal, starkes Zittern
 */

import type { PetProps } from './pet.shared';
import { getMood, BODY_FILL, OUTLINE, PINK } from './pet.shared';

export function PetDog({ temperature, size = 80, blinking = false }: PetProps) {
  const mood      = getMood(temperature);
  const isHot     = temperature !== null && temperature >= 28;
  const shivering = mood === 'cold' || mood === 'frozen';
  const body      = BODY_FILL[mood];

  return (
    <svg
      width={size}
      height={Math.round(size * (88 / 66))}
      viewBox="0 0 66 88"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={shivering ? 'animate-shiver' : undefined}
      aria-label={`Hunde-Maskottchen: ${mood}`}
    >
      {/* ── Schatten ── */}
      <ellipse cx="30" cy="86" rx="16" ry="2" fill="rgba(0,0,0,0.15)" />

      {/* ── Eiszapfen (gefroren) ── */}
      {mood === 'frozen' && (
        <>
          <polygon points="19,73 25,73 22,83" fill="#93c5fd" />
          <polygon points="29,73 37,73 33,85" fill="#bfdbfe" />
          <polygon points="41,73 47,73 44,83" fill="#93c5fd" />
        </>
      )}

      {/* ── Hängeohren — vor dem Kopf gezeichnet, damit Kopf sie überlappt ── */}
      {/* Linkes Ohr */}
      <path
        d="M14,24 Q3,32 5,47 Q8,55 15,53 Q21,49 19,30 Z"
        fill={body} stroke={OUTLINE} strokeWidth="1.5" strokeLinejoin="round"
      />
      <path
        d="M14,28 Q7,35 9,46 Q11,51 15,50 Q19,46 18,33 Z"
        fill={PINK}
      />
      {/* Rechtes Ohr */}
      <path
        d="M52,24 Q63,32 61,47 Q58,55 51,53 Q45,49 47,30 Z"
        fill={body} stroke={OUTLINE} strokeWidth="1.5" strokeLinejoin="round"
      />
      <path
        d="M52,28 Q59,35 57,46 Q55,51 51,50 Q47,46 48,33 Z"
        fill={PINK}
      />

      {/* ── Kopf ── */}
      <circle cx="32" cy="36" r="21" fill={body} stroke={OUTLINE} strokeWidth="1.5" />

      {/* ── Schwanz (kurz, leicht gebogen nach oben) ── */}
      <path
        d="M44,64 Q57,53 53,43"
        stroke={OUTLINE} strokeWidth="3" strokeLinecap="round" fill="none"
      />

      {/* ── Körper ── */}
      <ellipse cx="32" cy="65" rx="15" ry="9" fill={body} stroke={OUTLINE} strokeWidth="1.5" />

      {/* ── Pfoten ── */}
      <ellipse cx="12" cy="63" rx="7" ry="4.5" fill={body} stroke={OUTLINE} strokeWidth="1.5" />
      <ellipse cx="52" cy="63" rx="7" ry="4.5" fill={body} stroke={OUTLINE} strokeWidth="1.5" />

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
          <line x1="58" y1="4"  x2="58" y2="2"  stroke="#fbbf24" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="64" y1="7"  x2="66" y2="5.4" stroke="#fbbf24" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="66" y1="13" x2="66" y2="13"  stroke="#fbbf24" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="64" y1="18" x2="66" y2="20"  stroke="#fbbf24" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="52" y1="7"  x2="50" y2="5.4" stroke="#fbbf24" strokeWidth="1.5" strokeLinecap="round" />
        </g>
      )}

      {/* ── Schweiß-Tropfen (sehr heiß ≥ 28 °C) ── */}
      {isHot && (
        <path d="M6,14 Q8,8 10,14 A3.5 3.5 0 0 1 6 14" fill="#93c5fd" opacity="0.85" />
      )}

      {/* ══════════════ AUGEN (je nach Mood) ══════════════ */}

      {/* neutral: runde Pupillenaugen mit Glanz — beim Blinzeln geschwungene Linie */}
      {mood === 'neutral' && (blinking ? (
        <>
          <path d="M19,32 Q23,28 27,32" stroke={OUTLINE} strokeWidth="2.5" strokeLinecap="round" fill="none" />
          <path d="M37,32 Q41,28 45,32" stroke={OUTLINE} strokeWidth="2.5" strokeLinecap="round" fill="none" />
        </>
      ) : (
        <>
          <circle cx="23" cy="32" r="4" fill={OUTLINE} />
          <circle cx="41" cy="32" r="4" fill={OUTLINE} />
          <circle cx="24.5" cy="30.5" r="1.3" fill="white" opacity="0.65" />
          <circle cx="42.5" cy="30.5" r="1.3" fill="white" opacity="0.65" />
        </>
      ))}

      {/* warm: Sonnenbrille */}
      {mood === 'warm' && (
        <>
          {/* Bügel */}
          <line x1="14" y1="32" x2="8"  y2="35" stroke={OUTLINE} strokeWidth="1.5" strokeLinecap="round" />
          <line x1="52" y1="32" x2="58" y2="35" stroke={OUTLINE} strokeWidth="1.5" strokeLinecap="round" />
          {/* Gläser */}
          <rect x="14" y="26" width="14" height="12" rx="4" fill={OUTLINE} />
          <rect x="38" y="26" width="14" height="12" rx="4" fill={OUTLINE} />
          {/* Steg */}
          <line x1="28" y1="31" x2="38" y2="31" stroke={OUTLINE} strokeWidth="2" strokeLinecap="round" />
          {/* Glanz */}
          <rect x="16" y="28" width="4" height="3" rx="1" fill="white" opacity="0.22" />
          <rect x="40" y="28" width="4" height="3" rx="1" fill="white" opacity="0.22" />
        </>
      )}

      {/* cold: besorgte Augen mit Augenbrauen */}
      {mood === 'cold' && (
        <>
          {/* Besorgte Brauen: innen tiefer */}
          <line x1="18" y1="24" x2="29" y2="27" stroke={OUTLINE} strokeWidth="1.5" strokeLinecap="round" />
          <line x1="37" y1="27" x2="48" y2="24" stroke={OUTLINE} strokeWidth="1.5" strokeLinecap="round" />
          {/* Runde traurige Augen */}
          <circle cx="23" cy="33" r="4" fill={OUTLINE} />
          <circle cx="41" cy="33" r="4" fill={OUTLINE} />
          <circle cx="24.5" cy="31.5" r="1.3" fill="white" opacity="0.65" />
          <circle cx="42.5" cy="31.5" r="1.3" fill="white" opacity="0.65" />
        </>
      )}

      {/* frozen: X-Augen */}
      {mood === 'frozen' && (
        <>
          <line x1="18" y1="27" x2="29" y2="38" stroke={OUTLINE} strokeWidth="2.5" strokeLinecap="round" />
          <line x1="29" y1="27" x2="18" y2="38" stroke={OUTLINE} strokeWidth="2.5" strokeLinecap="round" />
          <line x1="37" y1="27" x2="48" y2="38" stroke={OUTLINE} strokeWidth="2.5" strokeLinecap="round" />
          <line x1="48" y1="27" x2="37" y2="38" stroke={OUTLINE} strokeWidth="2.5" strokeLinecap="round" />
        </>
      )}

      {/* ── Große Hundenase ── */}
      <ellipse cx="32" cy="41" rx="5.5" ry="4" fill={OUTLINE} />
      <ellipse cx="30.5" cy="39.5" rx="1.8" ry="1.2" fill="white" opacity="0.35" />

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
      {/* neutral: Hundelächeln (einfacher Bogen nach unten) */}
      {mood === 'neutral' && (
        <path
          d="M25,47 Q32,53 39,47"
          stroke={OUTLINE} strokeWidth="1.5" strokeLinecap="round" fill="none"
        />
      )}
      {/* warm: offener Mund mit Zunge (Hund hechelt) */}
      {mood === 'warm' && (
        <>
          <path
            d="M25,47 Q32,54 39,47"
            stroke={OUTLINE} strokeWidth="1.5" strokeLinecap="round" fill="none"
          />
          {/* Zunge */}
          <ellipse cx="32" cy="51" rx="5" ry="3.5" fill="#f9a8d4" />
          <line x1="32" y1="47" x2="32" y2="51" stroke={OUTLINE} strokeWidth="1" strokeLinecap="round" />
        </>
      )}
      {/* cold: Schmollmund (Bogen nach oben = Frown) */}
      {mood === 'cold' && (
        <path
          d="M26,50 Q32,45 38,50"
          stroke={OUTLINE} strokeWidth="1.5" strokeLinecap="round" fill="none"
        />
      )}
      {/* frozen: zitternde Wellenlinie */}
      {mood === 'frozen' && (
        <path
          d="M23,48 Q27,44 31,48 Q35,52 39,48 Q43,44 47,48"
          stroke={OUTLINE} strokeWidth="1.5" strokeLinecap="round" fill="none"
        />
      )}

      {/* ── Schal (kalt + gefroren) ── */}
      {(mood === 'cold' || mood === 'frozen') && (
        <>
          <rect x="10" y="53" width="44" height="10" rx="5" fill="#ef4444" />
          <rect x="10" y="57" width="44" height="3"  rx="1.5" fill="#dc2626" opacity="0.3" />
          {/* Knoten rechts */}
          <circle cx="53" cy="58" r="6"   fill="#ef4444" />
          <circle cx="53" cy="58" r="3.5" fill="#dc2626" opacity="0.35" />
        </>
      )}
    </svg>
  );
}
