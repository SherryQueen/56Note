/**
 * @param {string} s
 * @return {string}
 */
const decodeString = function (s) {
  const len = s.length
  if (!len) return ''

  // * 计算 [...] 中内容
  const dfs = (i) => {
    let repeat = 0
    let result = ''

    while (i < len) {
      const c = s[i]
      // * 数字为其后 [] 的重复次数
      if (!isNaN(+c)) repeat = repeat * 10 + +c
      // * 根据 dfs 返回结果 计算重复数
      else if (c === '[') {
        const { result: res, index } = dfs(i + 1)
        while (repeat--) result += res
        i = index
        repeat = 0
      }
      // * [...]处理结束
      else if (c === ']') return { result, index: i }
      // * 累加 字符
      else result += c
      i++
    }

    return { result, index: i }
  }

  const { result } = dfs(0)
  return result
}

console.assert(decodeString('3[a]2[bc]') === 'aaabcbc')
