/**
 * @filename    check-if-all-the-integers-in-a-range-are-covered.js
 * @author      56
 * @description https://leetcode-cn.com/problems/check-if-all-the-integers-in-a-range-are-covered/
 */

/**
 * 差分数组, 记录区间的变化
 * 通过遍历, 确保在 [left,right]区间内所有的数都被覆盖到
 * @param {number[][]} ranges
 * @param {number} left
 * @param {number} right
 * @return {boolean}
 */
var isCovered = function (ranges, left, right) {
  const diff = Array(52).fill(0)
  ranges.forEach(([l, r]) => {
    diff[l]++
    diff[r + 1]--
  })

  let ans = 0
  for (let i = 1; i < 51 && i <= right; i++) {
    ans += diff[i]
    if (left <= i && i <= right && ans <= 0) return false
  }
  return true
}
