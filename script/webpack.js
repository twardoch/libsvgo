import { resolve } from 'path'

import { compileWithWebpack, commonFlag } from '@dr-js/dev/module/webpack'
import { runMain } from '@dr-js/dev/module/main'

const PATH_ROOT = resolve(__dirname, '..')
const PATH_OUTPUT = resolve(__dirname, '../output-gitignore')
const fromRoot = (...args) => resolve(PATH_ROOT, ...args)
const fromOutput = (...args) => resolve(PATH_OUTPUT, ...args)

runMain(async (logger) => {
  const { mode, isWatch, profileOutput, getCommonWebpackConfig } = await commonFlag({ fromRoot, logger })

  const config = getCommonWebpackConfig({
    output: {
      path: fromOutput('webpack'), filename: 'SVGO.js',
      library: 'SVGO', libraryExport: 'default', libraryTarget: 'umd',
      globalObject: `(typeof self !== 'undefined' ? self : this)` // https://github.com/webpack/webpack/issues/6525
    },
    entry: { 'svgo': './lib/svgo.webpack-entry' }
  })

  logger.padLog(`compile with webpack mode: ${mode}, isWatch: ${Boolean(isWatch)}`)
  await compileWithWebpack({ config, isWatch, profileOutput, logger })
}, 'webpack')
