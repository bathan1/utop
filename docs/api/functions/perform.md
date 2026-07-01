---
title: perform
description: perform(iterator) consumes ITERATOR and returns its final return value.
---

# perform

`perform(iterator)` consumes `ITERATOR` and returns its final return value.

## Installation

```bash
pnpm dlx shadcn@latest add bathan1/utop.js/perform
```

## Usage
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

Defined in: [perform.ts:27](https://github.com/bathan1/utop.js/blob/125dbb4fad39d300a5134b78adea5914856f4dcf/src/perform.ts#L27)

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
