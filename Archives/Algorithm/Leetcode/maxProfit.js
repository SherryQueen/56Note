/**
 * @filename    maxProfit.js
 * @author      56
 * @description https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock-with-transaction-fee/
 */
/**
 * 参照的题解思路: https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock-with-transaction-fee/solution/jian-dan-dpmiao-dong-gu-piao-mai-mai-by-tejdo/
 * DP 实现 状态方程
 *    - 今日不持有时的最大收益 dp[i] = max(昨日不持有， 昨日持有-今日卖出)
 *    - 今日持有时的最大收益  dp[i] = max(昨日不持有-今日买入， 昨日持有)
 * @param {number[]} prices
 * @param {number} fee
 * @return {number}
 */
var maxProfit = function (prices, fee) {
  const holds = [-prices[0]]
  const unHolds = [0]
  const len = prices.length
  for (let i = 1; i < len; i++) {
    const p = prices[i]
    holds[i] = Math.max(unHolds[i - 1] - p, holds[i - 1])
    unHolds[i] = Math.max(holds[i - 1] + p - fee, unHolds[i - 1])
  }
  return Math.max(holds[len - 1], unHolds[len - 1])
}

maxProfit([1, 3, 2, 8, 4, 9], 2)

test('maxProfit', () => {
  expect(maxProfit([5, 4, 3, 2, 1], 1)).toBe(0)
  expect(maxProfit([1, 3, 5, 7, 9], 1)).toBe(7)
  expect(maxProfit([1, 3, 2, 8, 4, 9], 2)).toBe(8)
})
