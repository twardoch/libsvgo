import SVGO from '../../lib/svgo'
import JSAPI from '../../lib/svgo/jsAPI'

const { describe, it } = global

describe('svgo object', function () {
  it('should has createContentItem method', function () {
    var svgo = new SVGO()
    svgo.createContentItem.should.be.a.Function()
  })

  it('should be able to create content item', function () {
    var svgo = new SVGO()
    var item = svgo.createContentItem({
      elem: 'elementName',
      prefix: 'prefixName',
      local: 'localName'
    })

    item.should.be.instanceof(JSAPI)
    item.should.have.ownProperty('elem').equal('elementName')
    item.should.have.ownProperty('prefix').equal('prefixName')
    item.should.have.ownProperty('local').equal('localName')
  })

  it('should be able create content item without argument', function () {
    var svgo = new SVGO()
    var item = svgo.createContentItem()

    item.should.be.instanceof(JSAPI)
    item.should.be.empty()
  })

  // it('should have ES module interop default property', function () {
  //   SVGO.should.equal(SVGO.default)
  // })
})
