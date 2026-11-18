import type { PetType } from './pets';
import type { PetProps } from './shared';
import { PET_COMPONENTS } from './registry';

export interface MoodmateSpriteProps extends PetProps {
  type: PetType;
}

/**
 * Das Tier als reines Bild in einer Stimmung: keine Timer, keine Sprechblase, kein Name.
 * Gedacht für Listen, Avatare und Auswahlen, in denen viele Tiere nebeneinander stehen.
 */
export function MoodmateSprite({ type, ...petProps }: MoodmateSpriteProps) {
  // Einstellungen können Arten aus älteren Versionen enthalten; dann lieber die Katze als ein Absturz
  const Pet = PET_COMPONENTS[type] ?? PET_COMPONENTS.cat;
  return <Pet {...petProps} />;
}
