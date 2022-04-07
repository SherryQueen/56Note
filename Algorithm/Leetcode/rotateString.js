/**
 * @filename    rotateString.js
 * @author      56
 * @description https://leetcode-cn.com/problems/rotate-string/
 */

/**
 * 根据题意, 我们可以得到  s+s 必然包含 goal. 且 s.length === goal.length
 * 因此我们可以在 s+s 通过查找子字符串是否存在 goal 来判断是否符合题意
 */

/**
 * @param {string} s
 * @param {string} goal
 * @return {boolean}
 */
var rotateString = function (s, goal) {
  if (s.length !== goal.length) return false
  return (s + s).indexOf(goal) !== -1
}
