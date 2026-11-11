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

  it('returns the fallback for missing input', () => {
    expect(formatCNPJ('', { fallback: 'Não Informado' })).toBe('Não Informado');
  });
});

describe('formatCNPJ — 1.3 additions', () => {
  it('pads by default and leaves incomplete input unmasked with pad: false', () => {
    expect(formatCNPJ('12.345.678/0001-9')).toBe('01.234.567/8000-19');
    expect(formatCNPJ('12.345.678/0001-9', { pad: false })).toBe('1234567800019');
    expect(formatCNPJ('11222333000181', { pad: false })).toBe('11.222.333/0001-81');
  });
});
