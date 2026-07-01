---
title: every
description: |-
  every(predicate, iterable) is true if every value in ITERABLE satisfies
  PREDICATE(value) or false otherwise.
---

# every

`every(predicate, iterable)` is `true` if every `value` in `ITERABLE` satisfies
`PREDICATE(value)` or `false` otherwise.

## Installation

```bash
pnpm dlx shadcn@latest add bathan1/utop.js/every
```

## Usage
```ts
const todos = await fetch('https://dummyjson.com/todos')
  .then(async res => (await res.json()).todos as { completed: boolean }[]);

const areAllCompleted = every((todo): todo is { id: number; completed: true } => todo.completed, todos);
console.log(areAllCompleted); // false
```

If `ITERABLE` is async then this returns the result as a Promise.

```ts
const response = await fetch('https://dummyjson.com/todos');
if (!response.body) {
  throw new Error("bad response", { cause: await response.json().catch(() => "unknown") })
}

const chunksExist = await every(chunk => chunk.length > 0, response.body);
console.log(chunksExist); // true
```

## Examples

It is `true` when every value matches `PREDICATE`
```ts
expect(every((x) => x.length > 0, ["a", "bb", "ccc"])).toBe(true);
```

It is `false` when any value does not match `PREDICATE`
```ts
expect(every((x) => x.length > 0, ["a", "", "ccc"])).toBe(false);
```

It accepts async `ITERABLE`
```ts
async function* messageQueue() {
  yield "hello";
  yield "world";
}

expect(await every((x) => x.length === 5, messageQueue())).toEqual(true);
```

It does NOT await `PREDICATE` on async `ITERABLE`
```ts
async function* messageQueue() {
  yield "hello";
  yield "world";
}

expect(await every(async (x) => x.length === 1, messageQueue())).toEqual(true);
```

## API Reference

### Call Signature

> **every**\<`T`, `S`\>(`predicate`, `iterable`): `Promise`\<`boolean`\>

Defined in: [every.ts:64](https://github.com/bathan1/utop.js/blob/125dbb4fad39d300a5134b78adea5914856f4dcf/src/every.ts#L64)

#### Type Parameters

##### T

`T`

##### S

`S`

#### Parameters

##### predicate

(`value`, `index`) => `value is S`

##### iterable

`AsyncIterable`\<`T`\>

#### Returns

`Promise`\<`boolean`\>

### Call Signature

> **every**\<`T`\>(`predicate`, `iterable`): `Promise`\<`boolean`\>

Defined in: [every.ts:68](https://github.com/bathan1/utop.js/blob/125dbb4fad39d300a5134b78adea5914856f4dcf/src/every.ts#L68)

#### Type Parameters

##### T

`T`

#### Parameters

##### predicate

(`value`, `index`) => `unknown`

##### iterable

`AsyncIterable`\<`T`\>

#### Returns

`Promise`\<`boolean`\>

### Call Signature

> **every**\<`T`, `S`\>(`predicate`, `iterable`): `iterable is Iterable<S, any, any>`

Defined in: [every.ts:72](https://github.com/bathan1/utop.js/blob/125dbb4fad39d300a5134b78adea5914856f4dcf/src/every.ts#L72)

#### Type Parameters

##### T

`T`

##### S

`S`

#### Parameters

##### predicate

(`value`, `index`) => `value is S`

##### iterable

`Iterable`\<`T`\>

#### Returns

`iterable is Iterable<S, any, any>`

### Call Signature

> **every**\<`T`\>(`predicate`, `iterable`): `boolean`

Defined in: [every.ts:76](https://github.com/bathan1/utop.js/blob/125dbb4fad39d300a5134b78adea5914856f4dcf/src/every.ts#L76)

#### Type Parameters

##### T

`T`

#### Parameters

##### predicate

(`value`, `index`) => `unknown`

##### iterable

`Iterable`\<`T`\>

#### Returns

`boolean`
