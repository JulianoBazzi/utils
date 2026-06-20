interface FormatCurrencyOptions {
  /** Returned for zero/missing input. Defaults to `"R$ 0,00"`. */
  fallback?: string;
}

/**
 * Format a number as Brazilian currency (BRL). The value is divided by
 * `divisor` first, so cents stored as integers (e.g. `1990`) render as `R$ 19,90`.
 *
 * @example
 * formatCurrency(1990) // "R$ 19,90"
 * formatCurrency(19.9, 1) // "R$ 19,90"
 * formatCurrency(null, 100, { fallback: "—" }) // "—"
 */
export function formatCurrency(
  value?: number | null,
  divisor = 100,
  options: FormatCurrencyOptions = {},
): string {
  const { fallback = 'R$ 0,00' } = options;
  if (!value) {
    return fallback;
  }

  return (value / divisor).toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });
}
