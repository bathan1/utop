import { None, type Option } from "./types.js";

/**
 * `findMap(callbackfn, iterable)` returns the first defined `CALLBACKFN` result from `ITERABLE`.
 *
 * ### Usage
 * ```ts
 * const parsed = findMap((text) => text ? Number(text) : undefined, ["", "2"]);
 * ```
 *
 * `findMap` has no async sugar; materialize async input before calling it.
 *
 * ```ts
 * const parsed = findMap(Number, await Array.fromAsync(messages()));
 * ```
 *
 * ### Examples
 *
 * @example
 * It returns the first defined callback result
 * ```ts
 * expect(findMap((value) => (value > 2 ? value * 10 : undefined), [1, 2, 3, 4])).toBe(30);
 * ```
 *
 * @example
 * It returns `undefined` when no callback result is defined
 * ```ts
 * expect(findMap(() => undefined, [1, 2, 3])).toBeUndefined();
 * ```
 */
export function findMap<T, U>(
  callbackfn: (value: T, index: number) => Option<U>,
  iterable: Iterable<T>
): Option<U> {
  let index = 0;
  for (const value of iterable) {
    const result = callbackfn(value, index++);
    if (result) return result;
  }
  return None;
}
