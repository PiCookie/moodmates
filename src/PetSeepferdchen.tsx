/**
 * Gen1-Style Seepferdchen Pet (Seitenansicht, nach links)
 *
 * Erkennungsmerkmale: einzelnes großes Auge, organischer Kamm oben,
 * geschwungene Körpersegmente, Fächerflosse, eingerollter Schwanz.
 *
 * Schichten (hinten → vorne):
 *   Schwanz → Körper → Rückenflosse → Brustflosse → Kopf → Krone → Gesicht
 *
 * Mood → temperature:
 *   warm    ≥ 22 °C  Mono-Sonnenbrille + Wangenrouge
 *   neutral  8–22 °C  einzelnes rundes Auge
 *   cold     0–8 °C  besorgte Braue, Schal, Schneeflocken, Zittern
 *   frozen    < 0 °C  X-Auge, Eiszapfen, Schal, starkes Zittern
 */

import { useId } from "react";
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

const SEE_FUR: Record<Mood, string> = {
    frozen: "#bfdbfe",
    cold: "#93c5fd",
    neutral: "#f59e0b",
    warm: "#d97706",
};

const SEE_BELLY: Record<Mood, string> = {
    frozen: "#eff6ff",
    cold: "#dbeafe",
    neutral: "#fde68a",
    warm: "#fcd34d",
};

const SEE_CROWN: Record<Mood, string> = {
    frozen: "#6366f1",
    cold: "#2563eb",
    neutral: "#92400e",
    warm: "#78350f",
};

// Körperform: birnenförmig, Bauch links, Rücken rechts, beginnt bei y=33 (Kopf-Unterkante)
const BODY =
    "M23,33 Q13,42 14,52 Q15,61 24,65 Q28,67 32,64 Q40,60 43,51 Q43,42 37,33 Z";

