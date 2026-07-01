---
title: some
---

# Function: some()

## Call Signature

> **some**\<`T`\>(`predicate`, `iterable`): `Promise`\<`boolean`\>

Defined in: [some.ts:37](https://github.com/bathan1/utop.js/blob/723af95e5440c257f10c7355cacfd1ff80d7b58b/src/some.ts#L37)

`some(predicate, iterable)` reports whether any value in `ITERABLE` satisfies `PREDICATE`.

## Usage
```ts
const hasOverdue = some((invoice) => invoice.overdue, invoices);
```

For an async `ITERABLE`, `some` returns a Promise and awaits `PREDICATE`.

```ts
const hasOverdue = await some(async (invoice) => isOverdue(invoice), invoices());
```

## Examples

### Type Parameters

#### T

`T`

### Parameters

#### predicate

(`value`, `index`) => `unknown`

#### iterable

`AsyncIterable`\<`T`\>

### Returns

`Promise`\<`boolean`\>

### Examples

It short-circuits when a value satisfies `PREDICATE`
```ts
expect(some((value) => value > 2, [1, 2, 3, 4])).toBe(true);
expect(some((value) => value > 4, [1, 2, 3, 4])).toBe(false);
```

It awaits `PREDICATE` when `ITERABLE` is async
```ts
async function* values() {
  yield 1;
  yield 2;
  yield 3;
}
expect(await some(async (value) => value === 2, values())).toBe(true);
```

## Call Signature

> **some**\<`T`\>(`predicate`, `iterable`): `boolean`

Defined in: [some.ts:41](https://github.com/bathan1/utop.js/blob/723af95e5440c257f10c7355cacfd1ff80d7b58b/src/some.ts#L41)

`some(predicate, iterable)` reports whether any value in `ITERABLE` satisfies `PREDICATE`.

## Usage
```ts
const hasOverdue = some((invoice) => invoice.overdue, invoices);
```

For an async `ITERABLE`, `some` returns a Promise and awaits `PREDICATE`.

```ts
const hasOverdue = await some(async (invoice) => isOverdue(invoice), invoices());
```

## Examples

### Type Parameters

#### T

`T`

### Parameters

#### predicate

(`value`, `index`) => `unknown`

#### iterable

`Iterable`\<`T`\>

### Returns

`boolean`

### Examples

It short-circuits when a value satisfies `PREDICATE`
```ts
expect(some((value) => value > 2, [1, 2, 3, 4])).toBe(true);
expect(some((value) => value > 4, [1, 2, 3, 4])).toBe(false);
```

It awaits `PREDICATE` when `ITERABLE` is async
```ts
async function* values() {
  yield 1;
  yield 2;
  yield 3;
}
expect(await some(async (value) => value === 2, values())).toBe(true);
```
