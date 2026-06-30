---
title: find
description: |-
  find(predicate, iterable) returns the first value in ITERABLE that
  satisfies PREDICATE(x) or returns undefined otherwise.
---

`find(predicate, iterable)` returns the first `value` in `ITERABLE` that
satisfies `PREDICATE(x)` or returns `undefined` otherwise.

## Installation

```bash
pnpm dlx shadcn@latest add bathan1/utop/find.js
```

## Usage

```ts
import { find } from "@/lib/utop/find";
```

```ts
const todos = await fetch('https://dummyjson.com/todos')
  .then(async res => (await res.json()).todos as { completed: boolean }[]);

const firstCompleted = find((todo): todo is { id: number; completed: true } => todo.completed, todos);
console.log(firstCompleted.completed); // true
```

If `ITERABLE` has an Symbol.asyncIterator property,
then `find` searches it using the `for await` expression,
and returns a Promise, regardless of whether or not it
also has the sync symbol.

```
async function* count(n: number) {
  for (let i = 0; i < n; i++) {
    yield i + 1;
  }
}

const firstOdd = await find(x => x % 2 === 1, count);
console.log(firstOdd) // 1
```

`find` does not await `PREDICATE`; async behavior is only provided for async iterables.

## Examples

It returns the first matching value
```ts
expect(find((value) => value > 2, [1, 2, 3, 4])).toBe(3);
```

It returns `undefined` when no value matches
```ts
expect(find((value) => value > 4, [1, 2, 3])).toBeUndefined();
```

It returns asynchronously for async ITERABLE even when it also has a sync iterator symbol
```ts
const iterable = {
  async *[Symbol.asyncIterator]() {
    yield 1;
    yield 2;
    yield 3;
  },
  *[Symbol.iterator]() {
    yield 1;
    yield 2;
    yield 3;
  },
};

const promise = find((value) => value > 2, iterable);
expect(promise).toBeInstanceOf(Promise);
expect(await promise).toBe(3);
```

It returns `undefined` asynchronously when no async value matches
```ts
async function* values() {
  yield 1;
  yield 2;
}

await expect(find((value) => value > 2, values())).resolves.toBeUndefined();
```

## API Reference

### Call Signature

> **find**\<`T`, `S`\>(`predicate`, `iterable`): `Promise`\<[`Option`](../type-aliases/Option.md)\<`S`\>\>

Defined in: [find.ts:80](https://github.com/bathan1/utop.js/blob/17b9b71aa905b6d20aadb7b3219eb62364351b10/src/find.ts#L80)

#### Type Parameters

##### T

`T`

##### S

`S`

#### Parameters

##### predicate

(`value`, `index`) => `value is S`

##### iterable

`AsyncIterable`\<`T`\>

#### Returns

`Promise`\<[`Option`](../type-aliases/Option.md)\<`S`\>\>

### Call Signature

> **find**\<`T`\>(`predicate`, `iterable`): `Promise`\<[`Option`](../type-aliases/Option.md)\<`T`\>\>

Defined in: [find.ts:84](https://github.com/bathan1/utop.js/blob/17b9b71aa905b6d20aadb7b3219eb62364351b10/src/find.ts#L84)

#### Type Parameters

##### T

`T`

#### Parameters

##### predicate

(`value`, `index`) => `unknown`

##### iterable

`AsyncIterable`\<`T`\>

#### Returns

`Promise`\<[`Option`](../type-aliases/Option.md)\<`T`\>\>

### Call Signature

> **find**\<`T`, `S`\>(`predicate`, `iterable`): [`Option`](../type-aliases/Option.md)\<`S`\>

Defined in: [find.ts:88](https://github.com/bathan1/utop.js/blob/17b9b71aa905b6d20aadb7b3219eb62364351b10/src/find.ts#L88)

#### Type Parameters

##### T

`T`

##### S

`S`

#### Parameters

##### predicate

(`value`, `index`) => `value is S`

##### iterable

`Iterable`\<`T`\>

#### Returns

[`Option`](../type-aliases/Option.md)\<`S`\>

### Call Signature

> **find**\<`T`\>(`predicate`, `iterable`): [`Option`](../type-aliases/Option.md)\<`T`\>

Defined in: [find.ts:92](https://github.com/bathan1/utop.js/blob/17b9b71aa905b6d20aadb7b3219eb62364351b10/src/find.ts#L92)

#### Type Parameters

##### T

`T`

#### Parameters

##### predicate

(`value`, `index`) => `unknown`

##### iterable

`Iterable`\<`T`\>

#### Returns

[`Option`](../type-aliases/Option.md)\<`T`\>
