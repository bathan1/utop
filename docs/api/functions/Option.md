---
title: Option
---

# Function: Option()

> **Option**\<`T`\>(`value`): [`Option`](../type-aliases/Option.md)\<`NonNullable`\<`T`\>\>

Defined in: [types.ts:16](https://github.com/bathan1/utop.js/blob/125dbb4fad39d300a5134b78adea5914856f4dcf/src/types.ts#L16)

## Type Parameters

### T

`T`

## Parameters

### value

`T` \| `null` \| `undefined`

## Returns

[`Option`](../type-aliases/Option.md)\<`NonNullable`\<`T`\>\>

## Example

It coerces null VALUE to undefined
```ts
expect(Option(null)).not.toEqual(null);
expect(Option(null)).toEqual(undefined);
```
