import { describe, expect, it } from 'vitest';
import { buildMapsUrl } from './buildMapsUrl.js';

describe('buildMapsUrl', () => {
  it('builds an encoded Google Maps search link', () => {
    expect(buildMapsUrl(' Av. Paulista, 1000 ')).toBe(
      'https://www.google.com/maps/search/?api=1&query=Av.%20Paulista%2C%201000',
    );
  });

  it('returns the fallback for an empty address', () => {
    expect(buildMapsUrl('')).toBe('');
    expect(buildMapsUrl(null, { fallback: '#' })).toBe('#');
    expect(buildMapsUrl(' ', { fallback: undefined })).toBeUndefined();
  });
});
