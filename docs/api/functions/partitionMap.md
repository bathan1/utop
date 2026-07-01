---
title: partitionMap
---

# Function: partitionMap()

## Call Signature

> **partitionMap**\<`T`, `L`, `R`\>(`callbackfn`, `iterable`): `Promise`\<\[`L`[], `R`[]\]\>

Defined in: [partitionMap.ts:47](https://github.com/bathan1/utop.js/blob/723af95e5440c257f10c7355cacfd1ff80d7b58b/src/partitionMap.ts#L47)

`partitionMap(callbackfn, iterable)` separates `CALLBACKFN` results for `ITERABLE` into left and right values.

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

### Type Parameters

#### T

`T`

#### L

`L`

#### R

`R`

### Parameters

#### callbackfn

(`value`, `index`) => [`Promisable`](../type-aliases/Promisable.md)\<[`Either`](../type-aliases/Either.md)\<`L`, `R`\>\>

#### iterable

`AsyncIterable`\<`T`\>

### Returns

`Promise`\<\[`L`[], `R`[]\]\>

### Example

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

## Call Signature

> **partitionMap**\<`T`, `L`, `R`\>(`callbackfn`, `iterable`): \[`L`[], `R`[]\]

Defined in: [partitionMap.ts:51](https://github.com/bathan1/utop.js/blob/723af95e5440c257f10c7355cacfd1ff80d7b58b/src/partitionMap.ts#L51)

`partitionMap(callbackfn, iterable)` separates `CALLBACKFN` results for `ITERABLE` into left and right values.

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

### Type Parameters

#### T

`T`

#### L

`L`

#### R

`R`

### Parameters

#### callbackfn

(`value`, `index`) => [`Either`](../type-aliases/Either.md)\<`L`, `R`\>

#### iterable

`Iterable`\<`T`\>

### Returns

\[`L`[], `R`[]\]

### Example

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
