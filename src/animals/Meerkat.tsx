/**
 * Erdmännchen im Retro-Stil
 *
 * Erkennungsmerkmale: Aufrechte Wächter-Pose (einziges Tier das so steht),
 * charakteristische dunkle Augenringe, heller Bauch, schlanker Körper.
 * Vorderpfoten auf Brusthöhe angehoben.
 *
 * Mood → temperature:
 *   warm    ≥ 22 °C  Sonnenbrille + Wangenrouge
 *   neutral  8–22 °C  runde Augen mit dunklen Ringen, entspanntes Lächeln
 *   cold     0–8 °C  besorgte Augen, Schal, Schneeflocken, Zittern
 *   frozen    < 0 °C  X-Augen (weiß auf dunklen Ringen), Eiszapfen, Schal
 */

import type { Mood, PetProps } from '../shared';
import { resolveMood, OUTLINE } from '../shared';
import {
  PetSvg, PetShadow, PetIcicles, PetSun,
  PetSweat, PetSnowflakes, PetScarf, PetBlush,
  PetSunglasses, PetWorriedBrows,
} from '../petParts';

const ERDMAENNCHEN_FUR: Record<Mood, string> = {
  frozen:  '#bfdbfe',
  cold:    '#fef3c7',
  neutral: '#c4a882',
  warm:    '#b08060',
};

const ERDMAENNCHEN_BELLY: Record<Mood, string> = {
  frozen:  '#eff6ff',
  cold:    '#fffde7',
  neutral: '#e8d5b7',
  warm:    '#d4b896',
};

const EYE_RING = '#4a3220';

