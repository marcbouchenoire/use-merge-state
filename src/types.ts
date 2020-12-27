export type PlainObject<T = unknown> = Record<string, T>

export type PlainFunction<P = any, R = any> = (...args: P[]) => R

export type Unpack<T> = T extends (infer U)[] ? U : T

export type Except<T extends PlainObject, K extends keyof T> = Pick<
  T,
  Exclude<keyof T, K>
>

export type Spread<A extends PlainObject, B extends PlainObject> = Except<
  A,
  Extract<keyof A, keyof B>
> &
  B

export interface DispatchWithOptions<A, O = undefined> {
  (value: A): void
  (value: A, options?: O): void
}
