/**
 * Gen1-Style Beluga Pet (Seitenansicht)
 *
 * Körperstruktur vom Blauwal abgeleitet.
 * Erkennungsmerkmale: reinweiß, ausgeprägte runde Stirn ("Melon"), kein Streifenbauch.
 *
 * Mood → temperature:
 *   warm    ≥ 22 °C  Sonnenbrille + Wangenrouge + Wasserfontäne
 *   neutral  8–22 °C  Lächeln + Wasserfontäne
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
} from "./BasePet";

const BELUGA_FUR: Record<Mood, string> = {
    frozen: "#dbeafe",
    cold: "#e0f2fe",
    neutral: "#f8fafc",
    warm: "#fef9f0",
};

const BELUGA_WATER: Record<Mood, string> = {
    frozen: "#bae6fd",
    cold: "#7dd3fc",
    neutral: "#98c4e8",
    warm: "#70b0e0",
};

export function PetBeluga({
    temperature,
    size = 80,
    blinking = false,
}: PetProps) {
    const mood = getMood(temperature);
    const isHot = temperature !== null && temperature >= 28;
    const fur = BELUGA_FUR[mood];
    const water = BELUGA_WATER[mood];
    const isWarm = mood === "warm";
    const isCold = mood === "cold";
    const isFrozen = mood === "frozen";

    return (
        <PetSvg
            size={size}
            viewBoxWidth={104}
            shivering={isCold || isFrozen}
            ariaLabel={`Beluga-Pet: ${mood}`}
        >
            <PetShadow cx={33} />
            <g transform="scale(1.40) translate(-2, -1)">
                <PetIcicles mood={mood} y={72} />

                {/* ── Schwanzstiel + Schwanzflosse — hinter Körper ── */}
                <path
                    d="M56,44 Q62,40 65,38 Q64,50 57,51 Q55,48 56,44 Z"
                    fill={fur}
                />
                <path
                    d="M56,44 Q62,40 65,38 Q64,50 57,51 Q55,52 53,53"
                    fill="none"
                    stroke={OUTLINE}
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path
                    d="M76,39 Q70,28 64,37 Q58,28 52,39 Z"
                    fill={fur}
                    stroke={OUTLINE}
                    strokeWidth="1.5"
                    strokeLinejoin="round"
                />

                {/* ── Körper — mit runder, wulstiger Beluga-Stirn (Melon) ── */}
                <path
                    d="M4,46 Q2,18 18,17 Q28,18 34,28 Q47,31 56,43 Q62,50 53,53 Q39,59 19,56 Q7,54 4,46 Z"
                    fill={fur}
                />
                <path
                    d="M60,50 Q42,59 19,56 Q7,54 4,46 Q2,18 18,17 Q28,18 34,28 Q47,31 57,43"
                    fill="none"
                    stroke={OUTLINE}
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />

                {/* ── Flosse unten ── */}
                <path
                    d="M33,50 Q36,57 45,52 Q39,47 33,50 Z"
                    fill={fur}
                    stroke={OUTLINE}
                    strokeWidth="1.2"
                    strokeLinejoin="round"
                />

                {/* ── Blasloch (oben auf dem Melon) ── */}
                <ellipse
                    cx="14"
                    cy="24"
                    rx="2.5"
                    ry="1.5"
                    fill={OUTLINE}
                    opacity="0.3"
                />

                {/* ── Wasserfontäne (neutral + warm) ── */}
                {(mood === "neutral" || isWarm) && (
                    <>
                        <path
                            d="M14,23 Q6,10 2,8 Q8,5 14,8 Q20,5 26,8 Q22,10 14,23 Z"
                            fill={water}
                            opacity="0.85"
                        />
                        <circle cx="4"  cy="6"  r="1.5" fill={water} />
                        <circle cx="14" cy="4"  r="2"   fill={water} />
                        <circle cx="24" cy="6"  r="1.5" fill={water} />
                        <circle cx="0"  cy="10" r="1"   fill={water} opacity="0.7" />
                        <circle cx="28" cy="10" r="1"   fill={water} opacity="0.7" />
                    </>
                )}

                <PetSnowflakes
                    mood={mood}
                    left={{ x: 2, y: 32 }}
                    right={{ x: 52, y: 26 }}
                />
                <PetSun mood={mood} />
                <PetSweat isHot={isHot} y={22} />

                {/* ── Auge (neutral + warm) ── */}
                {(mood === "neutral" || isWarm) &&
                    (blinking ? (
                        <line
                            x1="17"
                            y1="38"
                            x2="25"
                            y2="38"
                            stroke={OUTLINE}
                            strokeWidth="2.5"
                            strokeLinecap="round"
                        />
                    ) : (
                        <>
                            <circle cx="21" cy="38" r="4" fill={OUTLINE} />
                            <circle
                                cx="22"
                                cy="37"
                                r="1.5"
                                fill="white"
                                opacity="0.65"
                            />
                        </>
                    ))}

                {/* ── Sonnenbrille (warm) ── */}
                {isWarm && (
                    <>
                        <rect
                            x="13"
                            y="33"
                            width="16"
                            height="11"
                            rx="3"
                            fill={OUTLINE}
                            opacity="0.9"
                        />
                        <rect
                            x="14"
                            y="34"
                            width="14"
                            height="9"
                            rx="2"
                            fill="#1e3a5f"
                        />
                        <line
                            x1="13"
                            y1="38"
                            x2="4"
                            y2="38"
                            stroke={OUTLINE}
                            strokeWidth="1.5"
                            strokeLinecap="round"
                        />
                        <circle
                            cx="21"
                            cy="38"
                            r="2"
                            fill="white"
                            opacity="0.15"
                        />
                    </>
                )}

                {/* ── Auge + Braue (cold) ── */}
                {isCold && (
                    <>
                        <path
                            d="M14,33 Q20,29 26,33"
                            stroke={OUTLINE}
                            strokeWidth="2"
                            strokeLinecap="round"
                            fill="none"
                        />
                        <circle cx="21" cy="38" r="4" fill={OUTLINE} />
                        <circle
                            cx="22"
                            cy="37"
                            r="1.5"
                            fill="white"
                            opacity="0.65"
                        />
                    </>
                )}

                {/* ── X-Auge + Braue (frozen) ── */}
                {isFrozen && (
                    <>
                        <path
                            d="M14,33 Q20,29 26,33"
                            stroke={OUTLINE}
                            strokeWidth="2"
                            strokeLinecap="round"
                            fill="none"
                        />
                        <line
                            x1="17"
                            y1="35"
                            x2="25"
                            y2="43"
                            stroke={OUTLINE}
                            strokeWidth="2.5"
                            strokeLinecap="round"
                        />
                        <line
                            x1="25"
                            y1="35"
                            x2="17"
                            y2="43"
                            stroke={OUTLINE}
                            strokeWidth="2.5"
                            strokeLinecap="round"
                        />
                    </>
                )}

                {/* ── Mund (Beluga-Dauerlächeln) ── */}
                <path
                    d="M4,43 Q10,47 16,43"
                    fill="none"
                    stroke={OUTLINE}
                    strokeWidth="1.2"
                    strokeLinecap="round"
                />

                {/* ── Wangenrouge (warm) ── */}
                {isWarm && (
                    <ellipse
                        cx="18"
                        cy="44"
                        rx="4"
                        ry="2.5"
                        fill="#fca5a5"
                        opacity="0.5"
                    />
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
