---
title: findErr
---

# Function: findErr()

## Call Signature

> **findErr**\<`T`, `S`\>(`predicate`, `iterable`): `Promise`\<`S`\>

Defined in: [findErr.ts:78](https://github.com/bathan1/utop.js/blob/723af95e5440c257f10c7355cacfd1ff80d7b58b/src/findErr.ts#L78)

`findErr(predicate, iterable)` returns the first value in `ITERABLE` matching `PREDICATE` or throws
RangeError if no such value is found.

## Usage
```ts
const firstOpen = findErr((todo) => !todo.done, todos);
```

`findErr` does not await `PREDICATE`; async behavior is only provided for async iterables.

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

`Promise`\<`S`\>

### Examples

It returns the first value that satisfies `CALLBACKFN`
```ts
expect(findErr((x) => x > 2, [1, 2, 3, 4])).toBe(3);
```

It throws when no value satisfies `CALLBACKFN`
```ts
expect(() => findErr((x) => x > 4, [1, 2, 3])).toThrow(RangeError);
```

It returns asynchronously for async ITERABLE even when it also has a sync iterator symbol
```ts
const iterable = {
  async *[Symbol.asyncIterator]() {
    yield 1;
    yield 2;
    yield 3;
  },
  *[Symbol.iterator]() {
    yield 1;
    yield 2;
    yield 3;
  },
};

const syncOverridenPromise = findErr((x) => x > 2, iterable);
expect(syncOverridenPromise).toBeInstanceOf(Promise);
expect(await syncOverridenPromise).toEqual(3);
```

It returns asynchronously for async ITERABLE
```ts
const iterable = {
  async *[Symbol.asyncIterator]() {
    yield 1;
    yield 2;
    yield 3;
  },
};

const promise = findErr((x) => x > 2, iterable);
expect(promise).toBeInstanceOf(Promise);
expect(await promise).toEqual(3);
```

It throws asynchronously when no async value satisfies `CALLBACKFN`
```ts
async function* values() {
  yield 1;
  yield 2;
}

await expect(findErr((value) => value > 2, values())).rejects.toThrow(RangeError);
```

## Call Signature

> **findErr**\<`T`\>(`predicate`, `iterable`): `Promise`\<`T`\>

Defined in: [findErr.ts:82](https://github.com/bathan1/utop.js/blob/723af95e5440c257f10c7355cacfd1ff80d7b58b/src/findErr.ts#L82)

`findErr(predicate, iterable)` returns the first value in `ITERABLE` matching `PREDICATE` or throws
RangeError if no such value is found.

## Usage
```ts
const firstOpen = findErr((todo) => !todo.done, todos);
```

`findErr` does not await `PREDICATE`; async behavior is only provided for async iterables.

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

`Promise`\<`T`\>

### Examples

It returns the first value that satisfies `CALLBACKFN`
```ts
expect(findErr((x) => x > 2, [1, 2, 3, 4])).toBe(3);
```

It throws when no value satisfies `CALLBACKFN`
```ts
expect(() => findErr((x) => x > 4, [1, 2, 3])).toThrow(RangeError);
```

It returns asynchronously for async ITERABLE even when it also has a sync iterator symbol
```ts
const iterable = {
  async *[Symbol.asyncIterator]() {
    yield 1;
    yield 2;
    yield 3;
  },
  *[Symbol.iterator]() {
    yield 1;
    yield 2;
    yield 3;
  },
};

const syncOverridenPromise = findErr((x) => x > 2, iterable);
expect(syncOverridenPromise).toBeInstanceOf(Promise);
expect(await syncOverridenPromise).toEqual(3);
```

It returns asynchronously for async ITERABLE
```ts
const iterable = {
  async *[Symbol.asyncIterator]() {
    yield 1;
    yield 2;
    yield 3;
  },
};

const promise = findErr((x) => x > 2, iterable);
expect(promise).toBeInstanceOf(Promise);
expect(await promise).toEqual(3);
```

It throws asynchronously when no async value satisfies `CALLBACKFN`
```ts
async function* values() {
  yield 1;
  yield 2;
}

await expect(findErr((value) => value > 2, values())).rejects.toThrow(RangeError);
```

## Call Signature

> **findErr**\<`T`, `S`\>(`predicate`, `iterable`): `S`

Defined in: [findErr.ts:86](https://github.com/bathan1/utop.js/blob/723af95e5440c257f10c7355cacfd1ff80d7b58b/src/findErr.ts#L86)

`findErr(predicate, iterable)` returns the first value in `ITERABLE` matching `PREDICATE` or throws
RangeError if no such value is found.

## Usage
```ts
const firstOpen = findErr((todo) => !todo.done, todos);
```

`findErr` does not await `PREDICATE`; async behavior is only provided for async iterables.

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

`S`

### Examples

It returns the first value that satisfies `CALLBACKFN`
```ts
expect(findErr((x) => x > 2, [1, 2, 3, 4])).toBe(3);
```

It throws when no value satisfies `CALLBACKFN`
```ts
expect(() => findErr((x) => x > 4, [1, 2, 3])).toThrow(RangeError);
```

It returns asynchronously for async ITERABLE even when it also has a sync iterator symbol
```ts
const iterable = {
  async *[Symbol.asyncIterator]() {
    yield 1;
    yield 2;
    yield 3;
  },
  *[Symbol.iterator]() {
    yield 1;
    yield 2;
    yield 3;
  },
};

const syncOverridenPromise = findErr((x) => x > 2, iterable);
expect(syncOverridenPromise).toBeInstanceOf(Promise);
expect(await syncOverridenPromise).toEqual(3);
```

It returns asynchronously for async ITERABLE
```ts
const iterable = {
  async *[Symbol.asyncIterator]() {
    yield 1;
    yield 2;
    yield 3;
  },
};

const promise = findErr((x) => x > 2, iterable);
expect(promise).toBeInstanceOf(Promise);
expect(await promise).toEqual(3);
```

It throws asynchronously when no async value satisfies `CALLBACKFN`
```ts
async function* values() {
  yield 1;
  yield 2;
}

await expect(findErr((value) => value > 2, values())).rejects.toThrow(RangeError);
```

## Call Signature

> **findErr**\<`T`\>(`predicate`, `iterable`): `T`

Defined in: [findErr.ts:90](https://github.com/bathan1/utop.js/blob/723af95e5440c257f10c7355cacfd1ff80d7b58b/src/findErr.ts#L90)

`findErr(predicate, iterable)` returns the first value in `ITERABLE` matching `PREDICATE` or throws
RangeError if no such value is found.

## Usage
```ts
const firstOpen = findErr((todo) => !todo.done, todos);
```

`findErr` does not await `PREDICATE`; async behavior is only provided for async iterables.

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

`T`

### Examples

It returns the first value that satisfies `CALLBACKFN`
```ts
expect(findErr((x) => x > 2, [1, 2, 3, 4])).toBe(3);
```

It throws when no value satisfies `CALLBACKFN`
```ts
expect(() => findErr((x) => x > 4, [1, 2, 3])).toThrow(RangeError);
```

It returns asynchronously for async ITERABLE even when it also has a sync iterator symbol
```ts
const iterable = {
  async *[Symbol.asyncIterator]() {
    yield 1;
    yield 2;
    yield 3;
  },
  *[Symbol.iterator]() {
    yield 1;
    yield 2;
    yield 3;
  },
};

const syncOverridenPromise = findErr((x) => x > 2, iterable);
expect(syncOverridenPromise).toBeInstanceOf(Promise);
expect(await syncOverridenPromise).toEqual(3);
```

It returns asynchronously for async ITERABLE
```ts
const iterable = {
  async *[Symbol.asyncIterator]() {
    yield 1;
    yield 2;
    yield 3;
  },
};

const promise = findErr((x) => x > 2, iterable);
expect(promise).toBeInstanceOf(Promise);
expect(await promise).toEqual(3);
```

It throws asynchronously when no async value satisfies `CALLBACKFN`
```ts
async function* values() {
  yield 1;
  yield 2;
}

await expect(findErr((value) => value > 2, values())).rejects.toThrow(RangeError);
```
