# Design decisions and roadmap

Why moodmates looks the way it does, and what is planned. Newest facts first in each section.

## Decisions made

**The package knows moods, not data.**
`Moodmate`, `MoodmateSprite` and `MoodHistoryBar` take a `mood`. Which temperature, score or event leads to
which mood is decided by the app that uses the package. There is deliberately no `temperature` prop
(a test enforces that the word does not appear in the source). Reason: the thresholds are an opinion of the
app, and the same animals should work for other data.

**The mood scale is a five-step cold-to-hot scale.**
`frozen`, `cold`, `neutral`, `warm`, `hot`. The drawings (icicles, scarf, snowflakes, sunglasses, sun, sweat
drops) and the default phrases are built around it. `hot` looks like `warm` plus sweat drops and has its own
phrases. This is a comfort scale, not a general emotion scale. See "Planned" for emotions.

**English is the default language, other languages are passed in.**
The package ships English only (`MESSAGES_EN`). Any other language is a `PetMessages` object passed as
`messages`; the app owns its translations and its personality. Missing fields fall back to English.

**The 45 animals are internal.**
They are chosen with the required `type` prop. Every public animal would be a compatibility promise, so
animals can be added, renamed or redrawn without breaking anyone. `MoodmateSprite` is the static picture
(no timers, no bubble, no name) for lists, avatars and pickers.

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

## Planned (decided, not built yet)

- **More moods such as sad, angry and happy.** They come as an additional set next to the cold-to-hot scale,
  with their own faces. Note: adding values to `Mood` is a type-level change for code that builds a
  `Record<Mood, ...>` (for example a custom `PetMessages`). It will be announced in the changelog and
  released as a minor version while the package is 0.x.
- **More events such as level up.** `EventKind` is a fixed list today (`first-frost`, `first-summer`,
  `heat-record`, `back-online`). It will grow, and eventually let apps define their own.
- **More generic default phrases** that are not about the weather, so the defaults fit other uses too.

## Ideas (not decided)

- `talk` prop to switch the periodic speech off, and a way to show your own sentence on demand.
- `onTap` callback.
- Per-animal imports so apps that use one species do not ship all 45 (about 173 kB minified, 31 kB gzip today).
- More theming than the two CSS variables.
- A live demo page.
- Checking the screen reader output with real assistive technology (every animal is a `role="img"` with a
  label, but this has only been tested in unit tests).
