// Einzige Quelle für die Tierarten. Der Typ wird aus der Liste abgeleitet, damit beide
// nicht auseinanderlaufen können (vorher standen Union und Array getrennt in SettingsContext).
export const ALL_PET_TYPES = [
  'cat', 'dog', 'rabbit', 'hamster', 'penguin', 'frog',
  'turtle', 'lion', 'capybara', 'panda', 'dragon', 'elephant',
  'hippo', 'meerkat', 'bear', 'tiger', 'red-panda', 'polar-bear',
  'seal', 'llama', 'sloth', 'hedgehog', 'owl', 'fox',
  'trex', 'triceratops', 'stegosaurus', 'brachiosaurus', 'pteranodon', 'ankylosaurus',
  'shark', 'piranha', 'blue-whale', 'sperm-whale', 'killer-whale', 'beluga',
  'narwhal', 'dolphin', 'clownfish', 'blue-tang', 'pufferfish', 'jellyfish',
  'seahorse', 'starfish', 'octopus',
] as const;

export type PetType = (typeof ALL_PET_TYPES)[number];

// Arten, die schon nutzbar, aber noch nicht fertig gezeichnet sind. Sie bleiben in ALL_PET_TYPES (wer sie
// schon benutzt, bekommt keinen Bruch), werden aber in Demo und Übersichtsbild als "Coming soon" gezeigt
// und von randomPetType() nicht gewählt. Ist eine Art fertig, wird sie hier gestrichen.
export const COMING_SOON_PET_TYPES = [
  'trex', 'triceratops', 'stegosaurus', 'brachiosaurus', 'pteranodon', 'ankylosaurus',
] as const satisfies readonly PetType[];

const RANDOM_POOL: readonly PetType[] = ALL_PET_TYPES.filter(
  (type) => !(COMING_SOON_PET_TYPES as readonly PetType[]).includes(type),
);

export function randomPetType(): PetType {
  return RANDOM_POOL[Math.floor(Math.random() * RANDOM_POOL.length)];
}
