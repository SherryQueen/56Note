/**
 * @filename    judgeSquareSum.js
 * @author      56
 * @description https://leetcode-cn.com/problems/sum-of-square-numbers/
 */

/**
 * @param {number} c
 * @return {boolean}
 */
var judgeSquareSum = function (c) {
  let l = 0
  let r = Math.floor(Math.sqrt(c))
  while (l <= r) {
    const res = l * l + r * r
    if (res === c) return true
    if (res < c) l++
    else r--
  }
  return false
}
