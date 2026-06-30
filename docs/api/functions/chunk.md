---
title: chunk
description: chunk(limit, iterable) is a new generator that yields elements of ITERABLE materialized as arrays of max size LIMIT.
---

`chunk(limit, iterable)` is a new generator that yields elements of `ITERABLE` materialized as arrays of max size `LIMIT`.

## Installation

```bash
pnpm dlx shadcn@latest add bathan1/utop/chunk.js
```

## Usage

```ts
import { chunk } from "@/lib/utop/chunk";
```

```ts
const lotsOfRows = createLotsOfData();
const insertableChunks = chunk(500, lotsOfRows);
for (const chunk of insertableChunks) {
  await tx
    .insertInto("some-table")
    .values(chunk)
    .execute();
}
```

`chunk` provides async sugar by returning an AsyncGenerator when `ITERABLE` is an async iterable.

```ts
async function* fetchTodos(ids: number[]) {
  for (const id of ids) {
    yield await fetch(`https://dummyjson.com/todos/${id}`)
      .then(async res => await res.json() as { todo: string; });
  }
}

const todos = fetchTodos([1, 2, 3]);
const todosGrouped = chunk(2, todos);
```

## Examples
It yields arrays of max size `LIMIT`
```ts
function* infinite() {
  let i = 0;
  while (true) {
    yield i++;
  }
}
const limit = Math.ceil(Math.random() * 100);
const randomLength = Math.ceil(Math.random() * limit);
const iterable = randomIterableFromArray(take(randomLength, infinite()).toArray());

const chunked = Array.from(chunk(limit, iterable));
chunked.forEach((array) => expect(array.length).toBeLessThanOrEqual(limit));
```

It throws RangeError when `LIMIT` is non-positive
```ts
const limit = Math.random() < 0.5 ? -1 : -1.123;
const iterable = randomIterableFromArray([1, 2]);

const chunked = () => Array.from(chunk(limit, iterable));
expect(chunked).toThrow(RangeError);
```

It chunks async iterables
```ts
async function* count(n: number) {
  for (let i = 0; i < n; i++) {
    yield i + 1;
  }
}

const limit = 2;
const asyncIterable = count(10);

const chunked = await Array.fromAsync(chunk(limit, asyncIterable));
expect(chunked).toEqual([
  [1, 2],
  [3, 4],
  [5, 6],
  [7, 8],
  [9, 10]
]);
```

## API Reference

### Call Signature

> **chunk**\<`T`\>(`limit`, `iterable`): `Generator`\<`T`[], `void`, `unknown`\>

Defined in: [chunk.ts:84](https://github.com/bathan1/utop.js/blob/17b9b71aa905b6d20aadb7b3219eb62364351b10/src/chunk.ts#L84)

#### Type Parameters

##### T

`T`

#### Parameters

##### limit

`number`

##### iterable

`Iterable`\<`T`, `unknown`, `unknown`\>

#### Returns

`Generator`\<`T`[], `void`, `unknown`\>

### Call Signature

> **chunk**\<`T`\>(`limit`, `iterable`): `AsyncGenerator`\<`T`[], `void`, `unknown`\>

Defined in: [chunk.ts:88](https://github.com/bathan1/utop.js/blob/17b9b71aa905b6d20aadb7b3219eb62364351b10/src/chunk.ts#L88)

#### Type Parameters

##### T

`T`

#### Parameters

##### limit

`number`

##### iterable

`AsyncIterable`\<`T`, `unknown`, `unknown`\>

#### Returns

`AsyncGenerator`\<`T`[], `void`, `unknown`\>
