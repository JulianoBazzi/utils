import type { Dayjs } from 'dayjs';

/**
 * Any date value the date helpers accept: an ISO-like string, epoch
 * milliseconds, a `Date` or a `Dayjs`. `null`, `undefined` and `""` count as
 * missing.
 */
export type DateInput = string | number | Date | Dayjs | null | undefined;

export interface TimeZoneOptions {
  /**
   * IANA time zone (e.g. `"America/Sao_Paulo"`) used to read values that carry
   * an absolute instant — `Date`, epoch numbers, `Dayjs`, and ISO strings with
   * `Z` or an offset — and to decide what "today" is. Naive strings such as
   * `"2024-01-02"` or `"2024-01-02 13:45"` are wall-clock values and are never
   * shifted. Defaults to the runtime's time zone. An invalid name throws a
   * `RangeError`; guard user-provided zones with `isValidTimeZone`.
   */
  timeZone?: string;
}

/** A `YYYY-MM-DD` string, as narrowed by `isValidDateString`. */
export type DateString = `${number}-${number}-${number}`;

/** A `YYYY-MM-DD HH:mm…` / `YYYY-MM-DDTHH:mm…` string, as narrowed by `isDateTimeString`. */
export type DateTimeString = `${DateString}${'T' | ' '}${string}`;
