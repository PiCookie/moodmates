import type { PetType } from './pets';
import type { PetProps } from './shared';
import { resolveMood } from './shared';
import { resolveMessages } from './messages';
import type { PetMessages } from './messages';
import { PET_COMPONENTS } from './registry';

export interface MoodmateSpriteProps extends PetProps {
  type: PetType;
  /** Eigene Texte (Teil-Objekt); fehlende Felder fallen auf Deutsch zurück */
  messages?: Partial<PetMessages>;
}

/**
 * Das Tier als reines Bild in einer Stimmung: keine Timer, keine Sprechblase, kein Name.
 * Gedacht für Listen, Avatare und Auswahlen, in denen viele Tiere nebeneinander stehen.
 */
export function MoodmateSprite({ type, messages, ...petProps }: MoodmateSpriteProps) {
  // Einstellungen können Arten aus älteren Versionen enthalten; dann lieber die Katze als ein Absturz
  const known: PetType = type in PET_COMPONENTS ? type : 'cat';
  const Pet = PET_COMPONENTS[known];
  const text = resolveMessages(messages);
  const mood = resolveMood(petProps.temperature, petProps.mood);
  // Teil-Objekte ersetzen petNames als Ganzes; ein fehlender Name darf nicht als "undefined" erscheinen
  const ariaLabel = text.spriteLabel(text.petNames[known] ?? known, text.moodLabels[mood]);
  return <Pet {...petProps} ariaLabel={ariaLabel} />;
}
