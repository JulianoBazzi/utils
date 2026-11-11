/**
 * Pick the singular form when `|count| === 1`, the plural otherwise (so `0`
 * reads as plural, as Portuguese expects: "0 tarefas").
 *
 * @internal
 */
export function pluralForm(count: number, singular: string, plural: string): string {
  return Math.abs(count) === 1 ? singular : plural;
}

/**
 * `"<count> <word>"` with the right number agreement, e.g. `"3 dias"`, `"1 ano"`.
 *
 * @internal
 */
export function countLabel(count: number, singular: string, plural: string): string {
  return `${count} ${pluralForm(count, singular, plural)}`;
}
