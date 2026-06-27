import { describe, expect, it } from "vitest";
import { sortUniq } from "./sortUniq.js";

describe("sortUniq(compareFn, iterable)", () => {
  it("sorts and removes comparator-equal values", () => {
    expect(sortUniq((a, b) => a - b, [3, 1, 2, 3, 1])).toEqual([1, 2, 3]);
  });
});
