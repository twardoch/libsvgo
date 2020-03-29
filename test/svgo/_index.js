import { readFileSync } from 'fs'
import { resolve } from 'path'
import SVGO from '../../lib/svgo'

const EOL = '\n'
const regEOL = new RegExp(EOL, 'g')

const { describe, it } = global

describe('indentation', function () {
  it('should create indent with 2 spaces', function () {
    var filepath = resolve(__dirname, './test.svg')
    var svgo

    const data = readFileSync(filepath, 'utf8')

    var splitted = normalize(data).split(/\s*@@@\s*/)
    var orig = splitted[ 0 ]
    var should = splitted[ 1 ]

    svgo = new SVGO({
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
