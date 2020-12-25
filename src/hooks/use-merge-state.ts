import { Dispatch, SetStateAction, useCallback, useState } from "react"
import { getReturnValue, merge } from "../utils"

interface useMergeState {
  <S>(initialState: S | (() => S)): [S, Dispatch<SetStateAction<S>>]
  <S = undefined>(): [S | undefined, Dispatch<SetStateAction<S | undefined>>]
}

export const useMergeState: useMergeState = <S>(
  initialState?: any
): [S, Dispatch<SetStateAction<S>>] => {
  const [state, setState] = useState<S>(initialState)

  const setMergeState: Dispatch<SetStateAction<S>> = useCallback(
    (value: SetStateAction<S>) => {
      setState((previousState: S) => {
        return merge(previousState, getReturnValue(value, previousState))
      })
    },
    []
  )

  return [state, setMergeState]
}
