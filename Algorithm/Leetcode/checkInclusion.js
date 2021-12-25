/**
 * @filename    checkInclusion.js
 * @author      56
 * @description https://leetcode-cn.com/problems/permutation-in-string/
 */

/**
 * 滑动窗口
 * @param {string} s1
 * @param {string} s2
 * @return {boolean}
 */
const checkInclusion = function (s1, s2) {
  const len1 = s1.length
  const len2 = s2.length

  if (len2 < len1) return false

  const arr = [...Array(26)].fill(0)
  function match() {
    for (let i = 0; i < 26; i++) {
      if (arr[i] !== 0) return false
    }
    return true
  }

  for (let i = 0; i < len1; i++) {
    arr[s1[i].charCodeAt() - 97]++
    arr[s2[i].charCodeAt() - 97]--
  }
  if (match()) return true
  let k = 1
  while (k + len1 <= len2) {
    arr[s2[k - 1].charCodeAt() - 97]++
    arr[s2[k + len1 - 1].charCodeAt() - 97]--
    if (match()) return true
    k++
  }
  return false
}
