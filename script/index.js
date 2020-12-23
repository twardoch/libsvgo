import { resolve } from 'path'
import { execSync } from 'child_process'

import { getSourceJsFileListFromPathList } from '@dr-js/dev/module/node/filePreset'
import { initOutput, packOutput, clearOutput, verifyGitStatusClean, publishOutput } from '@dr-js/dev/module/output'
import { getTerserOption, minifyFileListWithTerser } from '@dr-js/dev/module/minify'
import { runMain, argvFlag } from '@dr-js/dev/module/main'

const PATH_ROOT = resolve(__dirname, '..')
const PATH_OUTPUT = resolve(__dirname, '../output-gitignore')
const fromRoot = (...args) => resolve(PATH_ROOT, ...args)
const fromOutput = (...args) => resolve(PATH_OUTPUT, ...args)
const execShell = (command) => execSync(command, { cwd: fromRoot(), stdio: argvFlag('quiet') ? [ 'ignore', 'ignore', 'inherit' ] : 'inherit' })

const buildOutput = async ({ isTest, logger }) => {
  logger.padLog('build library')
  execShell('npm run build-library-lib')
  execShell('npm run build-library-plugins')
  logger.padLog('build module')
  execShell('npm run build-module-lib')
  execShell('npm run build-module-plugins')
  logger.padLog('build webpack')
  execShell('npm run build-webpack')
  isTest && logger.padLog('build test')
  isTest && execShell('npm run build-library-test')
  isTest && execShell('npm run build-module-test')
}

const processOutput = async ({ logger }) => {
  const fileListLibrary = await getSourceJsFileListFromPathList([ 'lib', 'plugins' ], fromOutput)
  const fileListModule = await getSourceJsFileListFromPathList([ 'module' ], fromOutput)
  const fileListWebpack = await getSourceJsFileListFromPathList([ 'webpack' ], fromOutput)
  let sizeReduce = 0
  sizeReduce += await minifyFileListWithTerser({ fileList: fileListLibrary, option: getTerserOption(), rootPath: PATH_OUTPUT, logger })
  sizeReduce += await minifyFileListWithTerser({ fileList: fileListModule, option: getTerserOption({ isReadable: true }), rootPath: PATH_OUTPUT, logger })
  sizeReduce += await minifyFileListWithTerser({ fileList: fileListWebpack, option: getTerserOption(), rootPath: PATH_OUTPUT, logger })
  logger.log(`total size reduce: ${sizeReduce}B`)
}

runMain(async (logger) => {
  const packageJSON = await initOutput({
    fromRoot, fromOutput, logger,
    deleteKeyList: [ 'private', 'scripts', 'config', 'devDependencies' ],
    copyPathList: [ 'README.md', 'LICENSE' ],
    pathAutoLicenseFile: false
  })
  if (!argvFlag('pack')) return
  const isTest = argvFlag('test', 'publish', 'publish-dev')
  await buildOutput({ isTest, logger })
  await processOutput({ logger })
  isTest && logger.padLog('lint source')
  isTest && execShell('npm run lint')
  isTest && await processOutput({ logger }) // once more
  isTest && logger.padLog('test output')
  isTest && execShell('npm run test-output-library')
  isTest && execShell('npm run test-output-module')
  isTest && execShell('npm run script-clear-output-test')
  await clearOutput({ fromOutput, logger })
  isTest && await verifyGitStatusClean({ fromRoot, logger })
  const pathPackagePack = await packOutput({ fromRoot, fromOutput, logger })
  await publishOutput({ packageJSON, pathPackagePack, logger })
})
