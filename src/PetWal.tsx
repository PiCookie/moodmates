/**
 * Gen1-Style Wal Pet (Seitenansicht)
 *
 * Körperstruktur exakt vom Referenz-SVG (300×200) skaliert auf 66×88 viewBox.
 * Skalierungsfaktor 0.29, Zentrum des Originals (160, 117) → (33, 45).
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

const WAL_FUR: Record<Mood, string> = {
    frozen: "#a8c4e0",
    cold: "#78a8d0",
    neutral: "#4878b8",
    warm: "#2c5ca0",
};

const WAL_BELLY: Record<Mood, string> = {
    frozen: "#e4f0fc",
    cold: "#c0d8f0",
    neutral: "#98c4e8",
    warm: "#70b0e0",
};

export function PetWal({
    temperature,
    size = 80,
    blinking = false,
}: PetProps) {
    const mood = getMood(temperature);
    const isHot = temperature !== null && temperature >= 28;
    const fur = WAL_FUR[mood];
    const belly = WAL_BELLY[mood];
    const isWarm = mood === "warm";
    const isCold = mood === "cold";
    const isFrozen = mood === "frozen";

    return (
        <PetSvg
            size={size}
            viewBoxWidth={76}
            shivering={isCold || isFrozen}
            ariaLabel={`Wal-Pet: ${mood}`}
        >
            <PetShadow cx={33} />
            <PetIcicles mood={mood} y={72} />

            {/* ── Schwanzstiel + Schwanzflosse — hinter Körper ── */}
            <path
                d="M56,44 Q62,40 65,38 Q64,50 57,51 Q55,48 56,44 Z"
                fill={fur}
                stroke={OUTLINE}
                strokeWidth="1.2"
                strokeLinejoin="round"
            />
            <path
                d="M76,39 Q70,28 64,37 Q58,28 52,39 Z"
                fill={fur}
                stroke={OUTLINE}
                strokeWidth="1.5"
                strokeLinejoin="round"
            />

            {/* ── Körper — direkt vom Referenz-SVG skaliert ── */}
            <path
                d="M4,46 Q4,21 34,28 Q47,31 56,43 Q62,50 53,53 Q39,59 19,56 Q7,54 4,46 Z"
                fill={fur}
                stroke={OUTLINE}
                strokeWidth="1.5"
                strokeLinejoin="round"
            />

            {/* ── Bauch — vom Referenz-SVG skaliert ── */}
            <path
                d="M5,46 Q19,52 42,50 Q33,59 16,54 Q7,53 5,46 Z"
                fill={belly}
            />

            {/* ── Bauchstreifen — vom Referenz-SVG skaliert ── */}
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

            {/* ── Flosse unten — vom Referenz-SVG skaliert ── */}
            <path
                d="M33,50 Q36,57 45,52 Q39,47 33,50 Z"
                fill={fur}
                stroke={OUTLINE}
                strokeWidth="1.2"
                strokeLinejoin="round"
            />

            {/* ── Blasloch (Pet-Ergänzung) ── */}
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
                    {/* V-Fächer */}
                    <path
                        d="M22,28 Q14,10 10,8 Q16,5 22,8 Q28,5 34,8 Q30,10 22,28 Z"
                        fill={belly}
                        opacity="0.85"
                    />
                    {/* Tropfen oberhalb */}
                    <circle cx="12" cy="6" r="1.5" fill={belly} />
                    <circle cx="22" cy="4" r="2" fill={belly} />
                    <circle cx="32" cy="6" r="1.5" fill={belly} />
                    <circle cx="8" cy="10" r="1" fill={belly} opacity="0.7" />
                    <circle cx="36" cy="10" r="1" fill={belly} opacity="0.7" />
                    <circle cx="17" cy="2" r="1" fill={belly} opacity="0.7" />
                    <circle cx="27" cy="2" r="1" fill={belly} opacity="0.7" />
                </>
            )}

            <PetSnowflakes
                mood={mood}
                left={{ x: 2, y: 32 }}
                right={{ x: 52, y: 26 }}
            />
            <PetSun mood={mood} />
            <PetSweat isHot={isHot} y={22} />

            {/* ── Auge — vom Referenz-SVG skaliert (cx=21, cy=41) ── */}
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
                        x2="6"
                        y2="43"
                        stroke={OUTLINE}
                        strokeWidth="1.5"
                        strokeLinecap="round"
                    />
                    <circle cx="21" cy="41" r="2" fill="white" opacity="0.15" />
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
        </PetSvg>
    );
}
