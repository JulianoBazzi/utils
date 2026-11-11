import dayjs, { type Dayjs } from 'dayjs';
import type { DateInput } from '../types.js';
import { isValidIsoParts, matchIsoDate, zoneOffsetMinutes } from './calendar.js';
import { fromWallClock, toWallClock } from './timeZone.js';

export interface ParseDateOptions {
  /** IANA zone used to read values that carry an absolute instant. */
  timeZone?: string;
  /** Also accept a bare time (`"13:45"`, `"13:45:00"`), pinned to 2000-01-01. */
  timeOnly?: boolean;
}

const TIME_ONLY = /^([01]?\d|2[0-3]):([0-5]\d)(?::([0-5]\d)(?:\.\d+)?)?$/;

function inZone(epochMs: number, timeZone?: string): Dayjs {
  return timeZone ? fromWallClock(toWallClock(epochMs, timeZone)) : dayjs(epochMs);
}

/**
 * Parse any {@link DateInput} into a valid `Dayjs`, or `null`.
 *
 * - `null`, `undefined` and `""` are missing; `0` is the epoch, not missing.
 * - ISO-like strings are checked field by field, so `"2024-02-30"` or
 *   `"2024-01-02 25:00"` return `null` instead of rolling over.
 * - With `timeZone`, values that carry an instant (`Date`, number, `Dayjs`,
 *   ISO strings with `Z`/offset) are converted to that zone's wall clock.
 *   Naive strings are wall-clock values already and are never shifted.
 * - Strings in any other shape keep dayjs' own parsing.
 *
 * @internal
 */
export function parseDate(value: DateInput, options: ParseDateOptions = {}): Dayjs | null {
  const { timeZone, timeOnly = false } = options;

  if (value === null || value === undefined || value === '') {
    return null;
  }

  if (typeof value === 'string') {
    if (timeOnly) {
      const time = TIME_ONLY.exec(value);
      if (time) {
        const [, hour, minute, second = '0'] = time;
        return dayjs(new Date(2000, 0, 1, Number(hour), Number(minute), Number(second)));
      }
    }

    const parts = matchIsoDate(value);
    if (parts) {
      if (!isValidIsoParts(parts)) {
        return null;
      }
      if (parts.zone && timeZone) {
        const utc = new Date(0);
        utc.setUTCFullYear(parts.year, parts.month - 1, parts.day);
        // The pattern only allows a zone after a time, so hour and minute exist.
        utc.setUTCHours(
          parts.hour as number,
          parts.minute as number,
          parts.second ?? 0,
          parts.millisecond ?? 0,
        );
        return inZone(utc.getTime() - zoneOffsetMinutes(parts.zone) * 60_000, timeZone);
      }
    }

    const date = dayjs(value);
    return date.isValid() ? date : null;
  }

  if (typeof value === 'number') {
    return Number.isFinite(value) ? inZone(value, timeZone) : null;
  }

  // Date or Dayjs: both expose the instant through valueOf(). Without a zone,
  // clone through dayjs() so a consumer's utc/timezone plugin state survives.
  const epoch = value.valueOf();
  if (Number.isNaN(epoch)) {
    return null;
  }
  return timeZone ? inZone(epoch, timeZone) : dayjs(value);
}
