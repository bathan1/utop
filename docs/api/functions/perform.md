---
title: perform
---

# Function: perform()

> **perform**\<`T`, `R`\>(`iterator`): `R`

Defined in: [perform.ts:29](https://github.com/bathan1/utop.js/blob/723af95e5440c257f10c7355cacfd1ff80d7b58b/src/perform.ts#L29)

`perform(iterator)` consumes `ITERATOR` and returns its final return value.

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

## Type Parameters

### T

`T`

### R

`R`

## Parameters

### iterator

`Iterator`\<`T`, `R`, `unknown`\> \| `Iterable`\<`T`, `R`, `unknown`\>

## Returns

`R`

## Example

It consumes an iterator and returns its final value
```ts
function* work() {
  yield "first";
  yield "second";
  return "done";
}
expect(perform(work())).toBe("done");
```
