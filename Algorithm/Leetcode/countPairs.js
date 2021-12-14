/**
 * @filename    countPairs.js
 * @author      56
 * @description https://leetcode-cn.com/problems/count-good-meals/
 */

/**
 * 1. 通过 哈希表 记录 每个美味餐品出现的次数
 * @param {number[]} deliciousness
 * @return {number}
 */
var countPairs = function (deliciousness) {
  let MAX = 0
  deliciousness.forEach((d) => {
    MAX = Math.max(d, MAX)
  })

  let result = 0
  const MAX_SUM = 2 * MAX
  const map = new Map()
  deliciousness.forEach((d) => {
    let sum = 1
    while (sum <= MAX_SUM) {
      const ans = sum - d
      result = (result + (map.get(ans) || 0)) % 1000000007
      sum <<= 1
    }
    map.set(d, (map.get(d) || 0) + 1)
  })
  // console.info('map', map)
  return result
}

// console.info(countPairs([1, 3, 5, 7, 9]))
// console.info(countPairs([1, 1, 1, 3, 3, 3, 7]))
console.info(countPairs([149, 107, 1, 63, 0, 1, 6867, 1325, 5611, 2581, 39, 89, 46, 18, 12, 20, 22, 234]))
