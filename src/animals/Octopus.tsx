/**
 * Kraken im Retro-Stil (Vorderansicht)
 *
 * Erkennungsmerkmale: großer, fast-quadratischer Kopf (≈60 % der Höhe),
 * kleine Ohrstummel oben, sechs kurze dicke Tentakel-Blobs unten
 * (3 links, 3 rechts), zwei große runde Augen.
 *
 * Look (the ranges below are only an example, the app decides):
 *   warm    ≥ 22 °C  Sonnenbrille + Wangenrouge
 *   neutral  8–22 °C  Lächeln
 *   cold     0–8 °C  besorgte Brauen, Schal, Schneeflocken, Zittern
 *   frozen    < 0 °C  X-Augen, Eiszapfen, Schal, starkes Zittern
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

const KRAKEN_FUR: Record<Look, string> = {
    frozen: "#c4b5fd",
    cold: "#a78bfa",
    neutral: "#7c3aed",
    warm: "#9333ea",
};

const KRAKEN_SPOT: Record<Look, string> = {
    frozen: "#ede9fe",
    cold: "#c4b5fd",
    neutral: "#8b5cf6",
    warm: "#a855f7",
};

const HEAD = "M9,47 Q8,26 32,24 Q56,26 55,47 Q56,72 32,74 Q8,72 9,47 Z";

export function Octopus({
    isHot,
    size = 80,
    blinking = false,
    mood,
    ariaLabel,
}: AnimalProps) {
    const fur = KRAKEN_FUR[mood];
    const spot = KRAKEN_SPOT[mood];
    const isWarm = mood === "warm";
    const isCold = mood === "cold";
    const isFrozen = mood === "frozen";

    return (
        <PetSvg
            size={size}
            shivering={isCold || isFrozen}
            ariaLabel={ariaLabel}
        >
            <PetShadow cx={32} />
            <PetIcicles mood={mood} y={79} />

            {/* ── Tentakel-Blobs (hinter Kopf) ── */}
            {/* Linker Tentakel */}
            <ellipse
                cx="12"
                cy="70"
                rx="6"
                ry="6"
                fill={fur}
                stroke={OUTLINE}
                strokeWidth="1.3"
            />
            {/* Rechter Tentakel */}
            <ellipse
                cx="52"
                cy="70"
                rx="6"
                ry="6"
                fill={fur}
                stroke={OUTLINE}
                strokeWidth="1.3"
            />

            {/* ── Kopf ── */}
            <path d={HEAD} fill={fur} stroke={OUTLINE} strokeWidth="1.5" />

            {/* ── Bauch-Highlight ── */}
            <ellipse
                cx="32"
                cy="49"
                rx="16"
                ry="14"
                fill={spot}
                opacity="0.35"
            />

            {/* ── Tentakel-Blobs (vor Kopf) ── */}
            {/* Zweiter von links */}
            <ellipse
                cx="18"
                cy="75"
                rx="6"
                ry="6"
                fill={fur}
                stroke={OUTLINE}
                strokeWidth="1.3"
            />
            {/* Zweiter von rechts */}
            <ellipse
                cx="46"
                cy="75"
                rx="6"
                ry="6"
                fill={fur}
                stroke={OUTLINE}
                strokeWidth="1.3"
            />
            {/* Mitte links */}
            <ellipse
                cx="26"
                cy="77"
                rx="6"
                ry="6"
                fill={fur}
                stroke={OUTLINE}
                strokeWidth="1.3"
            />
            {/* Mitte rechts */}
            <ellipse
                cx="38"
                cy="77"
                rx="6"
                ry="6"
                fill={fur}
                stroke={OUTLINE}
                strokeWidth="1.3"
            />

            <PetSnowflakes
                mood={mood}
                left={{ x: 2, y: 22 }}
                right={{ x: 56, y: 16 }}
            />
            <PetSun mood={mood} />
            <PetSweat isHot={isHot} y={6} />

            {/* ── Augen (neutral + warm) ── */}
            {(mood === "neutral" || isWarm) &&
                (blinking ? (
                    <>
                        <line
                            x1="18"
                            y1="51"
                            x2="30"
                            y2="51"
                            stroke={OUTLINE}
                            strokeWidth="2.5"
                            strokeLinecap="round"
                        />
                        <line
                            x1="34"
                            y1="51"
                            x2="46"
                            y2="51"
                            stroke={OUTLINE}
                            strokeWidth="2.5"
                            strokeLinecap="round"
                        />
                    </>
                ) : (
                    <>
                        <circle cx="24" cy="51" r="7" fill={OUTLINE} />
                        <circle cx="40" cy="51" r="7" fill={OUTLINE} />
                        <circle
                            cx="21"
                            cy="48"
                            r="2.5"
                            fill="white"
                            opacity="0.65"
                        />
                        <circle
                            cx="37"
                            cy="48"
                            r="2.5"
                            fill="white"
                            opacity="0.65"
                        />
                    </>
                ))}

            {/* ── Sonnenbrille (warm) ── */}
            {isWarm && (
                <>
                    <rect
                        x="16"
                        y="46"
                        width="15"
                        height="11"
                        rx="3"
                        fill={OUTLINE}
                        opacity="0.9"
                    />
                    <rect
                        x="17"
                        y="47"
                        width="13"
                        height="9"
                        rx="2.5"
                        fill="#1e3a5f"
                    />
                    <circle
                        cx="24"
                        cy="51"
                        r="2.5"
                        fill="white"
                        opacity="0.15"
                    />
                    <line
                        x1="31"
                        y1="51"
                        x2="33"
                        y2="51"
                        stroke={OUTLINE}
                        strokeWidth="1.2"
                    />
                    <rect
                        x="33"
                        y="46"
                        width="15"
                        height="11"
                        rx="3"
                        fill={OUTLINE}
                        opacity="0.9"
                    />
                    <rect
                        x="34"
                        y="47"
                        width="13"
                        height="9"
                        rx="2.5"
                        fill="#1e3a5f"
                    />
                    <circle
                        cx="40"
                        cy="51"
                        r="2.5"
                        fill="white"
                        opacity="0.15"
                    />
                </>
            )}
            {isWarm && (
                <ellipse
                    cx="32"
                    cy="63"
                    rx="4"
                    ry="2.5"
                    fill="#fca5a5"
                    opacity="0.5"
                />
            )}

            {/* ── Besorgte Brauen + Augen (cold) ── */}
            {isCold && (
                <>
                    <path
                        d="M17,45 Q24,40 30,45"
                        stroke={OUTLINE}
                        strokeWidth="2"
                        strokeLinecap="round"
                        fill="none"
                    />
                    <path
                        d="M34,45 Q40,40 47,45"
                        stroke={OUTLINE}
                        strokeWidth="2"
                        strokeLinecap="round"
                        fill="none"
                    />
                    <circle cx="24" cy="51" r="7" fill={OUTLINE} />
                    <circle cx="40" cy="51" r="7" fill={OUTLINE} />
                    <circle
                        cx="21"
                        cy="48"
                        r="2.5"
                        fill="white"
                        opacity="0.65"
                    />
                    <circle
                        cx="37"
                        cy="48"
                        r="2.5"
                        fill="white"
                        opacity="0.65"
                    />
                </>
            )}

            {/* ── X-Augen (frozen) ── */}
            {isFrozen && (
                <>
                    <path
                        d="M17,45 Q24,40 30,45"
                        stroke={OUTLINE}
                        strokeWidth="2"
                        strokeLinecap="round"
                        fill="none"
                    />
                    <path
                        d="M34,45 Q40,40 47,45"
                        stroke={OUTLINE}
                        strokeWidth="2"
                        strokeLinecap="round"
                        fill="none"
                    />
                    <line
                        x1="18"
                        y1="45"
                        x2="30"
                        y2="57"
                        stroke={OUTLINE}
                        strokeWidth="2.5"
                        strokeLinecap="round"
                    />
                    <line
                        x1="30"
                        y1="45"
                        x2="18"
                        y2="57"
                        stroke={OUTLINE}
                        strokeWidth="2.5"
                        strokeLinecap="round"
                    />
                    <line
                        x1="34"
                        y1="45"
                        x2="46"
                        y2="57"
                        stroke={OUTLINE}
                        strokeWidth="2.5"
                        strokeLinecap="round"
                    />
                    <line
                        x1="46"
                        y1="45"
                        x2="34"
                        y2="57"
                        stroke={OUTLINE}
                        strokeWidth="2.5"
                        strokeLinecap="round"
                    />
                </>
            )}

            {/* ── Mund ── */}
            <path
                d={
                    mood === "neutral" || isWarm
                        ? "M27,62 Q32,66 37,62"
                        : "M27,63 Q32,59 37,63"
                }
                fill="none"
                stroke={OUTLINE}
                strokeWidth="1.5"
                strokeLinecap="round"
            />

            <PetScarf
                mood={mood}
                x={9}
                y={64}
                width={46}
                knotCx={55}
                knotCy={68}
            />
        </PetSvg>
    );
}
