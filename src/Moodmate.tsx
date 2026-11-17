import { useState, useEffect, useRef } from 'react';
import type { DetectedEvent, EventKind } from './pet.events';
import { pickEventMessage } from './pet.events';
import { PetCat }     from './PetCat';
import { PetDog }     from './PetDog';
import { PetPenguin } from './PetPenguin';
import { PetFrog }    from './PetFrog';
import { PetTurtle }  from './PetTurtle';
import { PetLion }    from './PetLion';
import { PetCapybara } from './PetCapybara';
import { PetHase }    from './PetHase';
import { PetHamster } from './PetHamster';
import { PetBaer }    from './PetBaer';
import { PetTiger }        from './PetTiger';
import { PetRoterPanda }   from './PetRoterPanda';
import { PetPanda }        from './PetPanda';
import { PetDrache }       from './PetDrache';
import { PetElefant }      from './PetElefant';
import { PetNilpferd }     from './PetNilpferd';
import { PetErdmaennchen } from './PetErdmaennchen';
import { PetEisbaer }      from './PetEisbaer';
import { PetRobbe }        from './PetRobbe';
import { PetLama }         from './PetLama';
import { PetFaultier }     from './PetFaultier';
import { PetIgel }         from './PetIgel';
import { PetEule }         from './PetEule';
import { PetFuchs }        from './PetFuchs';
import { PetTRex }          from './PetTRex';
import { PetTriceratops }   from './PetTriceratops';
import { PetStegosaurus }   from './PetStegosaurus';
import { PetBrachiosaurus } from './PetBrachiosaurus';
import { PetPteranodon }    from './PetPteranodon';
import { PetAnkylosaurus }  from './PetAnkylosaurus';
import { PetHai }          from './PetHai';
import { PetPiranha }      from './PetPiranha';
import { PetBlauwal }      from './PetBlauwal';
import { PetPottwal }      from './PetPottwal';
import { PetKillerwal }    from './PetKillerwal';
import { PetBeluga }       from './PetBeluga';
import { PetNarwal }       from './PetNarwal';
import { PetDelfin }       from './PetDelfin';
import { PetKugelfisch }   from './PetKugelfisch';
import { PetQualle }       from './PetQualle';
import { PetSeepferdchen } from './PetSeepferdchen';
import { PetClownfisch }    from './PetClownfisch';
import { PetPalettenfisch } from './PetPalettenfisch';
import { PetSeestern }     from './PetSeestern';
import { PetKraken }       from './PetKraken';
import { getMood }           from './pet.shared';
import { pickMessage, resolveMessages } from './pet.messages';
import type { PetMessages } from './pet.messages';
import type { PetType }      from './pets';
import './pet.css';

type SpeechVariant = 'frost' | 'summer' | 'heat' | 'online';

// Farben der Blase stehen in pet.css (mm-bubble__text--<variante>), hier nur die Spitze
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

