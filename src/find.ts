import type { Promisable } from "./types.js";

/**
 * `find(predicate, iterable)` returns the first `value` in `ITERABLE` that 
 * satisfies `PREDICATE(x)` or **throws** if that `value` can't be found.
 *
 * @throws RangeError
 *
 * ### Usage
 * ```ts
 * const todos = await fetch('https://dummyjson.com/todos')
 *   .then(async res => (await res.json()).todos as { completed: boolean }[]);
 * 
 * const firstCompleted = find((todo): todo is { id: number; completed: true } => todo.completed, todos);
 * console.log(firstCompleted.completed); // true
 * ```
 *
 * ### Async
 *
 * If `ITERABLE` has an {@link Symbol.asyncIterator} property,
 * then `find` searches for it using the `for await` expression,
 * regardless of whether or not it also has the sync symbol (though
 * in practice this will *never* happen).
 * 
 * ### Examples
 *
 * @example
 * It returns the first value that satisfies `CALLBACKFN`
 * ```ts
 * expect(find((x) => x > 2, [1, 2, 3, 4])).toBe(3);
 * ```
 * 
 * @example
 * It throws when no value satisfies `CALLBACKFN`
 * ```ts
 * expect(() => find((x) => x > 4, [1, 2, 3])).toThrow(RangeError);
 * ```
 */
export function find<T, S extends T>(
  predicate: (value: T, index: number) => value is S,
  iterable: AsyncIterable<T>
): Promise<S>;
export function find<T>(
  predicate: (value: T, index: number) => unknown,
  iterable: AsyncIterable<T>
): Promise<T>;
export function find<T, S extends T>(
  predicate: (value: T, index: number) => value is S,
  iterable: Iterable<T>
): S;
export function find<T>(
  predicate: (value: T, index: number) => unknown,
  iterable: Iterable<T>
): T;

export function find<T>(
  predicate: (value: T, index: number) => unknown,
  iterable: Iterable<T> | AsyncIterable<T>,
): Promisable<T> {
  if (Symbol.asyncIterator in iterable) {
    return (async () => {
      let index = 0;

      for await (const value of iterable) {
        if (predicate(value, index++)) {
          return value;
        }
      }

      throw new RangeError("No matching value found");
    })();
  }

  let index = 0;

  for (const value of iterable) {
    if (predicate(value, index++)) {
      return value;
    }
  }

  throw new RangeError("No matching value found");
}
