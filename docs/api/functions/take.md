---
title: take
---

# Function: take()

## Call Signature

> **take**\<`T`\>(`limit`, `iterable`): `AsyncGenerator`\<`T`, `void`, `unknown`\>

Defined in: [take.ts:69](https://github.com/bathan1/utop.js/blob/723af95e5440c257f10c7355cacfd1ff80d7b58b/src/take.ts#L69)

`take(limit, iterable)` is the new sequence that takes `LIMIT` elements from `ITERABLE` when `LIMIT` is non-negative
or throws RangeError otherwise when `LIMIT` is negative or `NaN`.

## Usage
```ts
const todos = await fetch('https://dummyjson.com/todos')
  .then(async res => (await res.json()).todos));

const first5 = take(5, todos);
for (const todo of first5) {
  console.log(todo);
}
```

`take` has the same simple async sugar semantics as `drop`
where `ITERABLE` can also be async, in which case, `take`
returns an AsyncGenerator.

```
const response = await fetch('https://dummyjson.com/todos');
if (!response.body) {
  throw new Error("bad response", { cause: response.status })
}

const first5 = take(5, response.body);
for await (const chunk of first5) {
  console.log(chunk);
}
```

## Examples

### Type Parameters

#### T

`T`

### Parameters

#### limit

`number`

#### iterable

`AsyncIterable`\<`T`\>

### Returns

`AsyncGenerator`\<`T`, `void`, `unknown`\>

### Examples

It takes at most `LIMIT` values from `ITERABLE`
```ts
expect(Array.from(take(2, ["a", "b", "c"]))).toEqual(["a", "b"]);
```

It stops when `ITERABLE` ends before `LIMIT`
```ts
expect(Array.from(take(5, ["a", "b"]))).toEqual(["a", "b"]);
```

It throws when `LIMIT` is negative and `NaN`
```ts
expect(() => Array.from(take(-1, ["a", "b"]))).toThrow(RangeError);
expect(() => Array.from(take(NaN, ["a", "b"]))).toThrow(RangeError);
```

It accepts async `ITERABLE`
```ts
async function* count() {
  for (let i = 0; i < 5; i++) {
    yield i + 1;
  }
}

expect(await Array.fromAsync(take(2, count()))).toEqual([1, 2])
```

## Call Signature

> **take**\<`T`\>(`limit`, `iterable`): `Generator`\<`T`, `void`, `unknown`\>

Defined in: [take.ts:73](https://github.com/bathan1/utop.js/blob/723af95e5440c257f10c7355cacfd1ff80d7b58b/src/take.ts#L73)

`take(limit, iterable)` is the new sequence that takes `LIMIT` elements from `ITERABLE` when `LIMIT` is non-negative
or throws RangeError otherwise when `LIMIT` is negative or `NaN`.

## Usage
```ts
const todos = await fetch('https://dummyjson.com/todos')
  .then(async res => (await res.json()).todos));

const first5 = take(5, todos);
for (const todo of first5) {
  console.log(todo);
}
```

`take` has the same simple async sugar semantics as `drop`
where `ITERABLE` can also be async, in which case, `take`
returns an AsyncGenerator.

```
const response = await fetch('https://dummyjson.com/todos');
if (!response.body) {
  throw new Error("bad response", { cause: response.status })
}

const first5 = take(5, response.body);
for await (const chunk of first5) {
  console.log(chunk);
}
```

## Examples

### Type Parameters

#### T

`T`

### Parameters

#### limit

`number`

#### iterable

`Iterable`\<`T`\>

### Returns

`Generator`\<`T`, `void`, `unknown`\>

### Examples

It takes at most `LIMIT` values from `ITERABLE`
```ts
expect(Array.from(take(2, ["a", "b", "c"]))).toEqual(["a", "b"]);
```

It stops when `ITERABLE` ends before `LIMIT`
```ts
expect(Array.from(take(5, ["a", "b"]))).toEqual(["a", "b"]);
```

It throws when `LIMIT` is negative and `NaN`
```ts
expect(() => Array.from(take(-1, ["a", "b"]))).toThrow(RangeError);
expect(() => Array.from(take(NaN, ["a", "b"]))).toThrow(RangeError);
```

It accepts async `ITERABLE`
```ts
async function* count() {
  for (let i = 0; i < 5; i++) {
    yield i + 1;
  }
}

expect(await Array.fromAsync(take(2, count()))).toEqual([1, 2])
```
