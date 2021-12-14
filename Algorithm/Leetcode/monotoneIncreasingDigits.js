/**
 * @filename    monotoneIncreasingDigits.js
 * @author      56
 * @description https://leetcode-cn.com/problems/monotone-increasing-digits/
 */

/**
 * @param {number} N
 * @return {number}
 */
var monotoneIncreasingDigits = function (N) {
  const arr = (N + '').split('')
  const len = arr.length
  let i = len - 1
  let res = arr[i]
  let last = parseInt(arr[i], 10) // 为上次遍历的字符的大小
  while (i--) {
    const n = parseInt(arr[i], 10)
    if (n > last) {
      // 顺序不对，需重置后续数据为9 当前数据为n-1
      last = n === 0 ? 0 : n - 1
      const ans = last.toString()
      res = ans.padEnd(res.length + 1, '9')
    } else {
      last = n
      res = n + res
    }
  }
  return parseInt(res, 10)
}

test('monotoneIncreasingDigits', () => {
  expect(monotoneIncreasingDigits(10)).toBe(9)
  expect(monotoneIncreasingDigits(234)).toBe(234)
  expect(monotoneIncreasingDigits(321)).toBe(299)
  expect(monotoneIncreasingDigits(5050)).toBe(4999)
  expect(monotoneIncreasingDigits(32123)).toBe(29999)
})
