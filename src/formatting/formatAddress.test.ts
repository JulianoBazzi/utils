import { describe, expect, it } from 'vitest';
import { formatAddress } from './formatAddress.js';

describe('formatAddress', () => {
  it('assembles the full address', () => {
    expect(
      formatAddress({
        address: 'Rua A',
        number: '10',
        district: 'Centro',
        city: 'São Paulo',
        state: 'SP',
        zipcode: '01000-000',
      }),
    ).toBe('Rua A, 10 - Centro, São Paulo - SP, 01000-000');
  });

  it('formats a raw-digit zipcode as CEP', () => {
    expect(
      formatAddress({
        address: 'Rua A',
        number: '10',
        city: 'São Paulo',
        state: 'SP',
        zipcode: '01000000',
      }),
    ).toBe('Rua A, 10, São Paulo - SP, 01000-000');
  });

  it('handles partial fields', () => {
    expect(formatAddress({ city: 'São Paulo', state: 'SP' })).toBe('São Paulo - SP');
  });

  it('returns empty string when no meaningful field is present', () => {
    expect(formatAddress({})).toBe('');
    expect(formatAddress({ zipcode: '01000-000' })).toBe('');
  });

  it('returns the fallback when no meaningful field is present', () => {
    expect(formatAddress({}, { fallback: 'Não Informado' })).toBe('Não Informado');
  });
});

describe('formatAddress — 1.3 additions', () => {
  it('never leaves a dangling separator', () => {
    expect(formatAddress({ city: 'X' })).toBe('X');
    expect(formatAddress({ district: 'Centro', city: 'X' })).toBe('Centro, X');
    expect(formatAddress({ district: 'Centro' })).toBe('Centro');
    expect(formatAddress({ address: 'Rua A', zipcode: '01310100' })).toBe('Rua A, 01310-100');
  });

  it('trims parts and accepts null', () => {
    expect(formatAddress({ address: ' Rua A ', number: null, city: '  ', state: 'SP' })).toBe(
      'Rua A, SP',
    );
    expect(formatAddress({ number: '10', city: ' ' }, { fallback: '-' })).toBe('-');
  });
});
