import { SVGO_LITE } from './svgo-lite'
import { CONFIG_LITE } from './svgo/config-lite'
import { PLUGINS_DEFAULT_LIST } from '../plugins/__default'

const SVGO = SVGO_LITE

// apply default plugin
SVGO.Config = (config = { plugins: PLUGINS_DEFAULT_LIST }) => CONFIG_LITE(config)

export {
  SVGO,
  SVGO_LITE,
  CONFIG_LITE,
  PLUGINS_DEFAULT_LIST
}
