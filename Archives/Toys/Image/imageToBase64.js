const fs = require('fs')
const path = require('path')

const image = fs.readFileSync(path.join(__dirname, './bg.jpeg'))
const base64 = Buffer.from(image, 'binary').toString('base64')
fs.writeFileSync(path.join(__dirname, 'result.txt'), 'data:image/jpeg;base64,' + base64)
