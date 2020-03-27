const name = 'removeMetadata'

const type = 'perItem'

const active = true

const description = 'removes <metadata>'

const params = {}

/**
 * Remove <metadata>.
 *
 * http://www.w3.org/TR/SVG/metadata.html
 *
 * @param {Object} item current iteration item
 * @return {Boolean} if false, item will be filtered out
 *
 * @author Kir Belevich
 */
const fn = function (item) {
  return !item.isElem('metadata')
}

export { name, type, active, description, params, fn }
