import { uniq as base } from "@core/iterutil/async/uniq";

/**
 * Returns an operator that yields the unique elements of the iterable.
 *
 * See {@linkcode https://jsr.io/@core/iterutil/doc/async/uniq/~/uniq uniq} for native uniq.
 *
 * @param identify An optional function to transform the elements before checking for uniqueness.
 * @returns An operator that yields the unique elements of the iterable.
 *
 * @example
 * ```ts
 * import { pipe } from "@core/pipe";
 * import { uniq } from "@core/iterutil/pipe/async/uniq";
 *
 * const iter1 = pipe([1, 2, 2, 3, 3, 3], uniq());
 * console.log(await Array.fromAsync(iter1)); // [1, 2, 3]
 *
 * const iter2 = pipe(
 *   [1, 2, 3, 4, 5, 6, 7, 8, 9],
 *   uniq((v) => v % 4),
 * );
 * console.log(await Array.fromAsync(iter2)); // [1, 2, 3, 4]
 * ```
 */
export function uniq<T>(
  identify: (v: T, index: number) => unknown | Promise<unknown> = (v) => v,
): (iterable: Iterable<T> | AsyncIterable<T>) => AsyncIterable<T> {
  return (iterable) => base(iterable, identify);
}
