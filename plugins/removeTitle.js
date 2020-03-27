const name = 'removeTitle'

const type = 'perItem'

const active = true

const description = 'removes <title>'

const params = {}

/**
 * Remove <title>.
 *
 * https://developer.mozilla.org/en-US/docs/Web/SVG/Element/title
 *
 * @param {Object} item current iteration item
 * @return {Boolean} if false, item will be filtered out
 *
 * @author Igor Kalashnikov
 */
const fn = function (item) {
  return !item.isElem('title')
}

export { name, type, active, description, params, fn }
