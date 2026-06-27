/**
 * `ZipValue<T>` is the element type of `T` for {@link Iterable} `T`
 */
type ZipValue<T> = T extends Iterable<infer V> ? V : never;

/**
 * Options for
 * - `"shortest"` means stop as soon as the first iterable is fully consumed
 * - `"longest"` means go until the longest iterable is consumed
 * - `"strict"` means throw when iterables don't have equal lengths
 */
type ZipMode = "shortest" | "longest" | "strict";

type ZipOptions = {
  mode?: ZipMode;
  padding?: Iterable<unknown>;
};

type IsTuple<T extends readonly unknown[]> = number extends T["length"] ? false : true;

type TupleKeys<T extends readonly unknown[]> = Exclude<keyof T, keyof (readonly unknown[])>;

type ZipValues<T extends readonly Iterable<unknown>[]> = {
  -readonly [K in keyof T]: ZipValue<T[K]>;
};

type ZipIndexed<T extends readonly Iterable<unknown>[]> = T[0] extends readonly unknown[]
  ? IsTuple<T[0]> extends true
    ? {
        [K in TupleKeys<T[0]>]: {
          -readonly [I in keyof T]: T[I] extends readonly unknown[]
            ? K extends keyof T[I]
              ? T[I][K]
              : never
            : never;
        };
      }[TupleKeys<T[0]>]
    : ZipValues<T>
  : ZipValues<T>;

type TupleKeysOfAny<T extends readonly Iterable<unknown>[]> = {
  [I in keyof T]: T[I] extends readonly unknown[] ? TupleKeys<T[I]> : never;
}[number];

type ZipPadding<O extends ZipOptions | undefined> = O extends {
  padding: infer P extends Iterable<unknown>;
}
  ? [ZipValue<P>] extends [never]
    ? undefined
    : ZipValue<P>
  : undefined;

type ZipValuesLongest<T extends readonly Iterable<unknown>[], P> = {
  -readonly [K in keyof T]: ZipValue<T[K]> | P;
};

type ZipIndexedLongest<T extends readonly Iterable<unknown>[], P> = T[0] extends readonly unknown[]
  ? IsTuple<T[0]> extends true
    ? {
        [K in TupleKeysOfAny<T>]: {
          -readonly [I in keyof T]: T[I] extends readonly unknown[]
            ? K extends keyof T[I]
              ? T[I][K]
              : P
            : ZipValue<T[I]> | P;
        };
      }[TupleKeysOfAny<T>]
    : ZipValuesLongest<T, P>
  : ZipValuesLongest<T, P>;

type ZipOutput<
  T extends readonly Iterable<unknown>[],
  O extends ZipOptions | undefined,
> = O extends { mode: "longest" } ? ZipIndexedLongest<T, ZipPadding<O>> : ZipIndexed<T>;

