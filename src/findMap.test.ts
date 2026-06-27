import { describe, expect, it } from "vitest";
import { findMap } from "./findMap.js";

describe("findMap(callbackfn, iterable)", () => {
  it("returns the first defined callback result", () => {
    expect(findMap((value) => (value > 2 ? value * 10 : undefined), [1, 2, 3, 4])).toBe(30);
  });

  it("returns `undefined` when no callback result is defined", () => {
    expect(findMap(() => undefined, [1, 2, 3])).toBeUndefined();
  });
});
