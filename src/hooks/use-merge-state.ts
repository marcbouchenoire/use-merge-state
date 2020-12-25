import { Dispatch, SetStateAction, useCallback, useState } from "react"
import { getReturnValue, merge } from "../utils"

export const useMergeState = <S>(
  initialState: S | (() => S)
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
