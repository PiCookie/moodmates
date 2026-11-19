# Ideas, roadmap and decisions

One place for what is planned, what is only an idea, what is done and why the package looks the way it does.

How to use this file: write new ideas under "Ideas". When something is decided, move it to "Planned". When
it is finished, tick the box and move it to "Done" with the version it shipped in.

## Planned (decided, not built yet)

- [ ] **More moods such as sad, angry and happy.** They come as an additional set next to the cold-to-hot
  scale, with their own faces. Note: adding values to `Mood` is a type-level change for code that builds a
  `Record<Mood, ...>` (for example a custom `PetMessages`). It will be announced in the changelog and
  released as a minor version while the package is 0.x.
- [ ] **More events such as level up.** `EventKind` is a fixed list today (`first-frost`, `first-summer`,
  `heat-record`, `back-online`). It will grow, and eventually let apps define their own.
- [ ] **More generic default phrases** that are not about the weather, so the defaults fit other uses too.
- [ ] **Finish the six dinosaurs** (`trex`, `triceratops`, `stegosaurus`, `brachiosaurus`, `pteranodon`,
  `ankylosaurus`). They are drawn, but not finished, so they are marked "coming soon". When one is done,
  remove it from `COMING_SOON_PET_TYPES` in `src/pets.ts` and run `pnpm build && pnpm gen:overview`.

## Ideas (not decided)

- [ ] **Growth stages.** The animal grows over time: baby, adult, senior, with small changes of the icons
  per stage. Idea from the weather station app, where the stage was kept in `localStorage`. In the package
  this would be a `stage` prop; keeping the stage over time stays the job of the app (the package knows
  moods, not data).
- [ ] **Fabled creatures** as a new group. Each follows the five moods like the other animals:
  - **Unicorn:** white horse body, spiral horn on the forehead, rainbow mane and tail (tinted per mood: ice
    blue = frozen, pastel pink = cold, white = neutral, golden yellow = warm).
  - **Phoenix:** bird-like body, flaming feathers (blue = frozen, orange-red = warm), spread wings as its
    trademark.
  - **Mermaid:** human upper body, fish tail with scale pattern, long hair.
- [ ] **Species categories** (pets, Africa, Asia, sea, ...) for pickers. The weather station app sorted its
  picker this way. The package has no categories today, and may not need them: an app can group by
  `ALL_PET_TYPES` itself.
- [ ] A way to show your own sentence on demand (for example a `say` prop or a ref method).
- [ ] Per-animal imports so apps that use one species do not ship all 45 (about 173 kB minified, 31 kB gzip
  today).
- [ ] More theming than the two CSS variables.
- [ ] Checking the screen reader output with real assistive technology (every animal is a `role="img"`
  with a label, but this has only been tested in unit tests).
- [ ] A darker default for `--mm-legend-color` on the history bar. The default is semi-transparent white and
  almost invisible on light backgrounds.
- [ ] Check the demo page on a phone and in the light color scheme (only looked at on a desktop in dark mode).
- [ ] **A release process.** Tag, GitHub release and `npm publish` are all done by hand today. That is how
  the GitHub releases for `v0.1.1` and `v0.1.2` were forgotten at first, and how 0.1.3 ended up merged but
  not published. Idea: a workflow that creates the GitHub release when a `v*` tag is pushed, with the notes
  taken from a file or the merged PRs. Publishing to npm would need a token or trusted publishing instead of
  the one-time password typed by hand.
- [ ] **Visible gaps in the API.** Apps notice these first. Each one is tracked in its own entry; tick this
  box when all of them are done:
  - ~~No way to switch the speech bubble off~~ and ~~no `onTap` callback~~: done, see "Done".
  - The mood scale only goes from cold to hot: see "More moods" under Planned.
  - The default phrases are about the weather: see "More generic default phrases" under Planned.

## Done

History from the weather station app, where the package grew before it got its own repo. The package has 45
species today.

