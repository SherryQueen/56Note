const Fs = require('fs')
const Path = require('path')

const argv = process.argv
const path = argv[2]

const options = argv.slice(3)
const suffix = (options.find((o) => o.startsWith('-s')) || '').split('=')[1] || ''

const stat = Fs.statSync(path)
if (!stat || !stat.isDirectory()) throw new Error(`Path: ${path} is not a directory`)

const list = Fs.readdirSync(path).filter((item) => {
  if (item === '.DS_Store') return false
  if (suffix) return item.endsWith(suffix)
  return true
})

let len = list.length
let pad = 0
while (len) {
  len = Math.floor(len / 10)
  pad += 1
}

list.forEach((name, idx) => {
  const arr = name.split('.')
  const ext = arr[arr.length - 1]
  Fs.renameSync(Path.join(path, name), Path.join(path, (idx + '').padStart(pad) + '.' + ext))
})
