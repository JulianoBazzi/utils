import dayjs from 'dayjs';

interface FormatMonthOptions {
  /** Returned when the input is empty/missing. Defaults to `""`. */
  fallback?: string;
}

/**
 * Format a date string as `MM/YYYY`.
 * Missing or invalid input → `fallback`.
 *
 * @example
 * formatMonth("2024-01-02") // "01/2024"
 * formatMonth(null, { fallback: "Não Informado" }) // "Não Informado"
 */
export function formatMonth(value?: string | null, options: FormatMonthOptions = {}): string {
  const { fallback = '' } = options;
  if (!value) return fallback;

  const date = dayjs(value);
  if (!date.isValid()) return fallback;

  return date.format('MM/YYYY');
}
