---
title: first
---

# Function: first()

## Call Signature

> **first**\<`T`\>(`iterable`): `Promise`\<[`Option`](../type-aliases/Option.md)\<`T`\>\>

Defined in: [first.ts:33](https://github.com/bathan1/utop.js/blob/723af95e5440c257f10c7355cacfd1ff80d7b58b/src/first.ts#L33)

`first(iterable)` returns the first value of `ITERABLE`, or `undefined`
if `ITERABLE` is empty.

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

### Type Parameters

#### T

`T`

### Parameters

#### iterable

`AsyncIterable`\<`T`\>

### Returns

`Promise`\<[`Option`](../type-aliases/Option.md)\<`T`\>\>

## Call Signature

> **first**\<`T`\>(`iterable`): [`Option`](../type-aliases/Option.md)\<`T`\>

Defined in: [first.ts:36](https://github.com/bathan1/utop.js/blob/723af95e5440c257f10c7355cacfd1ff80d7b58b/src/first.ts#L36)

`first(iterable)` returns the first value of `ITERABLE`, or `undefined`
if `ITERABLE` is empty.

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

### Type Parameters

#### T

`T`

### Parameters

#### iterable

`Iterable`\<`T`\>

### Returns

[`Option`](../type-aliases/Option.md)\<`T`\>