/**
 * `zip(iterables, { mode?; padding? }?)` yields zip-aggregated elements from `ITERABLES`
 * with excess element behavior determined based on `MODE`, if provided, where:
 *
 * - `shortest`: stops when any iterable ends and is also the default
 * - `longest`: continues until all iterables end
 * - `strict`: throws if iterables have different lengths
 *
 * When `MODE = "longest"`, the elements from `PADDING` are used to fill in the gaps.
 *
 * ### Installation
 * ```bash
 * pnpm dlx shadcn@latest add bathan1/utop/zip.js
 * ```
 *
 * ### Usage
 * ```ts
 * import { zip } from "@/lib/utop/zip.js";
 * ```
 *
 * ```ts
 * const months = ["Nov", "Dec"];
 * const days = [1, 2, 3];
 *
 * const zipped = zip([months, days]);
 * for (const [month, day] of zipped) {
 *   console.log(month, day);
 * }
 * ```
 *
 * There is no async sugar for `zip`.
 *
 * ### Examples
 *
 * @example
 * It stops immediately at the shortest iterable
 * ```ts
 * const logSome = vi.fn((..._: any[]) => void 0);
 * const logNever = vi.fn((..._: any[]) => void 0);
 *
 * const zipped = zip([
 *   ["foo", "bar", "baz"],
 *   new Set([1, 2]),
 *   (function* () {
 *     yield "hello";
 *     logSome(1);
 *     yield "world";
 *     logSome(2);
 *
 *     yield "NEVER";
 *     logNever("nope");
 *   })(),
 * ]);
 *
 * expect(zipped.toArray()).toEqual([
 *   ["foo", 1, "hello"],
 *   ["bar", 2, "world"],
 * ]);
 * expect(logSome).toHaveBeenCalledTimes(2);
 * expect(logNever).not.toHaveBeenCalledOnce();
 * ```
 *
 * @example
 * It pads with `undefined` when MODE = "longest"` and `PADDING` is omitted
 * ```ts
 * const zipped = zip(
 *   [
 *     ["Nov", "Dec", "Jan", "Feb"],
 *     [1, 2, 3],
 *   ] as const,
 *   { mode: "longest" }
 * );
 *
 * expect(zipped.toArray()).toEqual([
 *   ["Nov", 1],
 *   ["Dec", 2],
 *   ["Jan", 3],
 *   ["Feb", undefined],
 * ]);
 * ```
 *
 * @example
 * It maintains `PADDING`'s order when `MODE = "longest"`
 * ```ts
 * const zipped = zip(
 *   [
 *     ["Alice", "Bob", "please", "pad", "me"],
 *     [100, 101],
 *   ],
 *   {
 *     mode: "longest",
 *     padding: ["ok", "ok", "ok"],
 *   }
 * );
 *
 * expect(zipped.toArray()).toEqual([
 *   ["Alice", 100],
 *   ["Bob", 101],
 *   ["please", "ok"],
 *   ["pad", "ok"],
 *   ["me", "ok"],
 * ]);
 * ```
 *
 * @example
 * It pads with `undefined` when `PADDING` is fully consumed prior to finish when `MODE = "longest"`
 * ```ts
 * const zipped = zip(
 *   [
 *     ["Alice", "Bob", "please", "pad", "me"],
 *     [100, 101],
 *   ],
 *   {
 *     mode: "longest",
 *     padding: ["ok", "ok"],
 *   }
 * );
 *
 * expect(zipped.toArray()).toEqual([
 *   ["Alice", 100],
 *   ["Bob", 101],
 *   ["please", "ok"],
 *   ["pad", "ok"],
 *   ["me", undefined],
 * ]);
 * ```
 *
 * @example
 * It throws `TypeError` on unequal lengths when `MODE = "strict"`
 * ```ts
 * const thisIsGoingTo = zip(
 *   [
 *     ["foo", "bar", "baz"],
 *     [1, 2],
 *   ],
 *   { mode: "strict" }
 * );
 *
 * expect(thisIsGoingTo).toThrow(TypeError);
 * ```
 */
export function* zip<
  T extends readonly Iterable<unknown>[],
  O extends ZipOptions | undefined = undefined,
>(iterables: readonly [...T], options?: O): Generator<ZipOutput<T, O>> {
  const mode = options?.mode ?? "shortest";
  const padding = options?.padding;
  const iterators = iterables.map((xs) => xs[Symbol.iterator]());
  const paddingIterator = padding?.[Symbol.iterator]();

  while (true) {
    const results = iterators.map((it) => it.next());
    const doneCount = results.filter((r) => r.done).length;

    if (doneCount === iterators.length) {
      return;
    }

    if (doneCount > 0) {
      if (mode === "shortest") {
        return;
      }

      if (mode === "strict") {
        throw new TypeError("Cannot zip iterables with different lengths");
      }
    }

    yield results.map((result) => {
      if (!result.done) {
        return result.value;
      }

      return paddingIterator?.next().value;
    }) as any as ZipOutput<T, O>;
  }
}
