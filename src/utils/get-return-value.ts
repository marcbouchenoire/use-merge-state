import { isFunction } from "../guards"

export function getReturnValue<V, A>(
  value: V | ((...args: A[]) => V),
  ...args: A[]
): V {
  return isFunction(value) ? value(...args) : (value as V)
}
