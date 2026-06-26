import type { Promisable } from "./types";

type Map = {
  <T, U>(
    callbackfn: (el: T, index: number) => U,
    iterable: Iterable<T>,
  ): Generator<U, void, unknown>;

  /**
   * `map.async(callbackfn, iterable)` is the async sequence `CALLBACKFN(x1), CALLBACKFN(x2), ..., CALLBACKFN(xn)` for each `xi` in `ITERABLE`.
   */
  async<T, U>(
    callbackFn: (el: T, index: number) => Promisable<U>,
    iterable: Iterable<T> | AsyncIterable<T>
  ): AsyncGenerator<U, void, unknown>

  /**
   * `map.bind(thisArg, callbackfn)` is the *typed* `bind()` method of the base
   * function class in js that returns a new function that applies CALLBACKFN to its iterables... it doesn't touch `bind` at runtime at all.
   */
  bind<T, U>(
    this: Map,
    thisArg: null,
    callbackfn: (el: T, index: number) => U,
  ): (iterable: Iterable<T>) => Generator<U, void, unknown>;
};

/**
 * `map(callbackfn, iterable)` is `CALLBACKFN(x1), CALLBACKFN(x2), ..., CALLBACKFN(xn)` for each `xi` in `ITERABLE`.
 *
 * ### Usage
 *
 * ```ts
 * const todos = await fetch('https://dummyjson.com/todos')
 *   .then(async res => (await res.json()).todos as { todo: string; }[]);
 * const todosTexts = map((todoItem) => todoItem.todo, todos);
 * ```
 *
 * ### Bind
 * You can call the {@link map.bind} method which manually types out
 * the generics for you (compile-time change only) so you can do partial
 * applications against `CALLBACKFN`:
 *
 * ```ts
 * const doubleText = map.bind(null, (x: number) => String(x * 2));
 * console.log(doubleText([1, 2, 3]))
 * console.log(doubleText([2, 4, 6]))
 * ```
 *
 * ### Examples
 */
export const map: Map = function* map<T, U>(
  callbackfn: (el: T, index: number) => U,
  iterable: Iterable<T>,
): Generator<U, void, unknown> {
  let index = 0;
  for (const el of iterable) {
    yield callbackfn(el, index++);
  }
} as Map;

map.async = async function* mapAsync<T, U>(
  callbackfn: (el: T, index: number) => Promisable<U>,
  iterable: AsyncIterable<T> | Iterable<T>
): AsyncGenerator<U, void, unknown> {
  let index = 0;
  for await (const el of iterable) {
    yield await callbackfn(el, index++);
  }
}
