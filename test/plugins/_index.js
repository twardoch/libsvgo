import { readdirSync, readFile as __readFile } from 'fs'
import { resolve } from 'path'
import SVGO from '../../lib/svgo'

const EOL = '\n'
const regEOL = new RegExp(EOL, 'g')
const regFilename = /^(.*)\.(\d+)\.svg$/

const { describe, it } = global

describe('plugins tests', function () {
  readdirSync(__dirname).forEach(function (file) {
    var match = file.match(regFilename)
    var index
    var name

    if (match) {
      name = match[ 1 ]
      index = match[ 2 ]

      file = resolve(__dirname, file)

      it(name + '.' + index, function () {
        return readFile(file)
          .then(function (data) {
            var splitted = normalize(data).split(/\s*@@@\s*/)
            var orig = splitted[ 0 ]
            var should = splitted[ 1 ]
            var params = splitted[ 2 ]

            var plugins = {}
            var svgo

            plugins[ name ] = (params) ? JSON.parse(params) : true

            svgo = new SVGO({
              full: true,
              plugins: [ plugins ],
              js2svg: { pretty: true }
            })

            return svgo.optimize(orig, { path: file }).then(function (result) {
              // FIXME: results.data has a '\n' at the end while it should not
              normalize(result.data).should.be.equal(should)
            })
          })
      })
    }
  })
})

function normalize (file) {
  return file.trim().replace(regEOL, '\n')
}

function readFile (file) {
  return new Promise(function (resolve, reject) {
    __readFile(file, 'utf8', function (err, data) {
      if (err) return reject(err)
      resolve(data)
    })
  })
}
