/**
 * @filename    findLongestWord.js
 * @author      56
 * @description https://leetcode-cn.com/problems/longest-word-in-dictionary-through-deleting/
 */

/*
根据题意, 我们可推断出题意为判断字典里的字符串是否为s的子串
因为要寻找到长度最长且字典序最小的字符串, 故我们可以先对字典进行排序, 来优化查找速度
*/

/**
 * @param {string} s
 * @param {string[]} dictionary
 * @return {string}
 */
var findLongestWord = function (s, dictionary) {
  const len = s.length
  const dict = dictionary.sort((a, b) => {
    if (a.length < b.length) return 1
    if (a.length > b.length) return -1
    return a.localeCompare(b)
  })

  for (const d of dict) {
    if (d.length > len) continue
    let i = 0,
      j = 0
    for (; i < len && j < d.length; i++) {
      if (s[i] === d[j]) j++
    }
    if (j === d.length) return d
  }
  return ''
}
