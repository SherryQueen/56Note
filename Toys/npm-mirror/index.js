import fs from 'fs'
import OSS from 'ali-oss'
import Path from 'path'
import fetch from 'node-fetch'
import { Transform } from 'stream'

const json = fs.readFileSync('./oss.config.json')
const ossConfig = JSON.parse(json)
const client = new OSS({ ...ossConfig, timeout: '600s', secure: true })

const sleep = (millSeconds) => new Promise((resolve) => setTimeout(resolve, millSeconds))

const fetchPage = async (url) => {
  await sleep(2000)
  console.info(`start fetch ${url}`)
  const data = await fetch(`https://npm.taobao.org/mirrors${url}`).then((res) => res.text())
  console.info('end fetch')

  const links = data.match(/<a(.*)?href="\/mirrors(.+)?"(.*)?>(.+)?<\/a>/gi)
  if (!Array.isArray(links)) return []
  return links.map((link) =>
    // ? Return [href, name]
    link.match(/<a.*?href="\/mirrors(.+)?".*?>(.+)?<\/a>/i).slice(1)
  )
}

const existsFile = async (url) => {
  const data = await client.head(url).catch((err) => {
    // TODO: Handle error
    console.error(err)
    Promise.resolve(null)
  })
  return data
}

const uploadFile = async (localPath, targetPath) => {
  console.log(`Upload ${localPath} to ${targetPath}`)
  let data = await existsFile(targetPath)
  if (data) {
    console.log(`The ${targetPath} is existed`)
    return data
  }

  const rs = fs.createReadStream(localPath)
  const size = fs.statSync(localPath).size
  data = await client.putStream(targetPath, rs, { contentLength: size })
  console.log(`Upload ${localPath} to ${targetPath} over`)
  return data
}

const downloadFile = (path, name, url) => {
  const p = Path.join(process.cwd(), 'temp', path)
  if (!fs.existsSync(p)) {
    fs.mkdirSync(p, { recursive: true })
  }

  const downloadFile = Path.join(p, name)
  if (fs.existsSync(downloadFile)) {
    console.log(`file: ${downloadFile} is exists`)
    return Promise.resolve(downloadFile)
  }
  return new Promise((resolve, reject) => {
    fetch(`https://npm.taobao.org/mirrors${url}`, {
      headers: { 'Content-Type': 'application/octet-stream' },
    }).then((res) => {
      let len = 0
      const progress = new Transform({
        transform(chunk, encoding, callback) {
          len += chunk.length
          process.stdout.clearLine()
          process.stdout.cursorTo(0)
          process.stdout.write(`size: ${len}`)
          callback(null, chunk)
        },
      })

      const dest = fs.createWriteStream(downloadFile)
      dest.on('finish', () => {
        console.log(`\ndownload file ${downloadFile} over`)
        return resolve(downloadFile)
      })
      dest.on('error', reject)
      console.log(`download file ${downloadFile}`)
      res.body.pipe(progress).pipe(dest)
    })
  })
}

const parseHtml = async () => {
  const stack = ['/chromium-browser-snapshots/Linux_x64/']

  while (stack.length) {
    const url = stack.pop()
    if (url.endsWith('/')) {
      // * It's fold
      const arr = await fetchPage(url)
      stack.push(...arr.map(([path]) => path))
    } else {
      // * It's file
      const ans = url.split('/')
      const name = ans[ans.length - 1]
      const dir = ans.slice(0, -1).join('/')
      const target = ans.slice(1).join('/')

      const data = await existsFile(target)
      if (data) {
        console.info(`File is existed: ${target}`)
        continue
      }
      const file = await downloadFile(dir, name, url)
      console.log('upload', file, url, target)
      const res = await uploadFile(file, url, target)
      console.log('res', res)
    }
  }
}

try {
  if (!fs.existsSync('./temp')) fs.mkdirSync('./temp')
  parseHtml()
} catch (err) {
  console.error('err:', err)
}
