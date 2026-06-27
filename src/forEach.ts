import type { Promisable } from "./types.js";

/**
 * `forEach(callbackfn, iterable)` calls `CALLBACKFN` on each element in `ITERABLE` *immediately* and returns nothing
 *
 * ### Installation
 * ```bash
 * pnpm dlx shadcn@latest add bathan1/utop/forEach.js
 * ```
 *
 * ### Usage
 * ```ts
 * import { forEach } from "@/lib/utop/forEach.js";
 * ```
 *
 * ```ts
 * const todos = await fetch('https://dummyjson.com/todos')
 *   .then(async res => (await res.json()).todos);
 *
 * forEach(console.log, todos);
 * ```
 *
 * When `ITERABLE` is async this will also await each call to `CALLBACKFN`
 * (regardless of if it returns a Promise or not).
 *
 * ```ts
 * const res = await fetch('https://dummyjson.com/todos');
 * if (!res.body) {
 *   throw new Error("bad response");
 * }
 * await forEach(chunk => console.log('recv %d bytes', chunk.length), res.body)
 * ```
 *
 * ### Examples
 *
 * @example
 * It immediately consumes the iterable
 * ```ts
 * const iterable = [1, 2, 3].values();
 * forEach(() => void 0, iterable);
 * ```
 *
 * @example
 * It consumes async iterables as a Promise
 * ```ts
 * async function* numbers() {
 *   yield 1;
 *   yield 2;
 *   yield 3;
 * }
 *
 * const logSync = vi.fn();
 * const logAsync = vi.fn(async (_: number) => void 0);
 *
 * await forEach(logSync, numbers());
 * await forEach(logAsync, numbers());
 *
 * expect(logSync).toHaveBeenCalledWith(1, 0);
 * expect(logSync).toHaveBeenCalledWith(2, 1);
 * expect(logSync).toHaveBeenCalledWith(3, 2);
 *
 * expect(logAsync).toHaveBeenCalledWith(1, 0);
 * expect(logAsync).toHaveBeenCalledWith(2, 1);
 * expect(logAsync).toHaveBeenCalledWith(3, 2);
 * ```
 */
export function forEach<T>(
  callbackfn: (value: T, index: number) => Promisable<unknown>,
  iterable: AsyncIterable<T>
): Promise<void>;
export function forEach<T>(
  callbackfn: (value: T, index: number) => unknown,
  iterable: Iterable<T>
): void;

export function forEach<T>(
  callbackfn: (value: T, index: number) => Promisable<unknown>,
  iterable: AsyncIterable<T> | Iterable<T>
): Promisable<void> {
  if (Symbol.asyncIterator in iterable) {
    return (async () => {
      let index = 0;
      for await (const value of iterable) {
        void (await callbackfn(value, index++));
      }
    })();
  }
  let index = 0;
  for (const value of iterable) {
    void callbackfn(value, index++);
  }
}
