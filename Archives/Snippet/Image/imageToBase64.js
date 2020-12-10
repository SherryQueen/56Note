const fs = require('fs')

const image = fs.readFileSync('./bg.jpeg')
const base64 = Buffer.from(image, 'binary').toString('base64')
fs.writeFileSync('result.txt', 'data:image/jpeg;base64,' + base64)
