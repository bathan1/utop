import {
  chunk,
  drop,
  every,
  filter,
  filterMap,
  find,
  findMap,
  findOpt,
  flat,
  flatMap,
  forEach,
  includes,
  join,
  map,
  orderBy,
  partition,
  partitionMap,
  reduce,
  some,
  sort,
  sortUniq,
  take,
} from "./utop.js";
import { Left, None, Right } from "./utop.types.js";
import { describe, expect, it, vi } from "vitest";

function* infinite() {
  let i = 0;
  while (true) {
    yield i++;
  }
}

function createRandomIterable<T>(xs: T[]) {
  const n = Math.floor(Math.random() * 8);

  switch (n) {
    case 0:
      return xs;
    case 1:
      return xs.values();
    case 2:
      return new Set(xs);
    case 3:
      return new Set(xs).values();
    case 4:
      return new Map(xs.map((x) => [x, x])).keys();
    case 5:
      return new Map(xs.map((x) => [x, x])).values();
    case 6:
      return (function* () {
        yield* xs;
      })();
    default:
      return {
        [Symbol.iterator](): Iterator<T> {
          let i = 0;

          return {
            next(): IteratorResult<T> {
              if (i >= xs.length) {
                return { done: true, value: undefined };
              }

              return { done: false, value: xs[i++]! };
            },
          };
        },
      };
  }
}

describe("chunk(limit, xs)", () => {
  it("yields arrays of max size `LIMIT`", () => {
    const limit = Math.ceil(Math.random() * 100);
    const randomLength = Math.ceil(Math.random() * limit);
    const xs = createRandomIterable(take(randomLength, infinite()).toArray());

    const chunked = Array.from(chunk(limit, xs));
    chunked.forEach((array) => expect(array.length).toBeLessThanOrEqual(limit));
  });

  it("throws RangeError when `LIMIT` is non-positive", () => {
    const limit = Math.random() < 0.5 ? -1 : -1.123;
    const xs = createRandomIterable([1, 2]);

    const chunked = () => Array.from(chunk(limit, xs));
    expect(chunked).toThrow(RangeError);
  });
});

describe("drop(limit, xs)", () => {
  it("drops the first `LIMIT` values from `XS`", () => {
    const xs = createRandomIterable(["a", "b", "c", "d"]);

    const dropped = drop(2, xs);
    expect(Array.from(dropped)).toEqual(["c", "d"]);
  });

  it("returns empty when `LIMIT` consumes all of `XS`", () => {
    expect(Array.from(drop(5, ["a", "b", "c"]))).toEqual([]);
  });
});

describe("filter(f, xs)", () => {
  it("calls `F` on demand", () => {
    const f = vi.fn((x: number) => x % 2 === 0);
    const xs = createRandomIterable(
      Array.from({ length: Math.ceil(Math.random() * 100) }, (_, i) => i)
    );

    const mapped = filter(f, xs);
    expect(f).not.toHaveBeenCalled();
    mapped.next();
    expect(f).toHaveBeenCalled();
    f.mockClear();
  });
});

describe("filterMap(f, xs)", () => {
  it("calls `F` on demand", () => {
    const f = vi.fn((x: number) => (x % 2 === 0 ? String(x) : None));
    const xs = Array.from({ length: Math.ceil(Math.random() * 100) }, (_, i) => i);

    const xss = [xs, xs.values(), new Set(xs), new Set(xs).values()];

    xss.forEach((xs) => {
      const mapped = filterMap(f, xs);
      expect(f).not.toHaveBeenCalled();
      mapped.next();
      expect(f).toHaveBeenCalled();
      f.mockClear();
    });
  });

  it("removes any x in `XS` where `F(x)` is not well-defined", () => {
    const f = vi.fn((x: number) => (x % 2 === 0 ? String(x) : None));
    const xs = [2, 10, 1, 3, 5, 7, 9];
    const f2 = vi.fn((x: number) => (x % 2 === 0 ? String(x) : null));

    const xss = [() => xs, () => xs.values(), () => new Set(xs), () => new Set(xs).values()];

    xss.forEach((make) => {
      const xs = make();
      const result = Array.from(filterMap(f, xs));
      expect(result.length).toEqual(2);
      expect(result).toEqual(["2", "10"]);

      // null is also treated as None
      const xs2 = make();
      const result2 = Array.from(filterMap(f2, xs2));
      expect(result2).toEqual(["2", "10"]);
    });
  });
});

