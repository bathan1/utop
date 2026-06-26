import { describe, it, expect } from "vitest";
import { find } from "./find.js";

describe("find(callbackfn, iterable)", () => {
  it("returns the first value that satisfies `CALLBACKFN`", () => {
    expect(find((x) => x > 2, [1, 2, 3, 4])).toBe(3);
  });

  it("throws when no value satisfies `CALLBACKFN`", () => {
    expect(() => find((x) => x > 4, [1, 2, 3])).toThrow(RangeError);
  });
  
  it("returns asynchronously when for async ITERABLE even when they also have a sync iterator symbol", () => {
    const iterable = {
      async *[Symbol.asyncIterator]() {
        yield 1;
        yield 2;
        yield 3;
      },
      *[Symbol.iterator]() {
        yield 1;
        yield 2;
        yield 3;
      }
    }

    const syncOverrideNotPromise = find(x => x > 2, iterable);
    expect(syncOverrideNotPromise).not.toBeInstanceOf(Promise);
    expect(syncOverrideNotPromise).toEqual(3);

  })

  it("only returns a Promise when ITERABLE is an async iterable", async () => {
    const iterable = {
      async *[Symbol.asyncIterator]() {
        yield 1;
        yield 2;
        yield 3;
      }
    }

    const promise = find(x => x > 2, iterable);
    expect(promise).toBeInstanceOf(Promise);
    expect(await promise).toEqual(3);

    // no await on async functions it just checks for truthiness immediately
    const notPromise = find(async x => x > 2, [1, 2, 3]);
    expect(notPromise).toEqual(1);
  });
});
