/**
 * Pottwal im Retro-Stil (Seitenansicht)
 *
 * Körperstruktur identisch zum Blauwal.
 * Farbe: dunkelgrau (Körper) + hellgrau (Bauch) — typische Pottwal-Färbung.
 *
 * Mood → temperature:
 *   warm    ≥ 22 °C  Sonnenbrille + Wangenrouge + Wasserfontäne
 *   neutral  8–22 °C  Lächeln + Wasserfontäne
 *   cold     0–8 °C  besorgte Augen, Schal, Schneeflocken, Zittern
 *   frozen    < 0 °C  X-Augen, Eiszapfen, Schal, starkes Zittern
 */

import type { Mood, AnimalProps } from "../shared";
import { resolveMood, OUTLINE } from "../shared";
import {
    PetSvg,
    PetShadow,
    PetIcicles,
    PetSun,
    PetSweat,
    PetSnowflakes,
    PetScarf,
} from "../petParts";

const POTTWAL_FUR: Record<Mood, string> = {
    frozen: "#8a9aaa",
    cold: "#5a6a78",
    neutral: "#3a4a58",
    warm: "#2a3840",
};

const POTTWAL_WATER: Record<Mood, string> = {
    frozen: "#bae6fd",
    cold: "#7dd3fc",
    neutral: "#98c4e8",
    warm: "#70b0e0",
};

export function SpermWhale({
    temperature,
    size = 80,
    blinking = false,
    mood: moodOverride,
    ariaLabel,
}: AnimalProps) {
    const mood = resolveMood(temperature, moodOverride);
    const isHot = temperature !== null && temperature >= 28;
    const fur = POTTWAL_FUR[mood];
    const water = POTTWAL_WATER[mood];
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
            {/* Alles außer Schatten um 5% skaliert, leicht nach links/oben verschoben */}
            <g transform="scale(1.40) translate(-2, -1)">
                <PetIcicles mood={mood} y={72} />

                {/* ── Schwanzstiel + Schwanzflosse — hinter Körper ── */}
                {/* Fläche ohne Stroke */}
                <path
                    d="M56,44 Q62,40 65,38 Q64,50 57,51 Q55,48 56,44 Z"
                    fill={fur}
                />
                {/* Außenkante mit Stroke — nur sichtbare Seite, nicht wo Stiel auf Körper trifft */}
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

                {/* ── Körper — Pottwal mit markanter eckiger Stirn ── */}
                {/* Fläche */}
                <path
                    d="M4,46 Q4,26 8,26 Q47,31 56,43 Q47,31 56,43 Q62,50 53,53 Q39,59 19,56 Q7,54 4,46 Z"
                    fill={fur}
                />
                {/* Outline — rechtes Segment (Schwanzstiel-Übergang) ausgelassen */}
                <path
                    d="M60,50 Q42,59 19,56 Q7,54 4,46 Q4,28 8,26 Q47,31 57,43"
                    fill="none"
                    stroke={OUTLINE}
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />

                {/* ── Mund (langer Unterkiefer, typisch Pottwal) ── */}
                <path
                    d="M4,44 Q14,49 28,47"
                    fill="none"
                    stroke={OUTLINE}
                    strokeWidth="1.2"
                    strokeLinecap="round"
                />

                {/* ── Flosse unten — vom Referenz-SVG skaliert ── */}
                <path
                    d="M33,50 Q36,57 45,52 Q39,47 33,50 Z"
                    fill={fur}
                    stroke={OUTLINE}
                    strokeWidth="1.2"
                    strokeLinejoin="round"
                />

                {/* ── Blasloch (Ergänzung) ── */}
                <ellipse
                    cx="22"
                    cy="31"
                    rx="2.5"
                    ry="1.5"
                    fill={OUTLINE}
                    opacity="0.4"
                />

                {/* ── Wasserfontäne (neutral + warm) ── */}
                {(mood === "neutral" || isWarm) && (
                    <>
                        {/* V-Fächer */}
                        <path
                            d="M22,31 Q14,10 10,8 Q16,5 22,8 Q28,5 34,8 Q30,10 22,31 Z"
                            fill={water}
                            opacity="0.85"
                        />
                        {/* Tropfen oberhalb */}
                        <circle cx="12" cy="6" r="1.5" fill={water} />
                        <circle cx="22" cy="4" r="2" fill={water} />
                        <circle cx="32" cy="6" r="1.5" fill={water} />
                        <circle
                            cx="8"
                            cy="10"
                            r="1"
                            fill={water}
                            opacity="0.7"
                        />
                        <circle
                            cx="36"
                            cy="10"
                            r="1"
                            fill={water}
                            opacity="0.7"
                        />
                        <circle
                            cx="17"
                            cy="2"
                            r="1"
                            fill={water}
                            opacity="0.7"
                        />
                        <circle
                            cx="27"
                            cy="2"
                            r="1"
                            fill={water}
                            opacity="0.7"
                        />
                    </>
                )}

                <PetSnowflakes
                    mood={mood}
                    left={{ x: 2, y: 32 }}
                    right={{ x: 52, y: 26 }}
                />
                <PetSun mood={mood} />
                <PetSweat isHot={isHot} y={22} />

                {/* ── Auge (cx=24, cy=43) ── */}
                {(mood === "neutral" || isWarm) &&
                    (blinking ? (
                        <line
                            x1="24"
                            y1="43"
                            x2="30"
                            y2="43"
                            stroke={OUTLINE}
                            strokeWidth="2.5"
                            strokeLinecap="round"
                        />
                    ) : (
                        <>
                            <circle cx="27" cy="43" r="3" fill={OUTLINE} />
                            <circle
                                cx="28"
                                cy="42"
                                r="1.2"
                                fill="white"
                                opacity="0.65"
                            />
                        </>
                    ))}

                {/* ── Sonnenbrille (warm) ── */}
                {isWarm && (
                    <>
                        <rect
                            x="19"
                            y="38"
                            width="14"
                            height="9"
                            rx="2"
                            fill={OUTLINE}
                            opacity="0.9"
                        />
                        <rect
                            x="20"
                            y="39"
                            width="12"
                            height="7"
                            rx="1.5"
                            fill="#1e3a5f"
                        />
                        <line
                            x1="19"
                            y1="43"
                            x2="4"
                            y2="41"
                            stroke={OUTLINE}
                            strokeWidth="1.5"
                            strokeLinecap="round"
                        />
                        <circle
                            cx="27"
                            cy="43"
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
                            d="M20,38 Q26,34 32,38"
                            stroke={OUTLINE}
                            strokeWidth="2"
                            strokeLinecap="round"
                            fill="none"
                        />
                        <circle cx="27" cy="43" r="3" fill={OUTLINE} />
                        <circle
                            cx="28"
                            cy="42"
                            r="1.2"
                            fill="white"
                            opacity="0.65"
                        />
                    </>
                )}

                {/* ── X-Auge + Braue (frozen) ── */}
                {isFrozen && (
                    <>
                        <path
                            d="M20,38 Q26,34 32,38"
                            stroke={OUTLINE}
                            strokeWidth="2"
                            strokeLinecap="round"
                            fill="none"
                        />
                        <line
                            x1="24"
                            y1="40"
                            x2="30"
                            y2="46"
                            stroke={OUTLINE}
                            strokeWidth="2.5"
                            strokeLinecap="round"
                        />
                        <line
                            x1="30"
                            y1="40"
                            x2="24"
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

                <g transform="translate(19, -15) rotate(90, 18, 57)">
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
