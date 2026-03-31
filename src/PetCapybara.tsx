/**
 * Gen1-Style Capybara Pet
 *
 * Erkennungsmerkmale: Großer Körper, breite rechteckig-runde Schnauze, kleine Ohren, hohe Augen.
 *
 * Mood → temperature:
 *   warm    ≥ 22 °C  Sonnenbrille + Wangenrouge
 *   neutral  8–22 °C  runde Augen, kleines Lächeln
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
  const mood = getMood(temperature);
  const isHot = temperature !== null && temperature >= 28;
  const body = CAPY_BODY[mood];
  const dark = CAPY_DARK[mood];

  return (
    <PetSvg size={size} shivering={mood === 'cold' || mood === 'frozen'} ariaLabel={`Capybara-Maskottchen: ${mood}`}>
      <PetShadow cx={33} />
      {/* Capybara icicles sit slightly higher and wider than other animals */}
      <PetIcicles mood={mood} y={70} leftX={17} rightX={43} />

      {/* ── Füße + Vorderpfoten ── */}
      <ellipse cx="19" cy="73" rx="9" ry="3.5" fill={body} stroke={dark} strokeWidth="1.5" />
      <ellipse cx="47" cy="73" rx="9" ry="3.5" fill={body} stroke={dark} strokeWidth="1.5" />
      <ellipse cx="11" cy="52" rx="8" ry="4"   fill={body} stroke={dark} strokeWidth="1.5" />
      <ellipse cx="55" cy="52" rx="8" ry="4"   fill={body} stroke={dark} strokeWidth="1.5" />

      {/* ── Körper ── */}
      <ellipse cx="33" cy="53" rx="19" ry="15" fill={body} stroke={dark} strokeWidth="1.5" />

      <PetSnowflakes mood={mood} left={{ x: 3, y: 44 }} right={{ x: 62, y: 39 }} />
      <PetSun mood={mood} />
      <PetSweat isHot={isHot} y={36} />

      {/* ── Ohren ── */}
      <circle cx="21" cy="23" r="5.5" fill={body} stroke={dark} strokeWidth="1.5" />
      <circle cx="45" cy="23" r="5.5" fill={body} stroke={dark} strokeWidth="1.5" />
      <circle cx="21" cy="23" r="3"   fill={dark} opacity="0.2" />
      <circle cx="45" cy="23" r="3"   fill={dark} opacity="0.2" />

      {/* ── Kopf + breite Schnauze ── */}
      <ellipse cx="33" cy="29" rx="17" ry="9"  fill={body} stroke={dark} strokeWidth="1.5" />
      <ellipse cx="33" cy="38" rx="13" ry="7"  fill={body} stroke={dark} strokeWidth="1.5" />

      {/* ── Augen ── */}
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

      {/* Capybara sunglasses are smaller (12×9 frames) */}
      <PetSunglasses
        mood={mood}
        frame={{ y: 22, w: 12, h: 9, rx: 3.5 }}
        leftX={19} rightX={35}
        leftTemple={[19, 26, 13, 28]}
        rightTemple={[47, 26, 53, 28]}
        stegY={26}
      />

      <PetWorriedBrows
        mood={mood}
        leftBrow={{ x1: 19, y1: 22, x2: 28, y2: 25 }}
        rightBrow={{ x1: 38, y1: 25, x2: 47, y2: 22 }}
      />
      {mood === 'cold' && (
        <>
          <circle cx="24" cy="28" r="3" fill={OUTLINE} />
          <circle cx="42" cy="28" r="3" fill={OUTLINE} />
          <circle cx="23" cy="26.8" r="1" fill="white" opacity="0.65" />
          <circle cx="41" cy="26.8" r="1" fill="white" opacity="0.65" />
        </>
      )}

      <PetFrozenEyes
        mood={mood}
        leftBox={{ l: 20, t: 23, r: 29, b: 32 }}
        rightBox={{ l: 37, t: 23, r: 46, b: 32 }}
      />

      {/* ── Nasenlöcher ── */}
      <ellipse cx="28" cy="40" rx="2" ry="1.5" fill={dark} opacity="0.55" />
      <ellipse cx="38" cy="40" rx="2" ry="1.5" fill={dark} opacity="0.55" />

      <PetBlush mood={mood} leftCx={16} rightCx={50} cy={35} rx={5} ry={3} />

      {/* ── Mund ── */}
      {mood === 'neutral' && (
        <path d="M26,42 Q33,46 40,42" stroke={OUTLINE} strokeWidth="1.5" strokeLinecap="round" fill="none" />
      )}
      {mood === 'warm' && (
        <>
          <path d="M26,42 Q33,46 40,42" stroke={OUTLINE} strokeWidth="1.5" strokeLinecap="round" fill="none" />
          <ellipse cx="33" cy="44" rx="4" ry="2" fill="#f87171" opacity="0.85" />
        </>
      )}
      {mood === 'cold' && (
        <path d="M26,44 Q33,40 40,44" stroke={OUTLINE} strokeWidth="1.5" strokeLinecap="round" fill="none" />
      )}
      {mood === 'frozen' && (
        <path d="M24,42 Q27,39 30,42 Q33,45 36,42 Q39,39 42,42" stroke={OUTLINE} strokeWidth="1.5" strokeLinecap="round" fill="none" />
      )}

      {/* small=true: thinner scarf to match the compact capybara proportions */}
      <PetScarf mood={mood} x={16} y={47} width={34} knotCx={48} knotCy={51} small />
    </PetSvg>
  );
}
