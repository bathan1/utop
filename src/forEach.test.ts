import { describe, expect, it, vi } from "vitest";
import { forEach } from "./forEach";

describe("forEach(callbackfn, iterable)", () => {
  it("immediately consumes the iterable", () => {
    const iterable = [1, 2, 3].values();
    forEach(() => void 0, iterable);
  });

  it("consumes async iterables as a Promise", async () => {
    async function* numbers() {
      yield 1;
      yield 2;
      yield 3;
    }

    const logSync = vi.fn();
    const logAsync = vi.fn(async (_: number) => void 0);

    await forEach(logSync, numbers());
    await forEach(logAsync, numbers());

    expect(logSync).toHaveBeenCalledWith(1, 0);
    expect(logSync).toHaveBeenCalledWith(2, 1);
    expect(logSync).toHaveBeenCalledWith(3, 2);

    expect(logAsync).toHaveBeenCalledWith(1, 0);
    expect(logAsync).toHaveBeenCalledWith(2, 1);
    expect(logAsync).toHaveBeenCalledWith(3, 2);
  });
});
