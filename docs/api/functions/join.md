---
title: join
---

# Function: join()

> **join**\<`T`\>(`separator`, `iterable`, `toString?`): `string`

Defined in: [join.ts:27](https://github.com/bathan1/utop.js/blob/723af95e5440c257f10c7355cacfd1ff80d7b58b/src/join.ts#L27)

`join(separator, iterable, toString?)` joins `ITERABLE` with `SEPARATOR`, applying `TO_STRING` when provided.

## Usage
```ts
const csv = join(",", [1, 2, 3]);
```

`join` has no async sugar; materialize async input before calling it.

```ts
const csv = join(",", await Array.fromAsync(values()));
```

## Examples

## Type Parameters

### T

`T`

## Parameters

### separator

`string`

### iterable

`Iterable`\<`T`\>

### toString?

(`value`, `index`) => `string`

## Returns

`string`

## Example

It joins transformed values with the separator
```ts
expect(join(" | ", new Set(["a", "b"]), (value, index) => `${index}:${value}`)).toBe(
  "0:a | 1:b"
);
```
