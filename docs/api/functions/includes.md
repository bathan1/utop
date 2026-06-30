---
title: includes
description: includes(searchElement, iterable, fromIndex?) reports whether SEARCH_ELEMENT occurs in ITERABLE at or after FROM_INDEX.
---

`includes(searchElement, iterable, fromIndex?)` reports whether `SEARCH_ELEMENT` occurs in `ITERABLE` at or after `FROM_INDEX`.

## Installation

```bash
pnpm dlx shadcn@latest add bathan1/utop/includes.js
```

## Usage

```ts
import { includes } from "@/lib/utop/includes";
```

```ts
const hasAdmin = includes("admin", roles);
```

When `ITERABLE` is async, then this handles `await`-ing its values before comparing against `SEARCH_ELEMENT`.

```ts
async function* roles() {
  yield "member";
  yield "admin";
}
const hasAdmin = includes("admin", roles());
```

## Examples

It finds values at or after `FROM_INDEX`
```ts
expect(includes("a", ["a", "b", "a"], 1)).toBe(true);
expect(includes("a", ["a", "b"], 1)).toBe(false);
```

It uses SameValueZero-style matching for `NaN`
```ts
expect(includes(NaN, [1, NaN, 3])).toBe(true);
```

## API Reference

### Call Signature

> **includes**\<`T`\>(`searchElement`, `iterable`, `fromIndex?`): `Promise`\<`boolean`\>

Defined in: [includes.ts:40](https://github.com/bathan1/utop.js/blob/17b9b71aa905b6d20aadb7b3219eb62364351b10/src/includes.ts#L40)

#### Type Parameters

##### T

`T`

#### Parameters

##### searchElement

`T`

##### iterable

`AsyncIterable`\<`T`\>

##### fromIndex?

`number`

#### Returns

`Promise`\<`boolean`\>

### Call Signature

> **includes**\<`T`\>(`searchElement`, `iterable`, `fromIndex?`): `boolean`

Defined in: [includes.ts:45](https://github.com/bathan1/utop.js/blob/17b9b71aa905b6d20aadb7b3219eb62364351b10/src/includes.ts#L45)

#### Type Parameters

##### T

`T`

#### Parameters

##### searchElement

`T`

##### iterable

`Iterable`\<`T`\>

##### fromIndex?

`number`

#### Returns

`boolean`
