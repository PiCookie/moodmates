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

export function randomPetType(): PetType {
  return ALL_PET_TYPES[Math.floor(Math.random() * ALL_PET_TYPES.length)];
}
