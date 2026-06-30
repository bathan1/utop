---
title: Some
description: |-
  `Some<T>` is just `NonNullable<T>`. Even though `null` is not the
  same as our userland None since that is just an alias for
  `undefined`, in general, when we want to assert `Some<T>`, that means
  we want to work with some *meaningful* value, which is why we exclude
  `null` here.
---

# Type Alias: Some\<T\>

> **Some**\<`T`\> = `NonNullable`\<`T`\>

Defined in: [types.ts:63](https://github.com/bathan1/utop.js/blob/17b9b71aa905b6d20aadb7b3219eb62364351b10/src/types.ts#L63)

`Some<T>` is just `NonNullable<T>`. Even though `null` is not the
same as our userland [None](../variables/None.md) since that is just an alias for
`undefined`, in general, when we want to assert `Some<T>`, that means
we want to work with some *meaningful* value, which is why we exclude
`null` here.

## Type Parameters

### T

`T`
