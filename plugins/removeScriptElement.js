const name = 'removeScriptElement'

const type = 'perItem'

const active = false

const description = 'removes <script> elements (disabled by default)'

const params = {}

/**
 * Remove <script>.
 *
 * https://www.w3.org/TR/SVG/script.html
 *
 * @param {Object} item current iteration item
 * @return {Boolean} if false, item will be filtered out
 *
 * @author Patrick Klingemann
 */
const fn = function (item) {
  return !item.isElem('script')
}

export { name, type, active, description, params, fn }
