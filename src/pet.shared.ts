export type Mood = 'frozen' | 'cold' | 'neutral' | 'warm';

export interface PetProps {
  temperature: number | null;
  size?: number;
  blinking?: boolean;
}

export function getMood(temp: number | null): Mood {
  if (temp === null) return 'neutral';
  if (temp < 0)     return 'frozen';
  if (temp < 8)     return 'cold';
  if (temp < 22)    return 'neutral';
  return 'warm';
}

export const BODY_FILL: Record<Mood, string> = {
  frozen:  '#dbeafe',
  cold:    '#eff6ff',
  neutral: '#f5efe5',
  warm:    '#fef9c3',
};

export const OUTLINE = '#3d2b1f';
export const PINK    = '#f4a0b0';
