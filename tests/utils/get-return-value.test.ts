import * as assert from "uvu/assert"
import { isNumber } from "../../src/guards"
import { getReturnValue } from "../../src/utils/get-return-value"
import { boolean, number, string } from "../constants"
import { describe } from "../helpers"

const add = (a?: number, b?: number) => {
  return isNumber(a) && isNumber(b) ? a + b : undefined
}

describe("getReturnValue", (it) => {
  it("should return its input if not a function", () => {
    assert.equal(getReturnValue(string), string)
    assert.equal(getReturnValue(number), number)
    assert.equal(getReturnValue(boolean), boolean)
  })

  it("should return its result if a function", () => {
    assert.not.equal(getReturnValue(add, 2, 2), add)
    assert.equal(getReturnValue(add, 2, 2), 4)
    assert.type(getReturnValue(add), "undefined")
  })
})
