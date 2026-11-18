import { useState, useEffect, useRef } from 'react';
import type { DetectedEvent, EventKind } from './events';
import { pickEventMessage } from './events';
import { lookOf }                      from './shared';
import type { Mood }                   from './shared';
import { pickMessage, resolveMessages } from './messages';
import type { PetMessages } from './messages';
import type { PetType }      from './pets';
import { MoodmateSprite }  from './MoodmateSprite';

type SpeechVariant = 'frost' | 'summer' | 'heat' | 'online';

// Farben der Blase stehen in styles.css (mm-bubble__text--<variante>), hier nur die Spitze
const VARIANT_TAIL: Record<SpeechVariant, string> = {
  frost:  '#eff6ff',
  summer: '#fffbeb',
  heat:   '#fef2f2',
  online: '#f0fdf4',
};

const EVENT_TO_VARIANT: Record<EventKind, SpeechVariant> = {
  'first-frost':  'frost',
  'first-summer': 'summer',
  'heat-record':  'heat',
  'back-online':  'online',
};

export interface MoodmateProps {
  /** Stimmung des Tiers; Aussehen, Sprüche und Hüpfen folgen ihr. Die Anwendung entscheidet, wann welche gilt. */
  mood: Mood;
  size?: number;
  type?: PetType;
  name?: string;
  event?: DetectedEvent | null;
  /** Eigene Texte (Teil-Objekt); fehlende Felder fallen auf Englisch zurück */
  messages?: Partial<PetMessages>;
}

function SpeechBubble({ text, variant, leftPx }: { text: string; variant?: SpeechVariant | null; leftPx?: number }) {
  const tailFill  = variant ? VARIANT_TAIL[variant] : 'white';
  const textClass = variant ? `mm-bubble__text mm-bubble__text--${variant}` : 'mm-bubble__text';

  const posClass = leftPx === undefined ? ' mm-bubble--side' : '';
  const posStyle = leftPx !== undefined ? { left: leftPx + 12 } : undefined;

  return (
    <div className={`mm-bubble${posClass}`} style={posStyle}>
      <div className="mm-bubble__inner">
        {/*
          Comic-Sprechblasen-Schwanz:
          - Außenkante (rechts): konkave Bezier-Kurve, wie im klassischen Comic-Stil
          - Innenkante (links):  gerade Linie zur Spitze
          - Spitze zeigt nach unten-links (auf den Tierkopf)
          - z-0 liegt hinter dem Bubble-Inhalt (z-10), der die Basis überdeckt
        */}
        <svg
          className="mm-bubble__tail"
          width="28"
          height="18"
          viewBox="0 0 28 18"
          fill={tailFill}
        >
          <path d="M 26,0 C 18,3 4,9 0,18 L 6,0 Z" />
        </svg>
        {/* Bubble */}
        <div className={textClass}>
          {text}
        </div>
      </div>
    </div>
  );
}

export function Moodmate({ mood, size = 80, type = 'cat', name, event, messages }: MoodmateProps) {
  const text = resolveMessages(messages);
  const [blinking,       setBlinking]       = useState(false);
  const [hopping,        setHopping]        = useState(false);
  const [speechText,     setSpeechText]     = useState<string | null>(null);
  const [speechVariant,  setSpeechVariant]  = useState<SpeechVariant | null>(null);

  // Refs damit die Timers immer den aktuellen Zustand lesen, ohne neu zu starten
  const moodRef = useRef(mood);
  const textRef = useRef(text);
  useEffect(() => {
    moodRef.current = mood;
    textRef.current = text;
  });

  // Ref für den Auto-Clear-Timer der Sprechblase (damit Click den Timer resetten kann)
  const speechClearTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  function doTripleHop() {
    [0, 400, 800].forEach((delay) => {
      setTimeout(() => {
        setHopping(true);
        setTimeout(() => setHopping(false), 350);
      }, delay);
    });
  }

  function showSpeech() {
    if (speechClearTimerRef.current) clearTimeout(speechClearTimerRef.current);
    setSpeechText(pickMessage(moodRef.current, textRef.current));
    setSpeechVariant(null);
    setHopping(true);
    setTimeout(() => setHopping(false), 450);
    speechClearTimerRef.current = setTimeout(() => {
      setSpeechText(null);
      speechClearTimerRef.current = null;
    }, 4500);
  }

  // ── Ereignis-Reaktion ──────────────────────────────────────────────────────
  useEffect(() => {
    if (!event) return;
    if (speechClearTimerRef.current) clearTimeout(speechClearTimerRef.current);
    setSpeechText(pickEventMessage(event.kind, textRef.current));
    setSpeechVariant(EVENT_TO_VARIANT[event.kind]);
    doTripleHop();
    speechClearTimerRef.current = setTimeout(() => {
      setSpeechText(null);
      setSpeechVariant(null);
      speechClearTimerRef.current = null;
    }, 8000);
  }, [event]);

  const { look }  = lookOf(mood);
  const shivering = look === 'cold' || look === 'frozen';
  const canHop    = look === 'neutral' || look === 'warm';

  // ── Blinzeln (alle paar Sekunden) ────────────────────────────────────────
  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    const schedule = () => {
      const t1 = setTimeout(() => {
        setBlinking(true);
        const t2 = setTimeout(() => { setBlinking(false); schedule(); }, 160);
        timers.push(t2);
      }, 3500 + Math.random() * 4000);
      timers.push(t1);
    };
    schedule();
    return () => timers.forEach(clearTimeout);
  }, []);

  // ── Hüpfen (nur neutral + warm) ──────────────────────────────────────────
  useEffect(() => {
    if (!canHop) return;
    const timers: ReturnType<typeof setTimeout>[] = [];
    const schedule = () => {
      const t1 = setTimeout(() => {
        setHopping(true);
        const t2 = setTimeout(() => { setHopping(false); schedule(); }, 450);
        timers.push(t2);
      }, 9000 + Math.random() * 9000);
      timers.push(t1);
    };
    schedule();
    return () => { timers.forEach(clearTimeout); setHopping(false); };
  }, [canHop]);

  // ── Sprechblase (alle 20-45 Sekunden, erste nach 10-18 s) ─────────────────
  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    const schedule = (delay: number) => {
      const t1 = setTimeout(() => {
        showSpeech();
        const t2 = setTimeout(() => schedule(20000 + Math.random() * 25000), 4500);
        timers.push(t2);
      }, delay);
      timers.push(t1);
    };
    schedule(10000 + Math.random() * 8000);
    return () => timers.forEach(clearTimeout);
  }, []);

  const spriteProps = { mood, size, blinking };

  return (
    <div className="mm-pet">
      {speechText && <SpeechBubble text={speechText} variant={speechVariant} leftPx={type === 'blue-whale' || type === 'sperm-whale' || type === 'killer-whale' || type === 'beluga' || type === 'narwhal' ? size : undefined} />}
      <div
        className={`mm-pet__body${hopping && !shivering ? ' mm-hop' : ''}`}
        onClick={showSpeech}
        role="button"
        aria-label={text.tapPet}
      >
        <MoodmateSprite type={type} messages={messages} {...spriteProps} />
      </div>
      {name && (
        <span className="mm-pet__name">{name}</span>
      )}
    </div>
  );
}
