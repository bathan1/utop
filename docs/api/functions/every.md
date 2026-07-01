---
title: every
---

# Function: every()

## Call Signature

> **every**\<`T`, `S`\>(`predicate`, `iterable`): `Promise`\<`boolean`\>

Defined in: [every.ts:66](https://github.com/bathan1/utop.js/blob/723af95e5440c257f10c7355cacfd1ff80d7b58b/src/every.ts#L66)

`every(predicate, iterable)` is `true` if every `value` in `ITERABLE` satisfies
`PREDICATE(value)` or `false` otherwise.

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

### Type Parameters

#### T

`T`

#### S

`S`

### Parameters

#### predicate

(`value`, `index`) => `value is S`

#### iterable

`AsyncIterable`\<`T`\>

### Returns

`Promise`\<`boolean`\>

### Examples

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

expect(await every((x) => x.length === 5, messageQueue()));
```

It awaits `PREDICATE` for async `ITERABLE`
```ts
async function* values() {
  yield 1;
  yield 2;
}

expect(await every(async (value) => value > 0, values())).toBe(true);
```

## Call Signature

> **every**\<`T`\>(`predicate`, `iterable`): `Promise`\<`boolean`\>

Defined in: [every.ts:70](https://github.com/bathan1/utop.js/blob/723af95e5440c257f10c7355cacfd1ff80d7b58b/src/every.ts#L70)

`every(predicate, iterable)` is `true` if every `value` in `ITERABLE` satisfies
`PREDICATE(value)` or `false` otherwise.

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

### Type Parameters

#### T

`T`

### Parameters

#### predicate

(`value`, `index`) => `unknown`

#### iterable

`AsyncIterable`\<`T`\>

### Returns

`Promise`\<`boolean`\>

### Examples

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

expect(await every((x) => x.length === 5, messageQueue()));
```

It awaits `PREDICATE` for async `ITERABLE`
```ts
async function* values() {
  yield 1;
  yield 2;
}

expect(await every(async (value) => value > 0, values())).toBe(true);
```

## Call Signature

> **every**\<`T`, `S`\>(`predicate`, `iterable`): `iterable is Iterable<S, any, any>`

Defined in: [every.ts:74](https://github.com/bathan1/utop.js/blob/723af95e5440c257f10c7355cacfd1ff80d7b58b/src/every.ts#L74)

`every(predicate, iterable)` is `true` if every `value` in `ITERABLE` satisfies
`PREDICATE(value)` or `false` otherwise.

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

### Type Parameters

#### T

`T`

#### S

`S`

### Parameters

#### predicate

(`value`, `index`) => `value is S`

#### iterable

`Iterable`\<`T`\>

### Returns

`iterable is Iterable<S, any, any>`

### Examples

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

expect(await every((x) => x.length === 5, messageQueue()));
```

It awaits `PREDICATE` for async `ITERABLE`
```ts
async function* values() {
  yield 1;
  yield 2;
}

expect(await every(async (value) => value > 0, values())).toBe(true);
```

## Call Signature

> **every**\<`T`\>(`predicate`, `iterable`): `boolean`

Defined in: [every.ts:78](https://github.com/bathan1/utop.js/blob/723af95e5440c257f10c7355cacfd1ff80d7b58b/src/every.ts#L78)

`every(predicate, iterable)` is `true` if every `value` in `ITERABLE` satisfies
`PREDICATE(value)` or `false` otherwise.

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

### Type Parameters

#### T

`T`

### Parameters

#### predicate

(`value`, `index`) => `unknown`

#### iterable

`Iterable`\<`T`\>

### Returns

`boolean`

### Examples

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

expect(await every((x) => x.length === 5, messageQueue()));
```

It awaits `PREDICATE` for async `ITERABLE`
```ts
async function* values() {
  yield 1;
  yield 2;
}

expect(await every(async (value) => value > 0, values())).toBe(true);
```
