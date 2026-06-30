---
title: sortUniq
description: sortUniq(compareFn, iterable) sorts ITERABLE with COMPAREFN and removes comparator-equal neighbors.
---

`sortUniq(compareFn, iterable)` sorts `ITERABLE` with `COMPAREFN` and removes comparator-equal neighbors.

## Installation

```bash
pnpm dlx shadcn@latest add bathan1/utop/sortUniq.js
```

## Usage

```ts
import { sortUniq } from "@/lib/utop/sortUniq";
```

```ts
const unique = sortUniq((a, b) => a - b, [3, 1, 3, 2]);
```

`sortUniq` has no async sugar; materialize async input before calling it.

```ts
const unique = sortUniq((a, b) => a - b, await Array.fromAsync(values()));
```

## Examples

It sorts and removes comparator-equal values
```ts
expect(sortUniq((a, b) => a - b, [3, 1, 2, 3, 1])).toEqual([1, 2, 3]);
```

## API Reference

> **sortUniq**\<`T`\>(`compareFn`, `iterable`): `T`[]

Defined in: [sortUniq.ts:25](https://github.com/bathan1/utop.js/blob/17b9b71aa905b6d20aadb7b3219eb62364351b10/src/sortUniq.ts#L25)

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
