import { inheritableAttrs, attrsGroups, presentationNonInheritableGroupAttrs as applyGroups } from './_collections'

const name = 'removeNonInheritableGroupAttrs'

const type = 'perItem'

const active = true

const description = 'removes non-inheritable group’s presentational attributes'

const params = {}

/**
 * Remove non-inheritable group's "presentation" attributes.
 *
 * @param {Object} item current iteration item
 * @return {Boolean} if false, item will be filtered out
 *
 * @author Kir Belevich
 */
const fn = function (item) {
  if (item.isElem('g')) {
    item.eachAttr(function (attr) {
      if (
        ~attrsGroups.presentation.indexOf(attr.name) &&
        !~inheritableAttrs.indexOf(attr.name) &&
        !~applyGroups.indexOf(attr.name)
      ) {
        item.removeAttr(attr.name)
      }
    })
  }
}

export { name, type, active, description, params, fn }
