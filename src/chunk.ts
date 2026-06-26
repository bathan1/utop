/**
 * `chunk(limit, iterable)` is a new generator that yields elements of `ITERABLE` materialized as arrays of max size `LIMIT`.
 * 
 * ### Installation
 * ```bash
 * pnpm dlx shadcn@latest add bathan1/utop/chunk.js
 * ```
 * 
 * ### Usage
 * ```ts
 * import { chunk } from "@/lib/utop/chunk.js";
 * ```
 * 
 * ```ts
 * const lotsOfRows = createLotsOfData();
 * const insertableChunks = chunk(500, lotsOfRows);
 * for (const chunk of insertableChunks) {
 *   await tx
 *     .insertInto("some-table")
 *     .values(chunk)
 *     .execute();
 * }
 * ```
 *
 * ### Helpers
 * You can the following helper properties attached to the `chunk` function:
 *
 * chunk
 * └── chunk.async
 * 
 * ### Examples
 * 
 * @example
 * It yields arrays of max size `LIMIT`
 * ```ts
 * function* infinite() {
 *   let i = 0;
 *   while (true) {
 *     yield i++;
 *   }
 * }
 * const limit = Math.ceil(Math.random() * 100);
 * const randomLength = Math.ceil(Math.random() * limit);
 * const iterable = randomIterableFromArray(take(randomLength, infinite()).toArray());
 * 
 * const chunked = Array.from(chunk(limit, iterable));
 * chunked.forEach((array) => expect(array.length).toBeLessThanOrEqual(limit));
 * ```
 * 
 * @example
 * It throws RangeError when `LIMIT` is non-positive
 * ```ts
 * const limit = Math.random() < 0.5 ? -1 : -1.123;
 * const iterable = randomIterableFromArray([1, 2]);
 * 
 * const chunked = () => Array.from(chunk(limit, iterable));
 * expect(chunked).toThrow(RangeError);
 * ```
 */
export function* chunk<T>(
  limit: number,
  iterable: Iterable<T, unknown, unknown>,
): Generator<T[], void, unknown> {
  if (limit <= 0) {
    throw new RangeError("chunk LIMIT must be greater than 0", {
      cause: limit,
    });
  }
  let chunks: T[] = [];

  for (const x of iterable) {
    chunks.push(x);

    if (chunks.length >= limit) {
      yield chunks;
      chunks = [];
    }
  }

  if (chunks.length > 0) {
    yield chunks;
  }
}

/**
 * `chunk.async(limit, iterable)` is a new **async** generator that yields elements of `ITERABLE` materialized as arrays of max size `LIMIT`.
 */
chunk.async = async function* chunkAsync<T>(
  limit: number,
  iterable: AsyncIterable<T, unknown, unknown>
): AsyncGenerator<T[], void, unknown> {
  if (limit <= 0) {
    throw new RangeError("chunk LIMIT must be greater than 0", {
      cause: limit,
    });
  }
  let chunks: T[] = [];

  for await (const x of iterable) {
    chunks.push(x);

    if (chunks.length >= limit) {
      yield chunks;
      chunks = [];
    }
  }

  if (chunks.length > 0) {
    yield chunks;
  }
}
