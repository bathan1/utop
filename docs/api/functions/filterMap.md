---
title: filterMap
---

# Function: filterMap()

> **filterMap**\<`T`, `U`\>(`callbackfn`, `iterable`): `Generator`\<`U`, `void`, `unknown`\>

Defined in: [filterMap.ts:27](https://github.com/bathan1/utop.js/blob/723af95e5440c257f10c7355cacfd1ff80d7b58b/src/filterMap.ts#L27)

`filterMap(callbackfn, iterable)` lazily yields each defined `CALLBACKFN` result for `ITERABLE`.

## Usage
```ts
const numbers = [...filterMap((text) => text ? Number(text) : undefined, ["1", "", "3"])];
```

`filterMap` has no async sugar; materialize async input before calling it.

```ts
const numbers = [...filterMap(Number, await Array.fromAsync(messages()))];
```

## Examples

## Type Parameters

### T

`T`

### U

`U`

## Parameters

### callbackfn

(`value`, `index`) => [`Option`](../type-aliases/Option.md)\<`U` \| `null`\>

### iterable

`Iterable`\<`T`\>

## Returns

`Generator`\<`U`, `void`, `unknown`\>

## Example

It yields only defined callback results
```ts
expect([
  ...filterMap((value) => (value % 2 ? undefined : String(value)), [1, 2, 3, 4]),
]).toEqual(["2", "4"]);
```
