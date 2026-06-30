---
title: partitionMap
description: partitionMap(callbackfn, iterable) separates CALLBACKFN results for ITERABLE into left and right values.
---

`partitionMap(callbackfn, iterable)` separates `CALLBACKFN` results for `ITERABLE` into left and right values.

## Installation

```bash
pnpm dlx shadcn@latest add bathan1/utop/partitionMap.js
```

## Usage

```ts
import { partitionMap } from "@/lib/utop/partitionMap";
```

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

## API Reference

### Call Signature

> **partitionMap**\<`T`, `L`, `R`\>(`callbackfn`, `iterable`): `Promise`\<\[`L`[], `R`[]\]\>

Defined in: [partitionMap.ts:47](https://github.com/bathan1/utop.js/blob/17b9b71aa905b6d20aadb7b3219eb62364351b10/src/partitionMap.ts#L47)

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

Defined in: [partitionMap.ts:51](https://github.com/bathan1/utop.js/blob/17b9b71aa905b6d20aadb7b3219eb62364351b10/src/partitionMap.ts#L51)

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
