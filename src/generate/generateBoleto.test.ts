import { afterEach, describe, expect, it, vi } from 'vitest';
import { onlyNumbers } from '../formatting/onlyNumbers.js';
import { isValidBoleto } from '../validation/isValidBoleto.js';
import { generateBoleto } from './generateBoleto.js';

describe('generateBoleto', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('generates a valid 47-digit bank slip', () => {
    for (let i = 0; i < 100; i += 1) {
      const line = generateBoleto();

      expect(line).toHaveLength(47);
      expect(isValidBoleto(line)).toBe(true);
    }
  });

  it('generates a valid 48-digit collection slip', () => {
    for (let i = 0; i < 100; i += 1) {
      const line = generateBoleto({ type: 'collection' });

      expect(line).toHaveLength(48);
      expect(line[0]).toBe('8');
      expect(isValidBoleto(line)).toBe(true);
    }
  });

  it('uses currency 9 on bank slips', () => {
    expect(generateBoleto()[3]).toBe('9');
  });

  it('validates both mod-10 and mod-11 collection variants', () => {
    // The currency digit decides the algorithm, so pin it instead of relying on
    // a 50/50 draw: getRandomInt(6, 9) maps 0 -> 6 (mod-10) and 0.99 -> 9 (mod-11).
    for (const [random, currency] of [
      [0, '6'],
      [0.99, '9'],
    ] as const) {
      vi.spyOn(Math, 'random').mockReturnValue(random);

      const line = generateBoleto({ type: 'collection' });

      expect(line[2]).toBe(currency);
      expect(isValidBoleto(line)).toBe(true);

      vi.restoreAllMocks();
    }
  });

  it('formats a bank slip and stays valid', () => {
    const line = generateBoleto({ formatted: true });

    expect(line).toMatch(/^\d{5}\.\d{5} \d{5}\.\d{6} \d{5}\.\d{6} \d \d{14}$/);
    expect(onlyNumbers(line)).toHaveLength(47);
    expect(isValidBoleto(line)).toBe(true);
  });

  it('formats a collection slip and stays valid', () => {
    const line = generateBoleto({ type: 'collection', formatted: true });

    expect(line).toMatch(/^(\d{11}-\d ){3}\d{11}-\d$/);
    expect(onlyNumbers(line)).toHaveLength(48);
    expect(isValidBoleto(line)).toBe(true);
  });

  it('produces different values across calls', () => {
    const values = new Set(Array.from({ length: 20 }, () => generateBoleto()));

    expect(values.size).toBeGreaterThan(1);
  });
});
