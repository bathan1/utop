---
title: partition
description: partition(predicate, iterable) splits ITERABLE by PREDICATE into matching and non-matching values.
---

# partition

`partition(predicate, iterable)` splits `ITERABLE` by `PREDICATE` into matching and non-matching values.

## Installation

```bash
pnpm dlx shadcn@latest add bathan1/utop.js/partition
```

## Usage
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

Defined in: [partition.ts:36](https://github.com/bathan1/utop.js/blob/125dbb4fad39d300a5134b78adea5914856f4dcf/src/partition.ts#L36)

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

Defined in: [partition.ts:40](https://github.com/bathan1/utop.js/blob/125dbb4fad39d300a5134b78adea5914856f4dcf/src/partition.ts#L40)

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

Defined in: [partition.ts:44](https://github.com/bathan1/utop.js/blob/125dbb4fad39d300a5134b78adea5914856f4dcf/src/partition.ts#L44)

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

Defined in: [partition.ts:48](https://github.com/bathan1/utop.js/blob/125dbb4fad39d300a5134b78adea5914856f4dcf/src/partition.ts#L48)

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
