import Fs from 'fs'
import Path from 'path'
import { dirname } from 'path'
import { fileURLToPath } from 'url'
import fontCarrier from 'font-carrier'

const __dirname = dirname(fileURLToPath(import.meta.url))

let dirPath = Path.join(__dirname, 'svg')

const font = fontCarrier.create()

const files = Fs.readdirSync(dirPath)
files.forEach((file) => {
  const path = Path.join(dirPath, file)
  const state = Fs.statSync(path)
  if (state.isFile() && file.endsWith('.svg')) {
    const s = Fs.readFileSync(path).toString()
    font.setSvg(file.split('.')[0], s)
    console.info('import', path)
  }
})

font.output({ path: Path.join(__dirname, './dist/iconfont') })

Fs.writeFileSync(
  Path.join(__dirname, './dist/iconfont.css'),
  `@font-face {
  font-family: 'iconfont';
  src: url('iconfont.eot'); /* IE9 */
  src: url('iconfont.eot?#iefix') format('embedded-opentype'), /* IE6-IE8 */
  url('iconfont.woff') format('woff2'),
  url('iconfont.woff') format('woff'), /* chrome、firefox */
  url('iconfont.ttf') format('truetype'), /* chrome、firefox、opera、Safari, Android, iOS 4.2+*/
  url('iconfont.svg#iconfont') format('svg'); /* iOS 4.1- */
}
.iconfont {
  font-family: "iconfont";
  font-size: 16px;
  font-style: normal;
}
`
)
