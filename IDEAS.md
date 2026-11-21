# Ideas, roadmap and decisions

One place for what is planned, what is only an idea, what is done and why the package looks the way it does.

How to use this file: write new ideas under "Ideas". When something is decided, move it to "Planned". When
it is finished, tick the box and move it to "Done" with the version it shipped in. The release notes on GitHub
are the changelog.

Each of the three lists has two parts. **Moodmates** is about the animals themselves: new species, new
moods and faces, and explicit design changes (a species that should look different, a mood that needs another
icon). **Package and project** is everything else: API, tooling, demo, docs and releases.

## Planned (decided, not built yet)

### Moodmates

New animals, faces and design changes that are decided. For a design change, write down the species, what
should look different and why.

- [ ] **More moods such as sad, angry and happy.** They come as an additional set next to the cold-to-hot
  scale, with their own faces. Note: adding values to `Mood` is a type-level change for code that builds a
  `Record<Mood, ...>` (for example a custom `PetMessages`). It will be announced in the release notes and
  released as a minor version while the package is 0.x.
- [ ] **Finish the eleven "coming soon" species:** the six dinosaurs (`trex`, `triceratops`, `stegosaurus`,
  `brachiosaurus`, `pteranodon`, `ankylosaurus`) and, added later, `elephant`, `capybara`, `polar-bear`, `bear`
  and `hedgehog`. They are drawn, but not finished, so they are marked "coming soon". When one is done,
  remove it from `COMING_SOON_PET_TYPES` in `src/pets.ts` and run `pnpm build && pnpm gen:overview`.

### Package and project

- [ ] **More events such as level up.** `EventKind` is a fixed list today (`first-frost`, `first-summer`,
  `heat-record`, `back-online`). It will grow, and eventually let apps define their own.

## Ideas (not decided)

### Moodmates

Ideas for new animals and for how existing ones could look or change.

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
- [ ] **Humans** as a new group (a new category next to pets, Africa and so on). Each follows the five moods like
  the other animals. Six figures:
  - **Child:** boy and girl.
  - **Adult:** man and woman.
  - **Grandparent:** grandfather and grandmother.
- [ ] **Accessories.** A moodmate can wear things, for example glasses, a hat or something else. Open question:
  how an app chooses them (probably an `accessory` prop) and how they fit the very different bodies of the
  45 species, and how they combine with the mood icons (the scarf when cold, the sunglasses when warm).

### Package and project

- [ ] Per-animal imports so apps that use one species do not ship all 45 (about 180 kB minified, 34 kB gzip
  today).
- [ ] More theming than the two CSS variables.
- [ ] Checking the screen reader output with real assistive technology (every animal is a `role="img"`
  with a label, but this has only been tested in unit tests).
- [ ] Check the demo page on a real phone and in the real light color scheme. It was only simulated (a 390 px
  wide frame, light colors forced); that found three problems, fixed in 0.2.1.
- [ ] **Publish to npm from a workflow.** The GitHub release is created by the `Release` workflow now, but
  `npm publish` is still done by hand with a one-time password. A forgotten or failed publish (0.1.3 stayed
  unpublished for a while, an expired login shows up as a confusing 404) is the remaining gap. Needs npm
  trusted publishing (set up on npmjs.com for this repository and workflow) or a token in the repository
  secrets; trusted publishing is the cleaner one because there is no secret to keep.
- [ ] **Visible gaps in the API.** Apps notice these first. Each one is tracked in its own entry; tick this
  box when all of them are done:
  - ~~No way to switch the speech bubble off~~ and ~~no `onTap` callback~~: done, see "Done".
  - The mood scale only goes from cold to hot: see "More moods" under Planned.
  - ~~The default phrases are about the weather~~: done for the speech phrases, see "Done". The event phrases
    (`first-frost`, `first-summer`, `heat-record`) still are; they belong to "More events" under Planned.

## Done

History from the weather station app, where the package grew before it got its own repo. The package has 45
species today.

