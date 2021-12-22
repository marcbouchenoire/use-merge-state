import { isFunction } from "../guards"

/**
 * Return a value or its own return value if it's a function.
 *
 * @param value - The value or function to return.
 * @param args - The arguments to provide to the value if it's a function.
 */
export function getReturnValue<V, A>(
  value: V | ((...args: A[]) => V),
  ...args: A[]
): V {
  return isFunction(value) ? value(...args) : (value as V)
}
