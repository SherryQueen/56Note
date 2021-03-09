/**
 * @filename    2. maxProfit.js
 * @author      56
 * @description https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock-ii/
 */
/**
 * 1. 题目要求计算最大利润, 优先考虑了 DP
 * 2. 根据题意可设定状态值. 即i天是否持有股票  DP1[i] 当天持有股票的最大 收益 DP2[i] 当天未持有股票的最大收益
 * 3. 可得状态转移方程
 *  dp1[i] = max(dp1[i-1], dp2[i-1] - prices[i])
 *  dp2[2] = max(dp1[i-1] + prices[i], dp2[i-1])
 * 4. 可得最终结果 即比较 dp1 和 dp2 即可得到最优解
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function (prices) {
  const dp1 = [-prices[0]]
  const dp2 = [0]
  const len = prices.length
  for (let i = 1; i < len; i++) {
    dp1[i] = Math.max(dp1[i - 1], dp2[i - 1] - prices[i])
    dp2[i] = Math.max(dp1[i - 1] + prices[i], dp2[i - 1])
  }
  return Math.max(dp1[len - 1], dp2[len - 1])
}

/**
 * 1. 当在最高点买入,最低点卖出. 即可获得最大利润. 即 i 天最低点买入, j天最高点卖出
 * 2. 区分两种情况, 单调递减 和 单调递增
 * 3. 单调递减的情况下, 即买入就亏. 所以不卖. 利润为0
 * 4. 单调递增的情况下, 即初始买入, 最后卖出. 在第i天卖出的利润为 profit[i] = profit[i-1] + (prices[i] - prices[i-1])
 * @param {*} prices
 * @return {number}
 */
var maxProfit = function (prices) {
  let profit = 0
  for (let i = 1, len = prices.length; i < len; i++) {
    const diff = prices[i] - prices[i - 1]
    if (diff > 0) profit += diff
  }
  return profit
}
