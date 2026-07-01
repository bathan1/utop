---
title: orderBy
description: orderBy(keys, direction, iterable) returns ITERABLE ordered by KEYS in DIRECTION.
---

# orderby

`orderBy(keys, direction, iterable)` returns `ITERABLE` ordered by `KEYS` in `DIRECTION`.

## Installation

```bash
pnpm dlx shadcn@latest add bathan1/utop.js/orderBy
```

## Usage
```ts
const ranked = orderBy(["score"], "desc", players);
```

`orderBy` has no async sugar; materialize async input before calling it.

```ts
const ranked = orderBy(["score"], "desc", await Array.fromAsync(players()));
```

## Examples

It sorts by later keys when earlier keys are equal
```ts
const rows = [
  { group: "b", score: 1 },
  { group: "a", score: 2 },
  { group: "a", score: 1 },
];
expect(orderBy(["group", "score"], "asc", rows)).toEqual([
  { group: "a", score: 1 },
  { group: "a", score: 2 },
  { group: "b", score: 1 },
]);
```

## API Reference

> **orderBy**\<`T`, `Keys`\>(`keys`, `direction`, `iterable`): `T`[]

Defined in: [orderBy.ts:43](https://github.com/bathan1/utop.js/blob/125dbb4fad39d300a5134b78adea5914856f4dcf/src/orderBy.ts#L43)

### Type Parameters

#### T

`T`

#### Keys

`Keys` *extends* `ComparableKeyOf`\<`T`\>[]

### Parameters

#### keys

`Keys`

#### direction

`"asc"` \| `"desc"`

#### iterable

`Iterable`\<`T`\>

### Returns

`T`[]
