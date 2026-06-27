import { describe, expect, it } from "vitest";
import { perform } from "./perform.js";

describe("perform(iterator)", () => {
  it("consumes an iterator and returns its final value", () => {
    function* work() {
      yield "first";
      yield "second";
      return "done";
    }
    expect(perform(work())).toBe("done");
  });
});
