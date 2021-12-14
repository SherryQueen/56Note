/**
 * @filename    balancedStringSplit.js
 * @author      56
 * @description https://leetcode-cn.com/problems/split-a-string-in-balanced-strings/
 */

/*
遍历, 通过临时变量ans标记 L, R 出现次数. L的话+1, R的话 -1
当ans 为0 时, 说明构成一个最小的平衡字符串. 故,结果加1.
*/

/**
 * @param {string} s
 * @return {number}
 */
var balancedStringSplit = function (s) {
  let result = 0
  let ans = 0
  for (let i = 0, len = s.length; i < len; i++) {
    if (s[i] === 'L') ans++
    if (s[i] === 'R') ans--
    if (ans === 0) result++
  }
  return result
}
