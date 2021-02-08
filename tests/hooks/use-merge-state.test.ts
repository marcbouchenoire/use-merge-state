import { act, renderHook } from "@testing-library/react-hooks"
import { merge, useMergeState } from "../../src"
import { boolean, number, string } from "../constants"

interface CD {
  a?: number | string
  b?: boolean
  c?: number
}

const a = [number, number * number]
const b = [number * 2]

const c: CD = { a: number, b: boolean }
const d: CD = { a: string, c: number }

const e = new Map<string | number, string | number>()
e.set(string, number)
const f = new Map<string | number, string | number>()
f.set(number, string)

const g = new Set<number | string>()
g.add(number)
const h = new Set<string | string>()
h.add(string)

const ab = [...a, ...b]

const cd: CD = { ...c, ...d }

const ef = new Map<number | string, number | string>()
ef.set(string, number)
ef.set(number, string)

const gh = new Set<number | string>()
gh.add(number)
gh.add(string)

const aab = [...a, ...a, ...b]

const ccd: CD = { ...c, ...c, ...d }

const eef = new Map<number | string, number | string>()
eef.set(string, number)
eef.set(string, number)
eef.set(number, string)

const ggh = new Set<number | string>()
ggh.add(number)
ggh.add(number)
ggh.add(string)

describe("useMergeState", () => {
  test("should accept an initial value", () => {
    const { result } = renderHook(() => useMergeState())
    const { result: resultWithInitialValue } = renderHook(() =>
      useMergeState(string)
    )
    const { result: resultWithLazyInitialValue } = renderHook(() =>
      useMergeState(() => string)
    )

    const [state] = result.current
    const [stateWithInitialValue] = resultWithInitialValue.current
    const [stateWithLazyInitialValue] = resultWithLazyInitialValue.current

    expect(state).toBeUndefined()
    expect(stateWithInitialValue).toBe(string)
    expect(stateWithLazyInitialValue).toBe(string)
  })

  test("should merge arrays, plain objects, maps and sets", () => {
    const { result: resultAb } = renderHook(() => useMergeState(a))
    const { result: resultCd } = renderHook(() => useMergeState(c))
    const { result: resultEf } = renderHook(() => useMergeState(e))
    const { result: resultGh } = renderHook(() => useMergeState(g))

    act(() => {
      const [, setAb] = resultAb.current
      const [, setCd] = resultCd.current
      const [, setEf] = resultEf.current
      const [, setGh] = resultGh.current

      setAb(b)
      setCd(d)
      setEf(f)
      setGh(h)
    })

    const [stateAb] = resultAb.current
    const [stateCd] = resultCd.current
    const [stateEf] = resultEf.current
    const [stateGh] = resultGh.current

    expect(stateAb).toStrictEqual(ab)
    expect(stateCd).toStrictEqual(cd)
    expect(stateEf).toStrictEqual(ef)
    expect(stateGh).toStrictEqual(gh)
  })

  test("should accept functional updates", () => {
    const { result } = renderHook(() => useMergeState(string))
    const { result: resultAb } = renderHook(() => useMergeState(a))
    const { result: resultCd } = renderHook(() => useMergeState(c))
    const { result: resultEf } = renderHook(() => useMergeState(e))
    const { result: resultGh } = renderHook(() => useMergeState(g))

    act(() => {
      const [, set] = result.current
      const [, setAb] = resultAb.current
      const [, setCd] = resultCd.current
      const [, setEf] = resultEf.current
      const [, setGh] = resultGh.current

      set((previousState) => `${previousState}-${string}`)
      setAb((previousState) => merge(previousState, b))
      setCd((previousState) => merge(previousState, d))
      setEf((previousState) => merge(previousState, f))
      setGh((previousState) => merge(previousState, h))
    })

    const [state] = result.current
    const [stateAb] = resultAb.current
    const [stateCd] = resultCd.current
    const [stateEf] = resultEf.current
    const [stateGh] = resultGh.current

    expect(state).toBe(`${string}-${string}`)
    expect(stateAb).toStrictEqual(aab)
    expect(stateCd).toStrictEqual(ccd)
    expect(stateEf).toStrictEqual(eef)
    expect(stateGh).toStrictEqual(ggh)
  })

  test("should accept options either on instances, on updates or on both", () => {
    const { result } = renderHook(() => useMergeState(a))
    const { result: resultInstance } = renderHook(() =>
      useMergeState(a, { merge: false })
    )
    const { result: resultUpdate } = renderHook(() => useMergeState(a))
    const { result: resultBoth } = renderHook(() =>
      useMergeState(a, { merge: false })
    )

    act(() => {
      const [, set] = result.current
      const [, setInstance] = resultInstance.current
      const [, setUpdate] = resultUpdate.current
      const [, setBoth] = resultBoth.current

      set(b)
      setInstance(b)
      setUpdate(b, { merge: false })
      setBoth(b, { merge: true })
    })

    const [state] = result.current
    const [stateInstance] = resultInstance.current
    const [stateUpdate] = resultUpdate.current
    const [stateBoth] = resultBoth.current

    expect(state).toStrictEqual(ab)
    expect(stateInstance).toStrictEqual(b)
    expect(stateUpdate).toStrictEqual(b)
    expect(stateBoth).toStrictEqual(ab)
  })

  test("should override when the merge option is set to false", () => {
    const { result: resultAb } = renderHook(() => useMergeState(a))
    const { result: resultCd } = renderHook(() => useMergeState(c))
    const { result: resultEf } = renderHook(() => useMergeState(e))
    const { result: resultGh } = renderHook(() => useMergeState(g))

    act(() => {
      const [, setAb] = resultAb.current
      const [, setCd] = resultCd.current
      const [, setEf] = resultEf.current
      const [, setGh] = resultGh.current

      setAb(b, { merge: false })
      setCd(d, { merge: false })
      setEf(f, { merge: false })
      setGh(h, { merge: false })
    })

    const [stateAb] = resultAb.current
    const [stateCd] = resultCd.current
    const [stateEf] = resultEf.current
    const [stateGh] = resultGh.current

    expect(stateAb).toStrictEqual(b)
    expect(stateCd).toStrictEqual(d)
    expect(stateEf).toStrictEqual(f)
    expect(stateGh).toStrictEqual(h)
  })
})
