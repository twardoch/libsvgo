const name = 'convertEllipseToCircle'

const type = 'perItem'

const active = true

const description = 'converts non-eccentric <ellipse>s to <circle>s'

const params = {}

const none = { value: 0 }

/**
 * Converts non-eccentric <ellipse>s to <circle>s.
 *
 * @see http://www.w3.org/TR/SVG/shapes.html
 *
 * @param {Object} item current iteration item
 * @return {Boolean} if false, item will be filtered out
 *
 * @author Taylor Hunt
 */
const fn = function (item) {
  if (item.isElem('ellipse')) {
    const rx = (item.attr('rx') || none).value || 0
    const ry = (item.attr('ry') || none).value || 0

    if (rx === ry ||
      rx === 'auto' || ry === 'auto' // SVG2
    ) {
      const radius = rx !== 'auto' ? rx : ry
      item.renameElem('circle')
      item.removeAttr([ 'rx', 'ry' ])
      item.addAttr({
        name: 'r',
        value: radius,
        prefix: '',
        local: 'r'
      })
    }
  }
}

export { name, type, active, description, params, fn }
