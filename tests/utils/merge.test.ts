import { merge } from "../../src/utils/merge"
import { boolean, fun, number, string } from "../constants"

const a = [number, boolean]
const b = [string, number]

const c = { a: number, b: boolean }
const d = { a: string, c: number }

const e = new Map<string, number>()
e.set(string, number)
const f = new Map<number, string>()
f.set(number, string)

const g = new Set<number>()
g.add(number)
const h = new Set<string>()
h.add(string)

const ab = [number, boolean, string, number]

const cd = { a: string, b: boolean, c: number }

const ef = new Map<number | string, number | string>()
ef.set(string, number)
ef.set(number, string)

const gh = new Set<number | string>()
gh.add(number)
gh.add(string)

describe("merge", () => {
  test("should merge two arrays", () => {
    expect(merge(a, b)).toStrictEqual(ab)
  })

  test("should merge two plain objects", () => {
    expect(merge(c, d)).toStrictEqual(cd)
  })

  test("should merge two maps", () => {
    expect(merge(e, f)).toStrictEqual(ef)
  })

  test("should merge two sets", () => {
    expect(merge(g, h)).toStrictEqual(gh)
  })

  test("should override any other types", () => {
    expect(merge("ipsum", string)).toStrictEqual(string)
    expect(merge(false, boolean)).toStrictEqual(boolean)
    expect(merge(4, number)).toStrictEqual(number)
    expect(merge(() => number, fun)).toStrictEqual(fun)
  })

  test("should override different types", () => {
    expect(merge(a, string)).toStrictEqual(string)
    expect(merge(c, boolean)).toStrictEqual(boolean)
    expect(merge(e, number)).toStrictEqual(number)
    expect(merge(g, fun)).toStrictEqual(fun)
  })
})
