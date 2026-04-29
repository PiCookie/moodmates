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

                {/* ── Körper (torpedoförmig) ── */}
                <path
                    d="M5,46 Q7,33 27,30 Q44,30 57,43 Q60,46 57,49 Q44,58 27,58 Q7,57 5,46 Z"
                    fill={fur}
                />
                {/* Outline — ohne Überschneidung mit Schwanzstiel */}
                <path
                    d="M60,47 Q44,58 27,58 Q7,57 5,46 Q7,33 27,30 Q44,30 58,43"
                    fill="none"
                    stroke={OUTLINE}
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />

                {/* ── Bauch (heller, unten) ── */}
                <path
                    d="M5,46 Q7,53 20,57 Q36,61 52,56 Q57,51 57,49 Q44,58 27,58 Q7,57 5,46 Z"
                    fill={belly}
                />

                {/* ── Brustflosse (unten, geschwungen) ── */}
                <path
                    d="M24,52 Q14,64 10,68 Q18,63 28,57 Z"
                    fill={fur}
                    stroke={OUTLINE}
                    strokeWidth="1.2"
                    strokeLinejoin="round"
                />

                {/* ── Kiemenschlitze (3 Bögen) ── */}
                <path d="M16,36 Q14,43 16,52" fill="none" stroke={OUTLINE} strokeWidth="0.9" strokeLinecap="round" opacity="0.5" />
                <path d="M19,35 Q17,42 19,51" fill="none" stroke={OUTLINE} strokeWidth="0.9" strokeLinecap="round" opacity="0.5" />
                <path d="M22,34 Q20,41 22,50" fill="none" stroke={OUTLINE} strokeWidth="0.9" strokeLinecap="round" opacity="0.5" />

                {/* ── Blasloch ── */}
                <ellipse cx="26" cy="30" rx="2" ry="1.2" fill={OUTLINE} opacity="0.35" />

                <PetSnowflakes
                    mood={mood}
                    left={{ x: 2, y: 34 }}
                    right={{ x: 52, y: 20 }}
                />
                <PetSun mood={mood} />
                <PetSweat isHot={isHot} y={16} />

                {/* ── Auge (neutral + warm) ── */}
                {(mood === "neutral" || isWarm) &&
                    (blinking ? (
                        <line x1="8" y1="42" x2="16" y2="42" stroke={OUTLINE} strokeWidth="2.5" strokeLinecap="round" />
                    ) : (
                        <>
                            <circle cx="12" cy="42" r="4" fill={OUTLINE} />
                            <circle cx="13" cy="41" r="1.5" fill="white" opacity="0.65" />
                        </>
                    ))}

                {/* ── Sonnenbrille (warm) ── */}
                {isWarm && (
                    <>
                        <rect x="5" y="37" width="14" height="10" rx="2.5" fill={OUTLINE} opacity="0.9" />
                        <rect x="6" y="38" width="12" height="8" rx="2" fill="#1e3a5f" />
                        <circle cx="12" cy="42" r="2" fill="white" opacity="0.15" />
                        <line x1="19" y1="42" x2="24" y2="41" stroke={OUTLINE} strokeWidth="1.2" strokeLinecap="round" />
                    </>
                )}
                {isWarm && (
                    <ellipse cx="14" cy="50" rx="4" ry="2.5" fill="#fca5a5" opacity="0.5" />
                )}

                {/* ── Besorgte Braue + Auge (cold) ── */}
                {isCold && (
                    <>
                        <path d="M6,37 Q12,33 17,37" stroke={OUTLINE} strokeWidth="2" strokeLinecap="round" fill="none" />
                        <circle cx="12" cy="42" r="4" fill={OUTLINE} />
                        <circle cx="13" cy="41" r="1.5" fill="white" opacity="0.65" />
                    </>
                )}

                {/* ── X-Auge (frozen) ── */}
                {isFrozen && (
                    <>
                        <path d="M6,37 Q12,33 17,37" stroke={OUTLINE} strokeWidth="2" strokeLinecap="round" fill="none" />
                        <line x1="8" y1="38" x2="16" y2="46" stroke={OUTLINE} strokeWidth="2.5" strokeLinecap="round" />
                        <line x1="16" y1="38" x2="8" y2="46" stroke={OUTLINE} strokeWidth="2.5" strokeLinecap="round" />
                    </>
                )}

                {/* ── Maul (leicht geöffnet, neutrale Linie bei cold/frozen) ── */}
                {(mood === "neutral" || isWarm) && (
                    <path d="M4,45 Q4,48 6,49" fill="none" stroke={OUTLINE} strokeWidth="1.5" strokeLinecap="round" />
                )}
                {(isCold || isFrozen) && (
                    <path d="M4,46 Q6,48 8,46" fill="none" stroke={OUTLINE} strokeWidth="1.2" strokeLinecap="round" />
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
