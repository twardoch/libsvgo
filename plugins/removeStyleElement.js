const name = 'removeStyleElement'

const type = 'perItem'

const active = false

const description = 'removes <style> element (disabled by default)'

const params = {}

/**
 * Remove <style>.
 *
 * http://www.w3.org/TR/SVG/styling.html#StyleElement
 *
 * @param {Object} item current iteration item
 * @return {Boolean} if false, item will be filtered out
 *
 * @author Betsy Dupuis
 */
const fn = function (item) {
  return !item.isElem('style')
}

export { name, type, active, description, params, fn }
