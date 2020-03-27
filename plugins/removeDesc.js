const name = 'removeDesc'

const type = 'perItem'

const active = true

const params = {
  removeAny: true
}

const description = 'removes <desc>'

const standardDescs = /^(Created with|Created using)/

/**
 * Removes <desc>.
 * Removes only standard editors content or empty elements 'cause it can be used for accessibility.
 * Enable parameter 'removeAny' to remove any description.
 *
 * https://developer.mozilla.org/en-US/docs/Web/SVG/Element/desc
 *
 * @param {Object} item current iteration item
 * @return {Boolean} if false, item will be filtered out
 *
 * @author Daniel Wabyick
 */
const fn = function (item, params) {
  return !item.isElem('desc') || !(
    params.removeAny || item.isEmpty() || standardDescs.test(item.content[ 0 ].text)
  )
}

export { name, type, active, description, params, fn }
