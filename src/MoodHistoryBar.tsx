import { getMood } from './pet.shared';
import type { Mood } from './pet.shared';

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
    <div className="flex flex-col items-center gap-1.5 w-full max-w-[200px]">

      {/* ── Farbbalken: ein Segment pro Stunde ── */}
      <div
        className="h-2 flex rounded-full overflow-hidden w-full"
        role="img"
        aria-label="Stimmungsverteilung heute"
      >
        {moods.map((mood, i) => (
          <div
            key={i}
            className="flex-1"
            style={{ backgroundColor: MOOD_COLORS[mood] }}
            title={`${String(i).padStart(2, '0')}:00 – ${MOOD_LABELS[mood]}`}
          />
        ))}
      </div>

      {/* ── Legende: nur vorhandene Stimmungen ── */}
      <div className="flex items-center justify-center gap-3 flex-wrap">
        {MOOD_ORDER
          .filter((m) => counts[m] > 0)
          .map((m) => (
            <span key={m} className="flex items-center gap-1 text-[9px] text-white/35">
              <span
                className="w-1.5 h-1.5 rounded-full shrink-0"
                style={{ backgroundColor: MOOD_COLORS[m] }}
              />
              {MOOD_LABELS[m]} {Math.round((counts[m] / total) * 100)} %
            </span>
          ))}
      </div>

    </div>
  );
}