export function Meerkat({ temperature, size = 80, blinking = false, mood: moodOverride }: PetProps) {
  const mood  = resolveMood(temperature, moodOverride);
  const isHot = temperature !== null && temperature >= 28;
  const fur    = ERDMAENNCHEN_FUR[mood];
  const belly  = ERDMAENNCHEN_BELLY[mood];

  return (
    <PetSvg size={size} shivering={mood === 'cold' || mood === 'frozen'} ariaLabel={`Erdmännchen: ${mood}`}>
      <PetShadow cx={32} />
      <PetIcicles mood={mood} y={71} />

      {/* ── Schwanz (hinter Körper, leicht geschwungen) ── */}
      <path d="M38,72 Q46,65 44,54 Q43,46 47,40" stroke={OUTLINE} strokeWidth="5" strokeLinecap="round" fill="none" />
      <path d="M38,72 Q46,65 44,54 Q43,46 47,40" stroke={fur}     strokeWidth="3" strokeLinecap="round" fill="none" />

      {/* ── Hinterbeine/Füße ── */}
      <ellipse cx="24" cy="73" rx="8"  ry="3.5" fill={fur} stroke={OUTLINE} strokeWidth="1" />
      <ellipse cx="40" cy="73" rx="8"  ry="3.5" fill={fur} stroke={OUTLINE} strokeWidth="1" />

      {/* ── Körper (aufrecht, schmal) — cy=55 damit Oberkante (y=39) in Kopf hineinragt ── */}
      <ellipse cx="32" cy="55" rx="9" ry="16" fill={fur} stroke={OUTLINE} strokeWidth="1.5" />

      {/* ── Heller Bauch ── */}
      <ellipse cx="32" cy="55" rx="5.5" ry="11" fill={belly} />

      {/* ── Vorderpfoten (auf Brusthöhe, die charakteristische Wächter-Pose) ── */}
      {/* Outline mit butt-Caps: Linie umrandet, aber keine Outline an den Verbindungspunkten */}
      <line x1="22" y1="53" x2="15" y2="52" stroke={OUTLINE} strokeWidth="7" strokeLinecap="butt" />
      <line x1="22" y1="53" x2="15" y2="52" stroke={fur}     strokeWidth="5" strokeLinecap="round" />
      <line x1="42" y1="53" x2="49" y2="52" stroke={OUTLINE} strokeWidth="7" strokeLinecap="butt" />
      <line x1="42" y1="53" x2="49" y2="52" stroke={fur}     strokeWidth="5" strokeLinecap="round" />
      {/* Hand-Ellipsen über den Linien, damit der Linienabschluss verdeckt wird */}
      <ellipse cx="13" cy="52" rx="5" ry="4" fill={fur} stroke={OUTLINE} strokeWidth="1.3" transform="rotate(-20 13 52)" />
      <ellipse cx="51" cy="52" rx="5" ry="4" fill={fur} stroke={OUTLINE} strokeWidth="1.3" transform="rotate(20 51 52)" />

      {/* ── Spitze Ohren (hinter Kopf) ── */}
      <ellipse cx="23" cy="16" rx="5" ry="7" fill={fur} stroke={OUTLINE} strokeWidth="1.3" transform="rotate(-15 23 16)" />
      <ellipse cx="41" cy="16" rx="5" ry="7" fill={fur} stroke={OUTLINE} strokeWidth="1.3" transform="rotate(15 41 16)" />
      <ellipse cx="23" cy="16" rx="2.5" ry="4" fill="#fca5a5" transform="rotate(-15 23 16)" />
      <ellipse cx="41" cy="16" rx="2.5" ry="4" fill="#fca5a5" transform="rotate(15 41 16)" />

      {/* ── Kopf ── */}
      <circle cx="32" cy="27" r="13" fill={fur} stroke={OUTLINE} strokeWidth="1.5" />

      {/* ── Dunkle Augenringe (Hauptmerkmal) ── */}
      <ellipse cx="25" cy="26" rx="5.5" ry="5" fill={EYE_RING} opacity="0.9" />
      <ellipse cx="39" cy="26" rx="5.5" ry="5" fill={EYE_RING} opacity="0.9" />

      <PetSnowflakes mood={mood} left={{ x: 4, y: 13 }} right={{ x: 60, y: 13 }} />
      <PetSun mood={mood} cx={58} cy={10} />
      <PetSweat isHot={isHot} x={6} y={12} />

      {/* ── Augen (innerhalb der Ringe, weiß-auf-dunkel) ── */}
      {mood === 'neutral' && (blinking ? (
        <>
          <line x1="21" y1="26" x2="29" y2="26" stroke="white" strokeWidth="2" strokeLinecap="round" />
          <line x1="35" y1="26" x2="43" y2="26" stroke="white" strokeWidth="2" strokeLinecap="round" />
        </>
      ) : (
        <>
          <circle cx="25" cy="26" r="3"   fill="white"   opacity="0.9" />
          <circle cx="39" cy="26" r="3"   fill="white"   opacity="0.9" />
          <circle cx="25" cy="26" r="1.8" fill={OUTLINE} />
          <circle cx="39" cy="26" r="1.8" fill={OUTLINE} />
          <circle cx="24" cy="25" r="0.8" fill="white"   opacity="0.7" />
          <circle cx="38" cy="25" r="0.8" fill="white"   opacity="0.7" />
        </>
      ))}

      {/* ── Sonnenbrille (verdeckt Augenringe) ── */}
      <PetSunglasses
        mood={mood}
        frame={{ y: 21, w: 12, h: 10, rx: 4 }}
        leftX={17} rightX={33}
        leftTemple={[17, 26, 8, 29]}
        rightTemple={[45, 26, 54, 29]}
      />

      <PetWorriedBrows
        mood={mood}
        leftBrow={{ x1: 18, y1: 18, x2: 29, y2: 21 }}
        rightBrow={{ x1: 35, y1: 21, x2: 46, y2: 18 }}
      />
      {mood === 'cold' && (
        <>
          <circle cx="25" cy="27" r="3"   fill="white"   opacity="0.9" />
          <circle cx="39" cy="27" r="3"   fill="white"   opacity="0.9" />
          <circle cx="25" cy="27" r="1.8" fill={OUTLINE} />
          <circle cx="39" cy="27" r="1.8" fill={OUTLINE} />
        </>
      )}

      {/* ── Frozen X-Augen (weiß auf dunklen Ringen) ── */}
      {mood === 'frozen' && (
        <>
          <line x1="21" y1="22" x2="29" y2="30" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="29" y1="22" x2="21" y2="30" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="35" y1="22" x2="43" y2="30" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="43" y1="22" x2="35" y2="30" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
        </>
      )}

      {/* ── Nase ── */}
      <ellipse cx="32" cy="33" rx="3" ry="2.5" fill={OUTLINE} opacity="0.7" />
      <ellipse cx="31" cy="32" rx="1.2" ry="0.9" fill="white" opacity="0.3" />

      <PetBlush mood={mood} leftCx={19} rightCx={45} cy={33} rx={5} ry={3} />

      {/* ── Mund ── */}
      {mood === 'neutral' && (
        <path d="M28,36 Q32,40 36,36" stroke={OUTLINE} strokeWidth="1.5" strokeLinecap="round" fill="none" />
      )}
      {mood === 'warm' && (
        <path d="M27,36 Q32,41 37,36" stroke={OUTLINE} strokeWidth="1.5" strokeLinecap="round" fill="none" />
      )}
      {mood === 'cold' && (
        <path d="M28,38 Q32,34 36,38" stroke={OUTLINE} strokeWidth="1.5" strokeLinecap="round" fill="none" />
      )}
      {mood === 'frozen' && (
        <path d="M26,37 Q29,33 32,37 Q35,33 38,37" stroke={OUTLINE} strokeWidth="1.5" strokeLinecap="round" fill="none" />
      )}

      <PetScarf mood={mood} x={21} y={39} width={22} knotCx={42} knotCy={44} small />
    </PetSvg>
  );
}
