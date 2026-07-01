---
title: orderBy
---

# Function: orderBy()

> **orderBy**\<`T`, `Keys`\>(`keys`, `direction`, `iterable`): `T`[]

Defined in: [orderBy.ts:45](https://github.com/bathan1/utop.js/blob/723af95e5440c257f10c7355cacfd1ff80d7b58b/src/orderBy.ts#L45)

`orderBy(keys, direction, iterable)` returns `ITERABLE` ordered by `KEYS` in `DIRECTION`.

## Usage
```ts
const ranked = orderBy(["score"], "desc", players);
```

`orderBy` has no async sugar; materialize async input before calling it.

```ts
const ranked = orderBy(["score"], "desc", await Array.fromAsync(players()));
```

## Examples

## Type Parameters

### T

`T`

### Keys

`Keys` *extends* `ComparableKeyOf`\<`T`\>[]

## Parameters

### keys

`Keys`

### direction

`"asc"` \| `"desc"`

### iterable

`Iterable`\<`T`\>

## Returns

`T`[]

## Example

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
