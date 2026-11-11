import { describe, expect, it } from 'vitest';
import { buildWhatsAppUrl } from './buildWhatsAppUrl.js';

describe('buildWhatsAppUrl', () => {
  it('builds a link with an encoded message', () => {
    expect(buildWhatsAppUrl('(11) 98765-4321', 'Olá!')).toBe(
      'https://wa.me/5511987654321?text=Ol%C3%A1!',
    );
  });

  it('builds a link without a message', () => {
    expect(buildWhatsAppUrl('11987654321')).toBe('https://wa.me/5511987654321');
  });

  it('accepts a custom country code', () => {
    expect(buildWhatsAppUrl('987654321', 'oi', { countryCode: '351' })).toBe(
      'https://wa.me/351987654321?text=oi',
    );
  });

  it('omits the country code when null', () => {
    expect(buildWhatsAppUrl('11987654321', null, { countryCode: null })).toBe(
      'https://wa.me/11987654321',
    );
  });

  it('returns empty string for missing input', () => {
    expect(buildWhatsAppUrl()).toBe('');
    expect(buildWhatsAppUrl(null, 'oi')).toBe('');
  });

  it('returns the fallback for missing input', () => {
    expect(buildWhatsAppUrl(null, 'oi', { fallback: '#' })).toBe('#');
  });
});

describe('buildWhatsAppUrl — 1.3 additions', () => {
  it('never doubles the country code', () => {
    expect(buildWhatsAppUrl('+55 11 98765-4321')).toBe('https://wa.me/5511987654321');
    expect(buildWhatsAppUrl('5511987654321')).toBe('https://wa.me/5511987654321');
  });

  it('strips a configured foreign country code too', () => {
    expect(buildWhatsAppUrl('+351 912 345 678', null, { countryCode: '351' })).toBe(
      'https://wa.me/351912345678',
    );
  });

  it('omits the country code for non-geographic numbers', () => {
    expect(buildWhatsAppUrl('0800 123 4567')).toBe('https://wa.me/08001234567');
  });

  it('returns undefined when the fallback is explicitly undefined', () => {
    expect(buildWhatsAppUrl(null, null, { fallback: undefined })).toBeUndefined();
  });
});
