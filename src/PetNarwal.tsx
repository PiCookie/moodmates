/**
 * Gen1-Style Narwal Pet (Seitenansicht)
 *
 * Körperstruktur vom Blauwal abgeleitet.
 * Erkennungsmerkmale: grauer Körper mit hellem Bauch, langer Spiralstoßzahn.
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

const NARWAL_FUR: Record<Mood, string> = {
    frozen: "#cbd5e1",
    cold: "#94a3b8",
    neutral: "#64748b",
    warm: "#475569",
};

const NARWAL_BELLY: Record<Mood, string> = {
    frozen: "#f1f5f9",
    cold: "#e2e8f0",
    neutral: "#cbd5e1",
    warm: "#b0bec5",
};

const NARWAL_WATER: Record<Mood, string> = {
    frozen: "#bae6fd",
    cold: "#7dd3fc",
    neutral: "#98c4e8",
    warm: "#70b0e0",
};

const TUSK = "#f5f0d8";
const TUSK_SPIRAL = "#c8b890";

export function PetNarwal({
    temperature,
    size = 80,
    blinking = false,
}: PetProps) {
    const mood = getMood(temperature);
    const isHot = temperature !== null && temperature >= 28;
    const fur = NARWAL_FUR[mood];
    const belly = NARWAL_BELLY[mood];
    const water = NARWAL_WATER[mood];
    const isWarm = mood === "warm";
    const isCold = mood === "cold";
    const isFrozen = mood === "frozen";

    return (
        <PetSvg
            size={size}
            viewBoxWidth={120}
            shivering={isCold || isFrozen}
            ariaLabel={`Narwal-Pet: ${mood}`}
        >
            <PetShadow cx={50} />
            {/* translate(10, -1): Körper nach rechts verschoben, links Platz für Stoßzahn */}
            <g transform="scale(1.40) translate(10, -1)">
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

                {/* ── Körper ── */}
                <path
                    d="M4,46 Q4,21 34,28 Q47,31 56,43 Q62,50 53,53 Q39,59 19,56 Q7,54 4,46 Z"
                    fill={fur}
                />
                <path
                    d="M60,50 Q42,59 19,56 Q7,54 4,46 Q4,21 34,28 Q47,31 57,43"
                    fill="none"
                    stroke={OUTLINE}
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />

                {/* ── Bauch ── */}
                <path
                    d="M5,46 Q19,52 42,50 Q33,59 16,54 Q7,53 5,46 Z"
                    fill={belly}
                />

                {/* ── Bauchstreifen ── */}
                <path
                    d="M13,49 Q21,53 30,52"
                    stroke={OUTLINE}
                    strokeWidth="0.9"
                    strokeLinecap="round"
                    fill="none"
                    opacity="0.4"
                />
                <path
                    d="M14,53 Q24,57 34,54"
                    stroke={OUTLINE}
                    strokeWidth="0.9"
                    strokeLinecap="round"
                    fill="none"
                    opacity="0.4"
                />

                {/* ── Flosse unten ── */}
                <path
                    d="M33,50 Q36,57 45,52 Q39,47 33,50 Z"
                    fill={fur}
                    stroke={OUTLINE}
                    strokeWidth="1.2"
                    strokeLinejoin="round"
                />

                {/* ── Stoßzahn — auf dem Körper gezeichnet, kommt aus dem Oberkiefer ── */}
                <path
                    d="M4,40.5 Q-2,37.5 -9,36.5 Q-2,40.5 4,44 Z"
                    fill={TUSK}
                    stroke={OUTLINE}
                    strokeWidth="0.8"
                    strokeLinejoin="round"
                />
                {/* Spiralmarkierungen entlang des Stoßzahns */}
                <line x1="1" y1="42" x2="-0.5" y2="39.5" stroke={TUSK_SPIRAL} strokeWidth="0.7" strokeLinecap="round" />
                <line x1="-2.5" y1="41" x2="-4" y2="38.5" stroke={TUSK_SPIRAL} strokeWidth="0.7" strokeLinecap="round" />
                <line x1="-5.5" y1="39.5" x2="-7" y2="37.5" stroke={TUSK_SPIRAL} strokeWidth="0.6" strokeLinecap="round" />

                {/* ── Blasloch ── */}
                <ellipse
                    cx="22"
                    cy="29"
                    rx="2.5"
                    ry="1.5"
                    fill={OUTLINE}
                    opacity="0.4"
                />

                {/* ── Wasserfontäne (neutral + warm) ── */}
                {(mood === "neutral" || isWarm) && (
                    <>
                        <path
                            d="M22,28 Q14,10 10,8 Q16,5 22,8 Q28,5 34,8 Q30,10 22,28 Z"
                            fill={water}
                            opacity="0.85"
                        />
                        <circle cx="12" cy="6" r="1.5" fill={water} />
                        <circle cx="22" cy="4" r="2" fill={water} />
                        <circle cx="32" cy="6" r="1.5" fill={water} />
                        <circle cx="8" cy="10" r="1" fill={water} opacity="0.7" />
                        <circle cx="36" cy="10" r="1" fill={water} opacity="0.7" />
                        <circle cx="17" cy="2" r="1" fill={water} opacity="0.7" />
                        <circle cx="27" cy="2" r="1" fill={water} opacity="0.7" />
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
                            y1="41"
                            x2="25"
                            y2="41"
                            stroke={OUTLINE}
                            strokeWidth="2.5"
                            strokeLinecap="round"
                        />
                    ) : (
                        <>
                            <circle cx="21" cy="41" r="4" fill={OUTLINE} />
                            <circle
                                cx="22"
                                cy="40"
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
                            y="36"
                            width="16"
                            height="11"
                            rx="3"
                            fill={OUTLINE}
                            opacity="0.9"
                        />
                        <rect
                            x="14"
                            y="37"
                            width="14"
                            height="9"
                            rx="2"
                            fill="#1e3a5f"
                        />
                        <line
                            x1="13"
                            y1="41"
                            x2="5"
                            y2="40"
                            stroke={OUTLINE}
                            strokeWidth="1.5"
                            strokeLinecap="round"
                        />
                        <circle
                            cx="21"
                            cy="41"
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
                            d="M14,36 Q20,32 26,36"
                            stroke={OUTLINE}
                            strokeWidth="2"
                            strokeLinecap="round"
                            fill="none"
                        />
                        <circle cx="21" cy="41" r="4" fill={OUTLINE} />
                        <circle
                            cx="22"
                            cy="40"
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
                            d="M14,36 Q20,32 26,36"
                            stroke={OUTLINE}
                            strokeWidth="2"
                            strokeLinecap="round"
                            fill="none"
                        />
                        <line
                            x1="17"
                            y1="38"
                            x2="25"
                            y2="46"
                            stroke={OUTLINE}
                            strokeWidth="2.5"
                            strokeLinecap="round"
                        />
                        <line
                            x1="25"
                            y1="38"
                            x2="17"
                            y2="46"
                            stroke={OUTLINE}
                            strokeWidth="2.5"
                            strokeLinecap="round"
                        />
                    </>
                )}

                {/* ── Wangenrouge (warm) ── */}
                {isWarm && (
                    <ellipse
                        cx="18"
                        cy="47"
                        rx="4"
                        ry="2.5"
                        fill="#fca5a5"
                        opacity="0.5"
                    />
                )}

                <PetScarf
                    mood={mood}
                    x={4}
                    y={52}
                    width={28}
                    knotCx={32}
                    knotCy={56}
                />
            </g>
        </PetSvg>
    );
}