describe("find(f, xs)", () => {
  it("returns the first value that satisfies `F`", () => {
    expect(find((x) => x > 2, [1, 2, 3, 4])).toBe(3);
  });

  it("throws when no value satisfies `F`", () => {
    expect(() => find((x) => x > 4, [1, 2, 3])).toThrow(RangeError);
  });
});

describe("findMap(f, xs)", () => {
  it("returns the first Some result from `F`", () => {
    expect(findMap((x) => (x > 2 ? x * 10 : None), [1, 2, 3, 4])).toBe(30);
  });

  it("returns None when `F` never returns Some", () => {
    expect(findMap(() => None, [1, 2, 3])).toBe(None);
  });
});

describe("findOpt(f, xs)", () => {
  it("returns the first value that satisfies `F`", () => {
    expect(findOpt((x) => x > 2, [1, 2, 3, 4])).toBe(3);
  });

  it("returns None when no value satisfies `F`", () => {
    expect(findOpt((x) => x > 4, [1, 2, 3])).toBe(None);
  });
});

describe("flat(xs2)", () => {
  it("doesn't flatten each xs from XS2 until needed", () => {
    function* top() {
      yield 1;
      log("yielded 1");
      yield 2;
      log("yielded 2");
    }

    function* bottom() {
      yield 3;
      log("yielded 3");
      yield 4;
      log("yielded 4");
    }

    const log = vi.fn((..._: any[]) => void 0);

    const cases = [
      () => [top(), bottom()],
      () => [top(), bottom()].values(),
      () => new Set([top(), bottom()]),
      () => new Set(new Set([top(), bottom()])),
    ];

    cases.forEach((xs2) => {
      const flattened = flat(xs2());

      expect(log).not.toHaveBeenCalled();

      expect(flattened.next()).toEqual({ value: 1, done: false });
      expect(log).not.toHaveBeenCalled();

      expect(flattened.next()).toEqual({ value: 2, done: false });
      expect(log).toHaveBeenCalledWith("yielded 1");

      expect(flattened.next()).toEqual({ value: 3, done: false });
      expect(log).toHaveBeenCalledWith("yielded 2");

      expect(flattened.next()).toEqual({ value: 4, done: false });
      expect(log).toHaveBeenCalledWith("yielded 3");

      expect(flattened.next()).toEqual({ value: undefined, done: true });
      expect(log).toHaveBeenCalledWith("yielded 4");

      log.mockClear();
    });
  });
});

describe("flatMap(f, xs)", () => {
  it("calls `F` on demand", () => {
    const f = vi.fn((x: number) => [x * 2, x * 4]);
    const data = Array.from({ length: Math.ceil(Math.random() * 100) }, (_, i) => i);

    const iterables = [data, data.values(), new Set(data), new Set(data).values()];

    iterables.forEach((xs) => {
      const mapped = flatMap(f, xs);
      expect(f).not.toHaveBeenCalled();
      mapped.next();
      expect(f).toHaveBeenCalled();
      f.mockClear();
    });
  });

  it("accepts any iterable returned by `F`", () => {
    const fs = [
      (x: number) => [x * 2, x * 2],
      (x: number) => [x * 2, x * 2].values(),
      (x: number) => new Set([x * 2, x * 2]),
      (x: number) => new Set([x * 2, x * 2]).values(),
    ] as const;
    const data = Array.from({ length: Math.ceil(Math.random() * 100) }, (_, i) => i);

    for (const makeXs of [
      () => data,
      () => data.values(),
      () => new Set(data),
      () => new Set(data).values(),
    ] as const) {
      for (const f of fs) {
        const input = makeXs();
        const expected = Array.from(makeXs()).flatMap((x) => Array.from(f(x)));
        const actual = Array.from(flatMap(f, input));

        expect(actual).toEqual(expected);
      }
    }
  });
});

describe("forEach(f, xs)", () => {
  it("calls `F` immediately for each value", () => {
    const values: string[] = [];

    forEach(
      (x) => {
        values.push(x);
      },
      ["a", "b", "c"]
    );

    expect(values).toEqual(["a", "b", "c"]);
  });

  it("passes the index to `F`", () => {
    const values: string[] = [];

    forEach(
      (x, i) => {
        values.push(`${i}:${x}`);
      },
      ["a", "b"]
    );

    expect(values).toEqual(["0:a", "1:b"]);
  });
});

