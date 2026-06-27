import { describe, expect, it } from "vitest";
import { orderBy } from "./orderBy.js";

describe("orderBy(keys, direction, iterable)", () => {
  it("sorts by later keys when earlier keys are equal", () => {
    const rows = [
      { group: "b", score: 1 },
      { group: "a", score: 2 },
      { group: "a", score: 1 },
    ];
    expect(orderBy(["group", "score"], "asc", rows)).toEqual([
      { group: "a", score: 1 },
      { group: "a", score: 2 },
      { group: "b", score: 1 },
    ]);
  });
});
