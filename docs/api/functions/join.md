---
title: join
description: join(separator, iterable, toString?) joins ITERABLE with SEPARATOR, applying TO_STRING when provided.
---

# join

`join(separator, iterable, toString?)` joins `ITERABLE` with `SEPARATOR`, applying `TO_STRING` when provided.

## Installation

```bash
pnpm dlx shadcn@latest add bathan1/utop.js/join
```

## Usage
```ts
const csv = join(",", [1, 2, 3]);
```

`join` has no async sugar; materialize async input before calling it.

```ts
const csv = join(",", await Array.fromAsync(values()));
```

## Examples

It joins transformed values with the separator
```ts
expect(join(" | ", new Set(["a", "b"]), (value, index) => `${index}:${value}`)).toBe(
  "0:a | 1:b"
);
```

## API Reference

> **join**\<`T`\>(`separator`, `iterable`, `toString?`): `string`

Defined in: [join.ts:25](https://github.com/bathan1/utop.js/blob/125dbb4fad39d300a5134b78adea5914856f4dcf/src/join.ts#L25)

### Type Parameters

#### T

`T`

### Parameters

#### separator

`string`

#### iterable

`Iterable`\<`T`\>

#### toString?

(`value`, `index`) => `string`

### Returns

`string`
