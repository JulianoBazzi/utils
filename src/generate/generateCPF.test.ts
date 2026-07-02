import { describe, expect, it } from 'vitest';
import { isValidCPF } from '../validation/isValidCPF.js';
import { generateCPF } from './generateCPF.js';

describe('generateCPF', () => {
  it('generates valid CPFs', () => {
    for (let i = 0; i < 100; i += 1) {
      const cpf = generateCPF();
      expect(cpf).toMatch(/^\d{11}$/);
      expect(isValidCPF(cpf)).toBe(true);
    }
  });

  it('generates a formatted CPF', () => {
    const cpf = generateCPF({ formatted: true });
    expect(cpf).toMatch(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/);
    expect(isValidCPF(cpf)).toBe(true);
  });
});
