/**
 * @filename    findContentChildren.js
 * @author      56
 * @description https://leetcode-cn.com/problems/assign-cookies/
 */

/**
 * @param {number[]} g
 * @param {number[]} s
 * @return {number}
 */
var findContentChildren = function (g, s) {
  if (s.length === 0) return 0
  const cookies = s.sort((a, b) => a - b)
  const children = g.sort((a, b) => a - b)
  let full = 0
  let i = g.length // Children with the biggest appetite
  let j = cookies.length - 1 // The biggest cookie
  while (i-- && j >= 0) {
    if (children[i] > cookies[j]) continue // Not satisfied
    full++
    j--
  }
  return full
}

test('findContentChildren', () => {
  expect(findContentChildren([1, 2, 3], [3])).toBe(1)
  expect(findContentChildren([1, 2, 3], [1, 1])).toBe(1)
  expect(findContentChildren([1, 2], [1, 2, 3])).toBe(2)
  expect(findContentChildren([2, 3, 4], [1, 2, 3])).toBe(2)
})
