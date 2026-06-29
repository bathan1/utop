/**
 * `partition(predicate, iterable)` splits `ITERABLE` by `PREDICATE` into matching and non-matching values.
 *
 * ### Usage
 * ```ts
 * const [even, odd] = partition((value) => value % 2 === 0, [1, 2, 3, 4]);
 * ```
 *
 * `partition` has no async sugar; materialize async input before calling it.
 *
 * ```ts
 * const [even, odd] = partition((value) => value % 2 === 0, await Array.fromAsync(values()));
 * ```
 *
 * ### Examples
 *
 * @example
 * It separates matching and non-matching values
 * ```ts
 * expect(partition((value) => value % 2 === 0, [1, 2, 3, 4])).toEqual([
 *   [2, 4],
 *   [1, 3],
 * ]);
 * ```
 */
export function partition<T, S extends T>(
  predicate: (value: T, index: number) => value is S,
  iterable: Iterable<T>
): [matches: S[], rest: Exclude<T, S>[]];
export function partition<T>(
  predicate: (value: T, index: number) => boolean,
  iterable: Iterable<T>
): [matches: T[], rest: T[]];
export function partition(
  predicate: (value: unknown, index: number) => boolean,
  iterable: Iterable<unknown>
): [matches: unknown[], rest: unknown[]] {
  let index = 0;
  const matches: unknown[] = [];
  const rest: unknown[] = [];
  for (const value of iterable) {
    (predicate(value, index++) ? matches : rest).push(value);
  }
  return [matches, rest];
}
