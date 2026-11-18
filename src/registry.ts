// Zuordnung Tierart -> Zeichnung. Die Tiere sind nicht öffentlich exportiert (ADR-0006), nur diese
// Zuordnung kennt sie. Der Typ Record<PetType, ...> erzwingt, dass jede Tierart eine Zeichnung hat.
import type { ComponentType } from 'react';
import type { PetType } from './pets';
import type { PetProps } from './pet.shared';
import { PetAnkylosaurus } from './PetAnkylosaurus';
import { PetBaer } from './PetBaer';
import { PetBeluga } from './PetBeluga';
import { PetBlauwal } from './PetBlauwal';
import { PetBrachiosaurus } from './PetBrachiosaurus';
import { PetCapybara } from './PetCapybara';
import { PetCat } from './PetCat';
import { PetClownfisch } from './PetClownfisch';
import { PetDelfin } from './PetDelfin';
import { PetDog } from './PetDog';
import { PetDrache } from './PetDrache';
import { PetEisbaer } from './PetEisbaer';
import { PetElefant } from './PetElefant';
import { PetErdmaennchen } from './PetErdmaennchen';
import { PetEule } from './PetEule';
import { PetFaultier } from './PetFaultier';
import { PetFrog } from './PetFrog';
import { PetFuchs } from './PetFuchs';
import { PetHai } from './PetHai';
import { PetHamster } from './PetHamster';
import { PetHase } from './PetHase';
import { PetIgel } from './PetIgel';
import { PetKillerwal } from './PetKillerwal';
import { PetKraken } from './PetKraken';
import { PetKugelfisch } from './PetKugelfisch';
import { PetLama } from './PetLama';
import { PetLion } from './PetLion';
import { PetNarwal } from './PetNarwal';
import { PetNilpferd } from './PetNilpferd';
import { PetPalettenfisch } from './PetPalettenfisch';
import { PetPanda } from './PetPanda';
import { PetPenguin } from './PetPenguin';
import { PetPiranha } from './PetPiranha';
import { PetPottwal } from './PetPottwal';
import { PetPteranodon } from './PetPteranodon';
import { PetQualle } from './PetQualle';
import { PetRobbe } from './PetRobbe';
import { PetRoterPanda } from './PetRoterPanda';
import { PetSeepferdchen } from './PetSeepferdchen';
import { PetSeestern } from './PetSeestern';
import { PetStegosaurus } from './PetStegosaurus';
import { PetTRex } from './PetTRex';
import { PetTiger } from './PetTiger';
import { PetTriceratops } from './PetTriceratops';
import { PetTurtle } from './PetTurtle';

export const PET_COMPONENTS: Record<PetType, ComponentType<PetProps>> = {
  cat: PetCat,
  dog: PetDog,
  rabbit: PetHase,
  hamster: PetHamster,
  penguin: PetPenguin,
  frog: PetFrog,
  turtle: PetTurtle,
  lion: PetLion,
  capybara: PetCapybara,
  panda: PetPanda,
  dragon: PetDrache,
  elephant: PetElefant,
  hippo: PetNilpferd,
  meerkat: PetErdmaennchen,
  bear: PetBaer,
  tiger: PetTiger,
  'red-panda': PetRoterPanda,
  'polar-bear': PetEisbaer,
  seal: PetRobbe,
  llama: PetLama,
  sloth: PetFaultier,
  hedgehog: PetIgel,
  owl: PetEule,
  fox: PetFuchs,
  trex: PetTRex,
  triceratops: PetTriceratops,
  stegosaurus: PetStegosaurus,
  brachiosaurus: PetBrachiosaurus,
  pteranodon: PetPteranodon,
  ankylosaurus: PetAnkylosaurus,
  shark: PetHai,
  piranha: PetPiranha,
  'blue-whale': PetBlauwal,
  'sperm-whale': PetPottwal,
  'killer-whale': PetKillerwal,
  beluga: PetBeluga,
  narwhal: PetNarwal,
  dolphin: PetDelfin,
  clownfish: PetClownfisch,
  'blue-tang': PetPalettenfisch,
  pufferfish: PetKugelfisch,
  jellyfish: PetQualle,
  seahorse: PetSeepferdchen,
  starfish: PetSeestern,
  octopus: PetKraken,
};
