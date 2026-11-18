import type { PetType } from './pets';

// Die Tiere sind in einer viewBox gezeichnet, die 66 Einheiten breit ist; breite Tiere (Wale, Hai,
// Narwal) haben eine breitere. Die Sprechblase beginnt bei allen Arten gleich: 33 Einheiten rechts von
// der Körpermitte des Tiers. Die Körpermitte steht in der Zeichnung als `cx` des Schattens (PetShadow).
// Hier stehen nur die Arten, bei denen sie von 33 abweicht.
const DEFAULT_BODY_CENTER = 33;
const BODY_CENTER: Partial<Record<PetType, number>> = {
  narwhal: 58,
};

const VIEWBOX_UNIT_WIDTH = 66;
const BUBBLE_OVERLAP_PX = 16;

/** Abstand der linken Kante der Sprechblase vom linken Rand der Tiergrafik, in Pixeln. */
export function bubbleLeftPx(type: PetType, size: number): number {
  const center = BODY_CENTER[type] ?? DEFAULT_BODY_CENTER;
  return ((center + 33) * size) / VIEWBOX_UNIT_WIDTH - BUBBLE_OVERLAP_PX;
}
