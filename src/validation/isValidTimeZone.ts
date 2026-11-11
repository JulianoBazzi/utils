import { getZoneFormatter } from '../date/internal/timeZone.js';

/**
 * Check whether a string is a time zone the runtime's `Intl` accepts — use it
 * to guard zones read from user settings before passing them as `timeZone`
 * (an invalid zone makes the date helpers throw). Prefer IANA names such as
 * `"America/Sao_Paulo"`; offset zones like `"+03:00"` are not supported by
 * every Node version.
 *
 * @example
 * isValidTimeZone("America/Sao_Paulo") // true
 * isValidTimeZone("Mars/Olympus") // false
 */
export function isValidTimeZone(value?: string | null): boolean {
  if (!value) {
    return false;
  }
  try {
    getZoneFormatter(value);
    return true;
  } catch {
    return false;
  }
}
