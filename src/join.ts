import { map } from "./map.js";

/**
 * `join(separator, iterable, toString?)` joins `ITERABLE` with `SEPARATOR`, applying `TO_STRING` when provided.
 *
 * ### Usage
 * ```ts
 * const csv = join(",", [1, 2, 3]);
 * ```
 *
 * `join` has no async sugar; materialize async input before calling it.
 *
 * ```ts
 * const csv = join(",", await Array.fromAsync(values()));
 * ```
 *
 * ### Examples
 *
 * @example
 * It joins transformed values with the separator
 * ```ts
 * expect(join(" | ", new Set(["a", "b"]), (value, index) => `${index}:${value}`)).toBe(
 *   "0:a | 1:b"
 * );
 * ```
 */
export function join<T>(
  separator: string,
  iterable: Iterable<T>,
  toString?: (value: T, index: number) => string
): string {
  const values = toString ? Array.from(map(toString, iterable)) : Array.from(iterable);
  return values.join(separator);
}
