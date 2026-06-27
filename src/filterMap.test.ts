import { describe, expect, it } from "vitest";
import { filterMap } from "./filterMap.js";

describe("filterMap(callbackfn, iterable)", () => {
  it("yields only defined callback results", () => {
    expect([
      ...filterMap((value) => (value % 2 ? undefined : String(value)), [1, 2, 3, 4]),
    ]).toEqual(["2", "4"]);
  });
});
