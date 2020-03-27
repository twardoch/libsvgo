const name = 'removeEmptyAttrs'

const type = 'perItem'

const active = true

const description = 'removes empty attributes'

const params = {}

/**
 * Remove attributes with empty values.
 *
 * @param {Object} item current iteration item
 * @return {Boolean} if false, item will be filtered out
 *
 * @author Kir Belevich
 */
const fn = function (item) {
  if (item.elem) {
    item.eachAttr(function (attr) {
      if (attr.value === '') {
        item.removeAttr(attr.name)
      }
    })
  }
}

export { name, type, active, description, params, fn }
