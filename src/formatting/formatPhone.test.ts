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
