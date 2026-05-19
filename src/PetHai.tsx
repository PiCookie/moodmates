/**
 * Gen1-Style Hai Pet (Seitenansicht)
 *
 * Erkennungsmerkmale: torpedoförmiger Körper, große dreieckige
 * Rückenflosse, heterozerkale Schwanzflosse, Kiemenschlitze,
 * heller Bauch.
 *
 * Mood → temperature:
 *   warm    ≥ 22 °C  Sonnenbrille + Wangenrouge
 *   neutral  8–22 °C  Auge + leicht geöffnetes Maul
 *   cold     0–8 °C  besorgte Braue, Schal, Schneeflocken, Zittern
 *   frozen    < 0 °C  X-Auge, Eiszapfen, Schal, starkes Zittern
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
} from "./BasePet";

const HAI_FUR: Record<Mood, string> = {
    frozen: "#bfdbfe",
    cold: "#7dd3fc",
    neutral: "#64748b",
    warm: "#475569",
};

const HAI_BELLY: Record<Mood, string> = {
    frozen: "#f0f9ff",
    cold: "#e0f2fe",
    neutral: "#e2e8f0",
    warm: "#cbd5e1",
};

export function PetHai({
    temperature,
    size = 80,
    blinking = false,
}: PetProps) {
    const mood = getMood(temperature);
    const isHot = temperature !== null && temperature >= 28;
    const fur = HAI_FUR[mood];
    const belly = HAI_BELLY[mood];
    const isWarm = mood === "warm";
    const isCold = mood === "cold";
    const isFrozen = mood === "frozen";

    return (
        <PetSvg
            size={size}
            viewBoxWidth={104}
            shivering={isCold || isFrozen}
            ariaLabel={`Hai-Pet: ${mood}`}
        >
            <PetShadow cx={33} />
            <g transform="scale(1.55, 1.40) translate(-3, -1)">
                <PetIcicles mood={mood} y={68} />

                {/* ── Schwanzflosse (heterozerk: oberer Lappen größer) ── */}
                <path
                    d="M56,44 Q63,34 69,24 Q68,40 62,44 Q62,49 68,60 Q63,57 56,49 Z"
                    fill={fur}
                    stroke={OUTLINE}
                    strokeWidth="1.3"
                    strokeLinejoin="round"
                />

                {/* ── Rückenflosse (großes Dreieck, Hauptmerkmal) ── */}
                <path
                    d="M27,34 Q32,20 40,18 Q37,26 40,35 Z"
                    fill={fur}
                    stroke={OUTLINE}
                    strokeWidth="1.3"
                    strokeLinejoin="round"
                />

                {/* ── Körper (torpedoförmig, spitze Schnauze) ── */}
                <path
                    d="M3,46 Q7,36 27,33 Q44,33 57,40 Q60,43 57,52 Q44,58 27,58 Q7,57 3,46 Z"
                    fill={fur}
                />

                {/* Bauch (heller Streifen, untere Hälfte) */}
                <path
                    d="M3,46 Q7,53 20,57 Q36,61 52,56 Q57,51 57,49 Q44,58 27,58 Q7,57 3,46 Z"
                    fill={belly}
                />

                {/* Outline */}
                {/*  <path
                    d="M60,47 Q44,58 27,58 Q7,57 3,46 Q7,33 27,30 Q44,30 58,43"
                    fill="none"
                    stroke={OUTLINE}
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                /> */}

                {/* ── Brustflosse ── */}
                <path
                    d="M27,51 Q32,62 42,62 Q40,47 27,51 Z"
                    fill={fur}
                    stroke={OUTLINE}
                    strokeWidth="1.2"
                    strokeLinejoin="round"
                />

                {/* ── Kiemenschlitze ── */}
                <path
                    d="M28,40 Q31,45 28,52"
                    fill="none"
                    stroke={OUTLINE}
                    strokeWidth="0.9"
                    strokeLinecap="round"
                    opacity="0.5"
                />
                <path
                    d="M31,40 Q34,45 31,52"
                    fill="none"
                    stroke={OUTLINE}
                    strokeWidth="0.9"
                    strokeLinecap="round"
                    opacity="0.5"
                />
                <path
                    d="M34,40 Q37,45 34,52"
                    fill="none"
                    stroke={OUTLINE}
                    strokeWidth="0.9"
                    strokeLinecap="round"
                    opacity="0.5"
                />

                <PetSnowflakes
                    mood={mood}
                    left={{ x: 2, y: 34 }}
                    right={{ x: 52, y: 20 }}
                />
                <PetSun mood={mood} />
                <PetSweat isHot={isHot} y={16} />

                {/* ── Maul mit Zähnen (neutral + warm) ── */}
                {(mood === "neutral" || isWarm) && (
                    <>
                        {/* Untere Zähne */}
                        <path
                            d="M6,50 L8,53 L10,50 L12,53 L14,50 L16,52 L18,49 L20,51 L22,47 L22,48 Q16,52 6,51 Z"
                            fill="white"
                            stroke={OUTLINE}
                            strokeWidth="0.7"
                            strokeLinejoin="round"
                        />
                    </>
                )}
                {(isCold || isFrozen) && (
                    <path
                        d="M5,46 Q9,49 14,47"
                        fill="none"
                        stroke={OUTLINE}
                        strokeWidth="1.2"
                        strokeLinecap="round"
                    />
                )}

                {/* ── Auge (neutral + warm) ── */}
                {(mood === "neutral" || isWarm) &&
                    (blinking ? (
                        <line
                            x1="17"
                            y1="42"
                            x2="23"
                            y2="42"
                            stroke={OUTLINE}
                            strokeWidth="2"
                            strokeLinecap="round"
                        />
                    ) : (
                        <>
                            <circle cx="20" cy="42" r="2.5" fill={OUTLINE} />
                            <circle
                                cx="21"
                                cy="41"
                                r="1"
                                fill="white"
                                opacity="0.65"
                            />
                        </>
                    ))}

                {/* ── Sonnenbrille (warm) ── */}
                {isWarm && (
                    <>
                        <rect
                            x="11"
                            y="35"
                            width="12"
                            height="9"
                            rx="2.5"
                            fill={OUTLINE}
                            opacity="0.9"
                        />
                        <rect
                            x="12"
                            y="36"
                            width="10"
                            height="7"
                            rx="2"
                            fill="#1e3a5f"
                        />
                        <circle
                            cx="17"
                            cy="39"
                            r="2"
                            fill="white"
                            opacity="0.15"
                        />
                        <line
                            x1="23"
                            y1="39"
                            x2="27"
                            y2="38"
                            stroke={OUTLINE}
                            strokeWidth="1.2"
                            strokeLinecap="round"
                        />
                    </>
                )}
                {isWarm && (
                    <ellipse
                        cx="16"
                        cy="48"
                        rx="4"
                        ry="2.5"
                        fill="#fca5a5"
                        opacity="0.5"
                    />
                )}

                {/* ── Besorgte Braue + Auge (cold) ── */}
                {isCold && (
                    <>
                        <path
                            d="M12,35 Q17,31 22,35"
                            stroke={OUTLINE}
                            strokeWidth="2"
                            strokeLinecap="round"
                            fill="none"
                        />
                        <circle cx="20" cy="42" r="2.5" fill={OUTLINE} />
                        <circle
                            cx="21"
                            cy="41"
                            r="1"
                            fill="white"
                            opacity="0.65"
                        />
                    </>
                )}

                {/* ── X-Auge (frozen) ── */}
                {isFrozen && (
                    <>
                        <path
                            d="M12,35 Q17,31 22,35"
                            stroke={OUTLINE}
                            strokeWidth="2"
                            strokeLinecap="round"
                            fill="none"
                        />
                        <line
                            x1="17"
                            y1="39"
                            x2="23"
                            y2="45"
                            stroke={OUTLINE}
                            strokeWidth="2.5"
                            strokeLinecap="round"
                        />
                        <line
                            x1="23"
                            y1="39"
                            x2="17"
                            y2="45"
                            stroke={OUTLINE}
                            strokeWidth="2.5"
                            strokeLinecap="round"
                        />
                    </>
                )}

                <g transform="translate(13, -15) rotate(90, 18, 57)">
                    <PetScarf
                        mood={mood}
                        x={4}
                        y={52}
                        width={28}
                        knotCx={32}
                        knotCy={56}
                    />
                </g>
            </g>
        </PetSvg>
    );
}
