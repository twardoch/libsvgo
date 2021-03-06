import { pathElems as __pathElems, referencesProps } from './_collections'
const pathElems = __pathElems.concat([ 'g', 'text' ])

const name = 'moveGroupAttrsToElems'

const type = 'perItem'

const active = true

const description = 'moves some group attributes to the content elements'

const params = {}

/**
 * Move group attrs to the content elements.
 *
 * @example
 * <g transform="scale(2)">
 *     <path transform="rotate(45)" d="M0,0 L10,20"/>
 *     <path transform="translate(10, 20)" d="M0,10 L20,30"/>
 * </g>
 *                          ⬇
 * <g>
 *     <path transform="scale(2) rotate(45)" d="M0,0 L10,20"/>
 *     <path transform="scale(2) translate(10, 20)" d="M0,10 L20,30"/>
 * </g>
 *
 * @param {Object} item current iteration item
 * @return {Boolean} if false, item will be filtered out
 *
 * @author Kir Belevich
 */
const fn = function (item) {
  // move group transform attr to content's pathElems
  if (
    item.isElem('g') &&
    item.hasAttr('transform') &&
    !item.isEmpty() &&
    !item.someAttr(function (attr) {
      return ~referencesProps.indexOf(attr.name) && ~attr.value.indexOf('url(')
    }) &&
    item.content.every(function (inner) {
      return inner.isElem(pathElems) && !inner.hasAttr('id')
    })
  ) {
    item.content.forEach(function (inner) {
      const attr = item.attr('transform')
      if (inner.hasAttr('transform')) {
        inner.attr('transform').value = attr.value + ' ' + inner.attr('transform').value
      } else {
        inner.addAttr({
          'name': attr.name,
          'local': attr.local,
          'prefix': attr.prefix,
          'value': attr.value
        })
      }
    })

    item.removeAttr('transform')
  }
}

export { name, type, active, description, params, fn }
