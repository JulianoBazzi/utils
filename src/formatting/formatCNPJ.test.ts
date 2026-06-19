import { describe, expect, it } from 'vitest';
import { formatCNPJ } from './formatCNPJ.js';

describe('formatCNPJ', () => {
  it('formats a legacy numeric CNPJ', () => {
    expect(formatCNPJ('11222333000181')).toBe('11.222.333/0001-81');
  });

  it('formats a new alphanumeric CNPJ', () => {
    expect(formatCNPJ('12ABC34501DE35')).toBe('12.ABC.345/01DE-35');
  });

  it('returns empty string for missing input', () => {
    expect(formatCNPJ()).toBe('');
  });
});
