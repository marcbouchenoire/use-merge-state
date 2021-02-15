# use-merge-state

🗜️ A `useState` variant hook that merges updates from arrays, plain objects, maps or sets.

[![npm](https://img.shields.io/npm/v/use-merge-state?color=%2385f)](https://www.npmjs.com/package/use-merge-state) [![gzipped](https://img.shields.io/bundlephobia/minzip/use-merge-state?label=gzipped&color=%23d5e)](https://www.npmjs.com/package/use-merge-state) [![license](https://img.shields.io/github/license/bouchenoiremarc/use-merge-state?color=%23e48)](https://github.com/bouchenoiremarc/use-merge-state/blob/main/LICENSE)

## Installation

#### With yarn

```sh
yarn add use-merge-state
```

#### With npm

```sh
npm install use-merge-state
```

## Usage

Import `useMergeState`.

```tsx
import { useMergeState } from "use-merge-state"
```

Use it as a drop-in `useState` replacement.

```tsx
const [state, setState] = useMergeState([1, 2])

// state: [1, 2]
```

Setting arrays, plain objects, maps or sets will merge them with the current state instead of overriding it. Other types will be overridden similarly to `useState`.

```tsx
setState([3, 4])

// state: [1, 2, 3, 4]
```

Returning a functional update will run as expected and its result will then be merged with the current state.

```tsx
setState((previousState) =>
  previousState.map((previousNumber) => previousNumber * 2)
)

// state: [1, 2, 3, 4, 2, 4, 6, 8]
```

## Options

A secondary `options` argument can be set either on instances, updates or both to tweak the behavior of `useMergeState`.

Setting `options` on a `useMergeState` instance will set options for all `setState` updates of this instance.

```tsx
const [state, setState] = useMergeState([1, 2], {
  merge: false
})
```

Setting `options` on a `setState` update will override any previously set options for this specific update.

```tsx
setState([3, 4], {
  merge: true
})
```

#### `merge`

```tsx
merge?: boolean = true
```

Setting `merge` to `false` will disable merging—essentially converting `useMergeState` back into `useState`.
