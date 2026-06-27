import { None, type Option } from "./types.js";

/**
 * `findOpt(predicate, iterable)` returns the first value in `ITERABLE` matching `PREDICATE`, or `undefined`.
 *
 * ### Installation
 * ```bash
 * pnpm dlx shadcn@latest add bathan1/utop/findOpt.js
 * ```
 *
 * ### Usage
 * ```ts
 * import { findOpt } from "@/lib/utop/findOpt.js";
 * ```
 *
 * ```ts
 * const firstOpen = findOpt((todo) => !todo.done, todos);
 * ```
 *
 * `findOpt` has no async sugar; materialize async input before calling it.
 *
 * ```ts
 * const firstOpen = findOpt((todo) => !todo.done, await Array.fromAsync(todos()));
 * ```
 *
 * ### Examples
 *
 * @example
 * It returns the first matching value
 * ```ts
 * expect(findOpt((value) => value > 2, [1, 2, 3, 4])).toBe(3);
 * ```
 *
 * @example
 * It returns `undefined` when no value matches
 * ```ts
 * expect(findOpt((value) => value > 4, [1, 2, 3])).toBeUndefined();
 * ```
 */
export function findOpt<T>(
  predicate: (value: T, index: number) => boolean,
  iterable: Iterable<T>
): Option<T> {
  let index = 0;
  for (const value of iterable) {
    if (predicate(value, index++)) return value;
  }
  return None;
}
