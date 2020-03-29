const type = 'perItem'

const active = true

const description = 'removes <metadata>'

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

export {
  type,
  active,
  description,
  fn
}
