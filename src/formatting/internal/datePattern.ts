/** How the year is rendered: `"2-digit"` (`24`), `"numeric"` (`2024`) or omitted. */
export type YearStyle = '2-digit' | 'numeric' | false;

/**
 * dayjs pattern for the date part. `year` wins over the legacy `simplified`
 * flag (`true` = 2-digit year, the default).
 *
 * @internal
 */
export function datePattern(year: YearStyle | undefined, simplified = true): string {
  const style = year ?? (simplified ? '2-digit' : 'numeric');
  if (style === false) {
    return 'DD/MM';
  }
  return style === '2-digit' ? 'DD/MM/YY' : 'DD/MM/YYYY';
}

/**
 * dayjs pattern for the time part. `seconds` wins over the legacy flag.
 *
 * @internal
 */
export function timePattern(seconds: boolean | undefined, legacySeconds = false): string {
  return (seconds ?? legacySeconds) ? 'HH:mm:ss' : 'HH:mm';
}
