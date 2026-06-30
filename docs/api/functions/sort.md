---
title: sort
description: sort(compareFn, iterable) returns ITERABLE as a new array sorted by COMPAREFN.
---

`sort(compareFn, iterable)` returns `ITERABLE` as a new array sorted by `COMPAREFN`.

## Installation

```bash
pnpm dlx shadcn@latest add bathan1/utop/sort.js
```

## Usage

```ts
import { sort } from "@/lib/utop/sort";
```

```ts
const ascending = sort((a, b) => a - b, [3, 1, 2]);
```

`sort` has no async sugar; materialize async input before calling it.

```ts
const ascending = sort((a, b) => a - b, await Array.fromAsync(values()));
```

## Examples

It returns a new sorted array without changing the source
```ts
const source = [3, 1, 2];
expect(sort((a, b) => a - b, source)).toEqual([1, 2, 3]);
expect(source).toEqual([3, 1, 2]);
```

## API Reference

> **sort**\<`T`\>(`compareFn`, `iterable`): `T`[]

Defined in: [sort.ts:27](https://github.com/bathan1/utop.js/blob/17b9b71aa905b6d20aadb7b3219eb62364351b10/src/sort.ts#L27)

### Type Parameters

#### T

`T`

### Parameters

#### compareFn

(`a`, `b`) => `number`

#### iterable

`Iterable`\<`T`\>

### Returns

`T`[]
