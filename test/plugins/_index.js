import { readdirSync, readFile as __readFile } from 'fs'
import { resolve } from 'path'
import SVGO from '../../lib/svgo'

const EOL = '\n'
const regEOL = new RegExp(EOL, 'g')
const regFilename = /^(.*)\.(\d+)\.svg$/

const { describe, it } = global

describe('plugins tests', function () {
  readdirSync(__dirname).forEach(function (file) {
    const match = file.match(regFilename)
    let index
    let name

    if (match) {
      name = match[ 1 ]
      index = match[ 2 ]

      file = resolve(__dirname, file)

      it(name + '.' + index, function () {
        return readFile(file)
          .then(function (data) {
            const splitted = normalize(data).split(/\s*@@@\s*/)
            const orig = splitted[ 0 ]
            const should = splitted[ 1 ]
            const params = splitted[ 2 ]

            const plugins = {}

            plugins[ name ] = (params) ? JSON.parse(params) : true

            const svgo = new SVGO({
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
