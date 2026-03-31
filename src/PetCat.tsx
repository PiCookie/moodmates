/**
 * Gen1-Style Cat Pet
 *
 * Based on the classic ASCII cat:
 *   /\_/\
 *   (-.-)   ← dash eyes, dot nose
 *   > ^ <   ← paws + tail
 *
 * Mood → temperature:
 *   warm    ≥ 22 °C  Sonnenbrille + Lächeln
 *   neutral  8–22 °C normale Strich-Augen
 *   cold     0–8 °C  besorgte Augen, Schal, Schneeflocken, Zittern
 *   frozen    < 0 °C  X-Augen, Eiszapfen, Schal, starkes Zittern
 */

import type { PetProps } from './pet.shared';
import { getMood, BODY_FILL, OUTLINE, PINK } from './pet.shared';

export function PetCat({ temperature, size = 80, blinking = false }: PetProps) {
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
      aria-label={`Katzen-Maskottchen: ${mood}`}
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

      {/* ── Ohren  /\_/\  ── */}
      {/* Linkes Ohr */}
      <polygon points="6,22 16,4 26,22" fill={body} stroke={OUTLINE} strokeWidth="1.5" strokeLinejoin="round" />
      <polygon points="10,21 16,9 22,21" fill={PINK} />
      {/* Rechtes Ohr */}
      <polygon points="40,22 51,4 61,22" fill={body} stroke={OUTLINE} strokeWidth="1.5" strokeLinejoin="round" />
      <polygon points="44,21 51,9 57,21" fill={PINK} />

      {/* ── Kopf ── */}
      <circle cx="32" cy="38" r="23" fill={body} stroke={OUTLINE} strokeWidth="1.5" />

      {/* ── Schwanz (rechts, nach oben gebogen) ── */}
      <path
        d="M46,66 Q62,58 58,46"
        stroke={OUTLINE} strokeWidth="3" strokeLinecap="round" fill="none"
      />

      {/* ── Körper ── */}
      <ellipse cx="32" cy="65" rx="14" ry="9" fill={body} stroke={OUTLINE} strokeWidth="1.5" />

      {/* ── Pfoten (Arme)  > ^ <  ── */}
      <ellipse cx="12" cy="63" rx="7" ry="4.5" fill={body} stroke={OUTLINE} strokeWidth="1.5" />
      <ellipse cx="52" cy="63" rx="7" ry="4.5" fill={body} stroke={OUTLINE} strokeWidth="1.5" />

      {/* ── Füße (unter dem Körper, wie beim Pinguin) ── */}
      <ellipse cx="23" cy="73" rx="8" ry="3.5" fill={body} stroke={OUTLINE} strokeWidth="1.5" />
      <ellipse cx="41" cy="73" rx="8" ry="3.5" fill={body} stroke={OUTLINE} strokeWidth="1.5" />

      {/* ── Schnurrhaare ── */}
      <line x1="2"  y1="37" x2="17" y2="39" stroke={OUTLINE} strokeWidth="1"   strokeLinecap="round" opacity="0.6" />
      <line x1="2"  y1="43" x2="17" y2="41" stroke={OUTLINE} strokeWidth="1"   strokeLinecap="round" opacity="0.6" />
      <line x1="47" y1="39" x2="62" y2="37" stroke={OUTLINE} strokeWidth="1"   strokeLinecap="round" opacity="0.6" />
      <line x1="47" y1="41" x2="62" y2="43" stroke={OUTLINE} strokeWidth="1"   strokeLinecap="round" opacity="0.6" />

      {/* ── Schneeflocken (kalt + gefroren) ── */}
      {(mood === 'cold' || mood === 'frozen') && (
        <>
          <g stroke="#93c5fd" strokeWidth="1.2" strokeLinecap="round" opacity="0.75">
            <line x1="5" y1="20" x2="5" y2="28" />
            <line x1="1" y1="24" x2="9" y2="24" />
            <line x1="2.4" y1="21.4" x2="7.6" y2="26.6" />
            <line x1="7.6" y1="21.4" x2="2.4" y2="26.6" />
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

      {/* neutral: Strich-Augen wie (-.-) — beim Blinzeln dünne Linie */}
      {mood === 'neutral' && (blinking ? (
        <>
          <rect x="19" y="33" width="9" height="1" rx="0.5" fill={OUTLINE} />
          <rect x="38" y="33" width="9" height="1" rx="0.5" fill={OUTLINE} />
        </>
      ) : (
        <>
          <rect x="19" y="32" width="9" height="3" rx="1.5" fill={OUTLINE} />
          <rect x="38" y="32" width="9" height="3" rx="1.5" fill={OUTLINE} />
        </>
      ))}

      {/* warm: Sonnenbrille */}
      {mood === 'warm' && (
        <>
          {/* Bügel */}
          <line x1="14" y1="33" x2="8"  y2="36" stroke={OUTLINE} strokeWidth="1.5" strokeLinecap="round" />
          <line x1="52" y1="33" x2="58" y2="36" stroke={OUTLINE} strokeWidth="1.5" strokeLinecap="round" />
          {/* Gläser */}
          <rect x="14" y="27" width="14" height="12" rx="4" fill={OUTLINE} />
          <rect x="38" y="27" width="14" height="12" rx="4" fill={OUTLINE} />
          {/* Steg */}
          <line x1="28" y1="32" x2="38" y2="32" stroke={OUTLINE} strokeWidth="2" strokeLinecap="round" />
          {/* Glanz */}
          <rect x="16" y="29" width="4" height="3" rx="1" fill="white" opacity="0.22" />
          <rect x="40" y="29" width="4" height="3" rx="1" fill="white" opacity="0.22" />
        </>
      )}

      {/* cold: besorgte Augen (schräge Striche, innen höher) */}
      {mood === 'cold' && (
        <>
          {/* Augenbrauen (besorgt: innen tief) */}
          <line x1="18" y1="25" x2="29" y2="28" stroke={OUTLINE} strokeWidth="1.5" strokeLinecap="round" />
          <line x1="37" y1="28" x2="48" y2="25" stroke={OUTLINE} strokeWidth="1.5" strokeLinecap="round" />
          {/* Strich-Augen schräg geneigt */}
          <line x1="19" y1="35" x2="29" y2="31" stroke={OUTLINE} strokeWidth="3" strokeLinecap="round" />
          <line x1="37" y1="31" x2="47" y2="35" stroke={OUTLINE} strokeWidth="3" strokeLinecap="round" />
        </>
      )}

      {/* frozen: X-Augen */}
      {mood === 'frozen' && (
        <>
          <line x1="19" y1="28" x2="30" y2="39" stroke={OUTLINE} strokeWidth="2.5" strokeLinecap="round" />
          <line x1="30" y1="28" x2="19" y2="39" stroke={OUTLINE} strokeWidth="2.5" strokeLinecap="round" />
          <line x1="36" y1="28" x2="47" y2="39" stroke={OUTLINE} strokeWidth="2.5" strokeLinecap="round" />
          <line x1="47" y1="28" x2="36" y2="39" stroke={OUTLINE} strokeWidth="2.5" strokeLinecap="round" />
        </>
      )}

      {/* ── Nase (Punkt, wie der `.` in `-.−`) ── */}
      <circle cx="32" cy="40" r="2.5" fill={PINK} />

      {/* ── Wangen-Rouge ── */}
      {mood === 'warm' && (
        <>
          <ellipse cx="14" cy="46" rx="7" ry="4" fill="#fca5a5" opacity="0.5" />
          <ellipse cx="50" cy="46" rx="7" ry="4" fill="#fca5a5" opacity="0.5" />
        </>
      )}
      {(mood === 'cold' || mood === 'frozen') && (
        <>
          <ellipse cx="14" cy="46" rx="7" ry="4" fill="#93c5fd" opacity="0.4" />
          <ellipse cx="50" cy="46" rx="7" ry="4" fill="#93c5fd" opacity="0.4" />
        </>
      )}

      {/* ── Mund ── */}
      {/* warm + neutral: Katzenlächeln (W) */}
      {(mood === 'warm' || mood === 'neutral') && (
        <path
          d="M26,45 Q29,50 32,45 Q35,50 38,45"
          stroke={OUTLINE} strokeWidth="1.5" strokeLinecap="round" fill="none"
        />
      )}
      {/* cold: Schmollmund (Bogen nach oben = Frown) */}
      {mood === 'cold' && (
        <path
          d="M26,49 Q32,44 38,49"
          stroke={OUTLINE} strokeWidth="1.5" strokeLinecap="round" fill="none"
        />
      )}
      {/* frozen: zitternde Wellenlinie */}
      {mood === 'frozen' && (
        <path
          d="M23,47 Q27,43 31,47 Q35,51 39,47 Q43,43 47,47"
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
