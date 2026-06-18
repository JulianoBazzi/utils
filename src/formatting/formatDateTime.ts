import dayjs from "dayjs";

interface FormatDateTimeOptions {
  /** Use a 2-digit year when true (default), 4-digit when false. */
  simplified?: boolean;
  /** Include seconds (`HH:mm:ss`) when true. Defaults to false. */
  showSeconds?: boolean;
  /** Returned when the input is empty/missing. Defaults to `""`. */
  fallback?: string;
}

/**
 * Format a date string as `DD/MM/YY HH:mm`. `simplified: false` switches to a
 * 4-digit year; `showSeconds: true` appends seconds.
 *
 * @example
 * formatDateTime("2024-01-02T13:45:30") // "02/01/24 13:45"
 * formatDateTime("2024-01-02T13:45:30", { simplified: false }) // "02/01/2024 13:45"
 * formatDateTime("2024-01-02T13:45:30", { showSeconds: true }) // "02/01/24 13:45:30"
 * formatDateTime(null, { fallback: "Não Informado" }) // "Não Informado"
 */
export function formatDateTime(date?: string | null, options: FormatDateTimeOptions = {}): string {
  const { simplified = true, showSeconds = false, fallback = "" } = options;
  if (!date) return fallback;

  const year = simplified ? "YY" : "YYYY";
  const time = showSeconds ? "HH:mm:ss" : "HH:mm";
  return dayjs(date).format(`DD/MM/${year} ${time}`);
}
