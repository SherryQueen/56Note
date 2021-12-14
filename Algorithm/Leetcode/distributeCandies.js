/**
 * @filename    distributeCandies.js
 * @author      56
 * @description https://leetcode-cn.com/problems/distribute-candies/
 */

/*
因为平均分配, 即妹妹最多获得 n= candyType.length / 2 个糖果.
我们将所有糖果进行个去重得到 set,若种类少于n. 则返回set.size  若种类大于等于n 则返回n
*/

/**
 * @param {number[]} candyType
 * @return {number}
 */
var distributeCandies = function (candyType) {
  const set = new Set(candyType)
  const n = (candyType.length / 2) | 0
  return set.size > n ? n : set.size
}
