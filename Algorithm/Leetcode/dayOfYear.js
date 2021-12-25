/**
 * @filename    dayOfYear
 * @author      56
 * @description https://leetcode-cn.com/problems/day-of-the-year/
 */

/**
 * @param {string} date
 * @return {number}
 */
var dayOfYear = function (date) {
  const [year, month, day] = date.split('-').map((item) => +item)
  const amount = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
  if (year % 400 === 0 || (year % 4 === 0 && year % 100 !== 0)) amount[1] += 1 // 润年. 2月+1

  let ans = 0
  const m = month - 1
  for (let i = 0; i < m; i++) ans += amount[i]
  return ans + day
}
