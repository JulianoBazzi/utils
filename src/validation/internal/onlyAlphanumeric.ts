/**
 * Strip everything but letters/digits and uppercase the result.
 * Used to normalize CNPJ (which may be alphanumeric).
 *
 * @internal
 */
export function onlyAlphanumeric(value?: string | null): string {
  return (value ?? "").replace(/[^0-9A-Za-z]/g, "").toUpperCase();
}
