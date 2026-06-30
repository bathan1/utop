---
title: flat
description: flat(iterable) lazily flattens one level of nested ITERABLE.
---

`flat(iterable)` lazily flattens one level of nested `ITERABLE`.

## Installation

```bash
pnpm dlx shadcn@latest add bathan1/utop/flat.js
```

## Usage

```ts
import { flat } from "@/lib/utop/flat";
```

```ts
const values = [...flat([[1, 2], new Set([3, 4])])];
```

`flat` has no async sugar; materialize async input before calling it.

```ts
const values = [...flat(await Array.fromAsync(groups()))];
```

## Examples

It flattens one level of any nested iterables
```ts
expect([...flat([[1, 2], new Set([3, 4])])]).toEqual([1, 2, 3, 4]);
```

## API Reference

> **flat**\<`T`\>(`iterable`): `Generator`\<`T`, `void`, `unknown`\>

Defined in: [flat.ts:24](https://github.com/bathan1/utop.js/blob/17b9b71aa905b6d20aadb7b3219eb62364351b10/src/flat.ts#L24)

### Type Parameters

#### T

`T`

### Parameters

#### iterable

`Iterable`\<`Iterable`\<`T`, `any`, `any`\>\>

### Returns

`Generator`\<`T`, `void`, `unknown`\>
