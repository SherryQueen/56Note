/**
 * @filename    wordPattern.js
 * @author      56
 * @description https://leetcode-cn.com/problems/word-pattern/
 */

/**
 * @param {string} pattern
 * @param {string} s
 * @return {boolean}
 */
var wordPattern = function (pattern, s) {
  const words = s.split(' ')
  const len = words.length
  if (len !== pattern.length) return false

  const map = new Map()
  for (let i = 0; i < len; i++) {
    const w = words[i]
    const p = '_' + pattern[i] // 使用同一个map 添加前缀以区分不同

    // 都未遍历到
    if (!map.has(w) && !map.has(p)) {
      map.set(w, p)
      map.set(p, w)
      continue
    }

    // 都已遍历过
    if (map.has(w) && map.has(p)) {
      if (map.get(w) === p && map.get(p) === w) continue
    }
    return false
  }
  return true
}

test('wordPattern', () => {
  expect(wordPattern('abc', 'b c a')).toBe(true)
  expect(wordPattern('abba', 'dog cat cat dog')).toBe(true)
  expect(wordPattern('abb', 'dog cat cat dog')).toBe(false)
  expect(wordPattern('abca', 'dog cat cat dog')).toBe(false)
  expect(wordPattern('abca', 'dog dog cat dog')).toBe(false)
  expect(wordPattern('aaaa', 'dog cat cat dog')).toBe(false)
  expect(wordPattern('abba', 'dog dog dog dog')).toBe(false)
  expect(wordPattern('abba', 'dog cat cat fish')).toBe(false)
})
