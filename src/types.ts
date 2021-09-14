export type PlainObject<T = unknown> = Record<string, T>

export type PlainFunction<P = any, R = any> = (...args: P[]) => R

export type Unpack<T> = T extends (infer U)[] ? U : T

export type Except<T extends PlainObject, K extends keyof T> = Pick<
  T,
  Exclude<keyof T, K>
>

export type Spread<A extends PlainObject, B extends PlainObject> = B &
  Except<A, Extract<keyof A, keyof B>>

export interface DispatchWithOptions<A, O = undefined> {
  (value: A): void
  (value: A, options?: O): void // eslint-disable-line @typescript-eslint/unified-signatures
}
