/**
 * Die Stimmung eines Moodmates. Das Paket kennt keine Temperaturen: Welche Messwerte oder
 * Ereignisse zu welcher Stimmung führen, entscheidet die nutzende Anwendung.
 * "hot" sieht aus wie "warm", mit Schweißtropfen und eigenen Sprüchen.
 */
export type Mood = 'frozen' | 'cold' | 'neutral' | 'warm' | 'hot';

/** Das Aussehen: die Stimmung ohne "hot", das als "warm" plus Schweiß gezeichnet wird. */
export type Look = Exclude<Mood, 'hot'>;

export function lookOf(mood: Mood): { look: Look; isHot: boolean } {
  return mood === 'hot' ? { look: 'warm', isHot: true } : { look: mood, isHot: false };
}

export interface PetProps {
  mood: Mood;
  size?: number;
  blinking?: boolean;
}

/** Was ein Tier von MoodmateSprite bekommt: das Aussehen, ob es schwitzt, und die Beschriftung für Screenreader */
export interface AnimalProps {
  mood: Look;
  isHot: boolean;
  size?: number;
  blinking?: boolean;
  ariaLabel: string;
}

export const BODY_FILL: Record<Look, string> = {
  frozen:  '#dbeafe',
  cold:    '#eff6ff',
  neutral: '#f5efe5',
  warm:    '#fef9c3',
};

export const OUTLINE = '#3d2b1f';
export const PINK    = '#f4a0b0';
