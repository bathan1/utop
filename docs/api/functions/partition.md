---
title: partition
description: partition(predicate, iterable) splits ITERABLE by PREDICATE into matching and non-matching values.
---

`partition(predicate, iterable)` splits `ITERABLE` by `PREDICATE` into matching and non-matching values.

## Installation

```bash
pnpm dlx shadcn@latest add bathan1/utop/partition.js
```

## Usage

```ts
import { partition } from "@/lib/utop/partition";
```

```ts
const [even, odd] = partition((value) => value % 2 === 0, [1, 2, 3, 4]);
```

`partition` allows for async `ITERABLE`, but does *not* handling awaiting the `PREDICATE` function like the other predicate functions from this lib.

```ts
async function* values() {
  yield 1;
  yield 2;
  yield 3;
  yield 4;
}
const [even, odd] = partition((value) => value % 2 === 0, values());
```

## Examples

It separates matching and non-matching values
```ts
expect(partition((value) => value % 2 === 0, [1, 2, 3, 4])).toEqual([
  [2, 4],
  [1, 3],
]);
```

## API Reference

### Call Signature

> **partition**\<`T`, `S`\>(`predicate`, `iterable`): `Promise`\<\[`S`[], `Exclude`\<`T`, `S`\>[]\]\>

Defined in: [partition.ts:38](https://github.com/bathan1/utop.js/blob/17b9b71aa905b6d20aadb7b3219eb62364351b10/src/partition.ts#L38)

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

`Promise`\<\[`S`[], `Exclude`\<`T`, `S`\>[]\]\>

### Call Signature

> **partition**\<`T`\>(`predicate`, `iterable`): \[`T`[], `T`[]\]

Defined in: [partition.ts:42](https://github.com/bathan1/utop.js/blob/17b9b71aa905b6d20aadb7b3219eb62364351b10/src/partition.ts#L42)

#### Type Parameters

##### T

`T`

#### Parameters

##### predicate

(`value`, `index`) => `unknown`

##### iterable

`AsyncIterable`\<`T`\>

#### Returns

\[`T`[], `T`[]\]

### Call Signature

> **partition**\<`T`, `S`\>(`predicate`, `iterable`): \[`S`[], `Exclude`\<`T`, `S`\>[]\]

Defined in: [partition.ts:46](https://github.com/bathan1/utop.js/blob/17b9b71aa905b6d20aadb7b3219eb62364351b10/src/partition.ts#L46)

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

\[`S`[], `Exclude`\<`T`, `S`\>[]\]

### Call Signature

> **partition**\<`T`\>(`predicate`, `iterable`): \[`T`[], `T`[]\]

Defined in: [partition.ts:50](https://github.com/bathan1/utop.js/blob/17b9b71aa905b6d20aadb7b3219eb62364351b10/src/partition.ts#L50)

#### Type Parameters

##### T

`T`

#### Parameters

##### predicate

(`value`, `index`) => `unknown`

##### iterable

`Iterable`\<`T`\>

#### Returns

\[`T`[], `T`[]\]
