import dayjs, { type Dayjs } from 'dayjs';

export interface WallClock {
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
  second: number;
  millisecond: number;
}

const formatters = new Map<string, Intl.DateTimeFormat>();

/**
 * Cached `Intl.DateTimeFormat` that reads the wall-clock parts of an instant in
 * `timeZone`. Throws a `RangeError` naming the zone when it is not valid.
 *
 * @internal
 */
export function getZoneFormatter(timeZone: string): Intl.DateTimeFormat {
  let formatter = formatters.get(timeZone);
  if (!formatter) {
    try {
      formatter = new Intl.DateTimeFormat('en-US', {
        timeZone,
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        hourCycle: 'h23',
      });
    } catch {
      throw new RangeError(`Invalid time zone: "${timeZone}"`);
    }
    formatters.set(timeZone, formatter);
  }
  return formatter;
}

/**
 * Wall-clock parts of the instant `epochMs` as seen in `timeZone`.
 *
 * @internal
 */
export function toWallClock(epochMs: number, timeZone: string): WallClock {
  const parts: Record<string, number> = {};
  for (const part of getZoneFormatter(timeZone).formatToParts(new Date(epochMs))) {
    if (part.type !== 'literal') {
      parts[part.type] = Number(part.value);
    }
  }

  return {
    year: parts.year as number,
    month: parts.month as number,
    day: parts.day as number,
    // Some engines render midnight as 24 even with hourCycle h23.
    hour: (parts.hour as number) % 24,
    minute: parts.minute as number,
    second: parts.second as number,
    millisecond: ((epochMs % 1000) + 1000) % 1000,
  };
}

/**
 * A local `Dayjs` that displays the given wall-clock time. It is a stand-in for
 * formatting and calendar math — not the original instant. `setFullYear` keeps
 * years 0–99 intact (`new Date(50, 0)` would mean 1950).
 *
 * @internal
 */
export function fromWallClock(clock: WallClock): Dayjs {
  const date = new Date(2000, 0, 1);
  date.setFullYear(clock.year, clock.month - 1, clock.day);
  date.setHours(clock.hour, clock.minute, clock.second, clock.millisecond);
  return dayjs(date);
}

/**
 * "Now" as a local `Dayjs` showing the wall-clock time in `timeZone`, or plain
 * `dayjs()` without one.
 *
 * @internal
 */
export function nowIn(timeZone?: string): Dayjs {
  return timeZone ? fromWallClock(toWallClock(Date.now(), timeZone)) : dayjs();
}

/**
 * Read `timeZone` from an options argument that may not be an object — the
 * one-argument predicates (`isWeekday`, `getAge`…) receive the array index
 * when passed straight to `.filter` / `.map`.
 *
 * @internal
 */
export function readTimeZone(options: unknown): string | undefined {
  if (typeof options !== 'object' || options === null) {
    return undefined;
  }
  const { timeZone } = options as { timeZone?: unknown };
  return typeof timeZone === 'string' && timeZone ? timeZone : undefined;
}
