import type { Option, Promisable } from "./types";

/**
 * `first(iterable)` returns the first value of `ITERABLE`, or `undefined`
 * if `ITERABLE` is empty.
 *
 * ## Usage
 * ```ts
 * const firstTodo = first([
 *   { todo: "Buy milk" },
 *   { todo: "Walk dog" },
 * ]);
 *
 * console.log(firstTodo?.todo);
 * ```
 *
 * `first` also supports {@link AsyncIterable}s, in which case it awaits
 * the first available value before returning it.
 *
 * ```ts
 * async function* count() {
 *   yield 1;
 *   yield 2;
 *   yield 3;
 * }
 *
 * const value = await first(count());
 * console.log(value); // 1
 * ```
 *
 * ## Examples
 */
export function first<T>(
  iterable: AsyncIterable<T>,
): Promise<Option<T>>;
export function first<T>(
  iterable: Iterable<T>,
): Option<T>;

export function first<T>(
  iterable: Iterable<T> | AsyncIterable<T>,
): Promisable<Option<T>> {
  if (Symbol.asyncIterator in iterable) {
    return (async () => {
      for await (const value of iterable) {
        return value;
      }
      return undefined;
    })();
  }

  for (const value of iterable) {
    return value;
  }

  return undefined;
}
