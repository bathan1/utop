---
title: reduce
---

# Function: reduce()

## Call Signature

> **reduce**\<`T`, `U`\>(`callbackfn`, `initialValue`, `iterable`): `Promise`\<`Awaited`\<`U`\>\>

Defined in: [reduce.ts:67](https://github.com/bathan1/utop.js/blob/723af95e5440c257f10c7355cacfd1ff80d7b58b/src/reduce.ts#L67)

`reduce(callbackfn, initialValue, iterable)` folds `ITERABLE` into shape of `INITIAL_VALUE` by threading each element in `ITERABLE` through the reducer `CALLBACKFN`.

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

### Type Parameters

#### T

`T`

#### U

`U`

### Parameters

#### callbackfn

(`acc`, `value`, `index`) => [`Promisable`](../type-aliases/Promisable.md)\<`U`\>

#### initialValue

`U`

#### iterable

`AsyncIterable`\<`T`\>

### Returns

`Promise`\<`Awaited`\<`U`\>\>

### Examples

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

## Call Signature

> **reduce**\<`T`, `U`\>(`callbackfn`, `initialValue`, `iterable`): `U`

Defined in: [reduce.ts:72](https://github.com/bathan1/utop.js/blob/723af95e5440c257f10c7355cacfd1ff80d7b58b/src/reduce.ts#L72)

`reduce(callbackfn, initialValue, iterable)` folds `ITERABLE` into shape of `INITIAL_VALUE` by threading each element in `ITERABLE` through the reducer `CALLBACKFN`.

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

### Type Parameters

#### T

`T`

#### U

`U`

### Parameters

#### callbackfn

(`acc`, `value`, `index`) => `U`

#### initialValue

`U`

#### iterable

`Iterable`\<`T`\>

### Returns

`U`

### Examples

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
