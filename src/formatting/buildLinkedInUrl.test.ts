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

  it('returns empty string for missing input', () => {
    expect(buildLinkedInUrl()).toBe('');
    expect(buildLinkedInUrl('@')).toBe('');
  });

  it('returns the fallback for missing input', () => {
    expect(buildLinkedInUrl(null, { fallback: '#' })).toBe('#');
  });
});
