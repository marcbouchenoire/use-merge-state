import {
  isArray,
  isFunction,
  isMap,
  isNumber,
  isPlainObject,
  isSet
} from "../src/guards"
import {
  array,
  boolean,
  fun,
  map,
  number,
  object,
  set,
  string
} from "./constants"

describe("isArray", () => {
  test("should return true for arrays", () => {
    expect(isArray(array)).toBeTruthy()
  })

  test("should return false for any other types", () => {
    expect(isArray(boolean)).toBeFalsy()
    expect(isArray(fun)).toBeFalsy()
    expect(isArray(map)).toBeFalsy()
    expect(isArray(number)).toBeFalsy()
    expect(isArray(object)).toBeFalsy()
    expect(isArray(set)).toBeFalsy()
    expect(isArray(string)).toBeFalsy()
  })
})

describe("isFunction", () => {
  test("should return true for functions", () => {
    expect(isFunction(fun)).toBeTruthy()
  })

  test("should return false for any other types", () => {
    expect(isFunction(array)).toBeFalsy()
    expect(isFunction(boolean)).toBeFalsy()
    expect(isFunction(map)).toBeFalsy()
    expect(isFunction(number)).toBeFalsy()
    expect(isFunction(object)).toBeFalsy()
    expect(isFunction(set)).toBeFalsy()
    expect(isFunction(string)).toBeFalsy()
  })
})

describe("isMap", () => {
  test("should return true for maps", () => {
    expect(isMap(map)).toBeTruthy()
  })

  test("should return false for any other types", () => {
    expect(isMap(array)).toBeFalsy()
    expect(isMap(boolean)).toBeFalsy()
    expect(isMap(fun)).toBeFalsy()
    expect(isMap(number)).toBeFalsy()
    expect(isMap(object)).toBeFalsy()
    expect(isMap(set)).toBeFalsy()
    expect(isMap(string)).toBeFalsy()
  })
})

describe("isNumber", () => {
  test("should return true for numbers", () => {
    expect(isNumber(number)).toBeTruthy()
  })

  test("should return false for any other types", () => {
    expect(isNumber(array)).toBeFalsy()
    expect(isNumber(boolean)).toBeFalsy()
    expect(isNumber(fun)).toBeFalsy()
    expect(isNumber(map)).toBeFalsy()
    expect(isNumber(object)).toBeFalsy()
    expect(isNumber(set)).toBeFalsy()
    expect(isNumber(string)).toBeFalsy()
  })
})

describe("isPlainObject", () => {
  test("should return true for plain objects", () => {
    expect(isPlainObject(object)).toBeTruthy()
  })

  test("should return false for any other types", () => {
    expect(isPlainObject(array)).toBeFalsy()
    expect(isPlainObject(boolean)).toBeFalsy()
    expect(isPlainObject(fun)).toBeFalsy()
    expect(isPlainObject(map)).toBeFalsy()
    expect(isPlainObject(number)).toBeFalsy()
    expect(isPlainObject(set)).toBeFalsy()
    expect(isPlainObject(string)).toBeFalsy()
  })
})

describe("isSet", () => {
  test("should return true for sets", () => {
    expect(isSet(set)).toBeTruthy()
  })

  test("should return false for any other types", () => {
    expect(isSet(array)).toBeFalsy()
    expect(isSet(boolean)).toBeFalsy()
    expect(isSet(fun)).toBeFalsy()
    expect(isSet(map)).toBeFalsy()
    expect(isSet(number)).toBeFalsy()
    expect(isSet(object)).toBeFalsy()
    expect(isSet(string)).toBeFalsy()
  })
})
