import { isArray, isMap, isPlainObject, isSet } from "../guards"
import { PlainObject, Spread } from "../types"

interface MergeArrays {
  <A, B>(a: A[], b: B[]): (A | B)[]
}

interface MergePlainObjects {
  <A extends PlainObject, B extends PlainObject>(a: A, b: B): Spread<A, B>
}

interface MergeMaps {
  <A, B, C, D>(a: Map<A, C>, b: Map<B, D>): Map<A | B, C | D>
}

interface MergeSets {
  <A, B>(a: Set<A>, b: Set<B>): Set<A | B>
}

interface Merge extends MergeArrays, MergePlainObjects, MergeMaps, MergeSets {
  <A, B>(a: A, b: B): B
}

/**
 * Merge two arrays.
 *
 * @param a - The first value.
 * @param b - The second value.
 */
const mergeArrays: MergeArrays = <A, B>(a: A[], b: B[]) => {
  return [...a, ...b]
}

/**
 * Merge two plain objects.
 *
 * @param a - The first object.
 * @param b - The second object.
 */
const mergePlainObjects: MergePlainObjects = <
  A extends PlainObject,
  B extends PlainObject
>(
  a: A,
  b: B
) => {
  return { ...a, ...b }
}

/**
 * Merge two Map objects.
 *
 * @param a - The first Map.
 * @param b - The second Map.
 */
const mergeMaps: MergeMaps = <A, B, C, D>(a: Map<A, C>, b: Map<B, D>) => {
  return new Map([...a, ...b] as [A | B, C | D][])
}

/**
 * Merge two Set objects.
 *
 * @param a - The first Set.
 * @param b - The second Set.
 */
const mergeSets: MergeSets = <A, B>(a: Set<A>, b: Set<B>) => {
  return new Set([...a, ...b])
}

/**
 * Merge two values.
 *
 * @param a - The first value.
 * @param b - The second value.
 */
export const merge: Merge = (a: any, b: any) => {
  if (isArray(a) && isArray(b)) {
    return mergeArrays(a, b)
  } else if (isPlainObject(a) && isPlainObject(b)) {
    return mergePlainObjects(a, b)
  } else if (isMap(a) && isMap(b)) {
    return mergeMaps(a, b)
  } else if (isSet(a) && isSet(b)) {
    return mergeSets(a, b)
  } else {
    return b
  }
}
