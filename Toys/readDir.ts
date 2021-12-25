import { join } from 'path'
import { readdirSync } from 'fs'

const ignores = ['.DS_Store', 'node_modules']

const directoryTree: string[] = []

function readDir(dirPath: string) {
  const files = readdirSync(dirPath, { withFileTypes: true })
  files.forEach((file) => {
    if (ignores.some((ignore) => new RegExp(ignore).test(file.name))) return
    if (file.isDirectory()) {
      const dir = join(dirPath, file.name)
      directoryTree.push(`d:${dir}`)
      readDir(dir)
    } else if (file.isFile()) {
      directoryTree.push(`f:${join(dirPath, file.name)}`)
    }
  })
}
