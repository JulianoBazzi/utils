const DAYS_IN_MONTH = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

/** @internal */
export function isLeapYear(year: number): boolean {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

/**
 * Number of days in `month` (1–12) of `year`. Computed arithmetically, so
 * years 0–99 are not remapped to 19xx the way `new Date(y, m)` does.
 *
 * @internal
 */
export function daysInMonth(year: number, month: number): number {
  return month === 2 && isLeapYear(year) ? 29 : (DAYS_IN_MONTH[month - 1] ?? 0);
}

/** @internal */
export function isValidCalendarDate(year: number, month: number, day: number): boolean {
  return month >= 1 && month <= 12 && day >= 1 && day <= daysInMonth(year, month);
}

/** @internal */
export function isValidTime(hour: number, minute: number, second = 0): boolean {
  return hour <= 23 && minute <= 59 && second <= 59;
}

export interface IsoParts {
  year: number;
  month: number;
  day?: number;
  hour?: number;
  minute?: number;
  second?: number;
  millisecond?: number;
  /** `"Z"`, `"+03:00"` or `"+0300"` when the string carries an offset. */
  zone?: string;
}

// YYYY-M[M][-D[D][(T| )H[H]:m[m][:s[s][.fff]][Z|±hh[:]mm]]]. One- and two-digit
// fields mirror what dayjs already accepts ("2024-7-5", "9:30"). The zone can
// only follow a time, so "2024-07-15" never reads "-15" as an offset.
const ISO =
  /^(\d{4})-(\d{1,2})(?:-(\d{1,2})(?:[T ](\d{1,2}):(\d{1,2})(?::(\d{1,2})(?:\.(\d+))?)?(Z|[+-]\d{2}:?\d{2})?)?)?$/i;

/**
 * Split an ISO-like date string into numeric parts, or `null` when the string
 * does not have that shape. Does not check calendar validity — see
 * {@link isValidIsoParts}.
 *
 * @internal
 */
export function matchIsoDate(value: string): IsoParts | null {
  const match = ISO.exec(value);
  if (!match) {
    return null;
  }

  const [, year, month, day, hour, minute, second, fraction, zone] = match;
  const toNumber = (part: string | undefined) => (part === undefined ? undefined : Number(part));

  return {
    year: Number(year),
    month: Number(month),
    day: toNumber(day),
    hour: toNumber(hour),
    minute: toNumber(minute),
    second: toNumber(second),
    millisecond: fraction === undefined ? undefined : Number(fraction.padEnd(3, '0').slice(0, 3)),
    zone: zone?.toUpperCase(),
  };
}

/**
 * Whether the parts describe a real calendar date and time (no 30 February,
 * no 25:00).
 *
 * @internal
 */
export function isValidIsoParts(parts: IsoParts): boolean {
  const { year, month, day = 1, hour = 0, minute = 0, second = 0 } = parts;
  return isValidCalendarDate(year, month, day) && isValidTime(hour, minute, second);
}

/**
 * Offset of a `Z` / `±hh:mm` / `±hhmm` designator, in minutes east of UTC.
 *
 * @internal
 */
export function zoneOffsetMinutes(zone: string): number {
  if (zone === 'Z') {
    return 0;
  }
  const sign = zone.startsWith('-') ? -1 : 1;
  const digits = zone.slice(1).replace(':', '');
  return sign * (Number(digits.slice(0, 2)) * 60 + Number(digits.slice(2)));
}
