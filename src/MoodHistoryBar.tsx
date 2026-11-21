import type { Mood } from './shared';
import { resolveMessages } from './messages';
import type { PetMessages } from './messages';
import type { Language } from './languages';

const MOOD_COLORS: Record<Mood, string> = {
  frozen:  '#818cf8',  // Indigo
  cold:    '#7dd3fc',  // Sky-Blau
  neutral: '#6ee7b7',  // Smaragdgrün
  warm:    '#fbbf24',  // Amber
  hot:     '#f87171',  // Rot
};

const MOOD_ORDER: Mood[] = ['frozen', 'cold', 'neutral', 'warm', 'hot'];

interface Props {
  /** Stimmung je Stunde; die Anwendung bestimmt sie (das Paket kennt keine Temperaturen) */
  moods: Mood[];
  /** Sprache der Texte (`'en'` oder `'de'`); Standard Englisch */
  language?: Language;
  /** Eigene Texte (Teil-Objekt); fehlende Felder fallen auf die Sprache zurück */
  messages?: Partial<PetMessages>;
}

export function MoodHistoryBar({ moods, messages, language }: Props) {
  if (moods.length === 0) return null;

  const text = resolveMessages(messages, language);

  const counts = moods.reduce<Record<Mood, number>>(
    (acc, m) => { acc[m]++; return acc; },
    { frozen: 0, cold: 0, neutral: 0, warm: 0, hot: 0 },
  );

  const total = moods.length;

  return (
    <div className="mm-mood-bar">

      {/* ── Farbbalken: ein Segment pro Stunde ── */}
      <div
        className="mm-mood-bar__bar"
        role="img"
        aria-label={text.moodBarAriaLabel}
      >
        {moods.map((mood, i) => (
          <div
            key={i}
            className="mm-mood-bar__segment"
            style={{ backgroundColor: MOOD_COLORS[mood] }}
            title={text.moodBarHourTitle(String(i).padStart(2, '0'), text.moodLabels[mood])}
          />
        ))}
      </div>

      {/* ── Legende: nur vorhandene Stimmungen ── */}
      <div className="mm-mood-bar__legend">
        {MOOD_ORDER
          .filter((m) => counts[m] > 0)
          .map((m) => (
            <span key={m} className="mm-mood-bar__legend-item">
              <span
                className="mm-mood-bar__dot"
                style={{ backgroundColor: MOOD_COLORS[m] }}
              />
              {text.moodLabels[m]} {Math.round((counts[m] / total) * 100)} %
            </span>
          ))}
      </div>

    </div>
  );
}
