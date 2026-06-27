import { describe, expect, it } from "vitest";
import { some } from "./some.js";

describe("some(predicate, iterable)", () => {
  it("short-circuits when a value satisfies `PREDICATE`", () => {
    expect(some((value) => value > 2, [1, 2, 3, 4])).toBe(true);
    expect(some((value) => value > 4, [1, 2, 3, 4])).toBe(false);
  });

  it("awaits `PREDICATE` when `ITERABLE` is async", async () => {
    async function* values() {
      yield 1;
      yield 2;
      yield 3;
    }
    expect(await some(async (value) => value === 2, values())).toBe(true);
  });
});
