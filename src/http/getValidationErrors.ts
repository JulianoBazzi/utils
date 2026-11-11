import { getHttpStatus } from './getHttpStatus.js';
import { read } from './internal/read.js';

/** Normalized body of a validation error (Laravel's 422 shape). */
export interface ValidationErrors {
  /** Top-level message, when the API sends one. */
  message?: string;
  /** Messages per field; always arrays, empty fields omitted. */
  errors: Record<string, string[]>;
}

export interface GetValidationErrorsOptions {
  /** Status that marks a validation error. Defaults to `422`. */
  status?: number;
}

/**
 * Read a validation error response (`{ message, errors: { field: [msg] } }`,
 * the Laravel shape) from an error, structurally — works with axios and any
 * client that exposes `response.data` or `data`. A lone string message is
 * wrapped in an array. Returns `null` when the status is not `status` (422).
 *
 * @example
 * getValidationErrors(error)
 * // { message: "Dados inválidos", errors: { email: ["O e-mail já está em uso."] } }
 * getValidationErrors(error)?.errors.email?.[0] // first message of one field
 */
export function getValidationErrors(
  error: unknown,
  options: GetValidationErrorsOptions = {},
): ValidationErrors | null {
  const { status = 422 } = options;
  if (getHttpStatus(error) !== status) {
    return null;
  }

  const body = read(read(error, 'response'), 'data') ?? read(error, 'data');
  const message = read(body, 'message');
  const rawErrors = read(body, 'errors');
  const errors: Record<string, string[]> = {};

  if (typeof rawErrors === 'object' && rawErrors !== null) {
    for (const [field, value] of Object.entries(rawErrors)) {
      const list = (Array.isArray(value) ? value : [value]).filter(
        (item): item is string => typeof item === 'string' && item !== '',
      );
      if (list.length) {
        errors[field] = list;
      }
    }
  }

  return { message: typeof message === 'string' ? message : undefined, errors };
}
