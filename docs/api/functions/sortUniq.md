---
title: sortUniq
---

# Function: sortUniq()

> **sortUniq**\<`T`\>(`compareFn`, `iterable`): `T`[]

Defined in: [sortUniq.ts:25](https://github.com/bathan1/utop.js/blob/723af95e5440c257f10c7355cacfd1ff80d7b58b/src/sortUniq.ts#L25)

`sortUniq(compareFn, iterable)` sorts `ITERABLE` with `COMPAREFN` and removes comparator-equal neighbors.

## Usage
```ts
const unique = sortUniq((a, b) => a - b, [3, 1, 3, 2]);
```

`sortUniq` has no async sugar; materialize async input before calling it.

```ts
const unique = sortUniq((a, b) => a - b, await Array.fromAsync(values()));
```

## Examples

## Type Parameters

### T

`T`

## Parameters

### compareFn

(`a`, `b`) => `number`

### iterable

`Iterable`\<`T`\>

## Returns

`T`[]

## Example

It sorts and removes comparator-equal values
```ts
expect(sortUniq((a, b) => a - b, [3, 1, 2, 3, 1])).toEqual([1, 2, 3]);
```
