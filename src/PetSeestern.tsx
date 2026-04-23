/**
 * Gen1-Style Seestern Pet (Draufsicht)
 *
 * Erkennungsmerkmale: fünfzackiger Stern, orange mit gelbem Bauchkreis,
 * niedliches Gesicht in der Mitte (Draufsicht).
 *
 * Mood → temperature:
 *   warm    ≥ 22 °C  Sonnenbrille + Wangenrouge
 *   neutral  8–22 °C  runde Augen, Lächeln
 *   cold     0–8 °C  besorgte Brauen, Schneeflocken, Zittern
 *   frozen    < 0 °C  X-Augen, Schneeflocken, starkes Zittern
 */

import type { Mood, PetProps } from "./pet.shared";
import { getMood, OUTLINE } from "./pet.shared";
import {
    PetSvg,
    PetShadow,
    PetSun,
    PetSweat,
    PetSnowflakes,
} from "./BasePet";

const SEESTERN_COLOR: Record<Mood, string> = {
    frozen: "#fde8d0",
    cold:   "#fdba74",
    neutral: "#f97316",
    warm:   "#ea580c",
};

const SEESTERN_BELLY: Record<Mood, string> = {
    frozen: "#fef9f0",
    cold:   "#fef3c7",
    neutral: "#fbbf24",
    warm:   "#f59e0b",
};

