import { useState, useEffect, useRef } from 'react';
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
import { PetPanda }        from './PetPanda';
import { PetDrache }       from './PetDrache';
import { PetElefant }      from './PetElefant';
import { PetNilpferd }     from './PetNilpferd';
import { PetErdmaennchen } from './PetErdmaennchen';
import { getMood }           from './pet.shared';
import { pickMessage }       from './pet.messages';
import type { PetType }      from '@/contexts/SettingsContext';

interface Props {
  temperature: number | null;
  size?: number;
  petType?: PetType;
  name?: string;
}

function SpeechBubble({ text }: { text: string }) {
  return (
    <div className="animate-bubble-in absolute -top-2 left-full ml-3 z-20 pointer-events-none origin-left">
      <div className="relative">
        {/*
          Comic-Sprechblasen-Schwanz:
          - Außenkante (rechts): konkave Bezier-Kurve, wie im klassischen Comic-Stil
          - Innenkante (links):  gerade Linie zur Spitze
          - Spitze zeigt nach unten-links (auf den Tierkopf)
          - z-0 liegt hinter dem Bubble-Inhalt (z-10), der die Basis überdeckt
        */}
        <svg
          className="absolute left-[6px] -bottom-[14px] z-0"
          width="28"
          height="18"
          viewBox="0 0 28 18"
          fill="white"
        >
          <path d="M 26,0 C 18,3 4,9 0,18 L 6,0 Z" />
        </svg>
        {/* Bubble */}
        <div className="relative z-10 bg-white text-slate-800 text-[11px] font-medium px-3 py-2 rounded-xl shadow-lg w-[175px] text-left leading-snug">
          {text}
        </div>
      </div>
    </div>
  );
}

export function Moodmate({ temperature, size = 80, petType = 'cat', name }: Props) {
  const [blinking,    setBlinking]    = useState(false);
  const [hopping,     setHopping]     = useState(false);
  const [speechText,  setSpeechText]  = useState<string | null>(null);

  // Refs damit die Timers immer den aktuellen Zustand lesen, ohne neu zu starten
  const moodRef = useRef(getMood(temperature));
  const tempRef = useRef(temperature);
  useEffect(() => {
    moodRef.current = getMood(temperature);
    tempRef.current = temperature;
  });

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
        setSpeechText(pickMessage(moodRef.current, tempRef.current));
        const t2 = setTimeout(() => {
          setSpeechText(null);
          schedule(20000 + Math.random() * 25000);
        }, 4500);
        timers.push(t2);
      }, delay);
      timers.push(t1);
    };
    schedule(10000 + Math.random() * 8000);
    return () => timers.forEach(clearTimeout);
  }, []);

  const petProps = { temperature, size, blinking };

  return (
    <div className="relative inline-flex flex-col items-center gap-1">
      {speechText && <SpeechBubble text={speechText} />}
      <div className={hopping && !shivering ? 'animate-hop' : undefined}>
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
        {petType === 'bear'     && <PetBaer         {...petProps} />}
        {(petType === 'cat' || !petType) && <PetCat {...petProps} />}
      </div>
      {name && (
        <span className="text-[11px] text-white/50 font-medium tracking-wide">{name}</span>
      )}
    </div>
  );
}
