/**
 * @filename    findOcurrences.js
 * @author      56
 * @description https://leetcode-cn.com/problems/occurrences-after-bigram/
 */

/*
分词, 根据空格将输入字符分割为多个单词
根据匹配规则, 我们可知.
如果前两个单词相等, 则当前词符合规则. 故我们一次性遍历即可
*/

/**
 * @param {string} text
 * @param {string} first
 * @param {string} second
 * @return {string[]}
 */
var findOcurrences = function (text, first, second) {
  const words = text.split(' ')
  const len = words.length
  if (len < 3) return []

  const result = []
  for (let i = 2; i < len; i++) {
    if (words[i - 2] === first && words[i - 1] === second) result.push(words[i])
  }
  return result
}
