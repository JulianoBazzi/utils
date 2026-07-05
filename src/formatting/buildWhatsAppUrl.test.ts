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
