export interface Mailbox {
  name?: string | null;
  address?: string | null;
}

export interface FormatMailboxOptions {
  /** Returned when both name and address are empty. Defaults to `""`. */
  fallback?: string;
}

/**
 * Format an e-mail contact as `"Name <address>"`. When the name is missing
 * or equals the address, only one of them is shown.
 *
 * @example
 * formatMailbox({ name: "Ana", address: "ana@x.com" }) // "Ana <ana@x.com>"
 * formatMailbox({ address: "ana@x.com" }) // "ana@x.com"
 * formatMailbox({ name: "ana@x.com", address: "ana@x.com" }) // "ana@x.com"
 */
export function formatMailbox(
  mailbox?: Mailbox | null,
  options: FormatMailboxOptions = {},
): string {
  const { fallback = '' } = options;
  const name = mailbox?.name?.trim();
  const address = mailbox?.address?.trim();

  if (name && address && name !== address) {
    return `${name} <${address}>`;
  }
  return name || address || fallback;
}
