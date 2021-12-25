/**
 * @filename    numEquivDominoPairs.js
 * @author      56
 * @description https://leetcode-cn.com/problems/number-of-equivalent-domino-pairs/
 */

/**
 * 每个骨牌 按照 数字小的纬度在前,数字大的纬度在后. 构建key
 * 每个骨牌遍历时, 从map中判断当前key已存在的数量.即当前骨牌等价的数量.
 * @param {number[][]} dominoes
 * @return {number}
 */
var numEquivDominoPairs = function (dominoes) {
  if (dominoes.length === 1) return 0

  let res = 0
  const m = new Map()
  for (dom of dominoes) {
    const key = dom[0] > dom[1] ? dom[1] * 10 + dom[0] : dom[0] * 10 + dom[1]
    const count = m.get(key) || 0
    res += count
    m.set(key, count + 1)
  }
  return res
}

console.info(
  numEquivDominoPairs([
    [1, 2],
    [2, 1],
    [1, 2],
  ])
)
console.info(
  numEquivDominoPairs([
    [1, 2],
    [2, 1],
    [3, 4],
    [5, 6],
  ])
)
