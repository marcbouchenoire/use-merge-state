import * as assert from "uvu/assert"
import { merge } from "../../src/utils/merge"
import { boolean, fun, number, string } from "../constants"
import { describe } from "../helpers"

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

describe("merge", (it) => {
  it("should merge two arrays", () => {
    assert.equal(merge(a, b), ab)
  })

  it("should merge two plain objects", () => {
    assert.equal(merge(c, d), cd)
  })

  it("should merge two maps", () => {
    assert.equal(merge(e, f), ef)
  })

  it("should merge two sets", () => {
    assert.equal(merge(g, h), gh)
  })

  it("should override any other types", () => {
    assert.equal(merge("ipsum", string), string)
    assert.equal(merge(false, boolean), boolean)
    assert.equal(merge(4, number), number)
    assert.equal(
      merge(() => number, fun),
      fun
    )
  })

  it("should override different types", () => {
    assert.equal(merge(a, string), string)
    assert.equal(merge(c, boolean), boolean)
    assert.equal(merge(e, number), number)
    assert.equal(merge(g, fun), fun)
  })
})
