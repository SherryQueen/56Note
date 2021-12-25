/**
 * @filename    checkRecord.js
 * @author      56
 * @description https://leetcode-cn.com/problems/student-attendance-record-i/
 */

/*
通过变量 absent 记录缺勤天数是否超过两天
通过变量 late   记录连续迟到天数
注意: 试了下测试用例  'LLALL' 不算连续迟到三天
*/

var checkRecord1 = function (s) {
  // S 出现的位置不一致, 则至少缺勤两天. 存在 LLL 则 连续三天迟到
  return s.indexOf('A') == s.lastIndexOf('A') && !s.includes('LLL')
}

/**
 * @param {string} s
 * @return {boolean}
 */
var checkRecord2 = function (s) {
  const len = s.length
  if (len < 2) return true
  let absent = 0
  let late = 0
  for (const c of s) {
    if (c === 'L') {
      late++
      if (late >= 3) return false
    } else {
      late = 0
      if (c === 'A') {
        absent++
        if (absent >= 2) return false
      }
    }
  }
  return true
}
