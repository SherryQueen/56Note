/**
 * @filename    rob.js
 * @author      56
 * @description https://leetcode-cn.com/problems/house-robber/
 */
/**
 * 状态转移方程: dp[i] 表示盗取到当前房间的最大金额 dp[i] = dp[i-2] || dp[i-3]
 * 结果获取: 需比较最后 dp[len-1] 和 dp[len-2] 才能得到最大值
 * @param {number[]} nums
 * @return {number}
 */
var rob = function (nums) {
  const len = nums.length
  if (len === 0) return 0
  if (len === 1) return nums[0]
  if (len === 2) return Math.max(nums[0], nums[1])

  const dp = [nums[0], nums[1]]
  for (let i = 2; i < len; i++) {
    dp[i] = Math.max(dp[i - 2], dp[i - 3] || 0) + (nums[i] || 0)
  }
  return Math.max(dp[len - 1], dp[len - 2])
}

test('rob', () => {
  expect(rob([1, 2, 3, 1])).toBe(4)
  expect(rob([2, 7, 9, 3, 1])).toBe(12)
  expect(rob([8, 2, 2, 8, 5])).toBe(16)
})
