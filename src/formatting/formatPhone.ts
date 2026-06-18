/**
 * Mask a Brazilian phone number. Handles both 10-digit (landline) and
 * 11-digit (mobile) numbers. Returns an empty string for missing input.
 *
 * @example
 * formatPhone("1112345678") // "(11) 1234-5678"
 * formatPhone("11912345678") // "(11) 91234-5678"
 */
export function formatPhone(phone?: string | null): string {
  if (!phone) {
    return "";
  }

  if (phone.length > 10) {
    return phone.replace(/^(\d{2})(\d{5})(\d{4}).*/, "($1) $2-$3");
  }

  return phone.replace(/^(\d{2})(\d{4})(\d{4}).*/, "($1) $2-$3");
}