### Moodmates

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
- [x] **Species categories** for pickers and overviews: pets, Africa, Asia, South America, Antarctica,
  nature & worldwide, sea and dinosaurs. Every species is in exactly one (`PET_CATEGORIES`, `petCategoryOf()`,
  `petTypesIn()`, `categoryNames` in `PetMessages`). The demo and the README picture show them grouped (0.3.0).
  Judgement calls: the dragon is in Asia, the piranha in South America (it lives in rivers there, not in the
  sea), the polar bear in Antarctica as in the weather station app, narwhal and beluga in the sea.
- [x] Unfinished species are marked "coming soon" instead of being removed (`COMING_SOON_PET_TYPES`): the six
  dinosaurs in 0.1.3, elephant, capybara, polar bear, bear and hedgehog in 0.3.0.

### Package and project

- [x] **The animal talks when tapped.** A tap shows a bubble with a phrase for the current mood and makes
  the animal hop. A running clear timer is reset, so the bubble always stays 4.5 s. (`Moodmate`)
- [x] **Mood history.** A small bar under the animal shows how long it was in which mood today.
  (`MoodHistoryBar`)
- [x] A live demo page (`demo/index.html`, published with GitHub Pages). 0.1.2 contains the page, the
  Pages workflow came after it. Grouped by category since 0.3.0.
- [x] A picture of all species in the README (`docs/moodmates.svg`), kept current by a test.
- [x] The speech bubble sits at the same place relative to the body for every species (0.1.2).
- [x] **`talk` and `onTap` props on `Moodmate`.** `talk={false}` stops the speech from time to time and the
  bubble on a tap (events still show theirs); `onTap` is called on every tap (0.2.0).
- [x] **GitHub releases are created by a workflow.** Pushing a tag `v*` runs `.github/workflows/release.yml`:
  it checks the tag against `package.json` and `master`, then creates the release with generated notes.
  The steps are in the README under "Releasing". First used for `v0.3.1`; the repository only, not part of
  the package.
- [x] **Speech phrases that are not about the weather.** Nine weather lines of the default phrases (spring,
  autumn, sunscreen, lake, barbecue, "lovely weather") were rewritten as comfort phrases; a test keeps weather
  words out of `speech`. The event phrases are still weather themed (0.3.1).
- [x] **German as a second built-in language.** `language="de"` on `Moodmate`, `MoodmateSprite` and
  `MoodHistoryBar` (`MESSAGES_DE`, `LANGUAGES`): phrases, mood names, species and category names and screen
  reader labels. The demo has a language switch. (0.4.0).
- [x] **Own sentence on demand: the `say` prop on `Moodmate`.** `say={{ text, duration? }}` shows the sentence in
  the bubble (4.5 s by default) and hops once. A new object shows it again, also with the same text (like
  `event`); it replaces a running bubble and works with `talk={false}`. The text is not translated. A ref
  method (`ref.current.say(...)`) was left out; it can be added later without changing the prop. Not released yet.
- [x] **Readable legend and name tag on light backgrounds.** The defaults of `--mm-legend-color` and
  `--mm-name-color` are the page's text color, toned down, instead of semi-transparent white (0.2.1).

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

**English is the default language, German is built in, other languages are passed in.**
The package ships English (`MESSAGES_EN`, the default) and German (`MESSAGES_DE`), chosen with the `language`
prop. Up to 0.3.1 it shipped English only and left every translation to the app; German was added later. Any other
language is still a `PetMessages` object passed as `messages`, and the app owns its translations and its
personality. The order is: your own
`messages`, then the chosen language, then English. A language the package does not know falls back to English.

**The 45 animals are internal.**
They are chosen with the required `type` prop. Every public animal would be a compatibility promise, so
animals can be added, renamed or redrawn without breaking anyone. `MoodmateSprite` is the static picture
(no timers, no bubble, no name) for lists, avatars and pickers.

**Unfinished animals stay usable and are marked "coming soon".**
Species that are not finished yet (the six dinosaurs, elephant, capybara, polar bear, bear and hedgehog today)
stay in `ALL_PET_TYPES` and keep working, so nobody who already uses them breaks. They are listed in `COMING_SOON_PET_TYPES`, shown blurred with a note
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
