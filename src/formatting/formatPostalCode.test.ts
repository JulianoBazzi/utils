import { describe, expect, it } from 'vitest';
import { formatPostalCode } from './formatPostalCode.js';

describe('formatPostalCode', () => {
  it('formats as 00000-000', () => {
    expect(formatPostalCode('01310100')).toBe('01310-100');
  });

  it('returns plain digits when longer than 8 digits', () => {
    expect(formatPostalCode('123456789')).toBe('123456789');
  });

  it('returns empty string for missing input', () => {
    expect(formatPostalCode()).toBe('');
    expect(formatPostalCode('')).toBe('');
  });

  it('returns the fallback for missing input', () => {
    expect(formatPostalCode('', { fallback: 'Não Informado' })).toBe('Não Informado');
  });
});

describe('formatPostalCode — 1.3 additions', () => {
  it('pads by default and leaves incomplete input unmasked with pad: false', () => {
    expect(formatPostalCode('1310100')).toBe('01310-100');
    expect(formatPostalCode('1310100', { pad: false })).toBe('1310100');
    expect(formatPostalCode('01310100', { pad: false })).toBe(formatPostalCode('01310100'));
  });
});
