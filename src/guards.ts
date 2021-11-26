import { PlainFunction, PlainObject, Unpack } from "./types"

export const isArray = Array.isArray

export function isFunction<T extends PlainFunction>(
  value: T | unknown
): value is PlainFunction<Unpack<Parameters<T>>, ReturnType<T>> {
  return value instanceof Function
}

export function isMap<T, U>(value: Map<T, U> | unknown): value is Map<T, U> {
  return value instanceof Map
}

export function isNumber(value: number | unknown): value is number {
  return typeof value === "number"
}

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

export function isSet<T>(value: Set<T> | unknown): value is Set<T> {
  return value instanceof Set
}
