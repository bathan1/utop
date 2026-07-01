---
title: partitionMap
description: partitionMap(callbackfn, iterable) separates CALLBACKFN results for ITERABLE into left and right values.
---

# partitionmap

`partitionMap(callbackfn, iterable)` separates `CALLBACKFN` results for `ITERABLE` into left and right values.

## Installation

```bash
pnpm dlx shadcn@latest add bathan1/utop.js/partitionMap
```

## Usage
```ts
const [errors, values] = partitionMap((value) => value < 0
  ? { kind: "left", value: "negative" }
  : { kind: "right", value }, [1, -1, 2]);
```

`partitionMap` provides async sugar over async `ITERABLE`, in which case,
`CALLBACKFN` will also be awaited.

```ts
async function* count() {
  for (let i = 0; i < 3; i++) {
    yield i + 1;
  }
}
const [odds, evens] = await partitionMap(
async (value): Promise<Either<number, number>> =>
  value % 2 === 1
  ? { kind: "left", value }
  : { kind: "right", value },
  count()
);
console.log({ odds, evens });
```

## Examples

It separates left and right result values
```ts
const result = partitionMap(
  (value): Either<string, number> =>
    value < 0
      ? ({ kind: "left", value: `invalid:${value}` } as const)
      : ({ kind: "right", value: value * 2 } as const),
  [1, -1, 2]
);
expect(result).toEqual([["invalid:-1"], [2, 4]]);
```

It supports both sync and async `CALLBACKFN` when `ITERABLE` is async
```ts
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
```

## API Reference

### Call Signature

> **partitionMap**\<`T`, `L`, `R`\>(`callbackfn`, `iterable`): `Promise`\<\[`L`[], `R`[]\]\>

Defined in: [partitionMap.ts:79](https://github.com/bathan1/utop.js/blob/125dbb4fad39d300a5134b78adea5914856f4dcf/src/partitionMap.ts#L79)

#### Type Parameters

##### T

`T`

##### L

`L`

##### R

`R`

#### Parameters

##### callbackfn

(`value`, `index`) => [`Promisable`](../type-aliases/Promisable.md)\<[`Either`](../type-aliases/Either.md)\<`L`, `R`\>\>

##### iterable

`AsyncIterable`\<`T`\>

#### Returns

`Promise`\<\[`L`[], `R`[]\]\>

### Call Signature

> **partitionMap**\<`T`, `L`, `R`\>(`callbackfn`, `iterable`): \[`L`[], `R`[]\]

Defined in: [partitionMap.ts:83](https://github.com/bathan1/utop.js/blob/125dbb4fad39d300a5134b78adea5914856f4dcf/src/partitionMap.ts#L83)

#### Type Parameters

##### T

`T`

##### L

`L`

##### R

`R`

#### Parameters

##### callbackfn

(`value`, `index`) => [`Either`](../type-aliases/Either.md)\<`L`, `R`\>

##### iterable

`Iterable`\<`T`\>

#### Returns

\[`L`[], `R`[]\]
