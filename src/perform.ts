/**
 * `perform(iterator)` consumes `ITERATOR` and returns its final return value.
 *
 * ### Usage
 * ```ts
 * function* work() { yield "working"; return "done"; }
 * const result = perform(work());
 * ```
 *
 * `perform` has no async sugar; consume an async iterator with `for await`.
 *
 * ```ts
 * for await (const event of events()) console.log(event);
 * ```
 *
 * ### Examples
 *
 * @example
 * It consumes an iterator and returns its final value
 * ```ts
 * function* work() {
 *   yield "first";
 *   yield "second";
 *   return "done";
 * }
 * expect(perform(work())).toBe("done");
 * ```
 */
export function perform<T, R>(iterator: Iterator<T, R, unknown> | Iterable<T, R, unknown>): R {
  const target = "next" in iterator ? iterator : iterator[Symbol.iterator]();
  let result = target.next();
  while (!result.done) result = target.next();
  return result.value;
}
