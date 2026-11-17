import { getMood } from './pet.shared';
import type { Mood } from './pet.shared';
import './pet.css';

const MOOD_COLORS: Record<Mood, string> = {
  frozen:  '#818cf8',  // Indigo
  cold:    '#7dd3fc',  // Sky-Blau
  neutral: '#6ee7b7',  // Smaragdgrün
  warm:    '#fbbf24',  // Amber
};

const MOOD_LABELS: Record<Mood, string> = {
  frozen:  'Gefroren',
  cold:    'Kalt',
  neutral: 'Normal',
  warm:    'Warm',
};

const MOOD_ORDER: Mood[] = ['frozen', 'cold', 'neutral', 'warm'];

interface Props {
  /** Stündliche Rohtemperaturen (°C) für heute — aus group='hourly' History */
  tempValues: number[];
}

export function MoodHistoryBar({ tempValues }: Props) {
  if (tempValues.length === 0) return null;

  const moods = tempValues.map((t) => getMood(t));

  const counts = moods.reduce<Record<Mood, number>>(
    (acc, m) => { acc[m]++; return acc; },
    { frozen: 0, cold: 0, neutral: 0, warm: 0 },
  );

  const total = moods.length;

  return (
    <div className="mm-mood-bar">

      {/* ── Farbbalken: ein Segment pro Stunde ── */}
      <div
        className="mm-mood-bar__bar"
        role="img"
        aria-label="Stimmungsverteilung heute"
      >
        {moods.map((mood, i) => (
          <div
            key={i}
            className="mm-mood-bar__segment"
            style={{ backgroundColor: MOOD_COLORS[mood] }}
            title={`${String(i).padStart(2, '0')}:00 – ${MOOD_LABELS[mood]}`}
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
              {MOOD_LABELS[m]} {Math.round((counts[m] / total) * 100)} %
            </span>
          ))}
      </div>

    </div>
  );
}
