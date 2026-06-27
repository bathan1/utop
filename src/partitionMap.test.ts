import { describe, expect, it } from "vitest";
import { type Either, partitionMap } from "./partitionMap.js";

describe("partitionMap(callbackfn, iterable)", () => {
  it("separates left and right result values", () => {
    const result = partitionMap(
      (value): Either<string, number> =>
        value < 0
          ? ({ kind: "left", value: `invalid:${value}` } as const)
          : ({ kind: "right", value: value * 2 } as const),
      [1, -1, 2]
    );
    expect(result).toEqual([["invalid:-1"], [2, 4]]);
  });
});
