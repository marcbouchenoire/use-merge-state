import { act, renderHook } from "@testing-library/react-hooks"
import * as assert from "uvu/assert"
import { merge, useMergeState } from "../../src"
import { boolean, number, string } from "../constants"
import { describe } from "../helpers"

interface CD {
  a?: number | string
  b?: boolean
  c?: number
}

const a = [number, number * number]
const b = [number * 2]

const c: CD = { a: number, b: boolean }
const d: CD = { a: string, c: number }

const e = new Map<number | string, number | string>()
e.set(string, number)
const f = new Map<number | string, number | string>()
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

describe("useMergeState", (it) => {
  it("should accept an initial value", () => {
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

    assert.type(state, "undefined")
    assert.equal(stateWithInitialValue, string)
    assert.equal(stateWithLazyInitialValue, string)
  })

  it("should merge arrays, plain objects, maps and sets", () => {
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

    assert.equal(stateAb, ab)
    assert.equal(stateCd, cd)
    assert.equal(stateEf, ef)
    assert.equal(stateGh, gh)
  })

  it("should accept functional updates", () => {
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

    assert.equal(state, `${string}-${string}`)
    assert.equal(stateAb, aab)
    assert.equal(stateCd, ccd)
    assert.equal(stateEf, eef)
    assert.equal(stateGh, ggh)
  })

  it("should accept options either on instances, on updates or on both", () => {
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

    assert.equal(state, ab)
    assert.equal(stateInstance, b)
    assert.equal(stateUpdate, b)
    assert.equal(stateBoth, ab)
  })

  it("should override when the merge option is set to false", () => {
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

    assert.equal(stateAb, b)
    assert.equal(stateCd, d)
    assert.equal(stateEf, f)
    assert.equal(stateGh, h)
  })
})
