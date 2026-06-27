import { describe, expect, it } from "vitest";
import { sort } from "./sort.js";

describe("sort(compareFn, iterable)", () => {
  it("returns a new sorted array without changing the source", () => {
    const source = [3, 1, 2];
    expect(sort((a, b) => a - b, source)).toEqual([1, 2, 3]);
    expect(source).toEqual([3, 1, 2]);
  });
});
