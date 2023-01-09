import { isArray, isMap, isPlainObject, isSet } from "../guards"
import type { PlainObject, Spread } from "../types"

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
 * Merge two maps.
 *
 * @param a - The first map.
 * @param b - The second map.
 */
const mergeMaps: MergeMaps = <A, B, C, D>(a: Map<A, C>, b: Map<B, D>) => {
  return new Map([...a, ...b] as [A | B, C | D][])
}

/**
 * Merge two sets.
 *
 * @param a - The first set.
 * @param b - The second set.
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
