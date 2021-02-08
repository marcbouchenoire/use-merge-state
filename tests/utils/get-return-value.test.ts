import { isNumber } from "../../src/guards"
import { getReturnValue } from "../../src/utils"
import { boolean, number, string } from "../constants"

const add = (a?: number, b?: number) => {
  if (isNumber(a) && isNumber(b)) {
    return a + b
  } else {
    return undefined
  }
}

describe("getReturnValue", () => {
  test("should return its input if not a function", () => {
    expect(getReturnValue(string)).toBe(string)
    expect(getReturnValue(number)).toBe(number)
    expect(getReturnValue(boolean)).toBe(boolean)
  })

  test("should return its result if a function", () => {
    expect(getReturnValue(add, 2, 2)).not.toBe(add)
    expect(getReturnValue(add, 2, 2)).toBe(4)
    expect(getReturnValue(add)).toBeUndefined()
  })
})
