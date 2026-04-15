import type { EventKind } from '@/hooks/useEventDetector';

const EVENT_MESSAGES: Record<EventKind, readonly string[]> = {
  'first-frost': [
    'Mein erster Frost des Jahres! 🥶❄️',
    "Heute Nacht hat's zum ersten Mal gefroren!",
    'Brr — zum ersten Mal unter null! ❄️',
    'Winter ist offiziell angekommen! 🌨️',
  ],
  'first-summer': [
    'Erster richtiger Sommertag! ☀️🎉',
    '25 Grad! Sommer ist endlich da! 🌞',
    'Heute fühlt sich der Sommer an! 🏖️',
    'Endlich warm genug für Eis! 🍦☀️',
  ],
  'heat-record': [
    'Neuer Allzeit-Rekord! 🔥🏆',
    'Das ist der heißeste Tag aller Zeiten! 🌡️🔥',
    "Rekord gebrochen! So heiß war's noch nie! 🏆",
    'Historisch heiß! Neuer Bestwert! 🔥',
  ],
  'back-online': [
    'Ich bin wieder da! 📡✅',
    'Verbindung wiederhergestellt! 🟢',
    'Endlich wieder online! 📶',
    'Hallo nochmal! Kurz weg gewesen 👋',
  ],
};

export function pickEventMessage(kind: EventKind): string {
  const pool = EVENT_MESSAGES[kind];
  return pool[Math.floor(Math.random() * pool.length)];
}
