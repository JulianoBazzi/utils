import { describe, expect, it } from 'vitest';
import { isValidVoterId } from '../validation/isValidVoterId.js';
import { generateVoterId } from './generateVoterId.js';

describe('generateVoterId', () => {
  it('generates valid voter ids with state codes between 01 and 28', () => {
    for (let i = 0; i < 100; i += 1) {
      const voterId = generateVoterId();
      expect(voterId).toMatch(/^\d{12}$/);
      expect(Number(voterId.slice(8, 10))).toBeGreaterThanOrEqual(1);
      expect(Number(voterId.slice(8, 10))).toBeLessThanOrEqual(28);
      expect(isValidVoterId(voterId)).toBe(true);
    }
  });
});
