---
title: filterMap
description: filterMap(callbackfn, iterable) lazily yields each defined CALLBACKFN result for ITERABLE.
---

`filterMap(callbackfn, iterable)` lazily yields each defined `CALLBACKFN` result for `ITERABLE`.

## Installation

```bash
pnpm dlx shadcn@latest add bathan1/utop/filterMap.js
```

## Usage

```ts
import { filterMap } from "@/lib/utop/filterMap";
```

```ts
const numbers = [...filterMap((text) => text ? Number(text) : undefined, ["1", "", "3"])];
```

`filterMap` has no async sugar; materialize async input before calling it.

```ts
const numbers = [...filterMap(Number, await Array.fromAsync(messages()))];
```

## Examples

It yields only defined callback results
```ts
expect([
  ...filterMap((value) => (value % 2 ? undefined : String(value)), [1, 2, 3, 4]),
]).toEqual(["2", "4"]);
```

## API Reference

> **filterMap**\<`T`, `U`\>(`callbackfn`, `iterable`): `Generator`\<`U`, `void`, `unknown`\>

Defined in: [filterMap.ts:27](https://github.com/bathan1/utop.js/blob/17b9b71aa905b6d20aadb7b3219eb62364351b10/src/filterMap.ts#L27)

### Type Parameters

#### T

`T`

#### U

`U`

### Parameters

#### callbackfn

(`value`, `index`) => [`Option`](../type-aliases/Option.md)\<`U` \| `null`\>

#### iterable

`Iterable`\<`T`\>

### Returns

`Generator`\<`U`, `void`, `unknown`\>
