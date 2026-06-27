import type { Promisable } from "./types.js";

/**
 * `some(predicate, iterable)` reports whether any value in `ITERABLE` satisfies `PREDICATE`.
 *
 * ### Installation
 * ```bash
 * pnpm dlx shadcn@latest add bathan1/utop/some.js
 * ```
 *
 * ### Usage
 * ```ts
 * import { some } from "@/lib/utop/some.js";
 * ```
 *
 * ```ts
 * const hasOverdue = some((invoice) => invoice.overdue, invoices);
 * ```
 *
 * For an async `ITERABLE`, `some` returns a {@link Promise} and awaits `PREDICATE`.
 *
 * ```ts
 * const hasOverdue = await some(async (invoice) => isOverdue(invoice), invoices());
 * ```
 *
 * ### Examples
 *
 * @example
 * It short-circuits when a value satisfies `PREDICATE`
 * ```ts
 * expect(some((value) => value > 2, [1, 2, 3, 4])).toBe(true);
 * expect(some((value) => value > 4, [1, 2, 3, 4])).toBe(false);
 * ```
 *
 * @example
 * It awaits `PREDICATE` when `ITERABLE` is async
 * ```ts
 * async function* values() {
 *   yield 1;
 *   yield 2;
 *   yield 3;
 * }
 * expect(await some(async (value) => value === 2, values())).toBe(true);
 * ```
 */
export function some<T>(
  predicate: (value: T, index: number) => Promisable<unknown>,
  iterable: AsyncIterable<T>
): Promise<boolean>;
export function some<T>(
  predicate: (value: T, index: number) => unknown,
  iterable: Iterable<T>
): boolean;
export function some<T>(
  predicate: (value: T, index: number) => Promisable<unknown>,
  iterable: Iterable<T> | AsyncIterable<T>
): boolean | Promise<boolean> {
  if (Symbol.asyncIterator in iterable) {
    return (async () => {
      let index = 0;
      for await (const value of iterable) {
        if (await predicate(value, index++)) return true;
      }
      return false;
    })();
  }

  let index = 0;
  for (const value of iterable) {
    if (predicate(value, index++)) return true;
  }
  return false;
}
