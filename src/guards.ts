import type { PlainFunction, PlainObject, Unpack } from "./types"

/**
 * Whether the value is an array.
 *
 * @param value - The value to check.
 */
export const isArray = Array.isArray

/**
 * Whether the value is a function.
 *
 * @param value - The value to check.
 */
export function isFunction<T extends PlainFunction>(
  value: T | unknown
): value is PlainFunction<Unpack<Parameters<T>>, ReturnType<T>> {
  return value instanceof Function
}

/**
 * Whether the value is a map.
 *
 * @param value - The value to check.
 */
export function isMap<T, U>(value: Map<T, U> | unknown): value is Map<T, U> {
  return value instanceof Map
}

/**
 * Whether the value is a number.
 *
 * @param value - The value to check.
 */
export function isNumber(value: number | unknown): value is number {
  return typeof value === "number"
}

/**
 * Whether the value is a plain object.
 *
 * @param value - The value to check.
 */
export function isPlainObject<T, U extends PlainObject>(
  value: PlainObject<T> | U | unknown
): value is PlainObject<T> | U {
  return (
    typeof value === "object" &&
    value !== null &&
    value.constructor === Object &&
    Object.getPrototypeOf(value) === Object.prototype
  )
}

/**
 * Whether the value is a set.
 *
 * @param value - The value to check.
 */
export function isSet<T>(value: Set<T> | unknown): value is Set<T> {
  return value instanceof Set
}
