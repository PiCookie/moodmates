/**
 * Faultier im Retro-Stil
 *
 * Erkennungsmerkmale: Hängt kopfüber an einem Ast (einzigartige Pose),
 * breites Dauerlächeln, halb geschlossene Schlafaugen, lange Arme mit Klauen.
 *
 * Schichten (hinten → vorne):
 *   Ast → Arme → Körper → Kopf → Gesicht
 *
 * Mood → temperature:
 *   warm    ≥ 22 °C  Sonnenbrille + Wangenrouge
 *   neutral  8–22 °C  Schlafaugen, breites Lächeln
 *   cold     0–8 °C  besorgte Augen, Schal, Schneeflocken, Zittern
 *   frozen    < 0 °C  X-Augen, Eiszapfen, Schal, starkes Zittern
 */

import type { Mood, PetProps } from '../shared';
import { resolveMood, OUTLINE } from '../shared';
import {
  PetSvg, PetShadow, PetIcicles, PetSun,
  PetSweat, PetSnowflakes, PetScarf, PetBlush,
  PetSunglasses, PetWorriedBrows,
} from '../petParts';

const FAULTIER_FUR: Record<Mood, string> = {
  frozen:  '#c7d2fe', // eisblau
  cold:    '#94a3b8', // kühles Grau
  neutral: '#78716c', // graubraun
  warm:    '#a8895a', // warmes Braun
};

const FAULTIER_BELLY: Record<Mood, string> = {
  frozen:  '#dbeafe',
  cold:    '#cbd5e1',
  neutral: '#a8a29e',
  warm:    '#c4a57a',
};

const BRANCH   = '#8b5e3c';
const EYE_MASK = '#1a1208'; // dunkle Augenmasken — Faultier-Hauptmerkmal

