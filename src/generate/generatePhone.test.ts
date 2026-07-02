import { describe, expect, it } from 'vitest';
import { isValidPhone } from '../validation/isValidPhone.js';
import { generatePhone } from './generatePhone.js';

describe('generatePhone', () => {
  it('generates valid mobile numbers by default', () => {
    for (let i = 0; i < 100; i += 1) {
      const phone = generatePhone();
      expect(phone).toMatch(/^[1-9]{2}9\d{8}$/);
      expect(isValidPhone(phone)).toBe(true);
    }
  });

  it('generates valid landline numbers', () => {
    for (let i = 0; i < 100; i += 1) {
      const phone = generatePhone({ mobile: false });
      expect(phone).toMatch(/^[1-9]{2}[2-8]\d{7}$/);
      expect(isValidPhone(phone)).toBe(true);
    }
  });

  it('generates a formatted phone', () => {
    expect(generatePhone({ formatted: true })).toMatch(/^\(\d{2}\) \d{5}-\d{4}$/);
    expect(generatePhone({ mobile: false, formatted: true })).toMatch(/^\(\d{2}\) \d{4}-\d{4}$/);
  });
});
