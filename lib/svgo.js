import { SVGO_LITE } from './svgo-lite'
import { CONFIG_LITE } from './svgo/config-lite'
import { PLUGINS_DEFAULT_LIST } from '../plugins/__default'

const SVGO = SVGO_LITE

SVGO.Config = (config = { plugins: PLUGINS_DEFAULT_LIST }) => CONFIG_LITE(config)

export { SVGO }
export default SVGO // also support `import SVGO from 'libsvgo'`
