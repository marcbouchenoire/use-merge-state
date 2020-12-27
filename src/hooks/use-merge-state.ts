import { SetStateAction, useCallback, useState } from "react"
import { DispatchWithOptions } from "../types"
import { getReturnValue, merge } from "../utils"

interface MergeOptions {
  merge?: boolean
}

interface useMergeState {
  <S>(initialState: S | (() => S)): [
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
  initialState?: any
): [S, DispatchWithOptions<SetStateAction<S>>] => {
  const [state, setState] = useState<S>(initialState)

  const setMergeState: DispatchWithOptions<
    SetStateAction<S>,
    MergeOptions
  > = useCallback(
    (value: SetStateAction<S>, options: MergeOptions = defaultOptions) => {
      const { merge: shouldMerge } = { ...defaultOptions, ...(options ?? {}) }

      if (shouldMerge) {
        setState((previousState: S) => {
          return merge(previousState, getReturnValue(value, previousState))
        })
      } else {
        setState(value)
      }
    },
    []
  )

  return [state, setMergeState]
}
