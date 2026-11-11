import { formatPostalCode } from './formatPostalCode.js';

export interface Address {
  state?: string | null;
  city?: string | null;
  zipcode?: string | null;
  address?: string | null;
  district?: string | null;
  number?: string | null;
}

export interface FormatAddressOptions {
  /** Returned when no street/city/state/district is provided. Defaults to `""`. */
  fallback?: string;
}

const join = (parts: Array<string | null | undefined>, separator: string) =>
  parts
    .map((part) => part?.trim())
    .filter(Boolean)
    .join(separator);

/**
 * Assemble a single-line address: `"street, number - district, city - UF, CEP"`.
 * Missing parts are skipped together with their separators, so the result
 * never starts or ends with `", "` or `" - "`. Returns `fallback` when no
 * street/city/state/district is provided.
 *
 * @example
 * formatAddress({ address: "Rua A", number: "10", city: "São Paulo", state: "SP" })
 * // "Rua A, 10, São Paulo - SP"
 * formatAddress({ district: "Centro", city: "Curitiba", state: "PR" }) // "Centro, Curitiba - PR"
 * formatAddress({}, { fallback: "Não Informado" }) // "Não Informado"
 */
export function formatAddress(
  { state, city, zipcode, address, district, number }: Address,
  options: FormatAddressOptions = {},
): string {
  const { fallback = '' } = options;
  if (![address, district, city, state].some((part) => part?.trim())) {
    return fallback;
  }

  const street = join([join([address, number], ', '), district], ' - ');
  const cityState = join([city, state], ' - ');
  return join([street, cityState, formatPostalCode(zipcode)], ', ');
}
