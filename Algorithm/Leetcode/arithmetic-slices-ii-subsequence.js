/**
 * @filename    arithmetic-slices-ii-subsequence.js
 * @author      56
 * @description https://leetcode-cn.com/problems/arithmetic-slices-ii-subsequence/
 */

/*
相对于 题目 [等差数列划分](https://leetcode-cn.com/problems/arithmetic-slices/)
本题的区别是可以由 子序列构成.
我们可以按照上一题的思路, 通过记录两两数字之间的差值, 通过记录差值出现的次数, 得到当前差值下可构成的子序列数量.
具体思路:
如果有 [i...j] 符合题目需求
那么当 [i...j,j+k(k未知)] 也符合题目要求时,则此时有结果 dp[j+k] = (dp[j] + 1)(新增的当前差值的等差数列) + dp[j+k](原来当前差值的等差数列)

我们通过 map 记录每一位数字可能出现的差值情况, 这样在循环中可以保持在不同位数下不同差值已构成的等差数列数量
*/

/**
 * @param {number[]} nums
 * @return {number}
 */
var numberOfArithmeticSlices = function (nums) {
  const len = nums.length
  if (len < 3) return 0

  const map = new Map()
  for (let i = 0; i < len; i++) {
    map.set(i, new Map())
  }

  let res = 0
  for (let i = 0; i < len; i++) {
    for (let j = i + 1; j < len; j++) {
      const diff = nums[j] - nums[i]
      const ans = map.get(i).get(diff) || 0 // 获取当前差值在 第i位 的等差数列数
      res += ans
      map.get(j).set(diff, (map.get(j).get(diff) || 0) + ans + 1) // 更新当前差值在 第j位的等差数列数
    }
  }
  return res
}

console.info(numberOfArithmeticSlices([2, 4, 6, 8, 10]))
