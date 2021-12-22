import { PlainFunction, PlainObject, Unpack } from "./types"

/**
 * Return whether the value is an array.
 *
 * @param value - The value to be checked.
 */
export const isArray = Array.isArray

/**
 * Return whether the value is a function.
 *
 * @param value - The value to be checked.
 */
export function isFunction<T extends PlainFunction>(
  value: T | unknown
): value is PlainFunction<Unpack<Parameters<T>>, ReturnType<T>> {
  return value instanceof Function
}

/**
 * Return whether the value is a Map.
 *
 * @param value - The value to be checked.
 */
export function isMap<T, U>(value: Map<T, U> | unknown): value is Map<T, U> {
  return value instanceof Map
}

/**
 * Return whether the value is a number.
 *
 * @param value - The value to be checked.
 */
export function isNumber(value: number | unknown): value is number {
  return typeof value === "number"
}

/**
 * Return whether the value is a plain object.
 *
 * @param value - The value to be checked.
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
 * Return whether the value is a Set.
 *
 * @param value - The value to be checked.
 */
export function isSet<T>(value: Set<T> | unknown): value is Set<T> {
  return value instanceof Set
}
