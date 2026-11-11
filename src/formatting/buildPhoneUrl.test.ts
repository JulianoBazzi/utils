import { describe, expect, it } from 'vitest';
import { buildPhoneUrl } from './buildPhoneUrl.js';

describe('buildPhoneUrl', () => {
  it('builds a tel: link with the default country code', () => {
    expect(buildPhoneUrl('(11) 98765-4321')).toBe('tel:+5511987654321');
  });

  it('accepts a custom country code', () => {
    expect(buildPhoneUrl('987654321', { countryCode: '351' })).toBe('tel:+351987654321');
  });

  it('omits the country code when null', () => {
    expect(buildPhoneUrl('11987654321', { countryCode: null })).toBe('tel:11987654321');
  });

  it('returns empty string for missing input', () => {
    expect(buildPhoneUrl()).toBe('');
    expect(buildPhoneUrl(null)).toBe('');
  });

  it('returns the fallback for missing input', () => {
    expect(buildPhoneUrl(null, { fallback: '#' })).toBe('#');
  });
});

describe('buildPhoneUrl — 1.3 additions', () => {
  it('never doubles the country code', () => {
    expect(buildPhoneUrl('+55 11 98765-4321')).toBe('tel:+5511987654321');
  });

  it('omits the country code for non-geographic numbers', () => {
    expect(buildPhoneUrl('0800 123 4567')).toBe('tel:08001234567');
  });

  it('returns undefined when the fallback is explicitly undefined', () => {
    expect(buildPhoneUrl('', { fallback: undefined })).toBeUndefined();
  });
});