export function PetSeepferdchen({
    temperature,
    size = 80,
    blinking = false,
}: PetProps) {
    const mood = getMood(temperature);
    const isHot = temperature !== null && temperature >= 28;
    const fur = SEE_FUR[mood];
    const belly = SEE_BELLY[mood];
    const crown = SEE_CROWN[mood];
    const isWarm = mood === "warm";
    const isCold = mood === "cold";
    const isFrozen = mood === "frozen";
    const clipId = useId();

    return (
        <PetSvg
            size={size}
            shivering={isCold || isFrozen}
            ariaLabel={`Seepferdchen-Pet: ${mood}`}
        >
            <defs>
                <clipPath id={clipId}>
                    <path d={BODY} />
                </clipPath>
            </defs>

            <PetShadow cx={32} />
            <PetIcicles mood={mood} y={68} />

            {/* ── Eingerollter Schwanz ── */}
            <path
                d="M28,65 Q22,74 14,72 Q8,68 11,61"
                fill="none"
                stroke={OUTLINE}
                strokeWidth="6.5"
                strokeLinecap="round"
            />
            <path
                d="M28,65 Q22,74 14,72 Q8,68 11,61"
                fill="none"
                stroke={fur}
                strokeWidth="4.5"
                strokeLinecap="round"
            />

            {/* ── Körper ── */}
            <path d={BODY} fill={fur} stroke={OUTLINE} strokeWidth="1.5" />
            {/* Bauch (heller, linke Seite) */}
            <path
                d="M23,34 Q15,43 16,52 Q17,60 23,64 Q27,66 30,63 Q33,58 32,50 Q31,43 27,36 Z"
                fill={belly}
            />

            {/* ── Körper-Segmente (organische Bögen, geclippt) ── */}
            <g clipPath={`url(#${clipId})`}>
                <path
                    d="M13,41 Q28,38 43,41"
                    fill="none"
                    stroke={crown}
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    opacity="0.65"
                />
                <path
                    d="M13,47 Q28,44 43,47"
                    fill="none"
                    stroke={crown}
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    opacity="0.65"
                />
                <path
                    d="M13,53 Q28,50 43,53"
                    fill="none"
                    stroke={crown}
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    opacity="0.65"
                />
                <path
                    d="M14,59 Q28,56 42,59"
                    fill="none"
                    stroke={crown}
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    opacity="0.65"
                />
                <path
                    d="M16,64 Q28,61 41,64"
                    fill="none"
                    stroke={crown}
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    opacity="0.65"
                />
            </g>

            {/* ── Rückenflosse (Fächer, rechts) ── */}
            <path
                d="M43,40 Q57,43 59,51 Q57,60 43,60"
                fill={fur}
                stroke={OUTLINE}
                strokeWidth="1.2"
                strokeLinejoin="round"
            />
            <line
                x1="43"
                y1="40"
                x2="58"
                y2="46"
                stroke={OUTLINE}
                strokeWidth="0.7"
                opacity="0.3"
            />
            <line
                x1="43"
                y1="44"
                x2="59"
                y2="51"
                stroke={OUTLINE}
                strokeWidth="0.7"
                opacity="0.3"
            />
            <line
                x1="43"
                y1="48"
                x2="59"
                y2="53"
                stroke={OUTLINE}
                strokeWidth="0.7"
                opacity="0.3"
            />
            <line
                x1="43"
                y1="52"
                x2="58"
                y2="57"
                stroke={OUTLINE}
                strokeWidth="0.7"
                opacity="0.3"
            />
            <line
                x1="43"
                y1="56"
                x2="56"
                y2="60"
                stroke={OUTLINE}
                strokeWidth="0.7"
                opacity="0.3"
            />

            {/* ── Brustflosse (klein, links) ── */}
            <ellipse
                cx="17"
                cy="46"
                rx="5"
                ry="3"
                fill={fur}
                stroke={OUTLINE}
                strokeWidth="0.8"
                transform="rotate(-20 17 46)"
            />

            {/* ── Krone / Kamm (organische Bezier-Zacken, größer) ── */}
            <path
                d="M20,17 Q17,6 23,14 Q23,4 28,13 Q29,3 32,12 Q35,4 38,13 Q39,5 43,15 Q43,18 20,17 Z"
                fill={crown}
                stroke={OUTLINE}
                strokeWidth="1"
                strokeLinejoin="round"
            />

            {/* ── Kopf ── */}
            <circle
                cx="31"
                cy="23"
                r="10"
                fill={fur}
                stroke={OUTLINE}
                strokeWidth="1.5"
            />

            {/* ── Schnauze (nach links-oben, konisch zulaufend) ── */}
            <path
                d="M23,20 Q13,15 5,19 Q5,23 12,24 Q19,25 23,23 Z"
                fill={fur}
                stroke={OUTLINE}
                strokeWidth="1"
                strokeLinejoin="round"
            />
            <circle cx="5" cy="21" r="1.5" fill={OUTLINE} opacity="0.45" />

            <PetSnowflakes
                mood={mood}
                left={{ x: 2, y: 20 }}
                right={{ x: 54, y: 14 }}
            />
            <PetSun mood={mood} />
            <PetSweat isHot={isHot} y={10} />

            {/* ── Einzelnes Auge (neutral) ── */}
            {mood === "neutral" &&
                (blinking ? (
                    <line
                        x1="39"
                        y1="22"
                        x2="31"
                        y2="22"
                        stroke={OUTLINE}
                        strokeWidth="2.5"
                        strokeLinecap="round"
                    />
                ) : (
                    <>
                        <circle cx="35" cy="22" r="5" fill={OUTLINE} />
                        <circle
                            cx="37"
                            cy="20"
                            r="1.8"
                            fill="white"
                            opacity="0.65"
                        />
                    </>
                ))}

            {/* ── Mono-Sonnenbrille (warm) ── */}
            {isWarm &&
                (blinking ? (
                    <line
                        x1="39"
                        y1="22"
                        x2="31"
                        y2="22"
                        stroke={OUTLINE}
                        strokeWidth="2.5"
                        strokeLinecap="round"
                    />
                ) : (
                    <>
                        <circle
                            cx="35"
                            cy="22"
                            r="5.5"
                            fill={OUTLINE}
                            opacity="0.9"
                        />
                        <circle cx="35" cy="22" r="4.5" fill="#1e3a5f" />
                        <circle
                            cx="37"
                            cy="20"
                            r="1.5"
                            fill="white"
                            opacity="0.15"
                        />
                        <line
                            x1="40.5"
                            y1="22"
                            x2="48"
                            y2="24"
                            stroke={OUTLINE}
                            strokeWidth="1.2"
                        />
                    </>
                ))}
            {isWarm && (
                <ellipse
                    cx="24"
                    cy="30"
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
                        d="M40,16 Q35,13 30,16"
                        stroke={OUTLINE}
                        strokeWidth="2"
                        strokeLinecap="round"
                        fill="none"
                    />
                    <circle cx="35" cy="22" r="5" fill={OUTLINE} />
                    <circle
                        cx="37"
                        cy="20"
                        r="1.8"
                        fill="white"
                        opacity="0.65"
                    />
                </>
            )}

            {/* ── X-Auge (frozen) ── */}
            {isFrozen && (
                <>
                    <path
                        d="M40,16 Q35,13 30,16"
                        stroke={OUTLINE}
                        strokeWidth="2"
                        strokeLinecap="round"
                        fill="none"
                    />
                    <line
                        x1="39"
                        y1="18"
                        x2="31"
                        y2="26"
                        stroke={OUTLINE}
                        strokeWidth="2.5"
                        strokeLinecap="round"
                    />
                    <line
                        x1="31"
                        y1="18"
                        x2="39"
                        y2="26"
                        stroke={OUTLINE}
                        strokeWidth="2.5"
                        strokeLinecap="round"
                    />
                </>
            )}

            <PetScarf
                mood={mood}
                x={16}
                y={33}
                width={28}
                knotCx={44}
                knotCy={37}
            />
        </PetSvg>
    );
}
