type Comparable = string | number | bigint | boolean | Date;
type ComparableKeyOf<T> = {
  [K in keyof T]-?: T[K] extends Comparable ? K : never;
}[keyof T];

const compare = {
  string: (a: Comparable, b: Comparable) => String(a).localeCompare(String(b)),
  number: (a: Comparable, b: Comparable) => Number(a) - Number(b),
  bigint: (a: Comparable, b: Comparable) => (a < b ? -1 : a > b ? 1 : 0),
  boolean: (a: Comparable, b: Comparable) => Number(a) - Number(b),
  date: (a: Comparable, b: Comparable) => Number(a) - Number(b),
};

/**
 * `orderBy(keys, direction, iterable)` returns `ITERABLE` ordered by `KEYS` in `DIRECTION`.
 *
 * ### Usage
 * ```ts
 * const ranked = orderBy(["score"], "desc", players);
 * ```
 *
 * `orderBy` has no async sugar; materialize async input before calling it.
 *
 * ```ts
 * const ranked = orderBy(["score"], "desc", await Array.fromAsync(players()));
 * ```
 *
 * ### Examples
 *
 * @example
 * It sorts by later keys when earlier keys are equal
 * ```ts
 * const rows = [
 *   { group: "b", score: 1 },
 *   { group: "a", score: 2 },
 *   { group: "a", score: 1 },
 * ];
 * expect(orderBy(["group", "score"], "asc", rows)).toEqual([
 *   { group: "a", score: 1 },
 *   { group: "a", score: 2 },
 *   { group: "b", score: 1 },
 * ]);
 * ```
 */
export function orderBy<T, Keys extends ComparableKeyOf<T>[]>(
  keys: Keys,
  direction: "asc" | "desc",
  iterable: Iterable<T>
): T[] {
  const rows = Array.from(iterable);
  if (rows.length <= 1) return rows;

  const comparers = keys.map((key) => {
    const first = rows[0]![key] as Comparable;
    const comparator =
      first instanceof Date
        ? compare.date
        : compare[typeof first as "string" | "number" | "bigint" | "boolean"];
    return { key, comparator };
  });

  return rows.sort((a, b) => {
    for (const { key, comparator } of comparers) {
      const result = comparator(a[key] as Comparable, b[key] as Comparable);
      if (result !== 0) return direction === "asc" ? result : -result;
    }
    return 0;
  });
}