describe("includes(searchElement, xs, fromIndex?)", () => {
  it("returns true when `SEARCH` is in `XS`", () => {
    expect(includes("b", ["a", "b", "c"])).toBe(true);
  });

  it("starts searching from `FROM_INDEX`", () => {
    expect(includes("a", ["a", "b", "a"], 1)).toBe(true);
  });

  it("returns false when `SEARCH_ELEMENT` only appears before `FROM_INDEX`", () => {
    expect(includes("a", ["a", "b", "c"], 1)).toBe(false);
  });

  it("matches NaN", () => {
    expect(includes(NaN, [1, NaN, 3])).toBe(true);
  });
});

describe("join(sep, xs, toString?)", () => {
  it("joins common iterable types", () => {
    const xs = [1, 2, 3];

    const xss = [
      xs,
      xs.values(),
      new Set(xs),
      new Set(xs).values(),
      new Map(xs.map((x) => [x, x * 2])).keys(),
    ];

    xss.forEach((xs) => {
      expect(join(", ", xs)).toBe("1, 2, 3");
    });
  });

  it("applies `TO_STRING` with the current index", () => {
    const xs = new Set(["a", "b", "c"]);

    expect(join(" | ", xs, (x, i) => `${i}:${x.toUpperCase()}`)).toBe("0:A | 1:B | 2:C");
  });

  it("drains one-shot iterators", () => {
    const xs = [1, 2, 3].values();

    expect(join("-", xs)).toBe("1-2-3");
    expect(join("-", xs)).toBe("");
  });

  it("drains generators", () => {
    function* numbers() {
      yield 1;
      yield 2;
      yield 3;
    }

    const xs = numbers();

    expect(join("/", xs)).toBe("1/2/3");
    expect(Array.from(xs)).toEqual([]);
  });

  it("calls `TO_STRING` eagerly because join drains `XS`", () => {
    const f = vi.fn((x: number) => String(x * 2));
    const xs = [1, 2, 3].values();

    expect(join(", ", xs, f)).toBe("2, 4, 6");

    expect(f).toHaveBeenCalledTimes(3);
    expect(Array.from(xs)).toEqual([]);
  });
});

describe("map(f, xs)", () => {
  it("calls `F` on demand", () => {
    const f = vi.fn((x: number) => String(x * 2));
    const xs = createRandomIterable(
      Array.from({ length: Math.ceil(Math.random() * 100) }, (_, i) => i)
    );
    const mapped = map(f, xs);
    expect(f).not.toHaveBeenCalled();
    mapped.next();
    expect(f).toHaveBeenCalled();
    f.mockClear();
  });
});

describe("orderBy(keys, dir, xs)", () => {
  const rows = [
    { name: "b", score: 2, active: false, createdAt: new Date("2024-01-02") },
    { name: "a", score: 3, active: true, createdAt: new Date("2024-01-03") },
    { name: "c", score: 1, active: false, createdAt: new Date("2024-01-01") },
  ];

  it("sorts strings ascending", () => {
    expect(orderBy(["name"], "asc", rows).map((x) => x.name)).toEqual(["a", "b", "c"]);
  });

  it("sorts numbers descending", () => {
    expect(orderBy(["score"], "desc", rows).map((x) => x.score)).toEqual([3, 2, 1]);
  });

  it("sorts booleans ascending", () => {
    expect(orderBy(["active"], "asc", rows).map((x) => x.active)).toEqual([false, false, true]);
  });

  it("sorts dates ascending", () => {
    expect(orderBy(["createdAt"], "asc", rows).map((x) => x.createdAt.toISOString())).toEqual([
      "2024-01-01T00:00:00.000Z",
      "2024-01-02T00:00:00.000Z",
      "2024-01-03T00:00:00.000Z",
    ]);
  });

  it("uses later keys to break ties", () => {
    const xs = [
      { group: "a", score: 2 },
      { group: "b", score: 1 },
      { group: "a", score: 1 },
      { group: "b", score: 2 },
    ];

    expect(orderBy(["group", "score"], "asc", xs)).toMatchObject([
      { group: "a", score: 1 },
      { group: "a", score: 2 },
      { group: "b", score: 1 },
      { group: "b", score: 2 },
    ]);
  });

  it("works on any iterable and drains one-shot iterators", () => {
    const xs = rows.values();

    expect(orderBy(["score"], "asc", xs).map((x) => x.score)).toEqual([1, 2, 3]);
    expect(Array.from(xs)).toEqual([]);
  });

  it("returns a new sorted array without mutating the source array", () => {
    const xs = [...rows];

    expect(orderBy(["score"], "asc", xs)).not.toBe(xs);
    expect(xs.map((x) => x.score)).toEqual([2, 3, 1]);
  });

  it("returns empty and single-item iterables as arrays", () => {
    expect(orderBy(["score"], "asc", [] as typeof rows)).toEqual([]);
    expect(orderBy(["score"], "asc", [rows[0]!])).toEqual([rows[0]]);
  });
});

