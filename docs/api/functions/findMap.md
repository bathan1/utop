---
title: findMap
---

# Function: findMap()

> **findMap**\<`T`, `U`\>(`callbackfn`, `iterable`): [`Option`](../type-aliases/Option.md)\<`U`\>

Defined in: [findMap.ts:31](https://github.com/bathan1/utop.js/blob/723af95e5440c257f10c7355cacfd1ff80d7b58b/src/findMap.ts#L31)

`findMap(callbackfn, iterable)` returns the first defined `CALLBACKFN` result from `ITERABLE`.

## Usage
```ts
const parsed = findMap((text) => text ? Number(text) : undefined, ["", "2"]);
```

`findMap` has no async sugar; materialize async input before calling it.

```ts
const parsed = findMap(Number, await Array.fromAsync(messages()));
```

## Examples

## Type Parameters

### T

`T`

### U

`U`

## Parameters

### callbackfn

(`value`, `index`) => [`Option`](../type-aliases/Option.md)\<`U`\>

### iterable

`Iterable`\<`T`\>

## Returns

[`Option`](../type-aliases/Option.md)\<`U`\>

## Examples

It returns the first defined callback result
```ts
expect(findMap((value) => (value > 2 ? value * 10 : undefined), [1, 2, 3, 4])).toBe(30);
```

It returns `undefined` when no callback result is defined
```ts
expect(findMap(() => undefined, [1, 2, 3])).toBeUndefined();
```
