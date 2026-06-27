import type { Promisable } from "./types.js";

/**
 * `reduce(callbackfn, initialValue, iterable)` folds `ITERABLE` into shape of `INITIAL_VALUE` by threading each element in `ITERABLE` through the reducer `CALLBACKFN`.
 * 
 * ### Installation
 * ```bash
 * pnpm dlx shadcn@latest add bathan1/utop/reduce.js
 * ```
 * 
 * ### Usage
 * ```ts
 * import { reduce } from "@/lib/utop/find.js";
 * ```
 * 
 * ```ts
 * const todos = await fetch('https://dummyjson.com/todos')
 *   .then(async res => (await res.json()).todos as { todo: string }[]);
 * 
 * const lines = reduce((acc, todoItem) => {
 *   return acc + `${todoItem.todo}\n`
 * }, "", todos);
 * console.log(lines);
 * ```
 * 
 * The async sugar for `reduce` handles unboxing (`await`-ing) each `value` from
 * async `ITERABLE` and with the result of `CALLBACKFN(ACC, value)` on each iteration.
 * 
 * ```ts
 * const response = await fetch('https://dummyjson.com/todos')
 * if (!response.body) {
 *   throw new Error("invalid response", { cause: response.status })
 * }
 * const numBytes = await reduce((acc, chunk) => acc + chunk.length, 0, response.body);
 * console.log(numBytes);
 * ```
 * 
 * ### Examples
 * 
 * @example
 * It folds `ITERABLE` into `INITIAL_VALUE`
 * ```ts
 * expect(reduce((sum, x) => sum + x, 0, [1, 2, 3])).toBe(6);
 * ```
 * 
 * @example
 * It passes the index to `CALLBACKFN`
 * ```ts
 * expect(reduce((acc, x, i) => [...acc, `${i}:${x}`], [] as string[], ["a", "b"])).toEqual([
 *   "0:a",
 *   "1:b",
 * ]);
 * ```
 * 
 * @example
 * It awaits values from `ITERABLE` when it is async along with `CALLBACKFN`
 * ```ts
 * async function* numbers() {
 *   yield 1;
 *   yield 2;
 *   yield 3;
 * }
 * 
 * const result = await reduce(
 *   async (acc, value, index) => {
 *     const doubled = await Promise.resolve(value * 2);
 *     return [...acc, `${index}:${doubled}`];
 *   },
 *   [] as string[],
 *   numbers()
 * );
 * 
 * expect(result).toEqual(["0:2", "1:4", "2:6"]);
 * ```
 */
export function reduce<T, U>(
  callbackFn: (acc: Awaited<U>, value: T, index: number) => Promisable<U>,
  init: U,
  iterable: AsyncIterable<T>
): Promise<Awaited<U>>;
export function reduce<T, U>(
  callbackfn: (acc: U, value: T, index: number) => U,
  initialValue: U,
  iterable: Iterable<T>
): U;

export function reduce<T, U>(
  callbackfn: (acc: U, value: T, index: number) => Promisable<U>,
  initialValue: U,
  iterable: AsyncIterable<T> | Iterable<T>
): Promisable<U> {
  if (Symbol.asyncIterator in iterable) {
    return (async () => {
      let acc = initialValue;
      let index = 0;

      for await (const value of iterable) {
        acc = await callbackfn(acc, value, index++);
      }

      return acc;
    })();
  }
  let acc = initialValue;
  let index = 0;

  for (const value of iterable) {
    acc = callbackfn(acc, value, index++) as U;
  }

  return acc;
}
