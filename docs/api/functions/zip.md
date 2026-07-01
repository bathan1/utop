---
title: zip
---

# Function: zip()

> **zip**\<`T`, `O`\>(`iterables`, `options?`): `Generator`\<`ZipOutput`\<`T`, `O`\>\>

Defined in: [zip.ts:208](https://github.com/bathan1/utop.js/blob/723af95e5440c257f10c7355cacfd1ff80d7b58b/src/zip.ts#L208)

`zip(iterables, options?)` yields zip-aggregated elements from `ITERABLES` using `OPTIONS`.
Excess element behavior is determined by `OPTIONS.mode`, where:

- `shortest`: stops when any iterable ends and is also the default
- `longest`: continues until all iterables end
- `strict`: throws if iterables have different lengths

When `MODE = "longest"`, the elements from `PADDING` are used to fill in the gaps.

## Usage
```ts
const months = ["Nov", "Dec"];
const days = [1, 2, 3];

const zipped = zip([months, days]);
for (const [month, day] of zipped) {
  console.log(month, day);
}
```

There is no async sugar for `zip`.

## Examples

## Type Parameters

### T

`T` *extends* readonly `Iterable`\<`unknown`, `any`, `any`\>[]

### O

`O` *extends* `ZipOptions` \| `undefined` = `undefined`

## Parameters

### iterables

readonly \[`T`\]

### options?

`O`

## Returns

`Generator`\<`ZipOutput`\<`T`, `O`\>\>

## Examples

It stops immediately at the shortest iterable
```ts
const logSome = vi.fn((..._: any[]) => void 0);
const logNever = vi.fn((..._: any[]) => void 0);

const zipped = zip([
  ["foo", "bar", "baz"],
  new Set([1, 2]),
  (function* () {
    yield "hello";
    logSome(1);
    yield "world";
    logSome(2);

    yield "NEVER";
    logNever("nope");
  })(),
]);

expect(zipped.toArray()).toEqual([
  ["foo", 1, "hello"],
  ["bar", 2, "world"],
]);
expect(logSome).toHaveBeenCalledTimes(2);
expect(logNever).not.toHaveBeenCalledOnce();
```

It pads with `undefined` when MODE = "longest"` and `PADDING` is omitted
```ts
const zipped = zip(
  [
    ["Nov", "Dec", "Jan", "Feb"],
    [1, 2, 3],
  ] as const,
  { mode: "longest" }
);

expect(zipped.toArray()).toEqual([
  ["Nov", 1],
  ["Dec", 2],
  ["Jan", 3],
  ["Feb", undefined],
]);
```

It maintains `PADDING`'s order when `MODE = "longest"`
```ts
const zipped = zip(
  [
    ["Alice", "Bob", "please", "pad", "me"],
    [100, 101],
  ],
  {
    mode: "longest",
    padding: ["ok", "ok", "ok"],
  }
);

expect(zipped.toArray()).toEqual([
  ["Alice", 100],
  ["Bob", 101],
  ["please", "ok"],
  ["pad", "ok"],
  ["me", "ok"],
]);
```

It pads with `undefined` when `PADDING` is fully consumed prior to finish when `MODE = "longest"`
```ts
const zipped = zip(
  [
    ["Alice", "Bob", "please", "pad", "me"],
    [100, 101],
  ],
  {
    mode: "longest",
    padding: ["ok", "ok"],
  }
);

expect(zipped.toArray()).toEqual([
  ["Alice", 100],
  ["Bob", 101],
  ["please", "ok"],
  ["pad", "ok"],
  ["me", undefined],
]);
```

It throws `TypeError` on unequal lengths when `MODE = "strict"`
```ts
const thisIsGoingTo = zip(
  [
    ["foo", "bar", "baz"],
    [1, 2],
  ],
  { mode: "strict" }
);

expect(thisIsGoingTo).toThrow(TypeError);
```
