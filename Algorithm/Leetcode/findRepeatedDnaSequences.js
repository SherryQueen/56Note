/**
 * @filename    findRepeatedDnaSequences.js
 * @author      56
 * @description https://leetcode-cn.com/problems/repeated-dna-sequences/
 */
/**
 * @param {string} s
 * @return {string[]}
 */
var findRepeatedDnaSequences = function (s) {
  const map = new Map()
  const L = 10
  const result = []
  for (let i = 0, len = s.length - 9; i < len; i++) {
    const ans = s.slice(i, i + L)
    map.set(ans, (map.get(ans) || 0) + 1)
    if (map.get(ans) === 2) result.push(ans)
  }
  return result
}
