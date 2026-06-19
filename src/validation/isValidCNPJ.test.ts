import { describe, expect, it } from 'vitest';
import { isValidCNPJ } from './isValidCNPJ.js';

describe('isValidCNPJ', () => {
  it('accepts a valid legacy numeric CNPJ', () => {
    expect(isValidCNPJ('11222333000181')).toBe(true);
    expect(isValidCNPJ('11.222.333/0001-81')).toBe(true);
  });

  it('accepts a valid alphanumeric CNPJ', () => {
    expect(isValidCNPJ('12ABC34501DE35')).toBe(true);
    expect(isValidCNPJ('12.ABC.345/01DE-35')).toBe(true);
  });

  it('rejects repeated characters', () => {
    expect(isValidCNPJ('11111111111111')).toBe(false);
  });

  it('rejects a bad check digit', () => {
    expect(isValidCNPJ('11222333000182')).toBe(false);
  });

  it('rejects a wrong length', () => {
    expect(isValidCNPJ('123')).toBe(false);
    expect(isValidCNPJ()).toBe(false);
  });
});
