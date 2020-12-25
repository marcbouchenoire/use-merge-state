import { isFunction } from "../guards"

export const getReturnValue = <V, A>(
  value: V | ((...args: A[]) => V),
  ...args: A[]
): V => {
  if (isFunction(value)) {
    return value(...args)
  } else {
    return value as V
  }
}
