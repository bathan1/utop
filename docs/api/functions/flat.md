---
title: flat
---

# Function: flat()

> **flat**\<`T`\>(`iterable`): `Generator`\<`T`, `void`, `unknown`\>

Defined in: [flat.ts:24](https://github.com/bathan1/utop.js/blob/723af95e5440c257f10c7355cacfd1ff80d7b58b/src/flat.ts#L24)

`flat(iterable)` lazily flattens one level of nested `ITERABLE`.

## Usage
```ts
const values = [...flat([[1, 2], new Set([3, 4])])];
```

`flat` has no async sugar; materialize async input before calling it.

```ts
const values = [...flat(await Array.fromAsync(groups()))];
```

## Examples

## Type Parameters

### T

`T`

## Parameters

### iterable

`Iterable`\<`Iterable`\<`T`, `any`, `any`\>\>

## Returns

`Generator`\<`T`, `void`, `unknown`\>

## Example

It flattens one level of any nested iterables
```ts
expect([...flat([[1, 2], new Set([3, 4])])]).toEqual([1, 2, 3, 4]);
```
