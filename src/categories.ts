import { ALL_PET_TYPES } from './pets';
import type { PetType } from './pets';

// Die Gruppen, in denen Tierarten für Auswahllisten und Übersichten angezeigt werden. Die Reihenfolge hier
// ist die Reihenfolge der Anzeige. Die Anzeigenamen stehen in `categoryNames` (messages.en.ts).
export const PET_CATEGORIES = [
  'pets', 'africa', 'asia', 'south-america', 'antarctica', 'nature', 'sea', 'dinosaurs',
] as const;

export type PetCategory = (typeof PET_CATEGORIES)[number];

// Jede Art gehört genau zu einer Kategorie. Der Typ Record<PetType, …> sorgt dafür, dass eine neue Art
// ohne Kategorie nicht kompiliert; ein Test prüft, dass keine Kategorie leer bleibt.
const CATEGORY_OF: Record<PetType, PetCategory> = {
  'cat': 'pets', 'dog': 'pets', 'rabbit': 'pets', 'hamster': 'pets',
  'lion': 'africa', 'elephant': 'africa', 'hippo': 'africa', 'meerkat': 'africa',
  'panda': 'asia', 'tiger': 'asia', 'red-panda': 'asia', 'dragon': 'asia',
  'capybara': 'south-america', 'llama': 'south-america', 'sloth': 'south-america', 'piranha': 'south-america',
  'penguin': 'antarctica', 'seal': 'antarctica', 'polar-bear': 'antarctica',
  'frog': 'nature', 'turtle': 'nature', 'bear': 'nature', 'hedgehog': 'nature', 'owl': 'nature', 'fox': 'nature',
  'shark': 'sea', 'blue-whale': 'sea', 'sperm-whale': 'sea', 'killer-whale': 'sea', 'beluga': 'sea',
  'narwhal': 'sea', 'dolphin': 'sea', 'clownfish': 'sea', 'blue-tang': 'sea', 'pufferfish': 'sea',
  'jellyfish': 'sea', 'seahorse': 'sea', 'starfish': 'sea', 'octopus': 'sea',
  'trex': 'dinosaurs', 'triceratops': 'dinosaurs', 'stegosaurus': 'dinosaurs',
  'brachiosaurus': 'dinosaurs', 'pteranodon': 'dinosaurs', 'ankylosaurus': 'dinosaurs',
};

/** Kategorie einer Tierart. */
export function petCategoryOf(type: PetType): PetCategory {
  return CATEGORY_OF[type];
}

/** Alle Tierarten einer Kategorie, in der Reihenfolge von `ALL_PET_TYPES`. */
export function petTypesIn(category: PetCategory): PetType[] {
  return ALL_PET_TYPES.filter((type) => CATEGORY_OF[type] === category);
}
