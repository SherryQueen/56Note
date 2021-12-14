/**
 * @filename    truncateSentence.js
 * @author      56
 * @description https://leetcode-cn.com/problems/truncate-sentence/
 */

/*
单词有空格间距. 其实就是转换为找到第k个空格, 取k之前的所有字符串返回即可.
注意如果是全部返回单词时, k不为0
*/

/**
 * @param {string} s
 * @param {number} k
 * @return {string}
 */
var truncateSentence = function (s, k) {
  if (k === 0) return ''
  let idx = -1
  for (let i = 0, len = s.length; i < len; i++) {
    if (s[i] === ' ') {
      k--
      idx = i
      if (k === 0) break
    }
  }
  return k ? s : s.slice(0, idx)
}

console.info(truncateSentence('chopper is not a tanuki', 5))
