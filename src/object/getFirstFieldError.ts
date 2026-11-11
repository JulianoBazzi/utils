export interface FieldError {
  /** Dot path of the field, e.g. `"items.0.price"` — ready for `setFocus`. */
  name: string;
  message: string;
}

/**
 * Find the first error with a non-empty `message` in a (react-hook-form
 * style) nested errors object, walking objects and arrays depth-first in
 * insertion order. DOM `ref`s are skipped and cycles are tolerated. Typed
 * structurally, so it works with any form library's error tree.
 *
 * @example
 * getFirstFieldError({ items: [undefined, { price: { type: "min", message: "Inválido" } }] })
 * // { name: "items.1.price", message: "Inválido" }
 * getFirstFieldError({}) // undefined
 */
export function getFirstFieldError(errors: unknown): FieldError | undefined {
  const seen = new WeakSet<object>();

  const visit = (node: unknown, path: string[]): FieldError | undefined => {
    if (typeof node !== 'object' || node === null || seen.has(node)) {
      return undefined;
    }
    seen.add(node);

    const { message } = node as { message?: unknown };
    if (typeof message === 'string' && message) {
      return { name: path.join('.'), message };
    }

    for (const [key, child] of Object.entries(node)) {
      if (key === 'ref') continue;
      const found = visit(child, [...path, key]);
      if (found) return found;
    }
    return undefined;
  };

  return visit(errors, []);
}
