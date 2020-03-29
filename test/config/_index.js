import { CONFIG_LITE } from '../../lib/svgo/config-lite'
import { PLUGINS_DEFAULT_LIST } from '../../plugins/__default'

const { describe, it } = global

describe('config', function () {
  describe('default config', function () {
    const config = CONFIG_LITE({ plugins: PLUGINS_DEFAULT_LIST })

    it('should be an instance of Object', function () {
      config.should.be.an.instanceOf(Object)
    })

    it('should have property "plugins"', function () {
      config.should.have.property('plugins')
    })

    it('"plugins" should be an instance of Array', function () {
      config.plugins.should.be.an.instanceOf(Array)
    })
  })
})
