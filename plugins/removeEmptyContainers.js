import { elemsGroups } from './_collections'
const container = elemsGroups.container

const name = 'removeEmptyContainers'

const type = 'perItemReverse'

const active = true

const description = 'removes empty container elements'

const params = {}

/**
 * Remove empty containers.
 *
 * @see http://www.w3.org/TR/SVG/intro.html#TermContainerElement
 *
 * @example
 * <defs/>
 *
 * @example
 * <g><marker><a/></marker></g>
 *
 * @param {Object} item current iteration item
 * @return {Boolean} if false, item will be filtered out
 *
 * @author Kir Belevich
 */
const fn = function (item) {
  return !(item.isElem(container) && !item.isElem('svg') && item.isEmpty() &&
    (!item.isElem('pattern') || !item.hasAttrLocal('href')))
}

export { name, type, active, description, params, fn }
