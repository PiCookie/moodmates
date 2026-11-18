export type Mood = 'frozen' | 'cold' | 'neutral' | 'warm';

export interface PetProps {
  temperature: number | null;
  size?: number;
  blinking?: boolean;
  /** Überschreibt die aus der Temperatur abgeleitete Stimmung */
  mood?: Mood;
}

/** Was ein Tier von MoodmateSprite bekommt: PetProps plus die fertige Beschriftung für Screenreader */
export interface AnimalProps extends PetProps {
  ariaLabel: string;
}

export function moodFromTemperature(temp: number | null): Mood {
  if (temp === null) return 'neutral';
  if (temp < 0)     return 'frozen';
  if (temp < 8)     return 'cold';
  if (temp < 22)    return 'neutral';
  return 'warm';
}

/** Eine ausdrücklich übergebene Stimmung gewinnt gegen die Temperatur. */
export function resolveMood(temperature: number | null, override?: Mood): Mood {
  return override ?? moodFromTemperature(temperature);
}

export const BODY_FILL: Record<Mood, string> = {
  frozen:  '#dbeafe',
  cold:    '#eff6ff',
  neutral: '#f5efe5',
  warm:    '#fef9c3',
};

export const OUTLINE = '#3d2b1f';
export const PINK    = '#f4a0b0';
