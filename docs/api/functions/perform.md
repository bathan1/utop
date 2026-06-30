---
title: perform
description: perform(iterator) consumes ITERATOR and returns its final return value.
---

`perform(iterator)` consumes `ITERATOR` and returns its final return value.

## Installation

```bash
pnpm dlx shadcn@latest add bathan1/utop/perform.js
```

## Usage

```ts
import { perform } from "@/lib/utop/perform";
```

```ts
function* work() { yield "working"; return "done"; }
const result = perform(work());
```

`perform` has no async sugar; consume an async iterator with `for await`.

```ts
for await (const event of events()) console.log(event);
```

## Examples

It consumes an iterator and returns its final value
```ts
function* work() {
  yield "first";
  yield "second";
  return "done";
}
expect(perform(work())).toBe("done");
```

## API Reference

> **perform**\<`T`, `R`\>(`iterator`): `R`

Defined in: [perform.ts:29](https://github.com/bathan1/utop.js/blob/17b9b71aa905b6d20aadb7b3219eb62364351b10/src/perform.ts#L29)

### Type Parameters

#### T

`T`

#### R

`R`

### Parameters

#### iterator

`Iterator`\<`T`, `R`, `unknown`\> \| `Iterable`\<`T`, `R`, `unknown`\>

### Returns

`R`
