import dayjs from 'dayjs';

interface FormatDateOptions {
  /** Use a 2-digit year (`DD/MM/YY`) when true (default), `DD/MM/YYYY` when false. */
  simplified?: boolean;
  /** Returned when the input is empty/missing. Defaults to `""`. */
  fallback?: string;
}

/**
 * Format a date string as `DD/MM/YY` (or `DD/MM/YYYY` when not simplified).
 *
 * @example
 * formatDate("2024-01-02") // "02/01/24"
 * formatDate("2024-01-02", { simplified: false }) // "02/01/2024"
 * formatDate(null, { fallback: "Não Informado" }) // "Não Informado"
 */
export function formatDate(value?: string | null, options: FormatDateOptions = {}): string {
  const { simplified = true, fallback = '' } = options;
  if (!value) return fallback;
  return dayjs(value).format(simplified ? 'DD/MM/YY' : 'DD/MM/YYYY');
}
