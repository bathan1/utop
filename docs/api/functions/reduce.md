---
title: reduce
description: reduce(callbackfn, initialValue, iterable) folds ITERABLE into shape of INITIAL_VALUE by threading each element in ITERABLE through the reducer CALLBACKFN.
---

# reduce

`reduce(callbackfn, initialValue, iterable)` folds `ITERABLE` into shape of `INITIAL_VALUE` by threading each element in `ITERABLE` through the reducer `CALLBACKFN`.

## Installation

```bash
pnpm dlx shadcn@latest add bathan1/utop.js/reduce
```

## Usage
```ts
const todos = await fetch('https://dummyjson.com/todos')
  .then(async res => (await res.json()).todos as { todo: string }[]);

const lines = reduce((acc, todoItem) => {
  return acc + `${todoItem.todo}\n`
}, "", todos);
console.log(lines);
```

The async sugar for `reduce` handles unboxing (`await`-ing) each `value` from
async `ITERABLE` and with the result of `CALLBACKFN(ACC, value)` on each iteration.

```ts
const response = await fetch('https://dummyjson.com/todos')
if (!response.body) {
  throw new Error("invalid response", { cause: response.status })
}
const numBytes = await reduce((acc, chunk) => acc + chunk.length, 0, response.body);
console.log(numBytes);
```

## Examples

It folds `ITERABLE` into `INITIAL_VALUE`
```ts
expect(reduce((sum, x) => sum + x, 0, [1, 2, 3])).toBe(6);
```

It passes the index to `CALLBACKFN`
```ts
expect(reduce((acc, x, i) => [...acc, `${i}:${x}`], [] as string[], ["a", "b"])).toEqual([
  "0:a",
  "1:b",
]);
```

It awaits values from `ITERABLE` when it is async along with `CALLBACKFN`
```ts
async function* numbers() {
  yield 1;
  yield 2;
  yield 3;
}

const result = await reduce(
  async (acc, value, index) => {
    const doubled = await Promise.resolve(value * 2);
    return [...acc, `${index}:${doubled}`];
  },
  [] as string[],
  numbers()
);

expect(result).toEqual(["0:2", "1:4", "2:6"]);
```

## API Reference

### Call Signature

> **reduce**\<`T`, `U`\>(`callbackfn`, `initialValue`, `iterable`): `Promise`\<`Awaited`\<`U`\>\>

Defined in: [reduce.ts:65](https://github.com/bathan1/utop.js/blob/125dbb4fad39d300a5134b78adea5914856f4dcf/src/reduce.ts#L65)

#### Type Parameters

##### T

`T`

##### U

`U`

#### Parameters

##### callbackfn

(`acc`, `value`, `index`) => [`Promisable`](../type-aliases/Promisable.md)\<`U`\>

##### initialValue

`U`

##### iterable

`AsyncIterable`\<`T`\>

#### Returns

`Promise`\<`Awaited`\<`U`\>\>

### Call Signature

> **reduce**\<`T`, `U`\>(`callbackfn`, `initialValue`, `iterable`): `U`

Defined in: [reduce.ts:70](https://github.com/bathan1/utop.js/blob/125dbb4fad39d300a5134b78adea5914856f4dcf/src/reduce.ts#L70)

#### Type Parameters

##### T

`T`

##### U

`U`

#### Parameters

##### callbackfn

(`acc`, `value`, `index`) => `U`

##### initialValue

`U`

##### iterable

`Iterable`\<`T`\>

#### Returns

`U`
