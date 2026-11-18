/**
 * Seestern im Retro-Stil (Draufsicht)
 *
 * Erkennungsmerkmale: fünf dicke, organisch gerundete Arme (Q-Bezier),
 * weißer Punktdekor auf den Armen, heller Bauchkreis, lächelndes Gesicht.
 *
 * Mood → temperature:
 *   warm    ≥ 22 °C  Sonnenbrille + Wangenrouge
 *   neutral  8–22 °C  zusammengekniffen-fröhliche Augen, Lächeln
 *   cold     0–8 °C  runde besorgte Augen, Schneeflocken, Zittern
 *   frozen    < 0 °C  X-Augen, Schneeflocken, starkes Zittern
 */

import type { Mood, PetProps } from "../shared";
import { resolveMood, OUTLINE } from "../shared";
import {
    PetSvg,
    PetShadow,
    PetSun,
    PetSweat,
    PetSnowflakes,
    PetScarf,
} from "../petParts";

const SEESTERN_COLOR: Record<Mood, string> = {
    frozen: "#fde8d0",
    cold: "#fdba74",
    neutral: "#f97316",
    warm: "#ea580c",
};

export function Starfish({
    temperature,
    size = 80,
    blinking = false,
    mood: moodOverride,
}: PetProps) {
    const mood = resolveMood(temperature, moodOverride);
    const isHot = temperature !== null && temperature >= 28;
    const color = SEESTERN_COLOR[mood];
    const isWarm = mood === "warm";
    const isCold = mood === "cold";
    const isFrozen = mood === "frozen";

    return (
        <PetSvg
            size={size}
            shivering={isCold || isFrozen}
            ariaLabel={`Seestern: ${mood}`}
        >
            <PetShadow cx={33} />

            {/* ── Stern-Körper: dicke, organisch gerundete Arme ── */}
            {/* Außenpunkte r≈24, Innenpunkte r≈14, alle Übergänge als Q-Bezier */}
            <path
                d="M33,16 Q39,24 41,33 Q51,28 58,32 Q56,44 46,48 Q52,63 48,65 Q39,63 33,57 Q27,63 18,65 Q14,61 20,48 Q10,42 8,32 Q15,28 25,33 Q27,17 33,16 Z"
                fill={color}
                stroke={OUTLINE}
                strokeWidth="1.5"
                strokeLinejoin="round"
            />

            {/* ── Weiße Punkte als Arm-Textur — mittig auf Arm-Achse ── */}
            {/* Oben-Arm: Achse (33,44)→(33,16), x=33 fix */}
            <circle cx="32.5" cy="19" r="1.2" fill="white" opacity="0.5" />
            <circle cx="33" cy="25" r="1.6" fill="white" opacity="0.6" />
            <circle cx="33" cy="32" r="2.2" fill="white" opacity="0.7" />
            {/* Oben-rechts-Arm: Achse (33,44)→(58,32) */}
            <circle cx="55" cy="33" r="1.2" fill="white" opacity="0.5" />
            <circle cx="51" cy="35" r="1.6" fill="white" opacity="0.6" />
            <circle cx="45" cy="38" r="2.2" fill="white" opacity="0.7" />
            {/* Oben-links-Arm: Spiegel TR (x → 66−x) */}
            <circle cx="10" cy="33" r="1.2" fill="white" opacity="0.5" />
            <circle cx="14" cy="35" r="1.6" fill="white" opacity="0.6" />
            <circle cx="20" cy="38" r="2.2" fill="white" opacity="0.7" />
            {/* Unten-rechts-Arm: Achse (33,44)→(48,65) */}
            <circle cx="47" cy="62" r="1.2" fill="white" opacity="0.5" />
            <circle cx="44" cy="58" r="1.6" fill="white" opacity="0.6" />
            <circle cx="40" cy="53" r="2.2" fill="white" opacity="0.7" />
            {/* Unten-links-Arm: Spiegel BR (x → 66−x) */}
            <circle cx="19" cy="62" r="1.2" fill="white" opacity="0.5" />
            <circle cx="22" cy="58" r="1.6" fill="white" opacity="0.6" />
            <circle cx="26" cy="53" r="2.2" fill="white" opacity="0.7" />

            <PetSnowflakes
                mood={mood}
                left={{ x: 5, y: 36 }}
                right={{ x: 56, y: 30 }}
            />
            <PetSun mood={mood} />
            <PetSweat isHot={isHot} y={20} />

            {/* ── Fröhliche Kneifeaugen (neutral + warm) ── */}
            {(mood === "neutral" || isWarm) &&
                (blinking ? (
                    <>
                        <line
                            x1="27"
                            y1="42"
                            x2="31"
                            y2="42"
                            stroke={OUTLINE}
                            strokeWidth="2"
                            strokeLinecap="round"
                        />
                        <line
                            x1="35"
                            y1="42"
                            x2="39"
                            y2="42"
                            stroke={OUTLINE}
                            strokeWidth="2"
                            strokeLinecap="round"
                        />
                    </>
                ) : (
                    <>
                        <path
                            d="M27,43 Q29,40 31,43"
                            stroke={OUTLINE}
                            strokeWidth="2"
                            strokeLinecap="round"
                            fill="none"
                        />
                        <path
                            d="M35,43 Q37,40 39,43"
                            stroke={OUTLINE}
                            strokeWidth="2"
                            strokeLinecap="round"
                            fill="none"
                        />
                    </>
                ))}

            {/* ── Sonnenbrille (warm) ── */}
            {isWarm && (
                <>
                    <rect
                        x="24"
                        y="37"
                        width="8"
                        height="7"
                        rx="2"
                        fill={OUTLINE}
                        opacity="0.9"
                    />
                    <rect
                        x="25"
                        y="38"
                        width="6"
                        height="5"
                        rx="1.5"
                        fill="#1e3a5f"
                    />
                    <rect
                        x="33"
                        y="37"
                        width="8"
                        height="7"
                        rx="2"
                        fill={OUTLINE}
                        opacity="0.9"
                    />
                    <rect
                        x="34"
                        y="38"
                        width="6"
                        height="5"
                        rx="1.5"
                        fill="#1e3a5f"
                    />
                    <line
                        x1="32"
                        y1="40"
                        x2="33"
                        y2="40"
                        stroke={OUTLINE}
                        strokeWidth="1"
                    />
                    <circle
                        cx="28"
                        cy="40"
                        r="1.5"
                        fill="white"
                        opacity="0.15"
                    />
                    <circle
                        cx="36"
                        cy="40"
                        r="1.5"
                        fill="white"
                        opacity="0.15"
                    />
                </>
            )}

            {/* ── Besorgte Augen (cold) ── */}
            {isCold && (
                <>
                    <path
                        d="M26,39 Q29,36 31,39"
                        stroke={OUTLINE}
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        fill="none"
                    />
                    <path
                        d="M35,39 Q37,36 40,39"
                        stroke={OUTLINE}
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        fill="none"
                    />
                    <circle cx="29" cy="42" r="2.5" fill={OUTLINE} />
                    <circle cx="30" cy="41" r="1" fill="white" opacity="0.65" />
                    <circle cx="37" cy="42" r="2.5" fill={OUTLINE} />
                    <circle cx="38" cy="41" r="1" fill="white" opacity="0.65" />
                </>
            )}

            {/* ── X-Augen (frozen) ── */}
            {isFrozen && (
                <>
                    <path
                        d="M26,39 Q29,36 31,39"
                        stroke={OUTLINE}
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        fill="none"
                    />
                    <path
                        d="M35,39 Q37,36 40,39"
                        stroke={OUTLINE}
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        fill="none"
                    />
                    <line
                        x1="27"
                        y1="40"
                        x2="31"
                        y2="44"
                        stroke={OUTLINE}
                        strokeWidth="2"
                        strokeLinecap="round"
                    />
                    <line
                        x1="31"
                        y1="40"
                        x2="27"
                        y2="44"
                        stroke={OUTLINE}
                        strokeWidth="2"
                        strokeLinecap="round"
                    />
                    <line
                        x1="35"
                        y1="40"
                        x2="39"
                        y2="44"
                        stroke={OUTLINE}
                        strokeWidth="2"
                        strokeLinecap="round"
                    />
                    <line
                        x1="39"
                        y1="40"
                        x2="35"
                        y2="44"
                        stroke={OUTLINE}
                        strokeWidth="2"
                        strokeLinecap="round"
                    />
                </>
            )}

            {/* ── Mund ── */}
            <path
                d={
                    isCold || isFrozen
                        ? "M29,47 Q33,44 37,47"
                        : "M28,47 Q33,53 38,47"
                }
                fill="none"
                stroke={OUTLINE}
                strokeWidth="1.5"
                strokeLinecap="round"
            />

            {/* ── Wangenrouge (warm) ── */}
            {isWarm && (
                <>
                    <ellipse
                        cx="24"
                        cy="46"
                        rx="3.5"
                        ry="2"
                        fill="#fca5a5"
                        opacity="0.5"
                    />
                    <ellipse
                        cx="42"
                        cy="46"
                        rx="3.5"
                        ry="2"
                        fill="#fca5a5"
                        opacity="0.5"
                    />
                </>
            )}
            <PetScarf
                mood={mood}
                x={17}
                y={48}
                width={32}
                knotCx={49}
                knotCy={52}
            />
        </PetSvg>
    );
}
