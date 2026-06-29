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

  it("supports both sync and async `CALLBACKFN` when `ITERABLE` is async", async () => {
    async function* values() {
      yield 1;
      yield -1;
      yield 2;
      yield -2;
    }

    const syncResult = await partitionMap(
      (value): Either<string, number> =>
        value < 0
          ? { kind: "left", value: `invalid:${value}` }
          : { kind: "right", value: value * 2 },
      values()
    );

    expect(syncResult).toEqual([
      ["invalid:-1", "invalid:-2"],
      [2, 4],
    ]);

    const asyncResult = await partitionMap(
      async (value): Promise<Either<string, number>> =>
        value < 0
          ? { kind: "left", value: `invalid:${value}` }
          : { kind: "right", value: value * 2 },
      values()
    );

    expect(asyncResult).toEqual(syncResult);
  });
});
