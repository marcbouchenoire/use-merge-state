import { PlainFunction, PlainObject, Unpack } from "./types"

export const isArray = Array.isArray

export const isFunction = <T extends PlainFunction>(
  value: T | unknown
): value is PlainFunction<Unpack<Parameters<T>>, ReturnType<T>> => {
  return (value ?? null) instanceof Function
}

export const isMap = <T, U>(value: Map<T, U> | unknown): value is Map<T, U> => {
  return (value ?? null) instanceof Map
}

export const isPlainObject = <T, U extends PlainObject>(
  value: PlainObject<T> | U | unknown
): value is PlainObject<T> | U => {
  return typeof value === "object" && value?.constructor === Object
}

export const isSet = <T>(value: Set<T> | unknown): value is Set<T> => {
  return (value ?? null) instanceof Set
}
