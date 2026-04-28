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
    "M27,33 Q17,42 18,52 Q19,61 28,65 Q32,67 36,64 Q40,60 42,50 Q42,41 37,33 Z";

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
                d="M32,65 Q32,75 21,76 Q13,74 15,66"
                fill="none"
                stroke={OUTLINE}
                strokeWidth="6.5"
                strokeLinecap="round"
            />
            <path
                d="M32,65 Q32,75 21,76 Q13,74 15,66"
                fill="none"
                stroke={fur}
                strokeWidth="4.5"
                strokeLinecap="round"
            />

            {/* ── Rückenflosse (Fächer, rechts, gespiegelt) ── */}
            <path
                d="M52,37 Q38,40 36,48 Q38,57 52,57 Z"
                fill={fur}
                stroke={OUTLINE}
                strokeWidth="1.2"
                strokeLinejoin="round"
            />
            <line
                x1="52"
                y1="37"
                x2="37"
                y2="43"
                stroke={OUTLINE}
                strokeWidth="0.7"
                opacity="0.3"
            />
            <line
                x1="52"
                y1="41"
                x2="36"
                y2="48"
                stroke={OUTLINE}
                strokeWidth="0.7"
                opacity="0.3"
            />
            <line
                x1="52"
                y1="45"
                x2="36"
                y2="50"
                stroke={OUTLINE}
                strokeWidth="0.7"
                opacity="0.3"
            />
            <line
                x1="52"
                y1="49"
                x2="37"
                y2="54"
                stroke={OUTLINE}
                strokeWidth="0.7"
                opacity="0.3"
            />
            <line
                x1="52"
                y1="53"
                x2="39"
                y2="57"
                stroke={OUTLINE}
                strokeWidth="0.7"
                opacity="0.3"
            />

            {/* ── Körper ── */}
            <path d={BODY} fill={fur} stroke={OUTLINE} strokeWidth="1.5" />
            {/* Bauch (heller, linke Seite) */}
            <path
                d="M27,34 Q18,43 19,52 Q20,60 27,64 Q29,66 31,63 Q34,58 34,50 Q34,43 29,36 Z"
                fill={belly}
            />

            {/* ── Körper-Segmente (organische Bögen, geclippt) ── */}
            <g clipPath={`url(#${clipId})`}>
                <path
                    d="M13,41 Q25,39 31,41"
                    fill="none"
                    stroke={crown}
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    opacity="0.65"
                />
                <path
                    d="M13,47 Q25,45 33,47"
                    fill="none"
                    stroke={crown}
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    opacity="0.65"
                />
                <path
                    d="M13,53 Q25,50 33,53"
                    fill="none"
                    stroke={crown}
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    opacity="0.65"
                />
                <path
                    d="M14,59 Q25,56 32,59"
                    fill="none"
                    stroke={crown}
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    opacity="0.65"
                />
                <path
                    d="M16,64 Q25,61 30,64"
                    fill="none"
                    stroke={crown}
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    opacity="0.65"
                />
            </g>

            {/* ── Körperkamm (Rückengrat, rechts) ── */}
            <path
                d="M42,14 Q54,18 42,22 Z"
                fill={crown}
                stroke={OUTLINE}
                strokeWidth="0.8"
                strokeLinejoin="round"
                transform="rotate(-90 34 21)"
            />
            <path
                d="M42,14 Q54,18 42,22 Z"
                fill={crown}
                stroke={OUTLINE}
                strokeWidth="0.8"
                strokeLinejoin="round"
                transform="rotate(-30 40 23)"
            />
            <path
                d="M42,23 Q54,27 42,31 Z"
                fill={crown}
                stroke={OUTLINE}
                strokeWidth="0.8"
                strokeLinejoin="round"
                transform="rotate(20 40 23)"
            />
            <path
                d="M39,33 Q49,37 39,41 Z"
                fill={crown}
                stroke={OUTLINE}
                strokeWidth="0.8"
                strokeLinejoin="round"
                transform="rotate(-20 40 33)"
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
                d="M23,19 Q18,20 12,19 Q12,25 13,24 Q19,23 23,25 Z"
                fill={fur}
                stroke={OUTLINE}
                strokeWidth="1"
                strokeLinejoin="round"
            />
            <circle
                cx="8"
                cy="22"
                r="5"
                fill={fur}
                stroke={OUTLINE}
                strokeWidth="1.5"
            />
            <circle cx="8" cy="22" r="3" fill={OUTLINE} opacity="0.45" />

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
                        x1="36"
                        y1="22"
                        x2="28"
                        y2="22"
                        stroke={OUTLINE}
                        strokeWidth="2.5"
                        strokeLinecap="round"
                    />
                ) : (
                    <>
                        <circle cx="32" cy="22" r="5" fill={OUTLINE} />
                        <circle
                            cx="34"
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
                        x1="36"
                        y1="22"
                        x2="28"
                        y2="22"
                        stroke={OUTLINE}
                        strokeWidth="2.5"
                        strokeLinecap="round"
                    />
                ) : (
                    <>
                        <circle
                            cx="32"
                            cy="22"
                            r="5.5"
                            fill={OUTLINE}
                            opacity="0.9"
                        />
                        <circle cx="32" cy="22" r="4.5" fill="#1e3a5f" />
                        <circle
                            cx="34"
                            cy="20"
                            r="1.5"
                            fill="white"
                            opacity="0.15"
                        />
                        <line
                            x1="37.5"
                            y1="22"
                            x2="45"
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
                        d="M37,16 Q32,13 27,16"
                        stroke={OUTLINE}
                        strokeWidth="2"
                        strokeLinecap="round"
                        fill="none"
                    />
                    <circle cx="32" cy="22" r="5" fill={OUTLINE} />
                    <circle
                        cx="34"
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
                        d="M37,16 Q32,13 27,16"
                        stroke={OUTLINE}
                        strokeWidth="2"
                        strokeLinecap="round"
                        fill="none"
                    />
                    <line
                        x1="36"
                        y1="18"
                        x2="28"
                        y2="26"
                        stroke={OUTLINE}
                        strokeWidth="2.5"
                        strokeLinecap="round"
                    />
                    <line
                        x1="28"
                        y1="18"
                        x2="36"
                        y2="26"
                        stroke={OUTLINE}
                        strokeWidth="2.5"
                        strokeLinecap="round"
                    />
                </>
            )}

            <PetScarf
                mood={mood}
                x={20}
                y={33}
                width={28}
                knotCx={48}
                knotCy={37}
            />
        </PetSvg>
    );
}
