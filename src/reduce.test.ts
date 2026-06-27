import { reduce } from "./reduce.js";
import { describe, expect, it } from "vitest";

describe("reduce(callbackfn, initialValue, iterable)", () => {
  it("folds `ITERABLE` into `INITIAL_VALUE`", () => {
    expect(reduce((sum, x) => sum + x, 0, [1, 2, 3])).toBe(6);
  });

  it("passes the index to `CALLBACKFN`", () => {
    expect(reduce((acc, x, i) => [...acc, `${i}:${x}`], [] as string[], ["a", "b"])).toEqual([
      "0:a",
      "1:b",
    ]);
  });

  it("awaits values from `ITERABLE` when it is async along with `CALLBACKFN`", async () => {
    async function* numbers() {
      yield 1;
      yield 2;
      yield 3;
    }

    const result = await reduce(
      async (acc, value, index) => {
        const doubled = await Promise.resolve(value * 2);
        return [...acc, `${index}:${doubled}`];
      },
      [] as string[],
      numbers()
    );

    expect(result).toEqual(["0:2", "1:4", "2:6"]);
  });
});
