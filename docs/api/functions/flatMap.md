---
title: flatMap
description: flatMap(callbackfn, iterable) lazily yields every value from each iterable returned by CALLBACKFN for ITERABLE.
---

# flatmap

`flatMap(callbackfn, iterable)` lazily yields every value from each iterable returned by `CALLBACKFN` for `ITERABLE`.

## Installation

```bash
pnpm dlx shadcn@latest add bathan1/utop.js/flatMap
```

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

## API Reference

### Call Signature

> **flatMap**\<`T`, `U`\>(`callbackfn`, `iterable`): `Generator`\<`U`, `void`, `unknown`\>

Defined in: [flatMap.ts:35](https://github.com/bathan1/utop.js/blob/125dbb4fad39d300a5134b78adea5914856f4dcf/src/flatMap.ts#L35)

#### Type Parameters

##### T

`T`

##### U

`U`

#### Parameters

##### callbackfn

(`value`, `index`) => `Iterable`\<`U`\>

##### iterable

`Iterable`\<`T`\>

#### Returns

`Generator`\<`U`, `void`, `unknown`\>

### Call Signature

> **flatMap**\<`T`, `U`\>(`callbackfn`, `iterable`): `AsyncGenerator`\<`Awaited`\<`U`\>, `void`, `unknown`\>

Defined in: [flatMap.ts:39](https://github.com/bathan1/utop.js/blob/125dbb4fad39d300a5134b78adea5914856f4dcf/src/flatMap.ts#L39)

#### Type Parameters

##### T

`T`

##### U

`U`

#### Parameters

##### callbackfn

(`value`, `index`) => [`Promisable`](../type-aliases/Promisable.md)\<`Iterable`\<`U`, `any`, `any`\> \| `AsyncIterable`\<`U`, `any`, `any`\>\>

##### iterable

`AsyncIterable`\<`T`\>

#### Returns

`AsyncGenerator`\<`Awaited`\<`U`\>, `void`, `unknown`\>
