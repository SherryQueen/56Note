/**
 * @filename    1. reverseString.js
 * @author      56
 * @description https://leetcode-cn.com/problems/reverse-string/
 */

/**
 * 1. 因为要反转, 即左右相对中线互换
 * 2. 使用左右双指针向中间靠拢, 交换
 * @param {character[]} s
 * @return {void} Do not return anything, modify s in-place instead.
 */
var reverseString = function (s) {
  let i = 0
  let j = s.length - 1
  while (i < j) {
    ;[s[i], s[j]] = [s[j], s[i]]
    i++
    j--
  }
}
