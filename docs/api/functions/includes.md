---
title: includes
description: includes(searchElement, iterable, fromIndex?) reports whether SEARCH_ELEMENT occurs in ITERABLE at or after FROM_INDEX.
---

# includes

`includes(searchElement, iterable, fromIndex?)` reports whether `SEARCH_ELEMENT` occurs in `ITERABLE` at or after `FROM_INDEX`.

## Installation

```bash
pnpm dlx shadcn@latest add bathan1/utop.js/includes
```

## Usage
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

Defined in: [includes.ts:38](https://github.com/bathan1/utop.js/blob/125dbb4fad39d300a5134b78adea5914856f4dcf/src/includes.ts#L38)

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

Defined in: [includes.ts:43](https://github.com/bathan1/utop.js/blob/125dbb4fad39d300a5134b78adea5914856f4dcf/src/includes.ts#L43)

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
