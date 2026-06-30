---
title: drop
description: drop(limit, iterable) is ITERABLE with LIMIT elements dropped from the start.
---

`drop(limit, iterable)` is `ITERABLE` with `LIMIT` elements dropped from the start.

## Installation

```bash
pnpm dlx shadcn@latest add bathan1/utop/drop.js
```

## Usage

```ts
import { drop } from "@/lib/utop/drop";
```

```ts
const droppedFirstTwo = [...drop(2, [1, 2, 3, 4, 5])];
console.log(droppedFirstTwo); // logs [3, 4, 5]
```

When `ITERABLE` is async, then this returns an AsyncGenerator instead.

```ts
async function* count(n: number) {
  for (let i = 0; i < n; i++) {
    yield i;
  }
}

const droppedFirstTwoAsync = await Array.fromAsync(
  drop(2, count(5))
);
console.log(droppedFirstTwoAsync); // logs [3, 4, 5]
```

## Examples

It drops the first `LIMIT` values from `ITERABLE`
```ts
const iterable = ["a", "b", "c", "d"];

const dropped = drop(2, iterable);
expect(Array.from(dropped)).toEqual(["c", "d"]);
```

It returns empty when `LIMIT` consumes all of `ITERABLE`
```ts
expect(Array.from(drop(5, ["a", "b", "c"]))).toEqual([]);
```

It returns an AsyncGenerator when `ITERABLE` is also async
```ts
const asyncIterable = async function* () {
  yield "a";
  yield "b";
  yield "c";
  yield "d";
}

const droppedFirstTwo = await Array.fromAsync(drop(2, asyncIterable()));
expect(droppedFirstTwo).toEqual(["c", "d"]);
```

## API Reference

### Call Signature

> **drop**\<`T`\>(`limit`, `iterable`): `AsyncGenerator`\<`T`, `void`, `unknown`\>

Defined in: [drop.ts:60](https://github.com/bathan1/utop.js/blob/17b9b71aa905b6d20aadb7b3219eb62364351b10/src/drop.ts#L60)

#### Type Parameters

##### T

`T`

#### Parameters

##### limit

`number`

##### iterable

`AsyncIterable`\<`T`\>

#### Returns

`AsyncGenerator`\<`T`, `void`, `unknown`\>

### Call Signature

> **drop**\<`T`\>(`limit`, `iterable`): `Generator`\<`T`, `void`, `unknown`\>

Defined in: [drop.ts:64](https://github.com/bathan1/utop.js/blob/17b9b71aa905b6d20aadb7b3219eb62364351b10/src/drop.ts#L64)

#### Type Parameters

##### T

`T`

#### Parameters

##### limit

`number`

##### iterable

`Iterable`\<`T`\>

#### Returns

`Generator`\<`T`, `void`, `unknown`\>
