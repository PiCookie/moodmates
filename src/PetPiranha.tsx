/**
 * Gen1-Style Piranha Pet
 *
 * Erkennungsmerkmale: silber-grauer Körper mit rotem Bauch
 * (typisch für den Roten Piranha), riesiges Maul mit Zähnen.
 *
 * Mood → temperature:
 *   warm    ≥ 22 °C  Sonnenbrille + Wangenrouge + breites Grinsen
 *   neutral  8–22 °C  runde Augen, offenes Maul mit Zähnen + Zunge
 *   cold     0–8 °C  besorgte Augen, Schal, Schneeflocken, Zittern
 *   frozen    < 0 °C  X-Augen, Eiszapfen, Schal, starkes Zittern
 */

import type { Mood, PetProps } from "./pet.shared";
import { getMood, OUTLINE } from "./pet.shared";
import {
    PetSvg,
    PetShadow,
    PetIcicles,
    PetSun,
    PetSweat,
    PetSnowflakes,
    PetScarf,
    PetBlush,
    PetSunglasses,
    PetFrozenEyes,
    PetWorriedBrows,
} from "./BasePet";

const PIRANHA_FUR: Record<Mood, string> = {
    frozen: "#cbd5e1",
    cold:   "#94a3b8",
    neutral: "#64748b",
    warm:   "#475569",
};

const PIRANHA_BELLY: Record<Mood, string> = {
    frozen: "#fecaca",
    cold:   "#f87171",
    neutral: "#ef4444",
    warm:   "#dc2626",
};

