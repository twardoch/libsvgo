const name = 'removeRasterImages'

const type = 'perItem'

const active = false

const description = 'removes raster images (disabled by default)'

const params = {}

/**
 * Remove raster images references in <image>.
 *
 * @see https://bugs.webkit.org/show_bug.cgi?id=63548
 *
 * @param {Object} item current iteration item
 * @return {Boolean} if false, item will be filtered out
 *
 * @author Kir Belevich
 */
const fn = function (item) {
  if (
    item.isElem('image') &&
    item.hasAttrLocal('href', /(\.|image\/)(jpg|png|gif)/)
  ) {
    return false
  }
}

export { name, type, active, description, params, fn }
