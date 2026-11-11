import { describe, expect, it } from 'vitest';
import { formatCPF } from './formatCPF.js';

describe('formatCPF', () => {
  it('formats as 000.000.000-00', () => {
    expect(formatCPF('52998224725')).toBe('529.982.247-25');
  });

  it('pads with leading zeros', () => {
    expect(formatCPF('1')).toBe('000.000.000-01');
  });

  it('returns plain digits when longer than 11 digits', () => {
    expect(formatCPF('123456789012')).toBe('123456789012');
  });

  it('returns empty string for missing input', () => {
    expect(formatCPF()).toBe('');
    expect(formatCPF('')).toBe('');
  });

  it('returns the fallback for missing input', () => {
    expect(formatCPF('', { fallback: 'Não Informado' })).toBe('Não Informado');
  });
});

describe('formatCPF — 1.3 additions', () => {
  it('pads by default and leaves incomplete input unmasked with pad: false', () => {
    expect(formatCPF('1')).toBe('000.000.000-01');
    expect(formatCPF('1', { pad: false })).toBe('1');
    expect(formatCPF('52998224725', { pad: false })).toBe(formatCPF('52998224725'));
  });
});
