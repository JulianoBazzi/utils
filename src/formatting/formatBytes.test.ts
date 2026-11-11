import { describe, expect, it } from 'vitest';
import { formatBytes } from './formatBytes.js';

describe('formatBytes', () => {
  it('formats bytes under 1 KB', () => {
    expect(formatBytes(512)).toBe('512 Bytes');
  });

  it('formats KB with 2 decimals by default', () => {
    expect(formatBytes(1536)).toBe('1.50 KB');
  });

  it('rounds when round is true', () => {
    expect(formatBytes(1536, true)).toBe('2 KB');
  });

  it('formats MB and GB', () => {
    expect(formatBytes(1024 ** 2)).toBe('1.00 MB');
    expect(formatBytes(1024 ** 3)).toBe('1.00 GB');
  });

  it('returns 0 Bytes for zero/missing', () => {
    expect(formatBytes()).toBe('0 Bytes');
    expect(formatBytes(0)).toBe('0 Bytes');
  });
});

describe('formatBytes — 1.3 additions', () => {
  it('accepts an options object', () => {
    expect(formatBytes(1536, { round: true })).toBe('2 KB');
    expect(formatBytes(1536, { locale: 'pt-BR' })).toBe('1,50 KB');
    expect(formatBytes(1536, { locale: 'pt-BR', round: true })).toBe('2 KB');
    expect(formatBytes(1536, { casing: 'lowercase' })).toBe('1.50 kb');
    expect(formatBytes(512, { casing: 'uppercase' })).toBe('512 BYTES');
  });

  it('keeps the sign of negatives', () => {
    expect(formatBytes(-1536)).toBe('-1.50 KB');
    expect(formatBytes(-5)).toBe('-5 Bytes');
  });

  it('returns the fallback for missing or non-finite input', () => {
    expect(formatBytes(null, { fallback: '-' })).toBe('-');
    expect(formatBytes(Number.NaN)).toBe('0 Bytes');
  });
});
