import type { ValidationErrors } from './getValidationErrors.js';

export interface ApplyValidationErrorsOptions<N extends string> {
  /** Map API field names to form field names, e.g. `{ zip_code: "zipcode" }`. */
  fieldMap?: Readonly<Record<string, N>>;
  /**
   * Fields that exist in the form. Errors for anything else go to `unhandled`
   * instead of landing on an invisible field. Defaults to accepting every field.
   */
  fields?: readonly N[];
  /** `type` passed to `setError`. Defaults to `"server"`. */
  type?: string;
}

export interface ApplyValidationErrorsResult {
  /** `true` when at least one error was set on a form field. */
  handled: boolean;
  /** The top-level message, to show in a toast when nothing was handled. */
  message?: string;
  /** API fields that had errors but no matching form field. */
  unhandled: string[];
}

/**
 * Push validation errors onto a form — react-hook-form's `setError` fits the
 * callback structurally, no dependency needed. Each field gets its first
 * message; fields outside `fields` are reported in `unhandled` and do not
 * count as handled, so the caller can still show a toast.
 *
 * @example
 * const result = applyValidationErrors(getValidationErrors(error), setError, {
 *   fields: ["name", "email"],
 * });
 * if (!result.handled) toast.error(result.message ?? getErrorMessage(error));
 */
export function applyValidationErrors<N extends string>(
  errors: ValidationErrors | null | undefined,
  setError: (name: N, error: { type: string; message: string }) => void,
  options: ApplyValidationErrorsOptions<N> = {},
): ApplyValidationErrorsResult {
  const { fieldMap, fields, type = 'server' } = options;
  const unhandled: string[] = [];
  let handled = false;

  for (const [field, messages] of Object.entries(errors?.errors ?? {})) {
    const message = messages[0];
    if (!message) continue;
    const name = fieldMap?.[field] ?? (field as N);
    if (fields && !fields.includes(name)) {
      unhandled.push(field);
      continue;
    }
    setError(name, { type, message });
    handled = true;
  }

  return { handled, message: errors?.message, unhandled };
}
