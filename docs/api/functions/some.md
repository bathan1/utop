---
title: some
description: some(predicate, iterable) reports whether any value in ITERABLE satisfies PREDICATE.
---

`some(predicate, iterable)` reports whether any value in `ITERABLE` satisfies `PREDICATE`.

## Installation

```bash
pnpm dlx shadcn@latest add bathan1/utop/some.js
```

## Usage

```ts
import { some } from "@/lib/utop/some";
```

```ts
const hasOverdue = some((invoice) => invoice.overdue, invoices);
```

For an async `ITERABLE`, `some` returns a Promise and awaits `PREDICATE`.

```ts
const hasOverdue = await some(async (invoice) => isOverdue(invoice), invoices());
```

## Examples

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

## API Reference

### Call Signature

> **some**\<`T`\>(`predicate`, `iterable`): `Promise`\<`boolean`\>

Defined in: [some.ts:37](https://github.com/bathan1/utop.js/blob/17b9b71aa905b6d20aadb7b3219eb62364351b10/src/some.ts#L37)

#### Type Parameters

##### T

`T`

#### Parameters

##### predicate

(`value`, `index`) => `unknown`

##### iterable

`AsyncIterable`\<`T`\>

#### Returns

`Promise`\<`boolean`\>

### Call Signature

> **some**\<`T`\>(`predicate`, `iterable`): `boolean`

Defined in: [some.ts:41](https://github.com/bathan1/utop.js/blob/17b9b71aa905b6d20aadb7b3219eb62364351b10/src/some.ts#L41)

#### Type Parameters

##### T

`T`

#### Parameters

##### predicate

(`value`, `index`) => `unknown`

##### iterable

`Iterable`\<`T`\>

#### Returns

`boolean`
