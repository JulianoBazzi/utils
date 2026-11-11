import { describe, expect, it } from 'vitest';
import { isSafeUrl } from './isSafeUrl.js';

describe('isSafeUrl', () => {
  it('accepts the default schemes and relative URLs', () => {
    expect(isSafeUrl('https://example.com')).toBe(true);
    expect(isSafeUrl('HTTP://example.com')).toBe(true);
    expect(isSafeUrl('mailto:a@b.com')).toBe(true);
    expect(isSafeUrl('tel:+5511987654321')).toBe(true);
    expect(isSafeUrl('/settings')).toBe(true);
    expect(isSafeUrl('#top')).toBe(true);
  });

  it('rejects dangerous schemes, including obfuscated ones', () => {
    expect(isSafeUrl('javascript:alert(1)')).toBe(false);
    expect(isSafeUrl(' JAVASCRIPT:alert(1)')).toBe(false);
    expect(isSafeUrl('java\tscript:alert(1)')).toBe(false);
    expect(isSafeUrl('java\u0085script:alert(1)')).toBe(false);
    expect(isSafeUrl('vbscript:x')).toBe(false);
    expect(isSafeUrl('data:text/html,<b>')).toBe(false);
  });

  it('is configurable', () => {
    expect(isSafeUrl('data:image/png;base64,AA', { protocols: ['data:'] })).toBe(true);
    expect(isSafeUrl('/settings', { allowRelative: false })).toBe(false);
  });

  it('rejects empty input', () => {
    expect(isSafeUrl('')).toBe(false);
    expect(isSafeUrl(' \t ')).toBe(false);
    expect(isSafeUrl(null)).toBe(false);
  });
});
