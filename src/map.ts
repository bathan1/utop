import type { Promisable } from "./types.js";

type BoundMap<T, U> = {
  (iterable: AsyncIterable<T>): AsyncGenerator<Awaited<U>, void, unknown>;
  (iterable: Iterable<T>): Generator<U, void, unknown>;
};

/**
 * We have to type out `map` explicitly if we want to get nice type inference with `.bind`
 */
type Map = {
  <T, U>(
    callbackfn: (value: T, index: number) => Promisable<U>,
    iterable: AsyncIterable<T>
  ): AsyncGenerator<Awaited<U>, void, unknown>;

  <T, U>(
    callbackfn: (value: T, index: number) => U,
    iterable: Iterable<T>
  ): Generator<U, void, unknown>;

  bind<T, U>(this: Map, thisArg: null, callbackfn: (value: T, index: number) => U): BoundMap<T, U>;
};

/**
 * `map(callbackfn, iterable)` is `CALLBACKFN(x1), CALLBACKFN(x2), ..., CALLBACKFN(xn)` for each `xi` in `ITERABLE`.
 *
 * ## Usage
 * ```ts
 * const todos = await fetch('https://dummyjson.com/todos')
 *   .then(async res => (await res.json()).todos as { todo: string; }[]);
 * const todosTexts = map((todoItem) => todoItem.todo, todos);
 * ```
 *
 * `map` also allows iterating over {@link AsyncIterable}s, in which
 * case it will await `CALLBACKFN` before yielding the transformed value.
 *
 * ```ts
 * const response = await fetch('https://dummyjson.com/todos');
 * if (!response.body) {
 *   throw new Error("bad response", { cause: response.status });
 * }
 *
 * const result = await Array.from(map(chunk => chunk.toBase64(), res.body));
 * console.log(result[0]);
 * ```
 *
 * ## Compile Time `bind`
 * You can call the {@link map.bind} method which manually overloads the generics
 * for you so you can do partial applications against `CALLBACKFN`
 * without tsc screaming at you.
 *
 * ```ts
 * const doubleText = map.bind(null, (x: number) => String(x * 2));
 * console.log(doubleText([1, 2, 3]))
 * console.log(doubleText([2, 4, 6]))
 * ```
 *
 * ## Examples
 *
 * @example
 * It calls `CALLBACKFN` on demand
 * ```ts
 * const callbackfn = vi.fn((x: number) => String(x * 2));
 * const iterable = randomIterableFromArray(
 *   Array.from({ length: Math.ceil(Math.random() * 100) }, (_, i) => i)
 * );
 * const mapped = map(callbackfn, iterable);
 *
 * expect(callbackfn).not.toHaveBeenCalled();
 * mapped.next();
 * expect(callbackfn).toHaveBeenCalled();
 * callbackfn.mockClear();
 * ```
 *
 * @example
 * It transforms the awaited values of async `ITERABLE`
 * ```ts
 * const callbackfn = vi.fn((x: number) => String(x * 2));
 * async function* count(n: number) {
 *   for (let i = 0; i < n; i++) {
 *     yield i + 1;
 *   }
 * }
 * const asyncIterable = count(4);
 * const doubledText = map(callbackfn, asyncIterable);
 *
 * expect(callbackfn).not.toHaveBeenCalled();
 *
 * let index = 0;
 * for await (const value of doubledText) {
 *   expect(++index).toEqual(parseInt(value) / 2);
 * }
 * ```
 *
 * @example
 * It partially applies `CALLBACK_FN` through native `.bind`
 * ```ts
 * function double(x: number) {
 *   return x * 2;
 * }
 * const doubleNumbers = map.bind(null, double);
 *
 * const syncResult = Array.from(doubleNumbers([1, 2, 3]));
 * const asyncResult = await Array.fromAsync(
 *   doubleNumbers(
 *     (async function* () {
 *       yield 1;
 *       yield 2;
 *       yield 3;
 *     })()
 *   )
 * );
 *
 * expect(syncResult).toEqual(asyncResult);
 * expect(syncResult).toEqual([2, 4, 6]);
 * ```
 */
export const map: Map = (<T, U>(
  callbackfn: (value: T, index: number) => Promisable<U>,
  iterable: Iterable<T> | AsyncIterable<T>
): Generator<U, void, unknown> | AsyncGenerator<U, void, unknown> => {
  if (Symbol.asyncIterator in iterable) {
    return (async function* map() {
      let index = 0;
      for await (const value of iterable) {
        yield callbackfn(value, index++);
      }
    })();
  }

  return (function* map() {
    let index = 0;
    for (const value of iterable) {
      yield callbackfn(value, index++) as U;
    }
  })();
}) as Map;