export function PetPiranha({
    temperature,
    size = 80,
    blinking = false,
}: PetProps) {
    const mood = getMood(temperature);
    const isHot = temperature !== null && temperature >= 28;
    const fur = PIRANHA_FUR[mood];
    const belly = PIRANHA_BELLY[mood];

    return (
        <PetSvg
            size={size}
            shivering={mood === "cold" || mood === "frozen"}
            ariaLabel={`Piranha-Pet: ${mood}`}
        >
            <PetShadow cx={32} />
            <PetIcicles mood={mood} y={77} />

            {/* ── Schwanzflosse (V-Form, unten) ── */}
            <path
                d="M20,66 Q26,77 32,68 Q38,77 44,66 Z"
                fill={fur}
                stroke={OUTLINE}
                strokeWidth="1.5"
                strokeLinejoin="round"
            />

            {/* ── Rückenflosse (dreieckig) ── */}
            <path
                d="M26,22 L32,10 L38,22"
                fill={fur}
                stroke={OUTLINE}
                strokeWidth="1.5"
                strokeLinejoin="round"
            />

            {/* ── Körper ── */}
            <ellipse
                cx="32"
                cy="44"
                rx="21"
                ry="23"
                fill={fur}
                stroke={OUTLINE}
                strokeWidth="1.5"
            />
            {/* Roter Bauch — Erkennungsmerkmal */}
            <ellipse cx="32" cy="50" rx="14" ry="17" fill={belly} />
            <ellipse
                cx="32"
                cy="44"
                rx="21"
                ry="23"
                fill="none"
                stroke={OUTLINE}
                strokeWidth="1.5"
            />

            {/* ── Brustflossen ── */}
            <path
                d="M11,46 Q2,41 2,53 Q6,59 13,55"
                fill={fur}
                stroke={OUTLINE}
                strokeWidth="1.2"
                strokeLinejoin="round"
            />
            <path
                d="M53,46 Q62,41 62,53 Q58,59 51,55"
                fill={fur}
                stroke={OUTLINE}
                strokeWidth="1.2"
                strokeLinejoin="round"
            />

            <PetSnowflakes
                mood={mood}
                left={{ x: 2, y: 24 }}
                right={{ x: 54, y: 24 }}
            />
            <PetSun mood={mood} />
            <PetSweat isHot={isHot} y={12} />

            {/* ── Augen ── */}
            {mood === "neutral" &&
                (blinking ? (
                    <>
                        <line x1="17" y1="33" x2="28" y2="33" stroke={OUTLINE} strokeWidth="2.5" strokeLinecap="round" />
                        <line x1="36" y1="33" x2="47" y2="33" stroke={OUTLINE} strokeWidth="2.5" strokeLinecap="round" />
                    </>
                ) : (
                    <>
                        <circle cx="22" cy="33" r="5.5" fill={OUTLINE} />
                        <circle cx="42" cy="33" r="5.5" fill={OUTLINE} />
                        <circle cx="20" cy="31" r="2" fill="white" opacity="0.7" />
                        <circle cx="40" cy="31" r="2" fill="white" opacity="0.7" />
                    </>
                ))}

            <PetSunglasses
                mood={mood}
                frame={{ y: 26, w: 14, h: 14, rx: 4 }}
                leftX={13}
                rightX={35}
                leftTemple={[13, 34, 4, 37]}
                rightTemple={[49, 34, 58, 37]}
            />

            <PetWorriedBrows
                mood={mood}
                leftBrow={{ x1: 14, y1: 26, x2: 28, y2: 30 }}
                rightBrow={{ x1: 36, y1: 30, x2: 50, y2: 26 }}
            />
            {mood === "cold" && (
                <>
                    <circle cx="22" cy="33" r="5" fill={OUTLINE} />
                    <circle cx="42" cy="33" r="5" fill={OUTLINE} />
                    <circle cx="20" cy="31" r="1.8" fill="white" opacity="0.65" />
                    <circle cx="40" cy="31" r="1.8" fill="white" opacity="0.65" />
                </>
            )}

            <PetFrozenEyes
                mood={mood}
                leftBox={{ l: 13, t: 25, r: 31, b: 43 }}
                rightBox={{ l: 33, t: 25, r: 51, b: 43 }}
            />

            <PetBlush
                mood={mood}
                leftCx={12}
                rightCx={52}
                cy={44}
                rx={7}
                ry={4}
            />

            {/* ── Mund ── */}
            {(mood === "neutral" || mood === "warm") && (
                <>
                    <path
                        d={
                            mood === "warm"
                                ? "M12,46 L52,46 Q46,61 32,64 Q18,61 12,46 Z"
                                : "M13,46 L51,46 Q46,60 32,63 Q18,60 13,46 Z"
                        }
                        fill={belly}
                    />
                    <path
                        d={
                            mood === "warm"
                                ? "M12,46 Q32,65 52,46 Q46,61 32,64 Q18,61 12,46 Z"
                                : "M13,46 Q32,64 51,46 Q46,60 32,63 Q18,60 13,46 Z"
                        }
                        fill={OUTLINE}
                    />
                    <ellipse cx="32" cy="57" rx="8" ry="3.5" fill="#f87171" stroke={OUTLINE} strokeWidth="1.2" />
                    <path
                        d={
                            mood === "warm"
                                ? "M12,46 Q15,54 18,54 Q21,53 25,58 Q28,55 32,60 Q36,55 39,58 Q43,53 46,54 Q49,54 52,46 Q46,61 32,64 Q18,61 12,46 Z"
                                : "M13,46 Q16,54 19,54 Q22,53 25,58 Q28,55 32,60 Q36,55 39,58 Q42,53 45,54 Q48,54 51,46 Q46,60 32,63 Q18,60 13,46 Z"
                        }
                        fill="white"
                        stroke={OUTLINE}
                        strokeWidth="1.2"
                        strokeLinejoin="round"
                    />
                    <path
                        d={
                            mood === "warm"
                                ? "M12,46 Q15,54 18,46 Q21,54 24,46 Q27,54 30,46 Q33,54 36,46 Q39,54 42,46 Q45,54 48,46 Q50,53 52,46 Z"
                                : "M13,46 Q16,54 19,46 Q22,54 25,46 Q28,54 31,46 Q34,54 37,46 Q40,54 43,46 Q46,53 50,46 Z"
                        }
                        fill="white"
                        stroke={OUTLINE}
                        strokeWidth="1.5"
                        strokeLinejoin="round"
                    />
                </>
            )}
            {mood === "cold" && (
                <path d="M24,55 Q32,52 40,55" stroke={OUTLINE} strokeWidth="1.5" strokeLinecap="round" fill="none" />
            )}
            {mood === "frozen" && (
                <path d="M22,55 Q26,51 32,55 Q38,59 42,55" stroke={OUTLINE} strokeWidth="1.5" strokeLinecap="round" fill="none" />
            )}

            <PetScarf
                mood={mood}
                x={9}
                y={57}
                width={46}
                knotCx={55}
                knotCy={62}
            />
        </PetSvg>
    );
}
