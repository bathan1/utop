import { describe, expect, it } from "vitest";
import { partition } from "./partition.js";

describe("partition(predicate, iterable)", () => {
  it("separates matching and non-matching values", () => {
    expect(partition((value) => value % 2 === 0, [1, 2, 3, 4])).toEqual([
      [2, 4],
      [1, 3],
    ]);
  });
});
