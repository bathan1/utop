---
title: sortUniq
description: sortUniq(compareFn, iterable) sorts ITERABLE with COMPAREFN and removes comparator-equal neighbors.
---

# sortuniq

`sortUniq(compareFn, iterable)` sorts `ITERABLE` with `COMPAREFN` and removes comparator-equal neighbors.

## Installation

```bash
pnpm dlx shadcn@latest add bathan1/utop.js/sortUniq
```

## Usage
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

Defined in: [sortUniq.ts:23](https://github.com/bathan1/utop.js/blob/125dbb4fad39d300a5134b78adea5914856f4dcf/src/sortUniq.ts#L23)

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
