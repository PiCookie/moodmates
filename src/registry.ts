// Zuordnung Tierart -> Zeichnung. Die Tiere sind nicht öffentlich exportiert, nur diese
// Zuordnung kennt sie. Der Typ Record<PetType, ...> erzwingt, dass jede Tierart eine Zeichnung hat.
import type { ComponentType } from 'react';
import type { PetType } from './pets';
import type { AnimalProps } from './shared';
import { Ankylosaurus } from './animals/Ankylosaurus';
import { Bear } from './animals/Bear';
import { Beluga } from './animals/Beluga';
import { BlueWhale } from './animals/BlueWhale';
import { Brachiosaurus } from './animals/Brachiosaurus';
import { Capybara } from './animals/Capybara';
import { Cat } from './animals/Cat';
import { Clownfish } from './animals/Clownfish';
import { Dolphin } from './animals/Dolphin';
import { Dog } from './animals/Dog';
import { Dragon } from './animals/Dragon';
import { PolarBear } from './animals/PolarBear';
import { Elephant } from './animals/Elephant';
import { Meerkat } from './animals/Meerkat';
import { Owl } from './animals/Owl';
import { Sloth } from './animals/Sloth';
import { Frog } from './animals/Frog';
import { Fox } from './animals/Fox';
import { Shark } from './animals/Shark';
import { Hamster } from './animals/Hamster';
import { Rabbit } from './animals/Rabbit';
import { Hedgehog } from './animals/Hedgehog';
import { KillerWhale } from './animals/KillerWhale';
import { Octopus } from './animals/Octopus';
import { Pufferfish } from './animals/Pufferfish';
import { Llama } from './animals/Llama';
import { Lion } from './animals/Lion';
import { Narwhal } from './animals/Narwhal';
import { Hippo } from './animals/Hippo';
import { BlueTang } from './animals/BlueTang';
import { Panda } from './animals/Panda';
import { Penguin } from './animals/Penguin';
import { Piranha } from './animals/Piranha';
import { SpermWhale } from './animals/SpermWhale';
import { Pteranodon } from './animals/Pteranodon';
import { Jellyfish } from './animals/Jellyfish';
import { Seal } from './animals/Seal';
import { RedPanda } from './animals/RedPanda';
import { Seahorse } from './animals/Seahorse';
import { Starfish } from './animals/Starfish';
import { Stegosaurus } from './animals/Stegosaurus';
import { Trex } from './animals/Trex';
import { Tiger } from './animals/Tiger';
import { Triceratops } from './animals/Triceratops';
import { Turtle } from './animals/Turtle';

export const PET_COMPONENTS: Record<PetType, ComponentType<AnimalProps>> = {
  cat: Cat,
  dog: Dog,
  rabbit: Rabbit,
  hamster: Hamster,
  penguin: Penguin,
  frog: Frog,
  turtle: Turtle,
  lion: Lion,
  capybara: Capybara,
  panda: Panda,
  dragon: Dragon,
  elephant: Elephant,
  hippo: Hippo,
  meerkat: Meerkat,
  bear: Bear,
  tiger: Tiger,
  'red-panda': RedPanda,
  'polar-bear': PolarBear,
  seal: Seal,
  llama: Llama,
  sloth: Sloth,
  hedgehog: Hedgehog,
  owl: Owl,
  fox: Fox,
  trex: Trex,
  triceratops: Triceratops,
  stegosaurus: Stegosaurus,
  brachiosaurus: Brachiosaurus,
  pteranodon: Pteranodon,
  ankylosaurus: Ankylosaurus,
  shark: Shark,
  piranha: Piranha,
  'blue-whale': BlueWhale,
  'sperm-whale': SpermWhale,
  'killer-whale': KillerWhale,
  beluga: Beluga,
  narwhal: Narwhal,
  dolphin: Dolphin,
  clownfish: Clownfish,
  'blue-tang': BlueTang,
  pufferfish: Pufferfish,
  jellyfish: Jellyfish,
  seahorse: Seahorse,
  starfish: Starfish,
  octopus: Octopus,
};
