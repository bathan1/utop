import { describe, expect, it } from "vitest";
import { flatMap } from "./flatMap.js";

describe("flatMap(callbackfn, iterable)", () => {
  it("lazily flattens each callback result", () => {
    expect([...flatMap((value) => [value, value * 2], [1, 2, 3])]).toEqual([1, 2, 2, 4, 3, 6]);
  });

  it("awaits async callbacks and flattens async results for async `ITERABLE`", async () => {
    async function* values() {
      yield 1;
      yield 2;
    }
    const result = flatMap(async (value) => new Set([value, value * 10]), values());
    expect(await Array.fromAsync(result)).toEqual([1, 10, 2, 20]);
  });
});
