import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ALL_PET_TYPES } from './pets';
import { Moodmate } from './Moodmate';
import { moodFromTemperature, resolveMood } from './pet.shared';
import type { PetMessages } from './pet.messages';

const SPEECH: PetMessages['speech'] = {
  frozen: ['Brrr!'],
  cold: ['A bit chilly.'],
  neutral: ['Lovely day.'],
  warm: ['Warm!'],
  hot: ['Too hot!'],
};

describe('moodFromTemperature', () => {
  it('leitet die Stimmung aus der Temperatur ab', () => {
    expect(moodFromTemperature(-1)).toBe('frozen');
    expect(moodFromTemperature(5)).toBe('cold');
    expect(moodFromTemperature(15)).toBe('neutral');
    expect(moodFromTemperature(25)).toBe('warm');
    expect(moodFromTemperature(null)).toBe('neutral');
  });
});

describe('resolveMood', () => {
  it('nutzt die Temperatur, wenn keine Stimmung übergeben wird', () => {
    expect(resolveMood(-5)).toBe('frozen');
    expect(resolveMood(25, undefined)).toBe('warm');
  });

  it('lässt eine übergebene Stimmung die Temperatur überstimmen', () => {
    expect(resolveMood(25, 'frozen')).toBe('frozen');
    expect(resolveMood(-5, 'warm')).toBe('warm');
    expect(resolveMood(null, 'cold')).toBe('cold');
  });
});

describe('Moodmate: mood als Überschreibwert', () => {
  // Jedes Tier setzt "shivering" aus seiner eigenen Stimmung: so fällt ein Tier auf, das mood ignoriert.
  it.each([...ALL_PET_TYPES])('%s zittert bei mood="frozen", obwohl es warm ist', (petType) => {
    const { container } = render(<Moodmate temperature={25} mood="frozen" petType={petType} />);

    expect(container.querySelector('svg.mm-shiver')).not.toBeNull();
  });

  it.each([...ALL_PET_TYPES])('%s zittert bei mood="warm" nicht, obwohl es friert', (petType) => {
    const { container } = render(<Moodmate temperature={-5} mood="warm" petType={petType} />);

    expect(container.querySelector('svg.mm-shiver')).toBeNull();
  });

  it('leitet die Stimmung ohne mood weiter aus der Temperatur ab', () => {
    const cold = render(<Moodmate temperature={-5} petType="cat" />);
    expect(cold.container.querySelector('svg.mm-shiver')).not.toBeNull();
    cold.unmount();

    const warm = render(<Moodmate temperature={25} petType="cat" />);
    expect(warm.container.querySelector('svg.mm-shiver')).toBeNull();
  });

  it('nutzt für den Spruch die übergebene Stimmung, nicht den Hitze-Pool der Temperatur', () => {
    render(<Moodmate temperature={30} mood="cold" messages={{ speech: SPEECH }} />);

    fireEvent.click(screen.getByRole('button'));

    expect(screen.getByText('A bit chilly.')).toBeInTheDocument();
  });

  it('nutzt ohne mood weiterhin den Hitze-Pool ab 28 Grad', () => {
    render(<Moodmate temperature={30} messages={{ speech: SPEECH }} />);

    fireEvent.click(screen.getByRole('button'));

    expect(screen.getByText('Too hot!')).toBeInTheDocument();
  });

  it('lässt ein Tier mit mood="warm" hüpfen, obwohl die Temperatur Kälte meldet', () => {
    const { container } = render(<Moodmate temperature={-5} mood="warm" petType="cat" />);

    fireEvent.click(screen.getByRole('button'));

    expect(container.querySelector('.mm-pet__body.mm-hop')).not.toBeNull();
  });

  it('lässt ein Tier mit mood="frozen" nicht hüpfen, obwohl die Temperatur warm ist', () => {
    const { container } = render(<Moodmate temperature={25} mood="frozen" petType="cat" />);

    fireEvent.click(screen.getByRole('button'));

    expect(container.querySelector('.mm-pet__body.mm-hop')).toBeNull();
  });
});
