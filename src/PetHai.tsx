/**
 * Gen1-Style Hai Pet (Seitenansicht)
 *
 * Erkennungsmerkmale: torpedoförmiger Körper, große dreieckige
 * Rückenflosse, heterozerkale Schwanzflosse, Kiemenschlitze,
 * heller Bauch.
 *
 * Mood → temperature:
 *   warm    ≥ 22 °C  Sonnenbrille + Wangenrouge
 *   neutral  8–22 °C  Auge + leicht geöffnetes Maul
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

const HAI_FUR: Record<Mood, string> = {
    frozen: "#bfdbfe",
    cold:   "#7dd3fc",
    neutral: "#64748b",
    warm:   "#475569",
};

const HAI_BELLY: Record<Mood, string> = {
    frozen: "#f0f9ff",
    cold:   "#e0f2fe",
    neutral: "#e2e8f0",
    warm:   "#cbd5e1",
};

export function PetHai({
    temperature,
    size = 80,
    blinking = false,
}: PetProps) {
    const mood = getMood(temperature);
    const isHot = temperature !== null && temperature >= 28;
    const fur   = HAI_FUR[mood];
    const belly = HAI_BELLY[mood];
    const isWarm   = mood === "warm";
    const isCold   = mood === "cold";
    const isFrozen = mood === "frozen";

    return (
        <PetSvg
            size={size}
            viewBoxWidth={104}
            shivering={isCold || isFrozen}
            ariaLabel={`Hai-Pet: ${mood}`}
        >
            <PetShadow cx={33} />
            <g transform="scale(1.40) translate(-2, -1)">
                <PetIcicles mood={mood} y={68} />

                {/* ── Schwanzflosse (heterozerk: oberer Lappen größer) ── */}
                <path
                    d="M56,44 Q63,34 69,24 Q68,40 62,44 Q62,49 68,60 Q63,57 56,49 Z"
                    fill={fur}
                    stroke={OUTLINE}
                    strokeWidth="1.3"
                    strokeLinejoin="round"
                />

                {/* ── Rückenflosse (großes Dreieck, Hauptmerkmal) ── */}
                <path
                    d="M27,30 L37,10 L48,31 Z"
                    fill={fur}
                    stroke={OUTLINE}
                    strokeWidth="1.3"
                    strokeLinejoin="round"
                />

                {/* ── Körper (torpedoförmig, spitze Schnauze) ── */}
                <path
                    d="M3,44 Q5,36 16,32 Q28,29 46,30 Q58,42 60,46 Q58,50 46,57 Q28,59 16,56 Q6,51 3,44 Z"
                    fill={fur}
                />
                {/* Bauch (heller Streifen, untere Hälfte) */}
                <ellipse cx="33" cy="52" rx="23" ry="7" fill={belly} />
                {/* Outline */}
                <path
                    d="M60,46 Q58,50 46,57 Q28,59 16,56 Q6,51 3,44 Q5,36 16,32 Q28,29 46,30 Q58,42 60,46"
                    fill="none"
                    stroke={OUTLINE}
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />

                {/* ── Brustflosse ── */}
                <path
                    d="M24,52 Q14,64 10,68 Q18,63 28,57 Z"
                    fill={fur}
                    stroke={OUTLINE}
                    strokeWidth="1.2"
                    strokeLinejoin="round"
                />

                {/* ── Kiemenschlitze ── */}
                <path d="M20,36 Q18,43 20,53" fill="none" stroke={OUTLINE} strokeWidth="0.9" strokeLinecap="round" opacity="0.5" />
                <path d="M23,35 Q21,42 23,52" fill="none" stroke={OUTLINE} strokeWidth="0.9" strokeLinecap="round" opacity="0.5" />
                <path d="M26,34 Q24,41 26,51" fill="none" stroke={OUTLINE} strokeWidth="0.9" strokeLinecap="round" opacity="0.5" />

                {/* ── Blasloch ── */}
                <ellipse cx="28" cy="30" rx="2" ry="1.2" fill={OUTLINE} opacity="0.35" />

                <PetSnowflakes
                    mood={mood}
                    left={{ x: 2, y: 34 }}
                    right={{ x: 52, y: 20 }}
                />
                <PetSun mood={mood} />
                <PetSweat isHot={isHot} y={16} />

                {/* ── Maul mit Zähnen (neutral + warm) ── */}
                {(mood === "neutral" || isWarm) && (
                    <>
                        {/* Mundraum (dunkel) */}
                        <path
                            d="M3,44 Q6,43 22,44 L22,51 Q10,52 3,44 Z"
                            fill={OUTLINE}
                        />
                        {/* Obere Zähne */}
                        <path
                            d="M4,44 L6,40 L8,44 L10,40 L12,44 L14,40 L16,44 L18,40 L20,44 L22,44 L22,45 L4,45 Z"
                            fill="white"
                            stroke={OUTLINE}
                            strokeWidth="0.5"
                            strokeLinejoin="round"
                        />
                        {/* Untere Zähne */}
                        <path
                            d="M5,50 L7,53 L9,50 L11,53 L13,50 L15,53 L17,50 L19,53 L21,50 L22,50 L22,51 L5,51 Z"
                            fill="white"
                            stroke={OUTLINE}
                            strokeWidth="0.5"
                            strokeLinejoin="round"
                        />
                    </>
                )}
                {(isCold || isFrozen) && (
                    <path d="M3,44 Q8,48 14,46" fill="none" stroke={OUTLINE} strokeWidth="1.2" strokeLinecap="round" />
                )}

                {/* ── Auge (neutral + warm) ── */}
                {(mood === "neutral" || isWarm) &&
                    (blinking ? (
                        <line x1="14" y1="39" x2="20" y2="39" stroke={OUTLINE} strokeWidth="2" strokeLinecap="round" />
                    ) : (
                        <>
                            <circle cx="17" cy="39" r="2.5" fill={OUTLINE} />
                            <circle cx="18" cy="38" r="1" fill="white" opacity="0.65" />
                        </>
                    ))}

                {/* ── Sonnenbrille (warm) ── */}
                {isWarm && (
                    <>
                        <rect x="11" y="35" width="12" height="9" rx="2.5" fill={OUTLINE} opacity="0.9" />
                        <rect x="12" y="36" width="10" height="7" rx="2" fill="#1e3a5f" />
                        <circle cx="17" cy="39" r="2" fill="white" opacity="0.15" />
                        <line x1="23" y1="39" x2="27" y2="38" stroke={OUTLINE} strokeWidth="1.2" strokeLinecap="round" />
                    </>
                )}
                {isWarm && (
                    <ellipse cx="16" cy="48" rx="4" ry="2.5" fill="#fca5a5" opacity="0.5" />
                )}

                {/* ── Besorgte Braue + Auge (cold) ── */}
                {isCold && (
                    <>
                        <path d="M12,35 Q17,31 22,35" stroke={OUTLINE} strokeWidth="2" strokeLinecap="round" fill="none" />
                        <circle cx="17" cy="39" r="2.5" fill={OUTLINE} />
                        <circle cx="18" cy="38" r="1" fill="white" opacity="0.65" />
                    </>
                )}

                {/* ── X-Auge (frozen) ── */}
                {isFrozen && (
                    <>
                        <path d="M12,35 Q17,31 22,35" stroke={OUTLINE} strokeWidth="2" strokeLinecap="round" fill="none" />
                        <line x1="14" y1="36" x2="20" y2="42" stroke={OUTLINE} strokeWidth="2.5" strokeLinecap="round" />
                        <line x1="20" y1="36" x2="14" y2="42" stroke={OUTLINE} strokeWidth="2.5" strokeLinecap="round" />
                    </>
                )}

                <g transform="translate(13, -15) rotate(90, 18, 57)">
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
