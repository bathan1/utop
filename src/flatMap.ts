import type { Promisable } from "./types.js";

/**
 * `flatMap(callbackfn, iterable)` lazily yields every value from each iterable returned by `CALLBACKFN` for `ITERABLE`.
 *
 * ## Usage
 * ```ts
 * const words = [...flatMap((line) => line.split(" "), lines)];
 * ```
 *
 * For an async `ITERABLE`, `flatMap` returns an {@link AsyncGenerator}, awaits `CALLBACKFN`,
 * and accepts either an iterable or async iterable from it.
 *
 * ```ts
 * const words = await Array.fromAsync(flatMap(async (line) => (await line).split(" "), lines()));
 * ```
 *
 * ## Examples
 *
 * @example
 * It lazily flattens each callback result
 * ```ts
 * expect([...flatMap((value) => [value, value * 2], [1, 2, 3])]).toEqual([1, 2, 2, 4, 3, 6]);
 * ```
 *
 * @example
 * It awaits async callbacks and flattens async results for async `ITERABLE`
 * ```ts
 * async function* values() {
 *   yield 1;
 *   yield 2;
 * }
 * const result = flatMap(async (value) => new Set([value, value * 10]), values());
 * expect(await Array.fromAsync(result)).toEqual([1, 10, 2, 20]);
 * ```
 */
export function flatMap<T, U>(
  callbackfn: (value: T, index: number) => Iterable<U>,
  iterable: Iterable<T>
): Generator<U, void, unknown>;
export function flatMap<T, U>(
  callbackfn: (value: T, index: number) => Promisable<Iterable<U> | AsyncIterable<U>>,
  iterable: AsyncIterable<T>
): AsyncGenerator<Awaited<U>, void, unknown>;
export function flatMap<T, U>(
  callbackfn: (value: T, index: number) => Promisable<Iterable<U> | AsyncIterable<U>>,
  iterable: Iterable<T> | AsyncIterable<T>
): Generator<U, void, unknown> | AsyncGenerator<Awaited<U>, void, unknown> {
  if (Symbol.asyncIterator in iterable) {
    return (async function* flatMap() {
      let index = 0;
      for await (const value of iterable) {
        yield* await callbackfn(value, index++);
      }
    })();
  }

  return (function* flatMap() {
    let index = 0;
    for (const value of iterable) {
      yield* callbackfn(value, index++) as Iterable<U>;
    }
  })();
}
