/**
 * @filename    buddyStrings.js
 * @author      56
 * @description https://leetcode-cn.com/problems/buddy-strings/
 */

/*
根据题意. 我们可知当满足如下情况时,可构成亲密字符串
1. 两个字符串长度相等
2. 两个字符串字符量相同但只有两个下标所在的字符不同 或 两个字符串完全相等但单个字符串s存在重复字符
*/

/**
 * @param {string} s
 * @param {string} goal
 * @return {boolean}
 */
var buddyStrings = function (s, goal) {
  if (s.length !== goal.length) return false
  const count1 = new Array(26).fill(0)
  const count2 = new Array(26).fill(0)

  let diff = 0
  const len = s.length
  for (let i = 0; i < len; i++) {
    if (s[i] !== goal[i]) {
      if (++diff > 2) return false
    }
    count1[s[i].charCodeAt() - 97]++
    count2[goal[i].charCodeAt() - 97]++
  }

  let repeat = false
  for (let i = 0; i < 26; i++) {
    if (count1[i] !== count2[i]) return false
    if (count1[i] >= 2) repeat = true
  }
  return diff === 2 || (diff === 0 && repeat)
}

buddyStrings('abcaa', 'abcbb')
