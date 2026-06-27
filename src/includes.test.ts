import { describe, expect, it } from "vitest";
import { includes } from "./includes.js";

describe("includes(searchElement, iterable, fromIndex?)", () => {
  it("finds values at or after `FROM_INDEX`", () => {
    expect(includes("a", ["a", "b", "a"], 1)).toBe(true);
    expect(includes("a", ["a", "b"], 1)).toBe(false);
  });

  it("uses SameValueZero-style matching for `NaN`", () => {
    expect(includes(NaN, [1, NaN, 3])).toBe(true);
  });
});
