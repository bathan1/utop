/**
 * `includes(searchElement, iterable, fromIndex?)` reports whether `SEARCH_ELEMENT` occurs in `ITERABLE` at or after `FROM_INDEX`.
 *
 * ### Usage
 * ```ts
 * const hasAdmin = includes("admin", roles);
 * ```
 *
 * `includes` has no async sugar; materialize async input before calling it.
 *
 * ```ts
 * const hasAdmin = includes("admin", await Array.fromAsync(roles()));
 * ```
 *
 * ### Examples
 *
 * @example
 * It finds values at or after `FROM_INDEX`
 * ```ts
 * expect(includes("a", ["a", "b", "a"], 1)).toBe(true);
 * expect(includes("a", ["a", "b"], 1)).toBe(false);
 * ```
 *
 * @example
 * It uses SameValueZero-style matching for `NaN`
 * ```ts
 * expect(includes(NaN, [1, NaN, 3])).toBe(true);
 * ```
 */
export function includes<T>(
  searchElement: T,
  iterable: Iterable<T>,
  fromIndex: number = 0
): boolean {
  let index = 0;
  const start = Math.max(0, fromIndex);
  for (const value of iterable) {
    if (index >= start && (Object.is(searchElement, value) || searchElement === value)) return true;
    index++;
  }
  return false;
}
