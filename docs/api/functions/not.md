---
title: not
description: not(value) negates VALUE; not(predicate, value) negates PREDICATE(VALUE).
---

# not

`not(value)` negates `VALUE`; `not(predicate, value)` negates `PREDICATE(VALUE)`.

This is a rare case of a function where the number of arguments determines how
the function evaluates them, as opposed to the usual case where omitting arguments
simply indicates the absence of that value in Utop.js.

## Installation

```bash
pnpm dlx shadcn@latest add bathan1/utop.js/not
```

## Usage
```ts
const response = await fetch("http://localhost:3000");
if (not(response.ok)) {
  throw new Error("")
}
```

Although you can use `not` as a "readable" `!` operator like the above does against a single `VALUE`,
the main benefit of `not` is its ability to infer the excluded type that `PREDICATE` asserts.

```ts
const isString = (val: string | number) => typeof val === "string";
const x = Math.random() < 0.5 ? "1" : 1;

if (not(isString, x)) {
  console.log("number!", x);
} else {
  console.log("string!", x);
}
```

There is no async sugar for the `not` function.

## Examples

It returns `true` for falsy values
```ts
expect(not(null)).toBe(true);
expect(not(undefined)).toBe(true);
expect(not(false)).toBe(true);
expect(not(0)).toBe(true);
expect(not(0n)).toBe(true);
expect(not("")).toBe(true);
```

It returns `false` for truthy values
```ts
expect(not(true)).toBe(false);
expect(not(1)).toBe(false);
expect(not("hello")).toBe(false);
expect(not([])).toBe(false);
expect(not([1])).toBe(false);
expect(not({})).toBe(false);
```

It accepts predicate functions
```ts
const isEven = (x: 1 | 2 | 3 | 4): x is 2 | 4 => x % 2 === 0;
const xs = [1, 2, 3, 4] as const;

const odds = xs.filter((x) => not(isEven, x));
expect(odds).toEqual([1, 3]);
```

## API Reference

### Call Signature

> **not**\<`T`\>(`value`): `value is Extract<T, Falsy>`

Defined in: [not.ts:72](https://github.com/bathan1/utop.js/blob/125dbb4fad39d300a5134b78adea5914856f4dcf/src/not.ts#L72)

#### Type Parameters

##### T

`T`

#### Parameters

##### value

`T`

#### Returns

`value is Extract<T, Falsy>`

### Call Signature

> **not**\<`T`, `S`\>(`predicate`, `value`): `value is Exclude<T, S>`

Defined in: [not.ts:73](https://github.com/bathan1/utop.js/blob/125dbb4fad39d300a5134b78adea5914856f4dcf/src/not.ts#L73)

#### Type Parameters

##### T

`T`

##### S

`S`

#### Parameters

##### predicate

(`value`) => `value is S`

##### value

`T`

#### Returns

`value is Exclude<T, S>`

### Call Signature

> **not**\<`T`\>(`predicate`, `value`): `boolean`

Defined in: [not.ts:77](https://github.com/bathan1/utop.js/blob/125dbb4fad39d300a5134b78adea5914856f4dcf/src/not.ts#L77)

#### Type Parameters

##### T

`T`

#### Parameters

##### predicate

(`value`) => `unknown`

##### value

`T`

#### Returns

`boolean`
