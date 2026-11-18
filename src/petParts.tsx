/**
 * Shared SVG building blocks for all animal components.
 *
 * Each helper renders its JSX only when the mood/condition applies —
 * callers just drop them in without wrapping conditionals.
 */

import type { ReactNode } from 'react';
import type { Look } from './shared';
import { OUTLINE } from './shared';

// ─── SVG Wrapper ─────────────────────────────────────────────────────────────

interface SvgProps {
  size: number;
  shivering: boolean;
  ariaLabel: string;
  children: ReactNode;
  viewBoxWidth?: number;
}

export function PetSvg({ size, shivering, ariaLabel, children, viewBoxWidth = 66 }: SvgProps) {
  return (
    <svg
      width={Math.round(size * (viewBoxWidth / 66))}
      height={Math.round(size * (88 / 66))}
      viewBox={`0 0 ${viewBoxWidth} 88`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={shivering ? 'mm-shiver' : undefined}
      role="img"
      aria-label={ariaLabel}
    >
      {children}
    </svg>
  );
}

// ─── Shadow ──────────────────────────────────────────────────────────────────

export function PetShadow({ cx = 32 }: { cx?: number }) {
  return <ellipse cx={cx} cy="86" rx="16" ry="2" fill="rgba(0,0,0,0.15)" />;
}

// ─── Icicles (frozen) ────────────────────────────────────────────────────────
// leftX/rightX: x of left edge of outer icicles; center icicle is always at x=29–37

interface IciclesProps {
  mood: Look;
  y?: number;     // top y of icicles (default 73)
  leftX?: number; // default 19
  rightX?: number;// default 41
}

export function PetIcicles({ mood, y = 73, leftX = 19, rightX = 41 }: IciclesProps) {
  if (mood !== 'frozen') return null;
  const b  = y + 10;  // short icicle bottom
  const bl = y + 12;  // center icicle bottom (taller)
  const lm = leftX  + 3;
  const rm = rightX + 3;
  return (
    <>
      <polygon points={`${leftX},${y} ${leftX+6},${y} ${lm},${b}`}   fill="#93c5fd" />
      <polygon points={`29,${y} 37,${y} 33,${bl}`}                   fill="#bfdbfe" />
      <polygon points={`${rightX},${y} ${rightX+6},${y} ${rm},${b}`} fill="#93c5fd" />
    </>
  );
}

// ─── Sun (warm) ──────────────────────────────────────────────────────────────
// Default right-corner position (cx=58, cy=12).
// Pass cx/cy to reposition — e.g. Lion uses cx=8, cy=10 (left corner, mane blocks right).

export function PetSun({ mood, cx = 58, cy = 12 }: { mood: Look; cx?: number; cy?: number }) {
  if (mood !== 'warm') return null;
  return (
    <g opacity="0.9">
      <circle cx={cx}   cy={cy}   r="5"  fill="#fbbf24" />
      <line x1={cx}     y1={cy-8} x2={cx}     y2={cy-10}  stroke="#fbbf24" strokeWidth="1.5" strokeLinecap="round" />
      <line x1={cx+6}   y1={cy-5} x2={cx+8}   y2={cy-6.6} stroke="#fbbf24" strokeWidth="1.5" strokeLinecap="round" />
      <line x1={cx+8}   y1={cy+1} x2={cx+8}   y2={cy+1}   stroke="#fbbf24" strokeWidth="1.5" strokeLinecap="round" />
      <line x1={cx+6}   y1={cy+6} x2={cx+8}   y2={cy+8}   stroke="#fbbf24" strokeWidth="1.5" strokeLinecap="round" />
      <line x1={cx-6}   y1={cy-5} x2={cx-8}   y2={cy-6.6} stroke="#fbbf24" strokeWidth="1.5" strokeLinecap="round" />
    </g>
  );
}

// ─── Sweat drop (very hot ≥ 28 °C) ───────────────────────────────────────────
// Shape: teardrop pointing up — x/y = left anchor point

export function PetSweat({ isHot, x = 6, y }: { isHot: boolean; x?: number; y: number }) {
  if (!isHot) return null;
  return (
    <path
      d={`M${x},${y} Q${x+2},${y-6} ${x+4},${y} A3.5 3.5 0 0 1 ${x} ${y}`}
      fill="#93c5fd"
      opacity="0.85"
    />
  );
}

// ─── Snowflakes (cold + frozen) ───────────────────────────────────────────────
// Primary (left): larger, brighter. Secondary (right): smaller, dimmer.
// A snowflake centered at (cx,cy) has 4 arms: vertical, horizontal, two diagonals.

interface SnowflakeCenter { x: number; y: number }

function Snowflake({ cx, cy, r, diag, strokeWidth, opacity, color }: {
  cx: number; cy: number; r: number; diag: number;
  strokeWidth: number; opacity: number; color: string;
}) {
  return (
    <g stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" opacity={opacity}>
      <line x1={cx}        y1={cy - r}    x2={cx}        y2={cy + r}    />
      <line x1={cx - r}    y1={cy}        x2={cx + r}    y2={cy}        />
      <line x1={cx - diag} y1={cy - diag} x2={cx + diag} y2={cy + diag} />
      <line x1={cx + diag} y1={cy - diag} x2={cx - diag} y2={cy + diag} />
    </g>
  );
}

interface SnowflakesProps {
  mood: Look;
  left: SnowflakeCenter;
  right?: SnowflakeCenter;
}

export function PetSnowflakes({ mood, left, right }: SnowflakesProps) {
  if (mood !== 'cold' && mood !== 'frozen') return null;
  return (
    <>
      <Snowflake cx={left.x} cy={left.y} r={4} diag={2.6} strokeWidth={1.2} opacity={0.75} color="#93c5fd" />
      {right && (
        <Snowflake cx={right.x} cy={right.y} r={3} diag={1.9} strokeWidth={1} opacity={0.55} color="#bfdbfe" />
      )}
    </>
  );
}

// ─── Scarf (cold + frozen) ───────────────────────────────────────────────────
// small=true: thinner scarf (height=9, rx=4.5, knotR=5) for turtle/capybara.

interface ScarfProps {
  mood: Look;
  x: number;
  y: number;
  width: number;
  knotCx: number;
  knotCy: number;
  small?: boolean;
}

export function PetScarf({ mood, x, y, width, knotCx, knotCy, small = false }: ScarfProps) {
  if (mood !== 'cold' && mood !== 'frozen') return null;
  const h     = small ? 9   : 10;
  const rx    = small ? 4.5 : 5;
  const knotR = small ? 5   : 6;
  return (
    <>
      <rect x={x} y={y} width={width} height={h} rx={rx} fill="#ef4444" />
      <rect x={x} y={y + 4} width={width} height="3" rx="1.5" fill="#dc2626" opacity="0.3" />
      <circle cx={knotCx} cy={knotCy} r={knotR}   fill="#ef4444" />
      <circle cx={knotCx} cy={knotCy} r={knotR - 2.5} fill="#dc2626" opacity="0.35" />
    </>
  );
}

// ─── Cheek Blush ─────────────────────────────────────────────────────────────

interface BlushProps {
  mood: Look;
  leftCx: number;
  rightCx: number;
  cy: number;
  rx?: number;
  ry?: number;
}

export function PetBlush({ mood, leftCx, rightCx, cy, rx = 7, ry = 4 }: BlushProps) {
  if (mood !== 'warm' && mood !== 'cold' && mood !== 'frozen') return null;
  const fill    = mood === 'warm' ? '#fca5a5' : '#93c5fd';
  const opacity = mood === 'warm' ? 0.5       : 0.4;
  return (
    <>
      <ellipse cx={leftCx}  cy={cy} rx={rx} ry={ry} fill={fill} opacity={opacity} />
      <ellipse cx={rightCx} cy={cy} rx={rx} ry={ry} fill={fill} opacity={opacity} />
    </>
  );
}

// ─── Sunglasses (warm) ───────────────────────────────────────────────────────
// All animals share the same structural pattern; only positions/sizes differ.
// leftTemple/rightTemple: [x1,y1,x2,y2] — the temple arms connecting frame to side.
// stegY: y of the nose bridge; defaults to leftTemple[1] - 1.

interface SunglassesProps {
  mood: Look;
  frame: { y: number; w: number; h: number; rx: number };
  leftX: number;
  rightX: number;
  leftTemple: [number, number, number, number];
  rightTemple: [number, number, number, number];
  stegY?: number;
}

export function PetSunglasses({
  mood, frame, leftX, rightX, leftTemple, rightTemple, stegY,
}: SunglassesProps) {
  if (mood !== 'warm') return null;
  const fy     = frame.y;
  const fw     = frame.w;
  const fh     = frame.h;
  const frx    = frame.rx;
  const steg   = stegY ?? leftTemple[1] - 1;
  const stegX1 = leftX + fw;
  const stegX2 = rightX;
  return (
    <>
      {/* Temple arms */}
      <line x1={leftTemple[0]}  y1={leftTemple[1]}  x2={leftTemple[2]}  y2={leftTemple[3]}  stroke={OUTLINE} strokeWidth="1.5" strokeLinecap="round" />
      <line x1={rightTemple[0]} y1={rightTemple[1]} x2={rightTemple[2]} y2={rightTemple[3]} stroke={OUTLINE} strokeWidth="1.5" strokeLinecap="round" />
      {/* Lenses */}
      <rect x={leftX}  y={fy} width={fw} height={fh} rx={frx} fill={OUTLINE} />
      <rect x={rightX} y={fy} width={fw} height={fh} rx={frx} fill={OUTLINE} />
      {/* Nose bridge */}
      <line x1={stegX1} y1={steg} x2={stegX2} y2={steg} stroke={OUTLINE} strokeWidth="2" strokeLinecap="round" />
      {/* Lens shine */}
      <rect x={leftX  + 2} y={fy + 2} width="4" height="3" rx="1" fill="white" opacity="0.22" />
      <rect x={rightX + 2} y={fy + 2} width="4" height="3" rx="1" fill="white" opacity="0.22" />
    </>
  );
}

// ─── Frozen X-eyes ────────────────────────────────────────────────────────────
// Each eye is described by a bounding box {l, t, r, b}; two crossing lines are drawn inside it.

interface EyeBox { l: number; t: number; r: number; b: number }

export function PetFrozenEyes({ mood, leftBox, rightBox }: {
  mood: Look;
  leftBox: EyeBox;
  rightBox: EyeBox;
}) {
  if (mood !== 'frozen') return null;
  return (
    <>
      <line x1={leftBox.l}  y1={leftBox.t}  x2={leftBox.r}  y2={leftBox.b}  stroke={OUTLINE} strokeWidth="2.5" strokeLinecap="round" />
      <line x1={leftBox.r}  y1={leftBox.t}  x2={leftBox.l}  y2={leftBox.b}  stroke={OUTLINE} strokeWidth="2.5" strokeLinecap="round" />
      <line x1={rightBox.l} y1={rightBox.t} x2={rightBox.r} y2={rightBox.b} stroke={OUTLINE} strokeWidth="2.5" strokeLinecap="round" />
      <line x1={rightBox.r} y1={rightBox.t} x2={rightBox.l} y2={rightBox.b} stroke={OUTLINE} strokeWidth="2.5" strokeLinecap="round" />
    </>
  );
}

// ─── Worried Eyebrows (cold) ─────────────────────────────────────────────────
// Two slanted brow lines — inner end lower than outer end = worried look.

interface BrowLine { x1: number; y1: number; x2: number; y2: number }

export function PetWorriedBrows({ mood, leftBrow, rightBrow }: {
  mood: Look;
  leftBrow: BrowLine;
  rightBrow: BrowLine;
}) {
  if (mood !== 'cold') return null;
  return (
    <>
      <line x1={leftBrow.x1}  y1={leftBrow.y1}  x2={leftBrow.x2}  y2={leftBrow.y2}  stroke={OUTLINE} strokeWidth="1.5" strokeLinecap="round" />
      <line x1={rightBrow.x1} y1={rightBrow.y1} x2={rightBrow.x2} y2={rightBrow.y2} stroke={OUTLINE} strokeWidth="1.5" strokeLinecap="round" />
    </>
  );
}
