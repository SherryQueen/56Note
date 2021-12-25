/**
 * @filename    maximumTime.js
 * @author      56
 * @description https://leetcode-cn.com/problems/latest-time-by-replacing-hidden-digits/
 */

/**
 * @param {string} time
 * @return {string}
 */
var maximumTime = function (time) {
  let res = Array.from(time)

  if (time[0] === '?') {
    res[0] = '3' < res[1] && res[1] <= '9' ? '1' : '2'
  }
  if (time[1] === '?') {
    res[1] = res[0] === '2' ? '3' : '9'
  }
  if (time[3] === '?') {
    res[3] = '5'
  }
  if (time[4] === '?') {
    res[4] = '9'
  }
  return res.join('')
}