export function Sloth({ temperature, size = 80, blinking = false, mood: moodOverride }: PetProps) {
  const mood  = resolveMood(temperature, moodOverride);
  const isHot = temperature !== null && temperature >= 28;
  const fur   = FAULTIER_FUR[mood];
  const belly = FAULTIER_BELLY[mood];

  return (
    <PetSvg size={size} shivering={mood === 'cold' || mood === 'frozen'} ariaLabel={`Faultier: ${mood}`}>
      <PetShadow cx={32} />
      <PetIcicles mood={mood} y={77} />

      {/* ── Ast (oben, Hauptpose-Element) ── */}
      <rect x="3" y="5" width="60" height="6" rx="3" fill={BRANCH} stroke={OUTLINE} strokeWidth="1.2" />
      {/* Aststruktur */}
      <line x1="3" y1="8" x2="63" y2="8" stroke="#6b4426" strokeWidth="0.8" opacity="0.5" />

      {/* ── Lange Arme (hängen vom Ast hinunter, enden im Körper) ── */}
      <path d="M20,11 Q16,32 18,54" stroke={OUTLINE} strokeWidth="9"  strokeLinecap="round" fill="none" />
      <path d="M20,11 Q16,32 18,54" stroke={fur}     strokeWidth="7"  strokeLinecap="round" fill="none" />
      <path d="M44,11 Q48,32 46,54" stroke={OUTLINE} strokeWidth="9"  strokeLinecap="round" fill="none" />
      <path d="M44,11 Q48,32 46,54" stroke={fur}     strokeWidth="7"  strokeLinecap="round" fill="none" />

      {/* ── Klauen (an der Oberfläche des Armanfangs, fächern auf) ── */}
      <path d="M16,11 Q13,8 14,5"  stroke={OUTLINE} strokeWidth="1.8" strokeLinecap="round" fill="none" />
      <path d="M20,9  Q19,6 19,4"  stroke={OUTLINE} strokeWidth="1.8" strokeLinecap="round" fill="none" />
      <path d="M24,11 Q26,8 26,5"  stroke={OUTLINE} strokeWidth="1.8" strokeLinecap="round" fill="none" />
      <path d="M40,11 Q38,8 38,5"  stroke={OUTLINE} strokeWidth="1.8" strokeLinecap="round" fill="none" />
      <path d="M44,9  Q44,6 45,4"  stroke={OUTLINE} strokeWidth="1.8" strokeLinecap="round" fill="none" />
      <path d="M48,11 Q51,8 50,5"  stroke={OUTLINE} strokeWidth="1.8" strokeLinecap="round" fill="none" />

      {/* ── Füße ── */}
      <ellipse cx="23" cy="76" rx="8" ry="3.5" fill={fur} stroke={OUTLINE} strokeWidth="1" />
      <ellipse cx="41" cy="76" rx="8" ry="3.5" fill={fur} stroke={OUTLINE} strokeWidth="1" />

      {/* ── Körper (runder, hängender Bauch) ── */}
      <ellipse cx="32" cy="64" rx="15" ry="12" fill={fur}   stroke={OUTLINE} strokeWidth="1.5" />
      <ellipse cx="32" cy="66" rx="9"  ry="8"  fill={belly} />

      {/* ── Kopf ── */}
      <circle cx="32" cy="42" r="14" fill={fur} stroke={OUTLINE} strokeWidth="1.5" />

      {/* ── Helles Gesichtszentrum ── */}
      <ellipse cx="32" cy="44" rx="9" ry="8" fill={belly} opacity="0.6" />

      {/* ── Dunkle Augenmasken (Faultier-Hauptmerkmal) ── */}
      <ellipse cx="25.5" cy="39" rx="5.5" ry="5" fill={EYE_MASK} opacity="0.8" />
      <ellipse cx="38.5" cy="39" rx="5.5" ry="5" fill={EYE_MASK} opacity="0.8" />

      <PetSnowflakes mood={mood} left={{ x: 3, y: 28 }} right={{ x: 60, y: 28 }} />
      <PetSun mood={mood} />
      <PetSweat isHot={isHot} y={16} />

      {/* ── Augen (weiß auf dunklen Masken, mit schläfrigem Augenlid) ── */}
      {mood === 'neutral' && (blinking ? (
        <>
          <line x1="22" y1="39" x2="29" y2="39" stroke="white" strokeWidth="2" strokeLinecap="round" />
          <line x1="35" y1="39" x2="42" y2="39" stroke="white" strokeWidth="2" strokeLinecap="round" />
        </>
      ) : (
        <>
          <circle cx="25.5" cy="39" r="3"   fill="white"   opacity="0.9" />
          <circle cx="38.5" cy="39" r="3"   fill="white"   opacity="0.9" />
          <circle cx="25.5" cy="39" r="1.7" fill={OUTLINE} />
          <circle cx="38.5" cy="39" r="1.7" fill={OUTLINE} />
          <circle cx="24.5" cy="38" r="0.7" fill="white"   opacity="0.7" />
          <circle cx="37.5" cy="38" r="0.7" fill="white"   opacity="0.7" />
          {/* Schläfriges Augenlid — fur-farbene Fläche über oberer Augenhälfte */}
          <path d="M22.5,39 Q25.5,35.5 28.5,39" fill={fur} />
          <path d="M35.5,39 Q38.5,35.5 41.5,39" fill={fur} />
        </>
      ))}

      <PetSunglasses
        mood={mood}
        frame={{ y: 33, w: 14, h: 11, rx: 4 }}
        leftX={15} rightX={37}
        leftTemple={[15, 39, 7, 42]}
        rightTemple={[51, 39, 59, 42]}
      />

      <PetWorriedBrows
        mood={mood}
        leftBrow={{ x1: 18, y1: 32, x2: 29, y2: 35 }}
        rightBrow={{ x1: 35, y1: 35, x2: 46, y2: 32 }}
      />
      {mood === 'cold' && (
        <>
          <circle cx="25.5" cy="39" r="3"   fill="white"   opacity="0.9" />
          <circle cx="38.5" cy="39" r="3"   fill="white"   opacity="0.9" />
          <circle cx="25.5" cy="39" r="1.7" fill={OUTLINE} />
          <circle cx="38.5" cy="39" r="1.7" fill={OUTLINE} />
          <circle cx="24.5" cy="38" r="0.7" fill="white"   opacity="0.7" />
          <circle cx="37.5" cy="38" r="0.7" fill="white"   opacity="0.7" />
        </>
      )}

      {mood === 'frozen' && (
        <>
          {/* X-Augen auf dunklen Masken */}
          <line x1="23" y1="36" x2="28" y2="41" stroke="white" strokeWidth="2" strokeLinecap="round" />
          <line x1="28" y1="36" x2="23" y2="41" stroke="white" strokeWidth="2" strokeLinecap="round" />
          <line x1="36" y1="36" x2="41" y2="41" stroke="white" strokeWidth="2" strokeLinecap="round" />
          <line x1="41" y1="36" x2="36" y2="41" stroke="white" strokeWidth="2" strokeLinecap="round" />
        </>
      )}

      {/* ── Nase ── */}
      <ellipse cx="32" cy="47" rx="2.5" ry="1.8" fill={OUTLINE} opacity="0.75" />
      <ellipse cx="31.2" cy="46.3" rx="0.9" ry="0.7" fill="white" opacity="0.3" />

      <PetBlush mood={mood} leftCx={17} rightCx={47} cy={49} rx={5} ry={3} />

      {/* ── Mund ── */}
      {mood === 'neutral' && (
        <path d="M25,49 Q32,54 39,49" stroke={OUTLINE} strokeWidth="1.5" strokeLinecap="round" fill="none" />
      )}
      {mood === 'warm' && (
        <path d="M24,49 Q32,55 40,49" stroke={OUTLINE} strokeWidth="1.5" strokeLinecap="round" fill="none" />
      )}
      {mood === 'cold' && (
        <path d="M26,52 Q32,48 38,52" stroke={OUTLINE} strokeWidth="1.5" strokeLinecap="round" fill="none" />
      )}
      {mood === 'frozen' && (
        <path d="M24,51 Q27,47 30,51 Q33,55 36,51 Q39,47 42,51" stroke={OUTLINE} strokeWidth="1.5" strokeLinecap="round" fill="none" />
      )}

      <PetScarf mood={mood} x={11} y={54} width={42} knotCx={52} knotCy={59} />
    </PetSvg>
  );
}
