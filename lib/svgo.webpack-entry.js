import { SVGO } from './svgo'
import { SVGO_LITE } from './svgo-lite'
import { CONFIG_LITE } from './svgo/config-lite'
import { PLUGINS_DEFAULT_LIST } from '../plugins/__default'

import * as PLUGINS_MAP from '../plugins/__all'

export default Object.assign(SVGO, {
  SVGO_LITE,
  CONFIG_LITE,
  PLUGINS_DEFAULT_LIST,
  PLUGINS_MAP
})
