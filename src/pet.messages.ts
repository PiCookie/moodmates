import type { Mood } from './pet.shared';

const MESSAGES: Record<Mood | 'hot', readonly string[]> = {
  frozen: [
    'Brrrr… da gefrieren mir die Pfoten! 🥶',
    'K-k-kannst du eine D-Decke bringen?',
    'Ich fühl mich wie ein Eiswürfel!',
    'Mein Atem gefriert in der Luft!',
    'Wo bleibt bitte der Frühling?!',
    'Heißer Kakao… JETZT! ☕',
    'Ich bin ein Eis-Tier! 🧊',
    'Selbst meine Gedanken frieren ein.',
  ],
  cold: [
    'Heute ist es etwas frisch, oder? 🧣',
    'Ein heißer Tee wäre jetzt schön…',
    'Wo ist eigentlich mein Schal?',
    'Etwas kühl hier, finde ich.',
    'Der Herbst macht sich bemerkbar!',
    'Ich könnte eine Wärmflasche brauchen.',
    'Zieht es hier, oder bilde ich das ein?',
    'Warme Socken wären jetzt super! 🧦',
  ],
  neutral: [
    'Schönes Wetter heute! 😊',
    'Ganz gemütlich so!',
    'Perfekte Temperatur, würde ich sagen.',
    'Könnte nicht besser sein!',
    'So mag ich das!',
    'Heute bin ich gut drauf!',
    'Ideal für einen Spaziergang! 🚶',
    'Weder zu warm noch zu kalt – top!',
    'Ich bin heute super drauf! 🎉',
    'Was ein schöner Tag! 🌤️',
  ],
  warm: [
    'Sonnencreme nicht vergessen! ☀️',
    'Ich schwitze ein kleines bisschen 😅',
    'Ein Eis wäre jetzt herrlich!',
    'So warm und schön hier!',
    'Ein Sprung in den See gefällig?',
    'Heute ist Grillwetter! 🔥',
    'Schön warm – ich mag das! 🌞',
    'Fast zu warm zum Bewegen…',
  ],
  hot: [
    'Hier könnte man Eier braten! 🍳',
    'Zu heiß zum Denken…',
    'Klimaanlage??? DRINGEND!!! 🆘',
    'Ich schmelze gleich weg! 😵',
    'Das ist kein Wetter, das ist eine Prüfung!',
    'Hat jemand Eis? Viel Eis??? 🧊🧊🧊',
    'Ich glaube, ich verdampfe gleich.',
  ],
};

export function pickMessage(mood: Mood, temperature: number | null): string {
  const pool =
    temperature !== null && temperature >= 28 ? MESSAGES.hot : MESSAGES[mood];
  return pool[Math.floor(Math.random() * pool.length)];
}
