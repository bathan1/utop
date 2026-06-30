---
title: map
description: map(callbackfn, iterable) is CALLBACKFN(x1), CALLBACKFN(x2), ..., CALLBACKFN(xn) for each xi in ITERABLE.
---

`map(callbackfn, iterable)` is `CALLBACKFN(x1), CALLBACKFN(x2), ..., CALLBACKFN(xn)` for each `xi` in `ITERABLE`.

## Installation

```bash
pnpm dlx shadcn@latest add bathan1/utop/map.js
```

## Usage

```ts
import { map } from "@/lib/utop/map";
```

```ts
const todos = await fetch('https://dummyjson.com/todos')
  .then(async res => (await res.json()).todos as { todo: string; }[]);
const todosTexts = map((todoItem) => todoItem.todo, todos);
```

`map` also allows iterating over AsyncIterables, in which
case it will await `CALLBACKFN` before yielding the transformed value.

```ts
const response = await fetch('https://dummyjson.com/todos');
if (!response.body) {
  throw new Error("bad response", { cause: response.status });
}

const result = await Array.from(map(chunk => chunk.toBase64(), res.body));
console.log(result[0]);
```

## Compile Time `bind`
You can call the map.bind method which manually overloads the generics
for you so you can do partial applications against `CALLBACKFN`
without tsc screaming at you.

```ts
const doubleText = map.bind(null, (x: number) => String(x * 2));
console.log(doubleText([1, 2, 3]))
console.log(doubleText([2, 4, 6]))
```

## Examples

It calls `CALLBACKFN` on demand
```ts
const callbackfn = vi.fn((x: number) => String(x * 2));
const iterable = randomIterableFromArray(
  Array.from({ length: Math.ceil(Math.random() * 100) }, (_, i) => i)
);
const mapped = map(callbackfn, iterable);

expect(callbackfn).not.toHaveBeenCalled();
mapped.next();
expect(callbackfn).toHaveBeenCalled();
callbackfn.mockClear();
```

It transforms the awaited values of async `ITERABLE`
```ts
const callbackfn = vi.fn((x: number) => String(x * 2));
async function* count(n: number) {
  for (let i = 0; i < n; i++) {
    yield i + 1;
  }
}
const asyncIterable = count(4);
const doubledText = map(callbackfn, asyncIterable);

expect(callbackfn).not.toHaveBeenCalled();

let index = 0;
for await (const value of doubledText) {
  expect(++index).toEqual(parseInt(value) / 2);
}
```

It partially applies `CALLBACK_FN` through native `.bind`
```ts
function double(x: number) {
  return x * 2;
}
const doubleNumbers = map.bind(null, double);

const syncResult = Array.from(doubleNumbers([1, 2, 3]));
const asyncResult = await Array.fromAsync(
  doubleNumbers(
    (async function* () {
      yield 1;
      yield 2;
      yield 3;
    })()
  )
);

expect(syncResult).toEqual(asyncResult);
expect(syncResult).toEqual([2, 4, 6]);
```

## API Reference

> `const` **map**: `Map`

Defined in: [map.ts:119](https://github.com/bathan1/utop.js/blob/17b9b71aa905b6d20aadb7b3219eb62364351b10/src/map.ts#L119)
