/**
 * @filename    isPerfectSquare.js
 * @author      56
 * @description https://leetcode-cn.com/problems/valid-perfect-square/
 */

/**
 * @param {number} num
 * @return {boolean}
 */
var isPerfectSquare = function (num) {
  if (num === 1) return true
  let [l, r] = [1, (num / 2) | 0]
  while (l <= r) {
    const mid = ((l + r) / 2) | 0
    const ans = mid * mid
    if (ans === num) return true
    else if (ans < num) l = mid + 1
    else r = mid - 1
  }
  return false
}
