# @dev_zuo/vite-plugin-white-screen-progress

Show loading progress on page during Vite dev server white screen without opening devtools.

![white-screen-progress.gif](../docs/white-screen-progress.gif)

## Install

```bash
npm install @dev_zuo/vite-plugin-white-screen-progress --save-dev
```

## Usage

```js
// vite.config.js
import devServerWhiteScreenProgress from '@dev_zuo/vite-plugin-white-screen-progress'

export default {
  // ...
  plugins: [
    // Just enabled in dev server（vite dev），ignore when vite build
    devServerWhiteScreenProgress(),
  ]
}
```

## Config

### Theme

- "fix-right": default, progress info panel fix in right 
- "middle": display in a flat layout on the page, not fix

```js
devServerWhiteScreenProgress({
    theme?: string   // 'middle' | 'fix-right'
})
```

### Custom CSS Style

Custom progress info panel css inline-style,  > theme config
```js
devServerWhiteScreenProgress({
    style?: string
})
```

Example

```js
devServerWhiteScreenProgress({
    style: 'color: blue; background: #fff; padding: 15px; border-radius: 15px'
})
```