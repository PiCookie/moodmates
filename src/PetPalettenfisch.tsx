/**
 * Gen1-Style Doktor-Palettenfisch Pet (Seitenansicht)
 *
 * Erkennungsmerkmale: blauer ovaler Körper, gelbe gegabelte Schwanzflosse,
 * schwarzes Palettenstreifen-Muster (Signatur-Merkmal), Auge links.
 *
 * Mood → temperature:
 *   warm    ≥ 22 °C  Sonnenbrille + Wangenrouge
 *   neutral  8–22 °C  Lächeln
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

const PALETTEN_FUR: Record<Mood, string> = {
    frozen: "#bfdbfe",
    cold: "#60a5fa",
    neutral: "#1d4ed8",
    warm: "#2563eb",
};

const PALETTEN_BELLY: Record<Mood, string> = {
    frozen: "#eff6ff",
    cold: "#dbeafe",
    neutral: "#93c5fd",
    warm: "#60a5fa",
};

const PALETTEN_TAIL: Record<Mood, string> = {
    frozen: "#e0f2fe",
    cold: "#fde68a",
    neutral: "#fbbf24",
    warm: "#f59e0b",
};

const BODY =
    "M11,43 Q11,30 25,29 Q40,30 47,38 Q51,43 47,49 Q40,57 25,57 Q11,57 11,43 Z";

export function PetPalettenfisch({
    temperature,
    size = 80,
    blinking = false,
}: PetProps) {
    const mood = getMood(temperature);
    const isHot = temperature !== null && temperature >= 28;
    const fur = PALETTEN_FUR[mood];
    const belly = PALETTEN_BELLY[mood];
    const tail = PALETTEN_TAIL[mood];
    const isWarm = mood === "warm";
    const isCold = mood === "cold";
    const isFrozen = mood === "frozen";

    return (
        <PetSvg
            size={size}
            shivering={isCold || isFrozen}
            ariaLabel={`Palettenfisch-Pet: ${mood}`}
        >
            <PetShadow cx={29} />
            <PetIcicles mood={mood} y={66} />

            {/* ── Schwanzflosse (gegabelt, gelb) — hinter Körper ── */}
            <path
                d="M47,39 Q54,31 58,34 Q57,36 55,41 Q55,46 57,50 Q54,52 47,47 Z"
                fill={tail}
                stroke={OUTLINE}
                strokeWidth="1.2"
                strokeLinejoin="round"
            />

            {/* ── Rückenflosse — hinter Körper ── */}
            <path
                d="M20,29 Q24,22 37,27 Q60,44 30,29 Z"
                fill={fur}
                stroke={OUTLINE}
                strokeWidth="1.2"
                strokeLinejoin="round"
            />

            {/* ── Körper (blau) ── */}
            <path d={BODY} fill={fur} />

            {/* ── Bauch (heller, unten) ── */}
            <path
                d="M11,47 Q13,55 22,57 Q30,58 38,55 Q43,52 46,48 Q41,55 28,55 Q16,53 11,47 Z"
                fill={belly}
            />

            {/* ── Körper-Outline ── */}
            <path d={BODY} fill="none" stroke={OUTLINE} strokeWidth="1.5" />

            {/* ── Palettenstreifen (schwarze Signatur-Markierung) ── */}
            <path
                d="M17,32 20,31 Q33,31 37,34 Q41,45 27,40 Q30,35 35,34 "
                fill="none"
                stroke={OUTLINE}
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M36,33 47,42 Q47,42 37,41 "
                fill="none"
                stroke={OUTLINE}
                strokeWidth="5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />

            {/* ── Brustflosse ── */}
            <path
                d="M24,52 Q28,61 34,57 Q32,51 24,52 Z"
                fill={tail}
                stroke={OUTLINE}
                strokeWidth="1"
                strokeLinejoin="round"
            />

            <PetSnowflakes
                mood={mood}
                left={{ x: 2, y: 34 }}
                right={{ x: 54, y: 27 }}
            />
            <PetSun mood={mood} />
            <PetSweat isHot={isHot} y={20} />

            {/* ── Auge (neutral + warm) ── */}
            {(mood === "neutral" || isWarm) &&
                (blinking ? (
                    <line
                        x1="12"
                        y1="40"
                        x2="20"
                        y2="40"
                        stroke={OUTLINE}
                        strokeWidth="2.5"
                        strokeLinecap="round"
                    />
                ) : (
                    <>
                        <circle cx="16" cy="40" r="4.5" fill={OUTLINE} />
                        <circle
                            cx="17"
                            cy="39"
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
                        x="9"
                        y="36"
                        width="13"
                        height="9"
                        rx="2.5"
                        fill={OUTLINE}
                        opacity="0.9"
                    />
                    <rect
                        x="10"
                        y="37"
                        width="11"
                        height="7"
                        rx="2"
                        fill="#1e3a5f"
                    />
                    <circle cx="16" cy="40" r="2" fill="white" opacity="0.15" />
                </>
            )}

            {/* ── Besorgte Braue + Auge (cold) ── */}
            {isCold && (
                <>
                    <path
                        d="M11,36 Q16,32 21,36"
                        stroke={OUTLINE}
                        strokeWidth="2"
                        strokeLinecap="round"
                        fill="none"
                    />
                    <circle cx="16" cy="40" r="4.5" fill={OUTLINE} />
                    <circle
                        cx="17"
                        cy="39"
                        r="1.5"
                        fill="white"
                        opacity="0.65"
                    />
                </>
            )}

            {/* ── X-Auge (frozen) ── */}
            {isFrozen && (
                <>
                    <path
                        d="M11,36 Q16,32 21,36"
                        stroke={OUTLINE}
                        strokeWidth="2"
                        strokeLinecap="round"
                        fill="none"
                    />
                    <line
                        x1="12"
                        y1="37"
                        x2="20"
                        y2="45"
                        stroke={OUTLINE}
                        strokeWidth="2.5"
                        strokeLinecap="round"
                    />
                    <line
                        x1="20"
                        y1="37"
                        x2="12"
                        y2="45"
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
                        ? "M11,47 Q14,49 17,46"
                        : "M11,47 Q14,44 17,47"
                }
                fill="none"
                stroke={OUTLINE}
                strokeWidth="1.2"
                strokeLinecap="round"
            />

            {/* ── Wangenrouge (warm) ── */}
            {isWarm && (
                <ellipse
                    cx="20"
                    cy="47"
                    rx="3.5"
                    ry="2"
                    fill="#fca5a5"
                    opacity="0.5"
                />
            )}

            <PetScarf
                mood={mood}
                x={11}
                y={54}
                width={20}
                knotCx={31}
                knotCy={58}
            />
        </PetSvg>
    );
}
