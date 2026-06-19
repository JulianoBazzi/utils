/**
 * Format a number as Brazilian currency (BRL). The value is divided by
 * `divisor` first, so cents stored as integers (e.g. `1990`) render as `R$ 19,90`.
 *
 * @example
 * formatCurrency(1990) // "R$ 19,90"
 * formatCurrency(19.9, 1) // "R$ 19,90"
 */
export function formatCurrency(value?: number, divisor = 100): string {
  if (!value) {
    return 'R$ 0,00';
  }

  return (value / divisor).toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });
}
