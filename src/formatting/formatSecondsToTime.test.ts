import { describe, expect, it } from 'vitest';
import { formatSecondsToTime } from './formatSecondsToTime.js';

describe('formatSecondsToTime', () => {
  it('formats as HH:mm:ss', () => {
    expect(formatSecondsToTime(3661)).toBe('01:01:01');
  });

  it('drops seconds when showSeconds is false', () => {
    expect(formatSecondsToTime(3661, false)).toBe('01:01');
  });

  it('treats negative values as positive', () => {
    expect(formatSecondsToTime(-3661)).toBe('01:01:01');
  });

  it('keeps counting hours past 24 and rounds fractions', () => {
    expect(formatSecondsToTime(90000)).toBe('25:00:00');
    expect(formatSecondsToTime(3661.4)).toBe('01:01:01');
    expect(formatSecondsToTime(59.6, false)).toBe('00:01');
  });

  it('treats non-finite values as zero', () => {
    expect(formatSecondsToTime(Number.POSITIVE_INFINITY)).toBe('00:00:00');
    expect(formatSecondsToTime(Number.NaN)).toBe('00:00:00');
  });

  it('returns the zero default for zero/missing', () => {
    expect(formatSecondsToTime()).toBe('00:00:00');
    expect(formatSecondsToTime(0, false)).toBe('00:00');
  });
});
