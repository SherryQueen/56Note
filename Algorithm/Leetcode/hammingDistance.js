/**
 * @filename    hammingDistance.js
 * @author      56
 * @description https://leetcode-cn.com/problems/hamming-distance/
 */

/**
 * @param {number} x
 * @param {number} y
 * @return {number}
 */
var hammingDistance = function (x, y) {
  let count = 0
  let s = x ^ y // 不同的位 值为1
  while (s) {
    count += s & 1
    s >>= 1
  }
  return count
}
