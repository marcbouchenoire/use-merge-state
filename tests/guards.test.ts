import * as assert from "uvu/assert"
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
import { describe } from "./helpers"

describe("isArray", (it) => {
  it("should return true for arrays", () => {
    assert.equal(isArray(array), true)
  })

  it("should return false for any other types", () => {
    assert.equal(isArray(boolean), false)
    assert.equal(isArray(fun), false)
    assert.equal(isArray(map), false)
    assert.equal(isArray(number), false)
    assert.equal(isArray(object), false)
    assert.equal(isArray(set), false)
    assert.equal(isArray(string), false)
  })
})

describe("isFunction", (it) => {
  it("should return true for functions", () => {
    assert.equal(isFunction(fun), true)
  })

  it("should return false for any other types", () => {
    assert.equal(isFunction(array), false)
    assert.equal(isFunction(boolean), false)
    assert.equal(isFunction(map), false)
    assert.equal(isFunction(number), false)
    assert.equal(isFunction(object), false)
    assert.equal(isFunction(set), false)
    assert.equal(isFunction(string), false)
  })
})

describe("isMap", (it) => {
  it("should return true for maps", () => {
    assert.equal(isMap(map), true)
  })

  it("should return false for any other types", () => {
    assert.equal(isMap(array), false)
    assert.equal(isMap(boolean), false)
    assert.equal(isMap(fun), false)
    assert.equal(isMap(number), false)
    assert.equal(isMap(object), false)
    assert.equal(isMap(set), false)
    assert.equal(isMap(string), false)
  })
})

describe("isNumber", (it) => {
  it("should return true for numbers", () => {
    assert.equal(isNumber(number), true)
  })

  it("should return false for any other types", () => {
    assert.equal(isNumber(array), false)
    assert.equal(isNumber(boolean), false)
    assert.equal(isNumber(fun), false)
    assert.equal(isNumber(map), false)
    assert.equal(isNumber(object), false)
    assert.equal(isNumber(set), false)
    assert.equal(isNumber(string), false)
  })
})

describe("isPlainObject", (it) => {
  it("should return true for plain objects", () => {
    assert.equal(isPlainObject(object), true)
  })

  it("should return false for any other types", () => {
    assert.equal(isPlainObject(array), false)
    assert.equal(isPlainObject(boolean), false)
    assert.equal(isPlainObject(fun), false)
    assert.equal(isPlainObject(map), false)
    assert.equal(isPlainObject(number), false)
    assert.equal(isPlainObject(set), false)
    assert.equal(isPlainObject(string), false)
  })
})

describe("isSet", (it) => {
  it("should return true for sets", () => {
    assert.equal(isSet(set), true)
  })

  it("should return false for any other types", () => {
    assert.equal(isSet(array), false)
    assert.equal(isSet(boolean), false)
    assert.equal(isSet(fun), false)
    assert.equal(isSet(map), false)
    assert.equal(isSet(number), false)
    assert.equal(isSet(object), false)
    assert.equal(isSet(string), false)
  })
})
