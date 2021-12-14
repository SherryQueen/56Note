import tmp from 'tmp'
import { Readable } from 'stream'
import { ReadStream, createReadStream, writeFileSync } from 'fs'

const cloneStream = (stream: ReadStream) => {
  const _stream = new Readable()
  stream.on('data', (chunk) => _stream.push(chunk))
  stream.on('end', () => _stream.push(null))
  stream.on('error', (err) => _stream.emit('error', err))
  _stream._read = () => {}
  return _stream
}

const file = tmp.fileSync()
writeFileSync(file.name, 'Hello world', { encoding: 'utf8' })
const stream = createReadStream(file.name)

const s1 = cloneStream(stream)
const s2 = cloneStream(stream)

s1.pipe(process.stdout)
s2.pipe(process.stdout)
