/**
 * `Option<T>` is `T` unioned with `undefined`
 */
export type Option<T> =
  | T
  | undefined;

/**
 * `Some<T>` is just `NonNullable<T>`. Even though `null` is not the
 * same as our userland {@link None} since that is just an alias for
 * `undefined`, in general, when we want to assert `Some<T>`, that means
 * we want to work with some *meaningful* value, which is why we exclude
 * `null` here.
 */
export type Some<T> = NonNullable<T>;
export type None = undefined;
export const None: undefined = undefined;

/**
 * `Promisable<T>` is either `T` itself or a {@link Promise} of `T`
 */
export type Promisable<T> =
  | T
  | Promise<T>;

/**
 * `Either<L, R>` is values of types `L` boxed in a `"left"` disciminateable
 * object and `R` boxed in `"right"` kinds.
 */
export type Either<L, R> =
  | { kind: "left"; value: L }
  | { kind: "right"; value: R };
