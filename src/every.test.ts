import { describe, it, expect } from "vitest";
import { every } from "./every.js";
import { forEach } from "./forEach.js";

describe("every(predicate, iterable)", () => {
  it("is `true` when every value matches `PREDICATE`", () => {
    expect(every((x) => x.length > 0, ["a", "bb", "ccc"])).toBe(true);
  });

  it("is `false` when any value does not match `PREDICATE`", () => {
    expect(every((x) => x.length > 0, ["a", "", "ccc"])).toBe(false);
  });

  it("accepts async `ITERABLE`", async () => {
    async function* messageQueue() {
      yield "hello";
      yield "world";
    }

    expect(await every((x) => x.length === 5, messageQueue()));
  });

  it("awaits `PREDICATE` for async `ITERABLE`", async () => {
    async function* values() {
      yield 1;
      yield 2;
    }

    expect(await every(async (value) => value > 0, values())).toBe(true);
  });
});
