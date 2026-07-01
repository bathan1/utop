---
title: flatMap
---

# Function: flatMap()

## Call Signature

> **flatMap**\<`T`, `U`\>(`callbackfn`, `iterable`): `Generator`\<`U`, `void`, `unknown`\>

Defined in: [flatMap.ts:37](https://github.com/bathan1/utop.js/blob/723af95e5440c257f10c7355cacfd1ff80d7b58b/src/flatMap.ts#L37)

`flatMap(callbackfn, iterable)` lazily yields every value from each iterable returned by `CALLBACKFN` for `ITERABLE`.

## Usage
```ts
const words = [...flatMap((line) => line.split(" "), lines)];
```

For an async `ITERABLE`, `flatMap` returns an AsyncGenerator, awaits `CALLBACKFN`,
and accepts either an iterable or async iterable from it.

```ts
const words = await Array.fromAsync(flatMap(async (line) => (await line).split(" "), lines()));
```

## Examples

### Type Parameters

#### T

`T`

#### U

`U`

### Parameters

#### callbackfn

(`value`, `index`) => `Iterable`\<`U`\>

#### iterable

`Iterable`\<`T`\>

### Returns

`Generator`\<`U`, `void`, `unknown`\>

### Examples

It lazily flattens each callback result
```ts
expect([...flatMap((value) => [value, value * 2], [1, 2, 3])]).toEqual([1, 2, 2, 4, 3, 6]);
```

It awaits async callbacks and flattens async results for async `ITERABLE`
```ts
async function* values() {
  yield 1;
  yield 2;
}
const result = flatMap(async (value) => new Set([value, value * 10]), values());
expect(await Array.fromAsync(result)).toEqual([1, 10, 2, 20]);
```

## Call Signature

> **flatMap**\<`T`, `U`\>(`callbackfn`, `iterable`): `AsyncGenerator`\<`Awaited`\<`U`\>, `void`, `unknown`\>

Defined in: [flatMap.ts:41](https://github.com/bathan1/utop.js/blob/723af95e5440c257f10c7355cacfd1ff80d7b58b/src/flatMap.ts#L41)

`flatMap(callbackfn, iterable)` lazily yields every value from each iterable returned by `CALLBACKFN` for `ITERABLE`.

## Usage
```ts
const words = [...flatMap((line) => line.split(" "), lines)];
```

For an async `ITERABLE`, `flatMap` returns an AsyncGenerator, awaits `CALLBACKFN`,
and accepts either an iterable or async iterable from it.

```ts
const words = await Array.fromAsync(flatMap(async (line) => (await line).split(" "), lines()));
```

## Examples

### Type Parameters

#### T

`T`

#### U

`U`

### Parameters

#### callbackfn

(`value`, `index`) => [`Promisable`](../type-aliases/Promisable.md)\<`Iterable`\<`U`, `any`, `any`\> \| `AsyncIterable`\<`U`, `any`, `any`\>\>

#### iterable

`AsyncIterable`\<`T`\>

### Returns

`AsyncGenerator`\<`Awaited`\<`U`\>, `void`, `unknown`\>

### Examples

It lazily flattens each callback result
```ts
expect([...flatMap((value) => [value, value * 2], [1, 2, 3])]).toEqual([1, 2, 2, 4, 3, 6]);
```

It awaits async callbacks and flattens async results for async `ITERABLE`
```ts
async function* values() {
  yield 1;
  yield 2;
}
const result = flatMap(async (value) => new Set([value, value * 10]), values());
expect(await Array.fromAsync(result)).toEqual([1, 10, 2, 20]);
```
