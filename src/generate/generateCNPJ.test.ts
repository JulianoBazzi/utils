import { describe, expect, it } from 'vitest';
import { isValidCNPJ } from '../validation/isValidCNPJ.js';
import { generateCNPJ } from './generateCNPJ.js';

describe('generateCNPJ', () => {
  it('generates valid CNPJs for the 0001 branch', () => {
    for (let i = 0; i < 100; i += 1) {
      const cnpj = generateCNPJ();
      expect(cnpj).toMatch(/^\d{8}0001\d{2}$/);
      expect(isValidCNPJ(cnpj)).toBe(true);
    }
  });

  it('generates a formatted CNPJ', () => {
    const cnpj = generateCNPJ({ formatted: true });
    expect(cnpj).toMatch(/^\d{2}\.\d{3}\.\d{3}\/0001-\d{2}$/);
    expect(isValidCNPJ(cnpj)).toBe(true);
  });

  it('generates valid alphanumeric CNPJs (2026 format)', () => {
    for (let i = 0; i < 100; i += 1) {
      const cnpj = generateCNPJ({ alphanumeric: true });
      expect(cnpj).toMatch(/^[0-9A-Z]{8}0001\d{2}$/);
      expect(isValidCNPJ(cnpj)).toBe(true);
    }
  });

  it('generates a formatted alphanumeric CNPJ', () => {
    const cnpj = generateCNPJ({ alphanumeric: true, formatted: true });
    expect(cnpj).toMatch(/^[0-9A-Z]{2}\.[0-9A-Z]{3}\.[0-9A-Z]{3}\/0001-\d{2}$/);
    expect(isValidCNPJ(cnpj)).toBe(true);
  });
});