export function PetSeestern({
    temperature,
    size = 80,
    blinking = false,
}: PetProps) {
    const mood = getMood(temperature);
    const isHot = temperature !== null && temperature >= 28;
    const color = SEESTERN_COLOR[mood];
    const belly = SEESTERN_BELLY[mood];
    const isWarm = mood === "warm";
    const isCold = mood === "cold";
    const isFrozen = mood === "frozen";

    return (
        <PetSvg
            size={size}
            shivering={isCold || isFrozen}
            ariaLabel={`Seestern-Pet: ${mood}`}
        >
            <PetShadow cx={33} />

            {/* ── Stern (5 Zacken, Draufsicht) ── */}
            {/* Außenpunkte r=20, Innenpunkte r=9, Mittelpunkt (33,44) */}
            <path
                d="M33,24 L38,37 L52,38 L42,47 L45,60 L33,53 L21,60 L24,47 L14,38 L28,37 Z"
                fill={color}
                stroke={OUTLINE}
                strokeWidth="1.5"
                strokeLinejoin="round"
            />

            {/* ── Arm-Mittellinien (Textur) ── */}
            <line x1="33" y1="24" x2="33" y2="39" stroke={OUTLINE} strokeWidth="0.7" opacity="0.25" strokeLinecap="round" />
            <line x1="52" y1="38" x2="40" y2="43" stroke={OUTLINE} strokeWidth="0.7" opacity="0.25" strokeLinecap="round" />
            <line x1="45" y1="60" x2="36" y2="48" stroke={OUTLINE} strokeWidth="0.7" opacity="0.25" strokeLinecap="round" />
            <line x1="21" y1="60" x2="30" y2="48" stroke={OUTLINE} strokeWidth="0.7" opacity="0.25" strokeLinecap="round" />
            <line x1="14" y1="38" x2="26" y2="43" stroke={OUTLINE} strokeWidth="0.7" opacity="0.25" strokeLinecap="round" />

            {/* ── Bauchkreis (Mitte) ── */}
            <circle cx="33" cy="44" r="10" fill={belly} />
            <circle cx="33" cy="44" r="10" fill="none" stroke={OUTLINE} strokeWidth="0.8" opacity="0.25" />

            <PetSnowflakes mood={mood} left={{ x: 5, y: 36 }} right={{ x: 56, y: 30 }} />
            <PetSun mood={mood} />
            <PetSweat isHot={isHot} y={20} />

            {/* ── Augen (neutral + warm) ── */}
            {(mood === "neutral" || isWarm) &&
                (blinking ? (
                    <>
                        <line x1="27" y1="41" x2="30" y2="41" stroke={OUTLINE} strokeWidth="2" strokeLinecap="round" />
                        <line x1="36" y1="41" x2="39" y2="41" stroke={OUTLINE} strokeWidth="2" strokeLinecap="round" />
                    </>
                ) : (
                    <>
                        <circle cx="29" cy="41" r="2.5" fill={OUTLINE} />
                        <circle cx="30" cy="40" r="1" fill="white" opacity="0.65" />
                        <circle cx="37" cy="41" r="2.5" fill={OUTLINE} />
                        <circle cx="38" cy="40" r="1" fill="white" opacity="0.65" />
                    </>
                ))}

            {/* ── Sonnenbrille (warm) ── */}
            {isWarm && (
                <>
                    <rect x="24" y="37" width="8" height="6" rx="2" fill={OUTLINE} opacity="0.9" />
                    <rect x="25" y="38" width="6" height="4" rx="1.5" fill="#1e3a5f" />
                    <rect x="33" y="37" width="8" height="6" rx="2" fill={OUTLINE} opacity="0.9" />
                    <rect x="34" y="38" width="6" height="4" rx="1.5" fill="#1e3a5f" />
                    <line x1="32" y1="40" x2="33" y2="40" stroke={OUTLINE} strokeWidth="1" />
                    <circle cx="28" cy="40" r="1.5" fill="white" opacity="0.15" />
                    <circle cx="36" cy="40" r="1.5" fill="white" opacity="0.15" />
                </>
            )}

            {/* ── Brauen + Augen (cold) ── */}
            {isCold && (
                <>
                    <path d="M26,38 Q29,35 31,38" stroke={OUTLINE} strokeWidth="1.5" strokeLinecap="round" fill="none" />
                    <path d="M35,38 Q37,35 40,38" stroke={OUTLINE} strokeWidth="1.5" strokeLinecap="round" fill="none" />
                    <circle cx="29" cy="41" r="2.5" fill={OUTLINE} />
                    <circle cx="30" cy="40" r="1" fill="white" opacity="0.65" />
                    <circle cx="37" cy="41" r="2.5" fill={OUTLINE} />
                    <circle cx="38" cy="40" r="1" fill="white" opacity="0.65" />
                </>
            )}

            {/* ── Brauen + X-Augen (frozen) ── */}
            {isFrozen && (
                <>
                    <path d="M26,38 Q29,35 31,38" stroke={OUTLINE} strokeWidth="1.5" strokeLinecap="round" fill="none" />
                    <path d="M35,38 Q37,35 40,38" stroke={OUTLINE} strokeWidth="1.5" strokeLinecap="round" fill="none" />
                    <line x1="27" y1="39" x2="31" y2="43" stroke={OUTLINE} strokeWidth="2" strokeLinecap="round" />
                    <line x1="31" y1="39" x2="27" y2="43" stroke={OUTLINE} strokeWidth="2" strokeLinecap="round" />
                    <line x1="35" y1="39" x2="39" y2="43" stroke={OUTLINE} strokeWidth="2" strokeLinecap="round" />
                    <line x1="39" y1="39" x2="35" y2="43" stroke={OUTLINE} strokeWidth="2" strokeLinecap="round" />
                </>
            )}

            {/* ── Mund ── */}
            <path
                d={isCold || isFrozen ? "M29,47 Q33,44 37,47" : "M29,47 Q33,51 37,47"}
                fill="none"
                stroke={OUTLINE}
                strokeWidth="1.2"
                strokeLinecap="round"
            />

            {/* ── Wangenrouge (warm) ── */}
            {isWarm && (
                <>
                    <ellipse cx="23" cy="45" rx="3.5" ry="2" fill="#fca5a5" opacity="0.5" />
                    <ellipse cx="43" cy="45" rx="3.5" ry="2" fill="#fca5a5" opacity="0.5" />
                </>
            )}
        </PetSvg>
    );
}
