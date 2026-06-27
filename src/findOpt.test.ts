import { describe, expect, it } from "vitest";
import { findOpt } from "./findOpt.js";

describe("findOpt(predicate, iterable)", () => {
  it("returns the first matching value", () => {
    expect(findOpt((value) => value > 2, [1, 2, 3, 4])).toBe(3);
  });

  it("returns `undefined` when no value matches", () => {
    expect(findOpt((value) => value > 4, [1, 2, 3])).toBeUndefined();
  });
});
