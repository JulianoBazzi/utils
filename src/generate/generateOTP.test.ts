import { afterEach, describe, expect, it, vi } from 'vitest';
import { generateOTP } from './generateOTP.js';

describe('generateOTP', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('returns 6 digits by default', () => {
    for (let i = 0; i < 50; i += 1) {
      expect(generateOTP()).toMatch(/^\d{6}$/);
    }
  });

  it('honours a custom length', () => {
    expect(generateOTP({ length: 4 })).toMatch(/^\d{4}$/);
    expect(generateOTP({ length: 1 })).toMatch(/^\d$/);
    expect(generateOTP({ length: 12 })).toMatch(/^\d{12}$/);
  });

  it('returns an empty string for a non-positive length', () => {
    expect(generateOTP({ length: 0 })).toBe('');
    expect(generateOTP({ length: -3 })).toBe('');
  });

  it('returns an empty string for a non-finite length', () => {
    expect(generateOTP({ length: Number.POSITIVE_INFINITY })).toBe('');
    expect(generateOTP({ length: Number.NaN })).toBe('');
  });

  it('produces different values across calls', () => {
    const values = new Set(Array.from({ length: 20 }, () => generateOTP()));

    expect(values.size).toBeGreaterThan(1);
  });

  it('preserves leading zeros', () => {
    vi.spyOn(globalThis.crypto, 'getRandomValues').mockImplementation((array) => {
      (array as Uint8Array).fill(0);
      return array;
    });

    expect(generateOTP()).toBe('000000');
  });

  it('rejects biased bytes and draws again', () => {
    // 250-255 would over-represent digits 0-5, so they must be discarded.
    // First draw is all-rejected, forcing a second pass through the loop.
    let call = 0;
    vi.spyOn(globalThis.crypto, 'getRandomValues').mockImplementation((array) => {
      const bytes = array as Uint8Array;
      call += 1;
      bytes.fill(call === 1 ? 255 : 7);
      return array;
    });

    expect(generateOTP({ length: 3 })).toBe('777');
    expect(call).toBe(2);
  });

  it('keeps the accepted digits when only some bytes are rejected', () => {
    let call = 0;
    vi.spyOn(globalThis.crypto, 'getRandomValues').mockImplementation((array) => {
      const bytes = array as Uint8Array;
      call += 1;
      if (call === 1) {
        bytes.set([250, 3, 254, 8]);
      } else {
        bytes.fill(1);
      }
      return array;
    });

    // 250 and 254 are dropped; 3 and 8 are kept, then the second draw completes.
    expect(generateOTP({ length: 4 })).toBe('3811');
  });

  it('truncates a fractional length', () => {
    expect(generateOTP({ length: 4.9 })).toMatch(/^\d{4}$/);
  });
});
