import { SetStateAction, useCallback, useMemo, useState } from "react"
import { DispatchWithOptions } from "../types"
import { getReturnValue, merge } from "../utils"

interface MergeOptions {
  merge?: boolean
}

interface useMergeState {
  <S>(initialState: S | (() => S), options?: MergeOptions): [
    S,
    DispatchWithOptions<SetStateAction<S>, MergeOptions>
  ]
  <S = undefined>(): [
    S | undefined,
    DispatchWithOptions<SetStateAction<S | undefined>, MergeOptions>
  ]
}

const defaultOptions: MergeOptions = {
  merge: true
}

export const useMergeState: useMergeState = <S>(
  initialState?: any,
  options: MergeOptions = defaultOptions
): [S, DispatchWithOptions<SetStateAction<S>>] => {
  const [state, setState] = useState<S>(initialState)
  const instanceOptions = useMemo(
    () => ({ ...defaultOptions, ...(options ?? {}) }),
    [options]
  )

  const setMergeState: DispatchWithOptions<
    SetStateAction<S>,
    MergeOptions
  > = useCallback(
    (value: SetStateAction<S>, options?: MergeOptions) => {
      const updateOptions = { ...instanceOptions, ...(options ?? {}) }

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
