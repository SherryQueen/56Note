/**
 * @filename    findRelativeRanks.js
 * @author      56
 * @description https://leetcode-cn.com/problems/relative-ranks/
 */

/*
通过对分数的比较, 得到对应的排序结果. 并按照排序结果,赋予对应下标的获奖情况
故我们需要做的就是, 对分数进行排序,并保留对应分数所在的数组下标
*/

/**
 * @param {number[]} score
 * @return {string[]}
 */
var findRelativeRanks = function (score) {
  const map = new Map()
  const result = []
  const medals = { 1: 'Gold Medal', 2: 'Silver Medal', 3: 'Bronze Medal' }
  score.forEach((s, i) => map.set(s, i))
  score
    .sort((a, b) => b - a)
    .forEach((s, i) => {
      const idx = map.get(s) || 0
      result[idx] = medals[i + 1] || (i + 1).toString()
    })
  return result
}
