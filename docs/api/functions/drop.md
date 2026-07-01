---
title: drop
---

# Function: drop()

## Call Signature

> **drop**\<`T`\>(`limit`, `iterable`): `AsyncGenerator`\<`T`, `void`, `unknown`\>

Defined in: [drop.ts:60](https://github.com/bathan1/utop.js/blob/723af95e5440c257f10c7355cacfd1ff80d7b58b/src/drop.ts#L60)

`drop(limit, iterable)` is `ITERABLE` with `LIMIT` elements dropped from the start.

## Usage
```ts
const droppedFirstTwo = [...drop(2, [1, 2, 3, 4, 5])];
console.log(droppedFirstTwo); // logs [3, 4, 5]
```

When `ITERABLE` is async, then this returns an AsyncGenerator instead.

```ts
async function* count(n: number) {
  for (let i = 0; i < n; i++) {
    yield i;
  }
}

const droppedFirstTwoAsync = await Array.fromAsync(
  drop(2, count(5))
);
console.log(droppedFirstTwoAsync); // logs [3, 4, 5]
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

It drops the first `LIMIT` values from `ITERABLE`
```ts
const iterable = ["a", "b", "c", "d"];

const dropped = drop(2, iterable);
expect(Array.from(dropped)).toEqual(["c", "d"]);
```

It returns empty when `LIMIT` consumes all of `ITERABLE`
```ts
expect(Array.from(drop(5, ["a", "b", "c"]))).toEqual([]);
```

It returns an AsyncGenerator when `ITERABLE` is also async
```ts
const asyncIterable = async function* () {
  yield "a";
  yield "b";
  yield "c";
  yield "d";
}

const droppedFirstTwo = await Array.fromAsync(drop(2, asyncIterable()));
expect(droppedFirstTwo).toEqual(["c", "d"]);
```

## Call Signature

> **drop**\<`T`\>(`limit`, `iterable`): `Generator`\<`T`, `void`, `unknown`\>

Defined in: [drop.ts:64](https://github.com/bathan1/utop.js/blob/723af95e5440c257f10c7355cacfd1ff80d7b58b/src/drop.ts#L64)

`drop(limit, iterable)` is `ITERABLE` with `LIMIT` elements dropped from the start.

## Usage
```ts
const droppedFirstTwo = [...drop(2, [1, 2, 3, 4, 5])];
console.log(droppedFirstTwo); // logs [3, 4, 5]
```

When `ITERABLE` is async, then this returns an AsyncGenerator instead.

```ts
async function* count(n: number) {
  for (let i = 0; i < n; i++) {
    yield i;
  }
}

const droppedFirstTwoAsync = await Array.fromAsync(
  drop(2, count(5))
);
console.log(droppedFirstTwoAsync); // logs [3, 4, 5]
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

It drops the first `LIMIT` values from `ITERABLE`
```ts
const iterable = ["a", "b", "c", "d"];

const dropped = drop(2, iterable);
expect(Array.from(dropped)).toEqual(["c", "d"]);
```

It returns empty when `LIMIT` consumes all of `ITERABLE`
```ts
expect(Array.from(drop(5, ["a", "b", "c"]))).toEqual([]);
```

It returns an AsyncGenerator when `ITERABLE` is also async
```ts
const asyncIterable = async function* () {
  yield "a";
  yield "b";
  yield "c";
  yield "d";
}

const droppedFirstTwo = await Array.fromAsync(drop(2, asyncIterable()));
expect(droppedFirstTwo).toEqual(["c", "d"]);
```
