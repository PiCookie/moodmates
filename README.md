# moodmates

Small animated SVG animals that show a mood. 45 species, speech bubbles, a mood history bar.
For React 19, no runtime dependencies, no Tailwind needed. Your app decides when which mood applies;
the animals only know moods, not temperatures, scores or any other data.

```tsx
import { Moodmate } from 'moodmates';
import 'moodmates/styles.css';

<Moodmate type="cat" mood="warm" name="Mimi" />
```

## Install

```sh
npm install moodmates
```

Peer dependency: `react ^19`. Import `moodmates/styles.css` once in your app.

## Moods

`'frozen' | 'cold' | 'neutral' | 'warm' | 'hot'`. `hot` looks like `warm`, plus sweat drops and its own phrases.
You map your data to a mood. For example, from a temperature:

```ts
import type { Mood } from 'moodmates';

function moodFromTemperature(celsius: number | null): Mood {
  if (celsius === null) return 'neutral';
  if (celsius < 0) return 'frozen';
  if (celsius < 8) return 'cold';
  if (celsius < 22) return 'neutral';
  if (celsius < 28) return 'warm';
  return 'hot';
}
```

## Components

### `<Moodmate>`: the living animal

Blinks, hops, shivers, talks from time to time and reacts to a tap.

| Prop | Type | Default | |
|---|---|---|---|
| `mood` | `Mood` | required | Look, phrases and hopping follow it |
| `type` | `PetType` | `'cat'` | One of 45 species, see `ALL_PET_TYPES` |
| `size` | `number` | `80` | Pixels |
| `name` | `string` | none | Name tag below the animal |
| `event` | `{ kind: EventKind } \| null` | none | Shows an event bubble and hops three times (`'first-frost'`, `'first-summer'`, `'heat-record'`, `'back-online'`) |
| `messages` | `Partial<PetMessages>` | English | Your own texts, see below |

### `<MoodmateSprite>`: just the picture

No timers, no bubble, no name. For lists, avatars and pickers.

```tsx
<MoodmateSprite type="owl" mood="cold" size={52} />
```

Props: `type` (required), `mood` (required), `size`, `blinking`, `messages` (only used for the screen reader label).
An unknown `type` falls back to the cat.

### `<MoodHistoryBar>`: a colored bar with one segment per hour

```tsx
<MoodHistoryBar moods={['cold', 'cold', 'neutral', 'warm', 'hot']} />
```

## Your own texts (and other languages)

English is the default (`MESSAGES_EN`). To use another language, pass a `PetMessages` object.
Missing fields fall back to English. Copy `MESSAGES_EN` from `src/messages.en.ts` as a template:

| Field | Content |
|---|---|
| `speech` | Phrases per mood (`frozen`, `cold`, `neutral`, `warm`, `hot`) |
| `events` | Phrases per event kind |
| `moodLabels` | Names of the moods (legend, tooltips, screen reader) |
| `petNames` | Display name per species |
| `spriteLabel(petName, moodLabel)` | Screen reader label of the picture, e.g. "Cat: Warm" |
| `tapPet` | Screen reader label of the tappable animal |
| `moodBarAriaLabel`, `moodBarHourTitle(hour, label)` | Labels of the history bar |

```tsx
const german: Partial<PetMessages> = { tapPet: 'Tier antippen', moodLabels: { /* ... */ } };
<Moodmate type="cat" mood="neutral" messages={german} />
```

## Styling

`moodmates/styles.css` is self-contained (classes are prefixed with `mm-`, `prefers-reduced-motion` is respected).
Two CSS variables: `--mm-name-color` (name tag) and `--mm-legend-color` (history bar legend).

## Without React

`moodmates/core` has no React and no CSS: `ALL_PET_TYPES`, `randomPetType()`, `pickMessage()`,
`pickEventMessage()`, `resolveMessages()`, `MESSAGES_EN` and the types. Useful on a server.

## Development

```sh
pnpm install
pnpm test          # unit tests
pnpm lint && pnpm typecheck
pnpm build && pnpm test:dist   # build and smoke-test the built package
```

## License

MIT, see [LICENSE](LICENSE).

This is a hobby project. It is not affiliated with any other product or company that uses a similar name.
