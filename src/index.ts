import { SetStateAction, useCallback, useMemo, useState } from "react"
import { DispatchWithOptions } from "./types"
import { getReturnValue } from "./utils/get-return-value"
import { merge } from "./utils/merge"

interface MergeOptions {
  /**
   * Whether to merge values when set.
   */
  merge?: boolean
}

const defaultOptions: MergeOptions = {
  merge: true
}

/**.
 * Create a state and merge updates from arrays, plain objects, maps or sets.
 *
 * @param initial - The initial value.
 * @param [options] - An optional set of settings.
 * @param [options.merge] - Whether to merge values when set.
 * @returns A stateful value, and a function to update it.
 *
 * @example
 *
 * ```js
 * const [state, setState] = useMergeState([1, 2])
 *
 * setState([3, 4])
 *
 * // state: [1, 2, 3, 4]
 * ```
 */
export function useMergeState<S>(
  initial: S | (() => S),
  options?: MergeOptions
): [S, DispatchWithOptions<SetStateAction<S>, MergeOptions>]
export function useMergeState<S = undefined>(): [
  S | undefined,
  DispatchWithOptions<SetStateAction<S | undefined>, MergeOptions>
]
export function useMergeState<S>(
  initial?: any,
  options: MergeOptions = defaultOptions
): [S, DispatchWithOptions<SetStateAction<S>>] {
  const [state, setState] = useState<S>(initial)
  const instanceOptions = useMemo(
    () => ({ ...defaultOptions, ...options }),
    [options]
  )

  const setMergeState: DispatchWithOptions<
    SetStateAction<S>,
    MergeOptions
  > = useCallback(
    (value: SetStateAction<S>, options?: MergeOptions) => {
      const updateOptions = { ...instanceOptions, ...options }

      if (updateOptions.merge) {
        setState((previous: S) => {
          return merge(previous, getReturnValue(value, previous))
        })
      } else {
        setState(value)
      }
    },
    [instanceOptions]
  )

  return [state, setMergeState]
}

export { merge } from "./utils/merge"
