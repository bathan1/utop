import { describe, expect, it } from "vitest";
import { join } from "./join.js";

describe("join(separator, iterable, toString?)", () => {
  it("joins transformed values with the separator", () => {
    expect(join(" | ", new Set(["a", "b"]), (value, index) => `${index}:${value}`)).toBe(
      "0:a | 1:b"
    );
  });
});
