import { describe, expect, it } from 'vitest';
import { formatMailbox } from './formatMailbox.js';

describe('formatMailbox', () => {
  it('formats name and address', () => {
    expect(formatMailbox({ name: ' Ana ', address: 'ana@x.com' })).toBe('Ana <ana@x.com>');
  });

  it('shows one side when the other is missing or equal', () => {
    expect(formatMailbox({ address: 'ana@x.com' })).toBe('ana@x.com');
    expect(formatMailbox({ name: 'Ana' })).toBe('Ana');
    expect(formatMailbox({ name: 'ana@x.com', address: 'ana@x.com' })).toBe('ana@x.com');
  });

  it('returns the fallback when empty', () => {
    expect(formatMailbox({}, { fallback: '-' })).toBe('-');
    expect(formatMailbox(null)).toBe('');
  });
});
