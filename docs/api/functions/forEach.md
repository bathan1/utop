---
title: forEach
description: forEach(callbackfn, iterable) calls CALLBACKFN on each element in ITERABLE *immediately* and returns nothing
---

`forEach(callbackfn, iterable)` calls `CALLBACKFN` on each element in `ITERABLE` *immediately* and returns nothing

## Installation

```bash
pnpm dlx shadcn@latest add bathan1/utop/forEach.js
```

## Usage

```ts
import { forEach } from "@/lib/utop/forEach";
```

```ts
const todos = await fetch('https://dummyjson.com/todos')
  .then(async res => (await res.json()).todos);

forEach(console.log, todos);
```

When `ITERABLE` is async this will also await each call to `CALLBACKFN`
(regardless of if it returns a Promise or not).

```ts
const res = await fetch('https://dummyjson.com/todos');
if (!res.body) {
  throw new Error("bad response");
}
await forEach(chunk => console.log('recv %d bytes', chunk.length), res.body)
```

## Examples

It immediately consumes the iterable
```ts
const iterable = [1, 2, 3].values();
forEach(() => void 0, iterable);
```

It consumes async iterables as a Promise
```ts
async function* numbers() {
  yield 1;
  yield 2;
  yield 3;
}

const logSync = vi.fn();
const logAsync = vi.fn(async (_: number) => void 0);

await forEach(logSync, numbers());
await forEach(logAsync, numbers());

expect(logSync).toHaveBeenCalledWith(1, 0);
expect(logSync).toHaveBeenCalledWith(2, 1);
expect(logSync).toHaveBeenCalledWith(3, 2);

expect(logAsync).toHaveBeenCalledWith(1, 0);
expect(logAsync).toHaveBeenCalledWith(2, 1);
expect(logAsync).toHaveBeenCalledWith(3, 2);
```

## API Reference

### Call Signature

> **forEach**\<`T`\>(`callbackfn`, `iterable`): `Promise`\<`void`\>

Defined in: [forEach.ts:58](https://github.com/bathan1/utop.js/blob/17b9b71aa905b6d20aadb7b3219eb62364351b10/src/forEach.ts#L58)

#### Type Parameters

##### T

`T`

#### Parameters

##### callbackfn

(`value`, `index`) => `unknown`

##### iterable

`AsyncIterable`\<`T`\>

#### Returns

`Promise`\<`void`\>

### Call Signature

> **forEach**\<`T`\>(`callbackfn`, `iterable`): `void`

Defined in: [forEach.ts:62](https://github.com/bathan1/utop.js/blob/17b9b71aa905b6d20aadb7b3219eb62364351b10/src/forEach.ts#L62)

#### Type Parameters

##### T

`T`

#### Parameters

##### callbackfn

(`value`, `index`) => `unknown`

##### iterable

`Iterable`\<`T`\>

#### Returns

`void`
