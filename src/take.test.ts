import { describe, expect, it } from "vitest";
import { take } from "./take.js";

describe("take(limit, iterable)", () => {
  it("takes at most `LIMIT` values from `ITERABLE`", () => {
    expect(Array.from(take(2, ["a", "b", "c"]))).toEqual(["a", "b"]);
  });

  it("stops when `ITERABLE` ends before `LIMIT`", () => {
    expect(Array.from(take(5, ["a", "b"]))).toEqual(["a", "b"]);
  });

  it("throws when `LIMIT` is negative and `NaN`", () => {
    expect(() => Array.from(take(-1, ["a", "b"]))).toThrow(RangeError);
    expect(() => Array.from(take(NaN, ["a", "b"]))).toThrow(RangeError);
  });

  it("accepts async `ITERABLE`", async () => {
    async function* count() {
      for (let i = 0; i < 5; i++) {
        yield i + 1;
      }
    }

    expect(await Array.fromAsync(take(2, count()))).toEqual([1, 2])
  })
});
