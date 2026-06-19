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

  it('handles partial fields', () => {
    expect(formatAddress({ city: 'São Paulo', state: 'SP' })).toBe(', São Paulo - SP');
  });

  it('returns empty string when no meaningful field is present', () => {
    expect(formatAddress({})).toBe('');
    expect(formatAddress({ zipcode: '01000-000' })).toBe('');
  });
});
