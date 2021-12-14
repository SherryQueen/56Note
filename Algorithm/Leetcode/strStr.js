/**
 * @filename    strStr.js
 * @author      56
 * @description https://leetcode-cn.com/problems/implement-strstr/
 */

/**
 * @param {string} haystack
 * @param {string} needle
 * @return {number}
 */
var strStr = function (haystack, needle) {
  const hayLen = haystack.length
  const needleLen = needle.length
  if (needleLen > hayLen) return -1
  if (needleLen === 0) return 0

  for (let i = 0, len = hayLen - needleLen + 1; i < len; i++) {
    if (needle[0] === haystack[i]) {
      let flag = true
      for (let j = 1; j < needleLen; j++) {
        if (needle[j] !== haystack[i + j]) {
          flag = false
          break
        }
      }
      if (flag) return i
    }
  }
  return -1
}

console.info(strStr('a', 'a'))
