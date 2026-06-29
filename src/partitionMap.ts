export type Either<L, R> = { kind: "left"; value: L } | { kind: "right"; value: R };

/**
 * `partitionMap(callbackfn, iterable)` separates `CALLBACKFN` results for `ITERABLE` into left and right values.
 *
 * ### Usage
 * ```ts
 * const [errors, values] = partitionMap((value) => value < 0
 *   ? { kind: "left", value: "negative" }
 *   : { kind: "right", value }, [1, -1, 2]);
 * ```
 *
 * `partitionMap` has no async sugar; materialize async input before calling it.
 *
 * ```ts
 * const [errors, values] = partitionMap(classify, await Array.fromAsync(values()));
 * ```
 *
 * ### Examples
 *
 * @example
 * It separates left and right result values
 * ```ts
 * const result = partitionMap(
 *   (value): Either<string, number> =>
 *     value < 0
 *       ? ({ kind: "left", value: `invalid:${value}` } as const)
 *       : ({ kind: "right", value: value * 2 } as const),
 *   [1, -1, 2]
 * );
 * expect(result).toEqual([["invalid:-1"], [2, 4]]);
 * ```
 */
export function partitionMap<T, L, R>(
  callbackfn: (value: T, index: number) => Either<L, R>,
  iterable: Iterable<T>
): [lefts: L[], rights: R[]] {
  let index = 0;
  const lefts: L[] = [];
  const rights: R[] = [];
  for (const value of iterable) {
    const result = callbackfn(value, index++);
    if (result.kind === "left") lefts.push(result.value);
    else rights.push(result.value);
  }
  return [lefts, rights];
}
