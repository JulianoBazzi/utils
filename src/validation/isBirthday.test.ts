import dayjs from 'dayjs';
import { describe, expect, it } from 'vitest';
import { isBirthday } from './isBirthday.js';

describe('isBirthday', () => {
  it("returns true when the date is today's day/month", () => {
    expect(isBirthday(new Date())).toBe(true);
  });

  it('returns false for a different day', () => {
    expect(isBirthday(dayjs().add(1, 'day').toDate())).toBe(false);
  });

  it('returns false for missing input', () => {
    expect(isBirthday()).toBe(false);
  });
});
