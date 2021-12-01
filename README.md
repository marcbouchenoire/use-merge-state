# use-merge-state

🗜️ A `useState` variant hook that merges updates from arrays, plain objects, maps or sets.

[![build](https://img.shields.io/github/workflow/status/marcbouchenoire/use-merge-state/CI)](https://github.com/marcbouchenoire/use-merge-state/actions/workflows/ci.yml)
[![npm](https://img.shields.io/npm/v/use-merge-state?color=%230cf)](https://www.npmjs.com/package/use-merge-state)
[![size](https://img.shields.io/bundlephobia/minzip/use-merge-state?label=size&color=%2385f)](https://bundlephobia.com/package/use-merge-state)
[![coverage](https://img.shields.io/codecov/c/github/marcbouchenoire/use-merge-state?color=%23e4b)](https://codecov.io/gh/marcbouchenoire/use-merge-state)
[![license](https://img.shields.io/github/license/marcbouchenoire/use-merge-state?color=%23f81)](https://github.com/marcbouchenoire/use-merge-state/blob/main/LICENSE)

- 📚 **Simple**: A drop-in `useState` replacement
- 🗜️ **Tiny**: Just around **600 bytes** on modern platforms
- 🧪 **Reliable**: Fully tested with [100% code coverage](https://codecov.io/gh/marcbouchenoire/use-merge-state)
- 📦 **Typed**: Written in [TypeScript](https://www.typescriptlang.org/) and includes definitions out-of-the-box
- 💨 **Zero dependencies**

## Installation

#### Skypack

```javascript
import { useMergeState } from "https://cdn.skypack.dev/use-merge-state"
```

#### Yarn

```bash
yarn add use-merge-state
```

#### npm

```bash
npm install use-merge-state
```

## Usage

Import `useMergeState`.

```typescript
import { useMergeState } from "use-merge-state"
```

Use it as a drop-in `useState` replacement.

```typescript
const [state, setState] = useMergeState([1, 2])

// state: [1, 2]
```

Setting arrays, plain objects, maps or sets will merge them with the current state instead of overriding it. Other types will be overridden similarly to `useState`.

```typescript
setState([3, 4])

// state: [1, 2, 3, 4]
```

Returning a functional update will run as expected and its result will then be merged with the current state.

```typescript
setState((previousState) =>
  previousState.map((previousNumber) => previousNumber * 2)
)

// state: [1, 2, 3, 4, 2, 4, 6, 8]
```

## Options

A secondary `options` argument can be set either on instances, updates or both to tweak the behavior of `useMergeState`.

Setting `options` on a `useMergeState` instance will set options for all `setState` updates of this instance.

```typescript
const [state, setState] = useMergeState([1, 2], {
  merge: false
})
```

Setting `options` on a `setState` update will override any previously set options for this specific update.

```typescript
setState([3, 4], {
  merge: true
})
```

#### `merge`

```typescript
merge?: boolean = true
```

Setting `merge` to `false` will disable merging—essentially converting `useMergeState` back into `useState`.
