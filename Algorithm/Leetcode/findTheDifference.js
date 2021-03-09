/**
 * @filename    findTheDifference.js
 * @author      56
 * @description https://leetcode-cn.com/problems/find-the-difference/
 */

/**
 * @param {string} s
 * @param {string} t
 * @return {character}
 */
var findTheDifference = function (s, t) {
  const arr = []
  for (let i = 0, len = s.length; i < len; i++) {
    const c = s[i].charCodeAt() - 97
    arr[c] = (arr[c] || 0) + 1
  }
  for (let i = 0, len = t.length; i < len; i++) {
    const c = t[i].charCodeAt() - 97
    if (!arr[c]) return String.fromCharCode(c + 97)
    arr[c]--
  }
  return null
}

test('findTheDifference', () => {
  expect(findTheDifference('', 'a')).toBe('a')
  expect(findTheDifference('a', 'aa')).toBe('a')
  expect(findTheDifference('ae', 'aea')).toBe('a')
  expect(findTheDifference('abc', 'abcd')).toBe('d')
  expect(findTheDifference('abcd', 'abcde')).toBe('e')
})
