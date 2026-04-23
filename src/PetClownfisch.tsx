/**
 * Gen1-Style Clownfisch Pet (Seitenansicht)
 *
 * Erkennungsmerkmale: oranger Körper mit zwei schwarz umrandeten
 * weißen Querstreifen, breites schwarzes Auge.
 *
 * Mood → temperature:
 *   warm    ≥ 22 °C  Sonnenbrille + Wangenrouge
 *   neutral  8–22 °C  Lächeln
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

const CLOWN_FUR: Record<Mood, string> = {
    frozen: "#fed7aa",
    cold: "#c2410c",
    neutral: "#ea580c",
    warm: "#f97316",
};

export function PetClownfisch({
    temperature,
    size = 80,
    blinking = false,
}: PetProps) {
    const mood = getMood(temperature);
    const isHot = temperature !== null && temperature >= 28;
    const fur = CLOWN_FUR[mood];
    const isWarm = mood === "warm";
    const isCold = mood === "cold";
    const isFrozen = mood === "frozen";

    return (
        <PetSvg
            size={size}
            shivering={isCold || isFrozen}
            ariaLabel={`Clownfisch-Pet: ${mood}`}
        >
            <PetShadow cx={30} />
            <PetIcicles mood={mood} y={66} />

            {/* ── Schwanzflosse — hinter Körper ── */}
            <path
                d="M46,39 Q53,32 56,29 Q58,41 56,55 Q53,52 46,45 Z"
                fill={fur}
                stroke={OUTLINE}
                strokeWidth="1.3"
                strokeLinejoin="round"
            />

            {/* ── Rückenflosse — hinter Körper ── */}
            <path
                d="M22,29 Q26,18 36,21 Q37,26 30,29 Z"
                fill={fur}
                stroke={OUTLINE}
                strokeWidth="1.2"
                strokeLinejoin="round"
            />

            {/* ── Körper (orange) ── */}
            <path
                d="M12,43 Q12,30 26,29 Q40,30 46,38 Q50,43 46,49 Q40,57 26,57 Q12,57 12,43 Z"
                fill={fur}
            />

            {/* ── Weißer Streifen 1 (Kopf-Körper-Übergang) ── */}
            <path d="M24,33 Q27,30 30,33 L30,53 Q27,56 24,53 Z" fill="white" />

            {/* ── Weißer Streifen 2 (Körpermitte) ── */}
            <path d="M36,31 Q39,31 42,35 L42,52 Q39,57 36,55 Z" fill="white" />

            {/* ── Körper-Outline (überdeckt Streifenrand an der Kante) ── */}
            <path
                d="M12,43 Q12,30 26,29 Q40,30 46,38 Q50,43 46,49 Q40,57 26,57 Q12,57 12,43 Z"
                fill="none"
                stroke={OUTLINE}
                strokeWidth="1.5"
            />

            {/* ── Streifen-Outlines ── */}
            <path
                d="M24,33 Q27,30 30,33 L30,53 Q27,56 24,53 Z"
                fill="none"
                stroke={OUTLINE}
                strokeWidth="0.9"
            />
            <path
                d="M36,31 Q39,31 42,35 L42,52 Q39,57 36,55 Z"
                fill="none"
                stroke={OUTLINE}
                strokeWidth="0.7"
            />

            {/* ── Brustflosse ── */}
            <path
                d="M27,48 Q31,58 36,54 Q34,48 27,48 Z"
                fill={fur}
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
                        x1="15"
                        y1="40"
                        x2="23"
                        y2="40"
                        stroke={OUTLINE}
                        strokeWidth="2.5"
                        strokeLinecap="round"
                    />
                ) : (
                    <>
                        <circle cx="19" cy="40" r="4.5" fill={OUTLINE} />
                        <circle
                            cx="20"
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
                        x="12"
                        y="36"
                        width="13"
                        height="9"
                        rx="2.5"
                        fill={OUTLINE}
                        opacity="0.9"
                    />
                    <rect
                        x="13"
                        y="37"
                        width="11"
                        height="7"
                        rx="2"
                        fill="#1e3a5f"
                    />
                    <circle cx="19" cy="40" r="2" fill="white" opacity="0.15" />
                </>
            )}

            {/* ── Auge + Braue (cold) ── */}
            {isCold && (
                <>
                    <path
                        d="M14,36 Q19,32 24,36"
                        stroke={OUTLINE}
                        strokeWidth="2"
                        strokeLinecap="round"
                        fill="none"
                    />
                    <circle cx="19" cy="40" r="4.5" fill={OUTLINE} />
                    <circle
                        cx="20"
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
                        d="M14,36 Q19,32 24,36"
                        stroke={OUTLINE}
                        strokeWidth="2"
                        strokeLinecap="round"
                        fill="none"
                    />
                    <line
                        x1="15"
                        y1="37"
                        x2="23"
                        y2="45"
                        stroke={OUTLINE}
                        strokeWidth="2.5"
                        strokeLinecap="round"
                    />
                    <line
                        x1="23"
                        y1="37"
                        x2="15"
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
                        ? "M13,45 Q16,49 19,46"
                        : "M13,47 Q16,44 19,47"
                }
                fill="none"
                stroke={OUTLINE}
                strokeWidth="1.2"
                strokeLinecap="round"
            />

            {/* ── Wangenrouge (warm) ── */}
            {isWarm && (
                <ellipse
                    cx="16"
                    cy="47"
                    rx="3.5"
                    ry="2"
                    fill="#fca5a5"
                    opacity="0.5"
                />
            )}

            <PetScarf
                mood={mood}
                x={12}
                y={54}
                width={20}
                knotCx={32}
                knotCy={58}
            />
        </PetSvg>
    );
}
