# libsvgo

[![i:npm]][l:npm]
[![i:ci]][l:ci]
[![i:size]][l:size]

The core code of [SVGO][l:svgo], optimized to be portable

[i:npm]: https://img.shields.io/npm/v/libsvgo
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

This repo is a heavily changed fork of [SVGO][l:svgo], mainly:
- ES6+ code update & re-format
- drop cli and option parsing code to reduce size
- drop node-specific module to allow both Browser and Node use

And is expected to be used by `nodejs@>=12` or recent-enough Browser
