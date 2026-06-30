---
title: first
description: |-
  first(iterable) returns the first value of ITERABLE, or undefined
  if ITERABLE is empty.
---

`first(iterable)` returns the first value of `ITERABLE`, or `undefined`
if `ITERABLE` is empty.

## Installation

```bash
pnpm dlx shadcn@latest add bathan1/utop/first.js
```

## Usage

```ts
import { first } from "@/lib/utop/first";
```

```ts
const firstTodo = first([
  { todo: "Buy milk" },
  { todo: "Walk dog" },
]);

console.log(firstTodo?.todo);
```

`first` also supports AsyncIterables, in which case it awaits
the first available value before returning it.

```ts
async function* count() {
  yield 1;
  yield 2;
  yield 3;
}

const value = await first(count());
console.log(value); // 1
```

## Examples

## API Reference

### Call Signature

> **first**\<`T`\>(`iterable`): `Promise`\<[`Option`](../type-aliases/Option.md)\<`T`\>\>

Defined in: [first.ts:33](https://github.com/bathan1/utop.js/blob/17b9b71aa905b6d20aadb7b3219eb62364351b10/src/first.ts#L33)

#### Type Parameters

##### T

`T`

#### Parameters

##### iterable

`AsyncIterable`\<`T`\>

#### Returns

`Promise`\<[`Option`](../type-aliases/Option.md)\<`T`\>\>

### Call Signature

> **first**\<`T`\>(`iterable`): [`Option`](../type-aliases/Option.md)\<`T`\>

Defined in: [first.ts:36](https://github.com/bathan1/utop.js/blob/17b9b71aa905b6d20aadb7b3219eb62364351b10/src/first.ts#L36)

#### Type Parameters

##### T

`T`

#### Parameters

##### iterable

`Iterable`\<`T`\>

#### Returns

[`Option`](../type-aliases/Option.md)\<`T`\>
