import { SetStateAction, useCallback, useMemo, useState } from "react"
import { DispatchWithOptions } from "../types"
import { getReturnValue } from "../utils/get-return-value"
import { merge } from "../utils/merge"

interface MergeOptions {
  merge?: boolean
}

const defaultOptions: MergeOptions = {
  merge: true
}

export function useMergeState<S>(
  initialState: S | (() => S),
  options?: MergeOptions
): [S, DispatchWithOptions<SetStateAction<S>, MergeOptions>]
export function useMergeState<S = undefined>(): [
  S | undefined,
  DispatchWithOptions<SetStateAction<S | undefined>, MergeOptions>
]
export function useMergeState<S>(
  initialState?: any,
  options: MergeOptions = defaultOptions
): [S, DispatchWithOptions<SetStateAction<S>>] {
  const [state, setState] = useState<S>(initialState)
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
        setState((previousState: S) => {
          return merge(previousState, getReturnValue(value, previousState))
        })
      } else {
        setState(value)
      }
    },
    [instanceOptions]
  )

  return [state, setMergeState]
}