interface Props {
  temperature: number | null;
  size?: number;
  petType?: PetType;
  name?: string;
  event?: DetectedEvent | null;
  /** Eigene Texte (Teil-Objekt); fehlende Felder fallen auf Deutsch zurück */
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

export function Moodmate({ temperature, size = 80, petType = 'cat', name, event, messages }: Props) {
  const text = resolveMessages(messages);
  const [blinking,       setBlinking]       = useState(false);
  const [hopping,        setHopping]        = useState(false);
  const [speechText,     setSpeechText]     = useState<string | null>(null);
  const [speechVariant,  setSpeechVariant]  = useState<SpeechVariant | null>(null);

  // Refs damit die Timers immer den aktuellen Zustand lesen, ohne neu zu starten
  const moodRef = useRef(getMood(temperature));
  const tempRef = useRef(temperature);
  const textRef = useRef(text);
  useEffect(() => {
    moodRef.current = getMood(temperature);
    tempRef.current = temperature;
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
    setSpeechText(pickMessage(moodRef.current, tempRef.current, textRef.current));
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [event]);

  const mood      = getMood(temperature);
  const shivering = mood === 'cold' || mood === 'frozen';
  const canHop    = mood === 'neutral' || mood === 'warm';

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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const petProps = { temperature, size, blinking };

  return (
    <div className="mm-pet">
      {speechText && <SpeechBubble text={speechText} variant={speechVariant} leftPx={petType === 'blue-whale' || petType === 'sperm-whale' || petType === 'killer-whale' || petType === 'beluga' || petType === 'narwhal' ? size : undefined} />}
      <div
        className={`mm-pet__body${hopping && !shivering ? ' mm-hop' : ''}`}
        onClick={showSpeech}
        role="button"
        aria-label={text.tapPet}
      >
        {petType === 'dog'     && <PetDog     {...petProps} />}
        {petType === 'rabbit'  && <PetHase    {...petProps} />}
        {petType === 'hamster' && <PetHamster {...petProps} />}
        {petType === 'penguin' && <PetPenguin {...petProps} />}
        {petType === 'frog'    && <PetFrog    {...petProps} />}
        {petType === 'turtle'  && <PetTurtle  {...petProps} />}
        {petType === 'lion'    && <PetLion    {...petProps} />}
        {petType === 'capybara' && <PetCapybara {...petProps} />}
        {petType === 'panda'    && <PetPanda        {...petProps} />}
        {petType === 'dragon'   && <PetDrache       {...petProps} />}
        {petType === 'elephant' && <PetElefant      {...petProps} />}
        {petType === 'hippo'    && <PetNilpferd     {...petProps} />}
        {petType === 'meerkat'  && <PetErdmaennchen {...petProps} />}
        {petType === 'bear'      && <PetBaer       {...petProps} />}
        {petType === 'tiger'     && <PetTiger      {...petProps} />}
        {petType === 'red-panda'  && <PetRoterPanda {...petProps} />}
        {petType === 'polar-bear' && <PetEisbaer   {...petProps} />}
        {petType === 'seal'       && <PetRobbe     {...petProps} />}
        {petType === 'llama'      && <PetLama      {...petProps} />}
        {petType === 'sloth'      && <PetFaultier  {...petProps} />}
        {petType === 'hedgehog'   && <PetIgel      {...petProps} />}
        {petType === 'owl'        && <PetEule      {...petProps} />}
        {petType === 'fox'        && <PetFuchs     {...petProps} />}
        {petType === 'trex'           && <PetTRex          {...petProps} />}
        {petType === 'triceratops'    && <PetTriceratops   {...petProps} />}
        {petType === 'stegosaurus'    && <PetStegosaurus   {...petProps} />}
        {petType === 'brachiosaurus'  && <PetBrachiosaurus {...petProps} />}
        {petType === 'pteranodon'     && <PetPteranodon    {...petProps} />}
        {petType === 'ankylosaurus'   && <PetAnkylosaurus  {...petProps} />}
        {petType === 'shark'      && <PetHai          {...petProps} />}
        {petType === 'piranha'    && <PetPiranha      {...petProps} />}
        {petType === 'blue-whale'   && <PetBlauwal        {...petProps} />}
        {petType === 'sperm-whale'  && <PetPottwal        {...petProps} />}
        {petType === 'killer-whale' && <PetKillerwal      {...petProps} />}
        {petType === 'beluga'       && <PetBeluga          {...petProps} />}
        {petType === 'narwhal'      && <PetNarwal          {...petProps} />}
        {petType === 'dolphin'    && <PetDelfin        {...petProps} />}
        {petType === 'pufferfish' && <PetKugelfisch    {...petProps} />}
        {petType === 'jellyfish'  && <PetQualle        {...petProps} />}
        {petType === 'seahorse'   && <PetSeepferdchen  {...petProps} />}
        {petType === 'clownfish'  && <PetClownfisch    {...petProps} />}
        {petType === 'blue-tang'  && <PetPalettenfisch {...petProps} />}
        {petType === 'starfish'   && <PetSeestern       {...petProps} />}
        {petType === 'octopus'    && <PetKraken         {...petProps} />}
        {(petType === 'cat' || !petType) && <PetCat {...petProps} />}
      </div>
      {name && (
        <span className="mm-pet__name">{name}</span>
      )}
    </div>
  );
}