- [x] **Species**, in the order they were added. Each has its own trademark and follows the five moods:
  - Lion, turtle and capybara (broad snout, eyes high on the head).
  - Panda (eye rings, white X eyes when frozen) and dragon (horns, fire breath when warm, ice breath when
    frozen).
  - Pets: rabbit (long ears) and hamster (puffed cheeks).
  - Africa: elephant (trunk, fan ears), hippo (wide snout, open mouth when warm) and meerkat (upright
    guard pose).
  - Asia: tiger (stripes) and red panda (ringed bushy tail).
  - South America: llama (long neck, snooty face) and sloth (hangs upside down from a branch).
  - Antarctica: seal and polar bear.
  - Nature: hedgehog (spines with a gradient), owl (huge round eyes) and fox (white-tipped tail).
  - Sea: shark, whale (water spout when warm), seahorse (upright pose), dolphin (always smiling),
    pufferfish and jellyfish. The package later added more whales, fish and the octopus.
  - Dinosaurs: T. rex, triceratops, stegosaurus, brachiosaurus, pteranodon and ankylosaurus are drawn, but
    not finished (see "Planned").
- [x] **Feet for all animals.** Cat, dog and frog got flat foot ovals at the bottom like the penguin.
- [x] **The animal talks when tapped.** A tap shows a bubble with a phrase for the current mood and makes
  the animal hop. A running clear timer is reset, so the bubble always stays 4.5 s. (`Moodmate`)
- [x] **Mood history.** A small bar under the animal shows how long it was in which mood today.
  (`MoodHistoryBar`)
- [x] A live demo page (`demo/index.html`, published with GitHub Pages). 0.1.2 contains the page, the
  Pages workflow came after it.
- [x] A picture of all species in the README (`docs/moodmates.svg`), kept current by a test.
- [x] The speech bubble sits at the same place relative to the body for every species (0.1.2).
- [x] **`talk` and `onTap` props on `Moodmate`.** `talk={false}` stops the speech from time to time and the
  bubble on a tap (events still show theirs); `onTap` is called on every tap.
- [x] Unfinished species are marked "coming soon" instead of being removed (`COMING_SOON_PET_TYPES`).

## Decisions made (why it looks like this)

**The package knows moods, not data.**
`Moodmate`, `MoodmateSprite` and `MoodHistoryBar` take a `mood`. Which temperature, score or event leads to
which mood is decided by the app that uses the package. There is deliberately no `temperature` prop
(a test enforces that the word does not appear in the source). Reason: the thresholds are an opinion of the
app, and the same animals should work for other data.

**The mood scale is a five-step cold-to-hot scale.**
`frozen`, `cold`, `neutral`, `warm`, `hot`. The drawings (icicles, scarf, snowflakes, sunglasses, sun, sweat
drops) and the default phrases are built around it. `hot` looks like `warm` plus sweat drops and has its own
phrases. This is a comfort scale, not a general emotion scale. Emotions are planned, see "Planned" above.

**English is the default language, other languages are passed in.**
The package ships English only (`MESSAGES_EN`). Any other language is a `PetMessages` object passed as
`messages`; the app owns its translations and its personality. Missing fields fall back to English.

**The 45 animals are internal.**
They are chosen with the required `type` prop. Every public animal would be a compatibility promise, so
animals can be added, renamed or redrawn without breaking anyone. `MoodmateSprite` is the static picture
(no timers, no bubble, no name) for lists, avatars and pickers.

**Unfinished animals stay usable and are marked "coming soon".**
Species that are not finished yet (the six dinosaurs today) stay in `ALL_PET_TYPES` and keep working, so
nobody who already uses them breaks. They are listed in `COMING_SOON_PET_TYPES`, shown blurred with a note
in the demo and the README picture, and left out of `randomPetType()`. Removing them would have been an API
break, and a separate long-lived branch would drift away from the rest of the code.

**`type` is required on `Moodmate` and `MoodmateSprite`.**
No hidden default species. An unknown `type` at runtime still falls back to the cat instead of crashing,
because stored settings can contain species from older versions.

**`moodmates/core` has no React and no CSS.**
Species list, moods, event kinds and texts can be used on a server. A test enforces that its module graph
imports no packages.

**Self-contained styling.**
`moodmates/styles.css`, classes prefixed `mm-`, `prefers-reduced-motion` respected, two CSS variables
(`--mm-name-color`, `--mm-legend-color`). No Tailwind needed.

**Version 0.x until the API settles.**
The API changed several times before the first release. `1.0.0` is a promise of stability, so it waits.
