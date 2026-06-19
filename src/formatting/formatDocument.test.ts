import { describe, expect, it } from 'vitest';
import { formatDocument } from './formatDocument.js';

describe('formatDocument', () => {
  it('formats an 11-char value as CPF', () => {
    expect(formatDocument('52998224725')).toBe('529.982.247-25');
  });

  it('formats a 14-char value as CNPJ (numeric or alphanumeric)', () => {
    expect(formatDocument('11222333000181')).toBe('11.222.333/0001-81');
    expect(formatDocument('12ABC34501DE35')).toBe('12.ABC.345/01DE-35');
  });

  it('returns empty string for missing input', () => {
    expect(formatDocument()).toBe('');
  });

  it('returns the fallback for missing input', () => {
    expect(formatDocument('', { fallback: 'Não Informado' })).toBe('Não Informado');
  });
});
