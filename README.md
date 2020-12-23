# libsvgo

[![i:npm]][l:npm]
[![i:ci]][l:ci]
[![i:size]][l:size]
[![i:npm-dev]][l:npm]

The core code of [SVGO][l:svgo], optimized to be portable

[i:npm]: https://img.shields.io/npm/v/libsvgo
[i:npm-dev]: https://img.shields.io/npm/v/libsvgo/dev
[l:npm]: https://npm.im/libsvgo
[i:ci]: https://img.shields.io/github/workflow/status/dr-js/libsvgo/ci-test
[l:ci]: https://github.com/dr-js/libsvgo/actions?query=workflow:ci-test
[i:size]: https://packagephobia.now.sh/badge?p=libsvgo
[l:size]: https://packagephobia.now.sh/result?p=libsvgo

[l:svgo]: https://github.com/svg/svgo

[//]: # (NON_PACKAGE_CONTENT)

--- --- ---

- 📁 [lib/](lib/) & [plugins/](plugins/)
  - main source code, in output package will be:
    - `libsvgo/lib/` & `libsvgo/plugins/`:
        for direct use, use `require() / exports.*=`
    - `libsvgo/module/lib/` & `libsvgo/module/plugins/`:
        for use with `node` + `@babel/register`, keep `import / export` and readability
    - `libsvgo/webpack/SVGO.js`:
        all-in-one packaged version,
        can be used in browser like `<script src="https://unpkg.com/libsvgo/webpack/SVGO.js"></script>`,
        and provide `window.SVGO`
        (experimental)
- 📁 [test/](test/)
  - test code & resource file
- 📁 [examples/](examples/)
  - code example

This repo is a heavily changed fork of [SVGO][l:svgo], mainly:
- ES6+ code update & re-format
- drop cli and option parsing code to reduce size
- drop node-specific module to allow both Browser and Node use

And is expected to be used by `nodejs@>=12` or recent-enough Browser

--- --- ---

sample usage: (ES6 module)
```js
// get most used from main entry
import { SVGO, SVGO_LITE, CONFIG_LITE, PLUGINS_DEFAULT_LIST } from 'libsvgo/module/lib/svgo'

// or get each separately
import { SVGO_LITE } from 'libsvgo/module/lib/svgo-lite'
import { SVGO_LITECONFIG_LITE } from 'libsvgo/module/lib/svgo/config-lite'

// get each plugin separately
import * as addAttributesToSVGElement from 'libsvgo/module/plugins/addAttributesToSVGElement'
```

sample usage: (Node.js module through Babel)
```js
// get most used from main entry
const { SVGO, SVGO_LITE, CONFIG_LITE, PLUGINS_DEFAULT_LIST } = require('libsvgo/lib/svgo')

// or get each separately
const { SVGO_LITE } = require('libsvgo/lib/svgo-lite')
const { SVGO_LITECONFIG_LITE } = require('libsvgo/lib/svgo/config-lite')

// get each plugin separately
const addAttributesToSVGElement = require('libsvgo/plugins/addAttributesToSVGElement')
```

sample usage: (ES6 Webpack bundle)
```js
// `require()` in nodejs
const SVGO = require('libsvgo/webpack/SVGO')
// or load from `<script src="https://unpkg.com/libsvgo/webpack/SVGO.js"></script>` in browser

// get common lib (not all is exposed)
const { SVGO_LITE, CONFIG_LITE, PLUGINS_DEFAULT_LIST, PLUGINS_MAP } = SVGO

// get plugin
const { addAttributesToSVGElement } = PLUGINS_MAP
```

also check [examples/](examples/) for basic usage
