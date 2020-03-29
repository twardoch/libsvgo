import { CONFIG_LITE } from './svgo/config-lite'
import { SVG2JS } from './svgo/svg2js'
import { PLUGINS } from './svgo/plugins'
import { JSAPI } from './svgo/jsAPI'
import { JS2SVG } from './svgo/js2svg'
import { encodeSVGDatauri } from './svgo/tools'

/**
 * SVGO is a Nodejs-based tool for optimizing SVG vector graphics files.
 *
 * @see https://github.com/svg/svgo
 *
 * @author Kir Belevich <kir@soulshine.in> (https://github.com/deepsweet)
 * @copyright © 2012 Kir Belevich
 * @license MIT https://raw.githubusercontent.com/svg/svgo/master/LICENSE
 */

const SVGO_LITE = function (config) {
  this.config = SVGO_LITE.Config(config) // allow swap of CONFIG
}

SVGO_LITE.Config = CONFIG_LITE

SVGO_LITE.prototype.optimize = function (svgstr, info) {
  info = info || {}
  return new Promise((resolve, reject) => {
    if (this.config.error) {
      reject(this.config.error)
      return
    }

    const config = this.config
    const maxPassCount = config.multipass ? 10 : 1
    let counter = 0
    let prevResultSize = Number.POSITIVE_INFINITY
    const optimizeOnceCallback = (svgjs) => {
      if (svgjs.error) {
        reject(svgjs.error)
        return
      }

      info.multipassCount = counter
      if (++counter < maxPassCount && svgjs.data.length < prevResultSize) {
        prevResultSize = svgjs.data.length
        this._optimizeOnce(svgjs.data, info, optimizeOnceCallback)
      } else {
        if (config.datauri) {
          svgjs.data = encodeSVGDatauri(svgjs.data, config.datauri)
        }
        if (info && info.path) {
          svgjs.path = info.path
        }
        resolve(svgjs)
      }
    }

    this._optimizeOnce(svgstr, info, optimizeOnceCallback)
  })
}

SVGO_LITE.prototype._optimizeOnce = function (svgstr, info, callback) {
  const config = this.config

  SVG2JS(svgstr, function (svgjs) {
    if (svgjs.error) {
      callback(svgjs)
      return
    }

    svgjs = PLUGINS(svgjs, info, config.plugins)

    callback(JS2SVG(svgjs, config.js2svg))
  })
}

/**
 * The factory that creates a content item with the helper methods.
 *
 * @param {Object} data which is passed to jsAPI constructor
 * @returns {JSAPI} content item
 */
SVGO_LITE.prototype.createContentItem = function (data) {
  return new JSAPI(data)
}

export { SVGO_LITE }
