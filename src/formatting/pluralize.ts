import { presentNumber } from '../number/internal/presentNumber.js';
import { pluralForm } from './internal/pluralize.js';
import { resolveOptions } from './internal/resolveOptions.js';

export interface PluralizeOptions {
  /** Plural form. Defaults to `singular + "s"`. */
  plural?: string;
  /** Prefix the count (`"3 tarefas"`). Defaults to `true`; `false` returns only the word. */
  showCount?: boolean;
  /** Formats the count, e.g. `formatNumber` for `"1.234 registros"`. Defaults to `String`. */
  formatCount?: (count: number) => string;
}

/**
 * Pick the singular or plural form for a count. Only `1` and `-1` are
 * singular, so `0` reads as plural (`"0 tarefas"`, never `"0 tarefa"`). A
 * missing or non-finite count counts as `0`, so an optional total never
 * renders `"undefined registros"`.
 *
 * The 3rd argument is the plural form or an options object.
 *
 * @example
 * pluralize(0, "tarefa") // "0 tarefas"
 * pluralize(1, "mês", "meses") // "1 mês"
 * pluralize(2, "mês", { plural: "meses", showCount: false }) // "meses"
 * pluralize(1234, "registro", { formatCount: (n) => n.toLocaleString("pt-BR") }) // "1.234 registros"
 * pluralize(undefined, "registro") // "0 registros"
 */
export function pluralize(
  count: number | null | undefined,
  singular: string,
  pluralOrOptions?: string | PluralizeOptions,
): string {
  const {
    plural = `${singular}s`,
    showCount = true,
    formatCount = String,
  } = resolveOptions<PluralizeOptions, 'plural'>(pluralOrOptions, 'plural');

  const value = presentNumber(count) ?? 0;
  const word = pluralForm(value, singular, plural);
  return showCount ? `${formatCount(value)} ${word}` : word;
}
