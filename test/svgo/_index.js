import { readFileSync } from 'fs'
import { resolve } from 'path'
import { SVGO } from '../../lib/svgo'

const EOL = '\n'
const regEOL = new RegExp(EOL, 'g')

const { describe, it } = global

describe('indentation', function () {
  it('should create indent with 2 spaces', function () {
    const filepath = resolve(__dirname, './test.svg')

    const data = readFileSync(filepath, 'utf8')

    const splitted = normalize(data).split(/\s*@@@\s*/)
    const orig = splitted[ 0 ]
    const should = splitted[ 1 ]

    const svgo = new SVGO({
      full: true,
      plugins: [],
      js2svg: { pretty: true, indent: 2 }
    })

    return new Promise((resolve) => {
      svgo.optimize(orig, { path: filepath }).then(function (result) {
        normalize(result.data).should.be.equal(should)
        resolve()
      })
    })
  })
})

function normalize (file) {
  return file.trim().replace(regEOL, '\n')
}
