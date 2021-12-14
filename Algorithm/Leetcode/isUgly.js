/**
 * @filename    isUgly.js
 * @author      56
 * @description https://leetcode-cn.com/problems/ugly-number/
 */

/**
 * 因为丑数由 2, 3, 5三个质因数组成. 如果当前数位丑数, 则必然可被三个数整除完毕后得到值为1. 反之则不是丑数
 * @param {number} n
 * @return {boolean}
 */
var isUgly = function (n) {
  if (n <= 0) return false
  const factor = [2, 3, 5]
  let ans = n
  for (const f of factor) {
    while (ans % f === 0) {
      ans = ans / f
    }
  }
  return ans === 1
}
