/**
 * Hai im Retro-Stil (Seitenansicht)
 *
 * Erkennungsmerkmale: torpedoförmiger Körper, große dreieckige
 * Rückenflosse, heterozerkale Schwanzflosse, Kiemenschlitze,
 * heller Bauch.
 *
 * Look (the ranges below are only an example, the app decides):
 *   warm    ≥ 22 °C  Sonnenbrille + Wangenrouge
 *   neutral  8–22 °C  Auge + leicht geöffnetes Maul
 *   cold     0–8 °C  besorgte Braue, Schal, Schneeflocken, Zittern
 *   frozen    < 0 °C  X-Auge, Eiszapfen, Schal, starkes Zittern
 */

import type { Look, AnimalProps } from "../shared";
import { OUTLINE } from "../shared";
import {
    PetSvg,
    PetShadow,
    PetIcicles,
    PetSun,
    PetSweat,
    PetSnowflakes,
    PetScarf,
} from "../petParts";

const HAI_FUR: Record<Look, string> = {
    frozen: "#bfdbfe",
    cold: "#7dd3fc",
    neutral: "#64748b",
    warm: "#475569",
};

const HAI_BELLY: Record<Look, string> = {
    frozen: "#f0f9ff",
    cold: "#e0f2fe",
    neutral: "#e2e8f0",
    warm: "#cbd5e1",
};

export function Shark({
    isHot,
    size = 80,
    blinking = false,
    mood,
    ariaLabel,
}: AnimalProps) {
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
            ariaLabel={ariaLabel}
        >
            <PetShadow cx={33} />
            <g transform="scale(1.55, 1.40) translate(-3, -1)">
                <PetIcicles mood={mood} y={68} />

                {/* ── Schwanzflosse (heterozerk: oberer Lappen größer) ── */}
                <path
                    d="M56,44 Q58,34 70,28 Q64,40 64,44 Q64,49 70,56 Q63,57 56,49 Z"
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

                {/* ── Präkaudale Flosse (sehr klein, nahe Schwanz) ── */}
                <path
                    d="M47,37 Q48,31 51,30 Q50,31 53,39 Z"
                    transform="rotate(15, 50, 37)"
                    fill={fur}
                    stroke={OUTLINE}
                    strokeWidth="1.0"
                    strokeLinejoin="round"
                />

                {/* ── Afterflosse (Unterseite, nahe Schwanz) ── */}
                <path
                    d="M47,53 Q48,59 51,60 Q50,59 53,51 Z"
                    transform="rotate(-15, 50, 53)"
                    fill={belly}
                    stroke={OUTLINE}
                    strokeWidth="1.0"
                    strokeLinejoin="round"
                />

                {/* ── Körper (torpedoförmig, spitze Schnauze) ── */}
                <path
                    d="M3,46 Q7,36 27,33 Q44,33 57,40 Q60,43 57,52 Q44,58 27,58 Q7,57 3,46 Z"
                    fill={fur}
                />

                {/* Bauch (heller Streifen, untere Hälfte) */}
                <path
                    d="M3,47 Q30,50 57,50 Q57,49 57,52 Q44,58 27,58 Q7,57 3,47 Z"
                    fill={belly}
                />

                {/* Outline oben: Schnauze → Rückenflosse → präkaudale Flosse → Schwanz */}
                <path
                    d="M3,46 Q7,36 27,33"
                    fill="none"
                    stroke={OUTLINE}
                    strokeWidth="1.5"
                    strokeLinecap="round"
                />
                <path
                    d="M40,34 Q44,36 47,36"
                    fill="none"
                    stroke={OUTLINE}
                    strokeWidth="1.5"
                    strokeLinecap="round"
                />
                <path
                    d="M52.5,37.5 Q55,39 57,40"
                    fill="none"
                    stroke={OUTLINE}
                    strokeWidth="1.5"
                    strokeLinecap="round"
                />
                {/* Outline unten: Schwanz → Afterflosse → Schnauze */}
                <path
                    d="M57,52 Q55,53 52.5,54.5"
                    fill="none"
                    stroke={OUTLINE}
                    strokeWidth="1.5"
                    strokeLinecap="round"
                />
                <path
                    d="M47.5,56.5 Q44,58 27,58 Q7,57 3,46"
                    fill="none"
                    stroke={OUTLINE}
                    strokeWidth="1.5"
                    strokeLinecap="round"
                />

                {/* ── Brustflosse ── */}
                <path
                    d="M27,51 Q32,62 42,62 Q40,47 27,51 Z"
                    fill={fur}
                    stroke={OUTLINE}
                    strokeWidth="1.2"
                    strokeLinejoin="round"
                />

                {/* ── Nasenloch ── */}
                <ellipse
                    cx="8"
                    cy="47"
                    rx="1.2"
                    ry="0.8"
                    fill={OUTLINE}
                    opacity="0.6"
                />

                {/* ── Kiemenschlitze ── */}
                <path
                    d="M28,42 Q31,45 28,50"
                    fill="none"
                    stroke={OUTLINE}
                    strokeWidth="0.9"
                    strokeLinecap="round"
                    opacity="0.5"
                />
                <path
                    d="M31,42 Q34,45 31,50"
                    fill="none"
                    stroke={OUTLINE}
                    strokeWidth="0.9"
                    strokeLinecap="round"
                    opacity="0.5"
                />
                <path
                    d="M34,42 Q37,45 34,50"
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

                {/* ── Maul mit Zähnen (alle Moods) ── */}
                <path
                    d="M6,50 L8,53 L10,50 L12,53 L14,50 L16,52 L18,49 L20,51 L22,47 L22,48 Q16,52 6,51 Z"
                    fill="white"
                    stroke={OUTLINE}
                    strokeWidth="0.7"
                    strokeLinejoin="round"
                />

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
                        <line
                            x1="6"
                            y1="42"
                            x2="14"
                            y2="42"
                            stroke={OUTLINE}
                            strokeWidth="1.2"
                            strokeLinecap="round"
                        />
                        <rect
                            x="14"
                            y="38"
                            width="12"
                            height="9"
                            rx="2.5"
                            fill={OUTLINE}
                            opacity="0.9"
                        />
                        <rect
                            x="15"
                            y="39"
                            width="10"
                            height="7"
                            rx="2"
                            fill="#1e3a5f"
                        />
                        <circle
                            cx="20"
                            cy="42"
                            r="2"
                            fill="white"
                            opacity="0.15"
                        />
                        <line
                            x1="26"
                            y1="42"
                            x2="30"
                            y2="41"
                            stroke={OUTLINE}
                            strokeWidth="1.2"
                            strokeLinecap="round"
                        />
                    </>
                )}
                {isWarm && (
                    <ellipse
                        cx="22"
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
