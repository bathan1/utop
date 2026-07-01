---
title: find
description: |-
  find(predicate, iterable) returns the first value in ITERABLE that
  satisfies PREDICATE(x) or returns undefined otherwise.
---

# find

`find(predicate, iterable)` returns the first `value` in `ITERABLE` that
satisfies `PREDICATE(x)` or returns `undefined` otherwise.

## Installation

```bash
pnpm dlx shadcn@latest add bathan1/utop.js/find
```

## Usage
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

Defined in: [find.ts:78](https://github.com/bathan1/utop.js/blob/125dbb4fad39d300a5134b78adea5914856f4dcf/src/find.ts#L78)

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

Defined in: [find.ts:82](https://github.com/bathan1/utop.js/blob/125dbb4fad39d300a5134b78adea5914856f4dcf/src/find.ts#L82)

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

Defined in: [find.ts:86](https://github.com/bathan1/utop.js/blob/125dbb4fad39d300a5134b78adea5914856f4dcf/src/find.ts#L86)

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

Defined in: [find.ts:90](https://github.com/bathan1/utop.js/blob/125dbb4fad39d300a5134b78adea5914856f4dcf/src/find.ts#L90)

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
