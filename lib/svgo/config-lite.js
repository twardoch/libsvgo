/**
 * Pass in well formed config only!
 * No magic and just optimize plugins array.
 *
 * @param {Object} [config] input config
 * @return {Object} output config
 */
const CONFIG_LITE = function (config) {
  config = { // shallow duplicate, just in case
    ...config,
    plugins: config.plugins.map((plugin) => ({
      ...plugin,
      params: { ...plugin.params }
    }))
  }

  if (Array.isArray(config.plugins)) {
    config.plugins = optimizePluginsArray(config.plugins)
  }

  return config
}

/**
 * Try to group sequential elements of plugins array.
 *
 * @param {Object} plugins input plugins
 * @return {Array} output plugins
 */
function optimizePluginsArray (plugins) {
  let prev

  return plugins.reduce(function (plugins, item) {
    if (prev && item.type === prev[ 0 ].type) {
      prev.push(item)
    } else {
      plugins.push(prev = [ item ])
    }
    return plugins
  }, [])
}

export { CONFIG_LITE }