describe("partition", () => {
  it("splits lefts and rights", () => {
    const f = (x: number | string) => typeof x === "string";

    const xs = take(10, infinite())
      .map((x) => (x % 2 === 0 ? String(x) : x))
      .toArray();
    const [evens, odds] = partition(f, xs);

    evens.forEach((e) => expect(typeof e).toEqual("string"));
    odds.forEach((e) => expect(typeof e).toEqual("number"));

    expect(evens).toEqual(["0", "2", "4", "6", "8"]);
    expect(odds).toEqual([1, 3, 5, 7, 9]);
  });
});

describe("partitionMap", () => {
  it("splits lefts and rights", () => {
    function* range() {
      let i = 0;
      while (true) {
        yield i++;
      }
    }
    const xs = createRandomIterable(
      take(10, range())
        .map((x) => (x % 2 === 0 ? Left(String(x)) : Right(x)))
        .toArray()
    );
    const [evens, odds] = partitionMap((x) => x, xs);
    evens.forEach((e) => expect(typeof e).toEqual("string"));
    odds.forEach((e) => expect(typeof e).toEqual("number"));

    expect(evens).toEqual(["0", "2", "4", "6", "8"]);
    expect(odds).toEqual([1, 3, 5, 7, 9]);
  });
});

describe.todo("perform(it)");

describe("reduce(f, init, xs)", () => {
  it("folds `XS` into `INIT`", () => {
    expect(reduce((sum, x) => sum + x, 0, [1, 2, 3])).toBe(6);
  });

  it("passes the index to `F`", () => {
    expect(reduce((acc, x, i) => [...acc, `${i}:${x}`], [] as string[], ["a", "b"])).toEqual([
      "0:a",
      "1:b",
    ]);
  });
});

describe("some(f, xs)", () => {
  it("returns true when some value satisfies `F`", () => {
    expect(some((x) => x > 2, [1, 2, 3])).toBe(true);
  });

  it("returns false when no value satisfies `F`", () => {
    expect(some((x) => x > 3, [1, 2, 3])).toBe(false);
  });
});

describe("sort(compare, xs)", () => {
  it("returns a new object", () => {
    const xs = createRandomIterable([4, 2, 5, 1, 3]);

    const ys = sort((a, b) => a - b, xs);
    expect(ys).not.toBe(xs);
  });
});

describe("sortUniq(compare, xs)", () => {
  it("returns a new deduped array", () => {
    function compare(a: number, b: number) {
      return a - b;
    }
    const xs = createRandomIterable([1, 1, 2, 2, 3, 5, 5, 4, 4, 4, 4]);

    const deduped = sortUniq(compare, xs);
    expect(deduped).toEqual([1, 2, 3, 4, 5]);
  });
});

describe("take(limit, xs)", () => {
  it("takes at most LIMIT values from XS", () => {
    expect(Array.from(take(2, ["a", "b", "c"]))).toEqual(["a", "b"]);
  });

  it("stops when XS ends before LIMIT", () => {
    expect(Array.from(take(5, ["a", "b"]))).toEqual(["a", "b"]);
  });

  it("throws when LIMIT is negative and NaN", () => {
    expect(() => Array.from(take(-1, ["a", "b"]))).toThrow(RangeError);
    expect(() => Array.from(take(NaN, ["a", "b"]))).toThrow(RangeError);
  });
});
