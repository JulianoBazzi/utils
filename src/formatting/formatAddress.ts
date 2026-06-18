interface Address {
  state?: string;
  city?: string;
  zipcode?: string;
  address?: string;
  district?: string;
  number?: string;
}

/**
 * Assemble a single-line address string from its parts.
 * Returns an empty string when no street/city/state/district is provided.
 *
 * @example
 * formatAddress({ address: "Rua A", number: "10", city: "São Paulo", state: "SP" })
 * // "Rua A, 10, São Paulo - SP"
 */
export function formatAddress({
  state,
  city,
  zipcode,
  address,
  district,
  number,
}: Address): string {
  if (!address && !city && !state && !district) {
    return "";
  }

  const street = [address, number].filter(Boolean).join(", ");
  const districtPart = district ? ` - ${district}` : "";
  const cityState = [city, state].filter(Boolean).join(" - ");
  const zipcodePart = zipcode ? `, ${zipcode}` : "";

  let result = `${street}${districtPart}`;

  if (cityState) {
    result += `, ${cityState}`;
  }

  result += zipcodePart;

  return result;
}
