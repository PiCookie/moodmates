/**
 * Gen1-Style Kraken Pet (Vorderansicht)
 *
 * Erkennungsmerkmale: runder Kopf/Mantel, acht gewundene Tentakel,
 * zwei große Augen.
 *
 * Mood → temperature:
 *   warm    ≥ 22 °C  Sonnenbrille + Wangenrouge
 *   neutral  8–22 °C  Lächeln
 *   cold     0–8 °C  besorgte Braue, Schal, Schneeflocken, Zittern
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

const KRAKEN_FUR: Record<Mood, string> = {
    frozen:  "#c4b5fd",
    cold:    "#a78bfa",
    neutral: "#7c3aed",
    warm:    "#9333ea",
};

const KRAKEN_SPOT: Record<Mood, string> = {
    frozen:  "#ede9fe",
    cold:    "#c4b5fd",
    neutral: "#8b5cf6",
    warm:    "#a855f7",
};

const HEAD = "M16,27 Q15,13 32,11 Q49,13 48,27 Q49,41 32,43 Q15,41 16,27 Z";

const TENTACLES = [
    "M18,40 Q11,54 9,63 Q9,71 15,69",
    "M22,42 Q17,55 16,65 Q16,72 22,70",
    "M27,43 Q23,56 23,65 Q23,72 29,71",
    "M31,43 Q29,57 30,66 Q31,73 36,72",
    "M35,43 Q37,57 38,66 Q39,73 33,72",
    "M38,43 Q41,56 41,65 Q41,72 35,71",
    "M42,42 Q47,55 48,65 Q48,72 42,70",
    "M46,40 Q53,54 55,63 Q55,71 49,69",
];

export function PetKraken({
    temperature,
    size = 80,
    blinking = false,
}: PetProps) {
    const mood     = getMood(temperature);
    const isHot    = temperature !== null && temperature >= 28;
    const fur      = KRAKEN_FUR[mood];
    const spot     = KRAKEN_SPOT[mood];
    const isWarm   = mood === "warm";
    const isCold   = mood === "cold";
    const isFrozen = mood === "frozen";

    return (
        <PetSvg
            size={size}
            shivering={isCold || isFrozen}
            ariaLabel={`Kraken-Pet: ${mood}`}
        >
            <PetShadow cx={32} />
            <PetIcicles mood={mood} y={70} />

            {/* ── Tentakel (Outline) ── */}
            {TENTACLES.map((d, i) => (
                <path
                    key={i}
                    d={d}
                    fill="none"
                    stroke={OUTLINE}
                    strokeWidth="5.5"
                    strokeLinecap="round"
                />
            ))}

            {/* ── Tentakel (Farbe) ── */}
            {TENTACLES.map((d, i) => (
                <path
                    key={i}
                    d={d}
                    fill="none"
                    stroke={fur}
                    strokeWidth="4"
                    strokeLinecap="round"
                />
            ))}

            {/* ── Kopf/Mantel ── */}
            <path d={HEAD} fill={fur} stroke={OUTLINE} strokeWidth="1.5" />

            {/* ── Bauch-Highlight ── */}
            <ellipse cx="32" cy="30" rx="10" ry="8" fill={spot} opacity="0.5" />

            <PetSnowflakes
                mood={mood}
                left={{ x: 2, y: 20 }}
                right={{ x: 56, y: 14 }}
            />
            <PetSun mood={mood} />
            <PetSweat isHot={isHot} y={8} />

            {/* ── Augen (neutral + warm) ── */}
            {(mood === "neutral" || isWarm) &&
                (blinking ? (
                    <>
                        <line x1="22" y1="27" x2="30" y2="27" stroke={OUTLINE} strokeWidth="2.5" strokeLinecap="round" />
                        <line x1="34" y1="27" x2="42" y2="27" stroke={OUTLINE} strokeWidth="2.5" strokeLinecap="round" />
                    </>
                ) : (
                    <>
                        <circle cx="26" cy="27" r="5" fill={OUTLINE} />
                        <circle cx="38" cy="27" r="5" fill={OUTLINE} />
                        <circle cx="24" cy="25" r="1.8" fill="white" opacity="0.65" />
                        <circle cx="36" cy="25" r="1.8" fill="white" opacity="0.65" />
                    </>
                ))}

            {/* ── Sonnenbrille (warm) ── */}
            {isWarm && (
                <>
                    <rect x="19" y="23" width="13" height="9" rx="2.5" fill={OUTLINE} opacity="0.9" />
                    <rect x="20" y="24" width="11" height="7" rx="2" fill="#1e3a5f" />
                    <circle cx="26" cy="27" r="2" fill="white" opacity="0.15" />
                    <line x1="32" y1="27" x2="33" y2="27" stroke={OUTLINE} strokeWidth="1" />
                    <rect x="33" y="23" width="11" height="9" rx="2.5" fill={OUTLINE} opacity="0.9" />
                    <rect x="34" y="24" width="9" height="7" rx="2" fill="#1e3a5f" />
                    <circle cx="38" cy="27" r="2" fill="white" opacity="0.15" />
                </>
            )}
            {isWarm && (
                <ellipse cx="32" cy="35" rx="4" ry="2.5" fill="#fca5a5" opacity="0.5" />
            )}

            {/* ── Besorgte Brauen + Augen (cold) ── */}
            {isCold && (
                <>
                    <path d="M20,22 Q26,18 31,22" stroke={OUTLINE} strokeWidth="2" strokeLinecap="round" fill="none" />
                    <path d="M33,22 Q38,18 44,22" stroke={OUTLINE} strokeWidth="2" strokeLinecap="round" fill="none" />
                    <circle cx="26" cy="27" r="5" fill={OUTLINE} />
                    <circle cx="38" cy="27" r="5" fill={OUTLINE} />
                    <circle cx="24" cy="25" r="1.8" fill="white" opacity="0.65" />
                    <circle cx="36" cy="25" r="1.8" fill="white" opacity="0.65" />
                </>
            )}

            {/* ── X-Augen (frozen) ── */}
            {isFrozen && (
                <>
                    <path d="M20,22 Q26,18 31,22" stroke={OUTLINE} strokeWidth="2" strokeLinecap="round" fill="none" />
                    <path d="M33,22 Q38,18 44,22" stroke={OUTLINE} strokeWidth="2" strokeLinecap="round" fill="none" />
                    <line x1="22" y1="23" x2="30" y2="31" stroke={OUTLINE} strokeWidth="2.5" strokeLinecap="round" />
                    <line x1="30" y1="23" x2="22" y2="31" stroke={OUTLINE} strokeWidth="2.5" strokeLinecap="round" />
                    <line x1="34" y1="23" x2="42" y2="31" stroke={OUTLINE} strokeWidth="2.5" strokeLinecap="round" />
                    <line x1="42" y1="23" x2="34" y2="31" stroke={OUTLINE} strokeWidth="2.5" strokeLinecap="round" />
                </>
            )}

            {/* ── Mund ── */}
            <path
                d={mood === "neutral" || isWarm ? "M28,35 Q32,38 36,35" : "M28,36 Q32,33 36,36"}
                fill="none"
                stroke={OUTLINE}
                strokeWidth="1.3"
                strokeLinecap="round"
            />

            <PetScarf
                mood={mood}
                x={16}
                y={40}
                width={32}
                knotCx={48}
                knotCy={44}
            />
        </PetSvg>
    );
}
