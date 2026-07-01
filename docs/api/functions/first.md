---
title: first
description: |-
  first(iterable) returns the first value of ITERABLE, or undefined
  if ITERABLE is empty.
---

# first

`first(iterable)` returns the first value of `ITERABLE`, or `undefined`
if `ITERABLE` is empty.

## Installation

```bash
pnpm dlx shadcn@latest add bathan1/utop.js/first
```

## Usage
```ts
const firstTodo = first([
  { todo: "Buy milk" },
  { todo: "Walk dog" },
]);

console.log(firstTodo?.todo);
```

`first` also supports AsyncIterables, in which case it awaits
the first available value before returning it.

```ts
async function* count() {
  yield 1;
  yield 2;
  yield 3;
}

const value = await first(count());
console.log(value); // 1
```

## Examples

It returns the first value from an iterable
```ts
expect(first(["foo", "bar", "baz"])).toBe("foo");
```

It returns undefined when the iterable is empty
```ts
expect(first([])).toBeUndefined();
```

It returns the first awaited value from an async iterable
```ts
async function* values() {
  yield "foo";
  yield "bar";
  yield "baz";
}

await expect(first(values())).resolves.toBe("foo");
```

## API Reference

### Call Signature

> **first**\<`T`\>(`iterable`): `Promise`\<[`Option`](../type-aliases/Option.md)\<`T`\>\>

Defined in: [first.ts:55](https://github.com/bathan1/utop.js/blob/125dbb4fad39d300a5134b78adea5914856f4dcf/src/first.ts#L55)

#### Type Parameters

##### T

`T`

#### Parameters

##### iterable

`AsyncIterable`\<`T`\>

#### Returns

`Promise`\<[`Option`](../type-aliases/Option.md)\<`T`\>\>

### Call Signature

> **first**\<`T`\>(`iterable`): [`Option`](../type-aliases/Option.md)\<`T`\>

Defined in: [first.ts:58](https://github.com/bathan1/utop.js/blob/125dbb4fad39d300a5134b78adea5914856f4dcf/src/first.ts#L58)

#### Type Parameters

##### T

`T`

#### Parameters

##### iterable

`Iterable`\<`T`\>

#### Returns

[`Option`](../type-aliases/Option.md)\<`T`\>
