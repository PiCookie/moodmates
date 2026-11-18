import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { createElement } from 'react';
import { renderToString } from 'react-dom/server';
import { Frog } from './Frog';

function maskIds(container: HTMLElement): string[] {
  return [...container.querySelectorAll('mask')].map((m) => m.id);
}

describe('Frog: Masken-ID', () => {
  it('vergibt mehreren Fröschen im selben Dokument verschiedene IDs', () => {
    const { container } = render(
      <>
        <Frog temperature={20} ariaLabel="Frog" />
        <Frog temperature={20} ariaLabel="Frog" />
      </>,
    );

    const ids = maskIds(container);

    expect(ids).toHaveLength(2);
    expect(new Set(ids).size).toBe(2);
  });

  it('verweist mit den Augen auf die eigene Maske', () => {
    const { container } = render(<Frog temperature={20} ariaLabel="Frog" />);
    const [id] = maskIds(container);

    const masked = [...container.querySelectorAll('[mask]')].map((el) => el.getAttribute('mask'));

    expect(id).not.toBe('');
    expect(masked.length).toBeGreaterThan(0);
    expect(masked.every((value) => value === `url(#${id})`)).toBe(true);
  });

  // Server und Client müssen dieselbe ID erzeugen, sonst warnt React bei der Hydration.
  it('liefert beim serverseitigen Rendern immer dasselbe HTML', () => {
    const first = renderToString(createElement(Frog, { temperature: 20, ariaLabel: 'Frog' }));
    const second = renderToString(createElement(Frog, { temperature: 20, ariaLabel: 'Frog' }));

    expect(first).toBe(second);
  });

  it('verwendet nur Zeichen, die in einer url(#…)-Referenz sicher sind', () => {
    const { container } = render(<Frog temperature={20} ariaLabel="Frog" />);

    expect(maskIds(container)[0]).toMatch(/^[A-Za-z][A-Za-z0-9_-]*$/);
  });
});
