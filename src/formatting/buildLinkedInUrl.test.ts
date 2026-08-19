import { describe, expect, it } from 'vitest';
import { buildLinkedInUrl } from './buildLinkedInUrl.js';

describe('buildLinkedInUrl', () => {
  it('builds a personal profile URL by default', () => {
    expect(buildLinkedInUrl('julianobazzi')).toBe('https://linkedin.com/in/julianobazzi');
  });

  it('builds a company URL', () => {
    expect(buildLinkedInUrl('bazzi-solutions', { type: 'company' })).toBe(
      'https://linkedin.com/company/bazzi-solutions',
    );
  });

  it('strips a leading @ and trims', () => {
    expect(buildLinkedInUrl('  @julianobazzi ')).toBe('https://linkedin.com/in/julianobazzi');
  });

  it('encodes the handle so it cannot alter the path or query', () => {
    expect(buildLinkedInUrl('../../evil')).toBe('https://linkedin.com/in/..%2F..%2Fevil');
    expect(buildLinkedInUrl('acme?x=1', { type: 'company' })).toBe(
      'https://linkedin.com/company/acme%3Fx%3D1',
    );
  });

  it('returns empty string for missing input', () => {
    expect(buildLinkedInUrl()).toBe('');
    expect(buildLinkedInUrl('@')).toBe('');
  });

  it('returns the fallback for missing input', () => {
    expect(buildLinkedInUrl(null, { fallback: '#' })).toBe('#');
  });
});
