---
title: findMap
description: findMap(callbackfn, iterable) returns the first defined CALLBACKFN result from ITERABLE.
---

# findmap

`findMap(callbackfn, iterable)` returns the first defined `CALLBACKFN` result from `ITERABLE`.

## Installation

```bash
pnpm dlx shadcn@latest add bathan1/utop.js/findMap
```

## Usage
```ts
const parsed = findMap((text) => text ? Number(text) : undefined, ["", "2"]);
```

`findMap` has no async sugar; materialize async input before calling it.

```ts
const parsed = findMap(Number, await Array.fromAsync(messages()));
```

## Examples

It returns the first defined callback result
```ts
expect(findMap((value) => (value > 2 ? value * 10 : undefined), [1, 2, 3, 4])).toBe(30);
```

It returns `undefined` when no callback result is defined
```ts
expect(findMap(() => undefined, [1, 2, 3])).toBeUndefined();
```

## API Reference

> **findMap**\<`T`, `U`\>(`callbackfn`, `iterable`): [`Option`](../type-aliases/Option.md)\<`U`\>

Defined in: [findMap.ts:29](https://github.com/bathan1/utop.js/blob/125dbb4fad39d300a5134b78adea5914856f4dcf/src/findMap.ts#L29)

### Type Parameters

#### T

`T`

#### U

`U`

### Parameters

#### callbackfn

(`value`, `index`) => [`Option`](../type-aliases/Option.md)\<`U`\>

#### iterable

`Iterable`\<`T`\>

### Returns

[`Option`](../type-aliases/Option.md)\<`U`\>
