/**
 * Takes the first `limit` items from the iterable.
 *
 * Note that it will stop consuming the iterable once `limit` items are taken.
 *
 * Use {@linkcode https://jsr.io/@core/iterutil/doc/take-while/~/takeWhile takeWhile} to take items while the predicate returns true.
 * Use {@linkcode https://jsr.io/@core/iterutil/doc/drop/~/drop drop} to drop items from the beginning.
 * Use {@linkcode https://jsr.io/@core/iterutil/doc/async/take/~/take take} to take items asynchronously.
 *
 * @param iterable The iterable to take items from.
 * @param limit The number of items to take. It must be 0 or positive safe integer.
 * @returns The iterable with the first `limit` items taken.
 * @throws {RangeError} if `limit` is less than 0 or non safe integer.
 *
 * @example
 * ```ts
 * import { take } from "@core/iterutil/take";
 *
 * const iter = take([1, 2, 3, 4, 5], 2);
 * console.log(Array.from(iter)); // [1, 2]
 * ```
 */
export function take<T>(iterable: Iterable<T>, limit: number): Iterable<T> {
  if (limit < 0 || !Number.isSafeInteger(limit)) {
    throw new RangeError(
      `limit must be 0 or positive safe integer, but got ${limit}.`,
    );
  }
  if (limit === 0) {
    return [];
  }
  return function* () {
    let i = 1;
    for (const item of iterable) {
      yield item;
      if (i++ >= limit) {
        break;
      }
    }
  }();
}
