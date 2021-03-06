import { readFileSync } from 'fs'
import { resolve } from 'path'
import { SVGO } from '../lib/svgo'

const filepath = resolve(__dirname, 'test.svg')
const data = readFileSync(filepath, 'utf8')

const svgo = new SVGO()
svgo.optimize(data, { path: filepath })
  .then(console.log)
// {
//   // optimized SVG data string
//   data: '<svg width="10" height="20">test</svg>',
//   // additional info such as width/height
//   info: { width: '10', height: '20' },
//   path: '.../test.svg'
// }
