# @dev_zuo/vite-plugin-white-screen-progress

Show loading progress on page during Vite dev server white screen without opening devtools.

## Install

```bash
npm install @dev_zuo/vite-plugin-white-screen-progress@0.1.0 --save-dev --save-exact
```

## Usage

```js
// vite.config.js
import devServerWhiteScreenProgress from '@dev_zuo/vite-plugin-white-screen-progress'

export default {
  // ...
  plugins: [
    devServerWhiteScreenProgress(),
  ]
}
```

## Config

TODO

- Theme

- Custom CSS Style