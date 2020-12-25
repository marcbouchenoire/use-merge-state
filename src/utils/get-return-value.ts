import { isFunction } from "../guards"

export const getReturnValue = <V, A>(
  value: V | ((argument: A) => V),
  argument: A
): V => {
  if (isFunction(value)) {
    return value(argument)
  } else {
    return value
  }
}
