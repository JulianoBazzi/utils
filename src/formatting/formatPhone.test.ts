import { describe, expect, it } from 'vitest';
import { formatPhone } from './formatPhone.js';

describe('formatPhone', () => {
  it('masks a 10-digit landline number', () => {
    expect(formatPhone('1112345678')).toBe('(11) 1234-5678');
  });

  it('masks an 11-digit mobile number', () => {
    expect(formatPhone('11912345678')).toBe('(11) 91234-5678');
  });

  it('strips non-digits from already-masked input', () => {
    expect(formatPhone('(11) 1234-5678')).toBe('(11) 1234-5678');
  });

  it('returns empty string for missing input', () => {
    expect(formatPhone()).toBe('');
    expect(formatPhone(null)).toBe('');
  });

  it('returns the fallback for missing input', () => {
    expect(formatPhone(null, { fallback: 'Não Informado' })).toBe('Não Informado');
  });
});

describe('formatPhone — 1.3 additions', () => {
  it('drops a leading 55 country code', () => {
    expect(formatPhone('+55 11 98765-4321')).toBe('(11) 98765-4321');
    expect(formatPhone('+55 11 3456-7890')).toBe('(11) 3456-7890');
  });

  it('drops a trunk 0', () => {
    expect(formatPhone('011 98765-4321')).toBe('(11) 98765-4321');
    expect(formatPhone('011 3456-7890')).toBe('(11) 3456-7890');
  });

  it('groups non-geographic numbers', () => {
    expect(formatPhone('0800 123 4567')).toBe('0800 123 4567');
    expect(formatPhone('03001234567')).toBe('0300 123 4567');
  });

  it('keeps a number that only looks like it starts with 55', () => {
    expect(formatPhone('5511987654')).toBe('(55) 1198-7654');
  });
});
