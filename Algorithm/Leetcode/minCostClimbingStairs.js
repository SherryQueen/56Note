/**
 * @filename    minCostClimbingStairs.js
 * @author      56
 * @description https://leetcode-cn.com/problems/min-cost-climbing-stairs/
 */
/**
 * @param {number[]} cost
 * @return {number}
 */
var minCostClimbingStairs = function (cost) {
  const dp = [cost[0], cost[1]]
  const len = cost.length
  for (let i = 2; i <= len; i++) {
    dp[i] = Math.min(dp[i - 2], dp[i - 1]) + (cost[i] || 0)
  }
  return dp[len]
}

test('minCostClimbingStairs', () => {
  expect(minCostClimbingStairs([10, 15, 20])).toBe(15)
  expect(minCostClimbingStairs([1, 100, 1, 1, 1, 100, 1, 1, 100, 1])).toBe(6)
})
