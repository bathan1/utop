import { chunk } from "./chunk.js";
import { take } from "./take.js";
import { describe, expect, it } from "vitest";
import { randomIterableFromArray } from "./-test.helpers.js";

describe("chunk(limit, iterable)", () => {
  it("yields arrays of max size `LIMIT`", () => {
    function* infinite() {
      let i = 0;
      while (true) {
        yield i++;
      }
    }
    const limit = Math.ceil(Math.random() * 100);
    const randomLength = Math.ceil(Math.random() * limit);
    const iterable = randomIterableFromArray(take(randomLength, infinite()).toArray());

    const chunked = Array.from(chunk(limit, iterable));
    chunked.forEach((array) => expect(array.length).toBeLessThanOrEqual(limit));
  });

  it("throws RangeError when `LIMIT` is non-positive", () => {
    const limit = Math.random() < 0.5 ? -1 : -1.123;
    const iterable = randomIterableFromArray([1, 2]);

    const chunked = () => Array.from(chunk(limit, iterable));
    expect(chunked).toThrow(RangeError);
  });

  it("chunks async iterables", async () => {
    async function* count(n: number) {
      for (let i = 0; i < n; i++) {
        yield i + 1;
      }
    }

    const limit = 2;
    const asyncIterable = count(10);

    const chunked = await Array.fromAsync(chunk(limit, asyncIterable));
    expect(chunked).toEqual([
      [1, 2],
      [3, 4],
      [5, 6],
      [7, 8],
      [9, 10]
    ]);
  });
});
