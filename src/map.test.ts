import { randomIterableFromArray } from "./-test.helpers.js";
import { describe, expect, it, vi } from "vitest";
import { map } from "./map.js";

describe("map(callbackfn, iterable)", () => {
  it("calls `CALLBACKFN` on demand", () => {
    const callbackfn = vi.fn((x: number) => String(x * 2));
    const iterable = randomIterableFromArray(
      Array.from({ length: Math.ceil(Math.random() * 100) }, (_, i) => i)
    );
    const mapped = map(callbackfn, iterable);

    expect(callbackfn).not.toHaveBeenCalled();
    mapped.next();
    expect(callbackfn).toHaveBeenCalled();
    callbackfn.mockClear();
  });

  it("transforms the awaited values of async `ITERABLE`", async () => {
    const callbackfn = vi.fn((x: number) => String(x * 2));
    async function* count(n: number) {
      for (let i = 0; i < n; i++) {
        yield i + 1;
      }
    }
    const asyncIterable = count(4);
    const doubledText = map(callbackfn, asyncIterable);

    expect(callbackfn).not.toHaveBeenCalled();

    let index = 0;
    for await (const value of doubledText) {
      expect(++index).toEqual(parseInt(value) / 2);
    }
  });

  it("partially applies `CALLBACK_FN` through native `.bind`", async () => {
    function double(x: number) {
      return x * 2;
    }
    const doubleNumbers = map.bind(null, double);

    const syncResult = Array.from(doubleNumbers([1, 2, 3]));
    const asyncResult = await Array.fromAsync(
      doubleNumbers(
        (async function* () {
          yield 1;
          yield 2;
          yield 3;
        })()
      )
    );

    expect(syncResult).toEqual(asyncResult);
    expect(syncResult).toEqual([2, 4, 6]);
  });
});
