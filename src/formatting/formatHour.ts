import dayjs from "dayjs";

interface FormatHourOptions {
  /** Drop seconds (`HH:mm`) when true (default); include them (`HH:mm:ss`) when false. */
  simplified?: boolean;
  /** Returned when the input is empty/missing. Defaults to `""`. */
  fallback?: string;
}

/**
 * Format a date string as `HH:mm` (or `HH:mm:ss` when not simplified).
 *
 * @example
 * formatHour("2024-01-02T13:45:30") // "13:45"
 * formatHour("2024-01-02T13:45:30", { simplified: false }) // "13:45:30"
 * formatHour(null, { fallback: "Não Informado" }) // "Não Informado"
 */
export function formatHour(value?: string | null, options: FormatHourOptions = {}): string {
  const { simplified = true, fallback = "" } = options;
  if (!value) return fallback;
  return dayjs(value).format(simplified ? "HH:mm" : "HH:mm:ss");
}
