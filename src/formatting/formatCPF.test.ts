import { describe, expect, it } from 'vitest';
import { formatCPF } from './formatCPF.js';

describe('formatCPF', () => {
  it('formats as 000.000.000-00', () => {
    expect(formatCPF('52998224725')).toBe('529.982.247-25');
  });

  it('pads with leading zeros', () => {
    expect(formatCPF('1')).toBe('000.000.000-01');
  });

  it('returns empty string for missing input', () => {
    expect(formatCPF()).toBe('');
    expect(formatCPF('')).toBe('');
  });

  it('returns the fallback for missing input', () => {
    expect(formatCPF('', { fallback: 'Não Informado' })).toBe('Não Informado');
  });
});
