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

const mergeArrays: MergeArrays = <A, B>(a: A[], b: B[]) => {
  return [...a, ...b]
}

const mergePlainObjects: MergePlainObjects = <
  A extends PlainObject,
  B extends PlainObject
>(
  a: A,
  b: B
) => {
  return { ...a, ...b }
}

const mergeMaps: MergeMaps = <A, B, C, D>(a: Map<A, C>, b: Map<B, D>) => {
  return new Map([...a, ...b] as [A | B, C | D][])
}

const mergeSets: MergeSets = <A, B>(a: Set<A>, b: Set<B>) => {
  return new Set([...a, ...b])
}

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
