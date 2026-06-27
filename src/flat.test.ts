import { describe, expect, it } from "vitest";
import { flat } from "./flat.js";

describe("flat(iterable)", () => {
  it("flattens one level of any nested iterables", () => {
    expect([...flat([[1, 2], new Set([3, 4])])]).toEqual([1, 2, 3, 4]);
  });
});
