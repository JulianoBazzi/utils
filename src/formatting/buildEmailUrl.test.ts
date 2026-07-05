import { describe, expect, it } from 'vitest';
import { buildEmailUrl } from './buildEmailUrl.js';

describe('buildEmailUrl', () => {
  it('builds a plain mailto link', () => {
    expect(buildEmailUrl('foo@bar.com')).toBe('mailto:foo@bar.com');
  });

  it('trims the address', () => {
    expect(buildEmailUrl('  foo@bar.com  ')).toBe('mailto:foo@bar.com');
  });

  it('encodes subject and body', () => {
    expect(buildEmailUrl('foo@bar.com', { subject: 'Olá mundo', body: 'a & b' })).toBe(
      'mailto:foo@bar.com?subject=Ol%C3%A1%20mundo&body=a%20%26%20b',
    );
  });

  it('returns empty string for missing input', () => {
    expect(buildEmailUrl()).toBe('');
    expect(buildEmailUrl(null, { subject: 'x' })).toBe('');
  });

  it('returns the fallback for missing input', () => {
    expect(buildEmailUrl(null, { fallback: '#' })).toBe('#');
  });
});
