/**
 * @filename    maxIceCream.js
 * @author      56
 * @description https://leetcode-cn.com/problems/maximum-ice-cream-bars/
 */

/**
 * @param {number[]} costs
 * @param {number} coins
 * @return {number}
 */
var maxIceCream = function (costs, coins) {
  costs = costs.sort((a, b) => a - b)
  let res = 0
  let remain = coins
  for (let i = 0, len = costs.length; i < len; i++) {
    const cost = costs[i]
    if (remain < cost) return res

    res++
    remain -= cost
  }
  return res
}
