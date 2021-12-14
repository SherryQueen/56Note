/**
 * @filename    firstUniqChar.js
 * @author      56
 * @description https://leetcode-cn.com/problems/first-unique-character-in-a-string/
 */

/**
 * @param {string} s
 * @return {number}
 */
var firstUniqChar = function (s) {
  const len = s.length
  if (len === 0) return -1
  if (len === 1) return 0

  const map = {}
  const arr = [...Array(len)].fill(1)
  for (let i = 0; i < len; i++) {
    const c = s[i]
    if (map[c] !== undefined) {
      arr[map[c]] = -1
      arr[i] = -1
    }
    map[c] = i
  }
  for (let i = 0; i < len; i++) {
    if (arr[i] !== -1) return i
  }
  return -1
}

test('firstUniqChar', () => {
  expect(firstUniqChar('')).toBe(-1)
  expect(firstUniqChar('l')).toBe(0)
  expect(firstUniqChar('leetcode')).toBe(0)
  expect(firstUniqChar('ollob')).toBe(4)
  expect(firstUniqChar('loveleetcode')).toBe(2)
  expect(firstUniqChar('leetcodeleetcode')).toBe(-1)
})
