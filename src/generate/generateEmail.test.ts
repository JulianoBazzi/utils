import { describe, expect, it } from 'vitest';
import { isValidEmail } from '../validation/isValidEmail.js';
import { generateEmail } from './generateEmail.js';

describe('generateEmail', () => {
  it('generates a valid email on the reserved example.com domain', () => {
    for (let i = 0; i < 100; i += 1) {
      const email = generateEmail();

      expect(isValidEmail(email)).toBe(true);
      expect(email.endsWith('@example.com')).toBe(true);
    }
  });

  it('honours a custom domain', () => {
    const email = generateEmail({ domain: 'mercurius-e2e.com' });

    expect(isValidEmail(email)).toBe(true);
    expect(email.endsWith('@mercurius-e2e.com')).toBe(true);
  });

  it('honours a custom local part length', () => {
    expect(generateEmail({ length: 5 }).split('@')[0]).toHaveLength(5);
    expect(generateEmail({ length: 30 }).split('@')[0]).toHaveLength(30);
  });

  it('always starts with a letter', () => {
    for (let i = 0; i < 50; i += 1) {
      expect(generateEmail()).toMatch(/^[a-z]/);
    }
  });

  it('clamps a non-positive length to a single character', () => {
    expect(generateEmail({ length: 0 }).split('@')[0]).toHaveLength(1);
    expect(generateEmail({ length: -5 }).split('@')[0]).toHaveLength(1);
  });

  it('produces different values across calls', () => {
    const values = new Set(Array.from({ length: 20 }, () => generateEmail()));

    expect(values.size).toBeGreaterThan(1);
  });
});
