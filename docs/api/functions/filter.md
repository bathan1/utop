---
title: filter
description: filter(predicate, iterable) lazily yields the values in ITERABLE that satisfy PREDICATE.
---

`filter(predicate, iterable)` lazily yields the values in `ITERABLE` that satisfy `PREDICATE`.

## Installation

```bash
pnpm dlx shadcn@latest add bathan1/utop/filter.js
```

## Usage

```ts
import { filter } from "@/lib/utop/filter";
```

```ts
const even = [...filter((value) => value % 2 === 0, [1, 2, 3, 4])];
```

For an async `ITERABLE`, `filter` returns an AsyncGenerator and awaits `PREDICATE`.

```ts
const available = await Array.fromAsync(filter(async (id) => (await fetch(`/items/${id}`)).ok, ids()));
```

## Examples

It lazily yields matching values and their indexes
```ts
expect([...filter((value, index) => value % 2 === 0 && index > 0, [1, 2, 3, 4])]).toEqual([
  2, 4,
]);
```

It awaits `PREDICATE` when `ITERABLE` is async
```ts
async function* values() {
  yield 1;
  yield 2;
  yield 3;
}
expect(await Array.fromAsync(filter(async (value) => value > 1, values()))).toEqual([2, 3]);
```

## API Reference

### Call Signature

> **filter**\<`T`, `S`\>(`predicate`, `iterable`): `AsyncGenerator`\<`S`, `void`, `unknown`\>

Defined in: [filter.ts:40](https://github.com/bathan1/utop.js/blob/17b9b71aa905b6d20aadb7b3219eb62364351b10/src/filter.ts#L40)

#### Type Parameters

##### T

`T`

##### S

`S`

#### Parameters

##### predicate

(`value`, `index`) => `value is S`

##### iterable

`AsyncIterable`\<`T`\>

#### Returns

`AsyncGenerator`\<`S`, `void`, `unknown`\>

### Call Signature

> **filter**\<`T`\>(`predicate`, `iterable`): `AsyncGenerator`\<`T`, `void`, `unknown`\>

Defined in: [filter.ts:45](https://github.com/bathan1/utop.js/blob/17b9b71aa905b6d20aadb7b3219eb62364351b10/src/filter.ts#L45)

#### Type Parameters

##### T

`T`

#### Parameters

##### predicate

(`value`, `index`) => `unknown`

##### iterable

`AsyncIterable`\<`T`\>

#### Returns

`AsyncGenerator`\<`T`, `void`, `unknown`\>

### Call Signature

> **filter**\<`T`, `S`\>(`predicate`, `iterable`): `Generator`\<`S`, `void`, `unknown`\>

Defined in: [filter.ts:50](https://github.com/bathan1/utop.js/blob/17b9b71aa905b6d20aadb7b3219eb62364351b10/src/filter.ts#L50)

#### Type Parameters

##### T

`T`

##### S

`S`

#### Parameters

##### predicate

(`value`, `index`) => `value is S`

##### iterable

`Iterable`\<`T`\>

#### Returns

`Generator`\<`S`, `void`, `unknown`\>

### Call Signature

> **filter**\<`T`\>(`predicate`, `iterable`): `Generator`\<`T`, `void`, `unknown`\>

Defined in: [filter.ts:55](https://github.com/bathan1/utop.js/blob/17b9b71aa905b6d20aadb7b3219eb62364351b10/src/filter.ts#L55)

#### Type Parameters

##### T

`T`

#### Parameters

##### predicate

(`value`, `index`) => `unknown`

##### iterable

`Iterable`\<`T`\>

#### Returns

`Generator`\<`T`, `void`, `unknown`\>
