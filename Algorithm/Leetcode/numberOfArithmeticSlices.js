/**
 * @filename    numberOfArithmeticSlices.js
 * @author      56
 * @description https://leetcode-cn.com/problems/arithmetic-slices/
 */

/*
根据题意, 等差数列由子数组(连续序列)构成
如果有 [i...j] 符合题目需求, 假设有结果 n种
那么当 [i...j,j+1] 也符合题目要求时,则此时有结果 n+n+1种
即由 [i+1...j+1] 构成的结果 n 种. 由 [i...j] 构成的结果n中, 由 [i...j,j+1]构成的结果1种. 故我们可以一次循环. 记录当前等差情况下的结果数量来累加得到最终的答案
*/

/**
 * @param {number[]} nums
 * @return {number}
 */
var numberOfArithmeticSlices = function (nums) {
  const len = nums.length
  if (len < 3) return 0
  let ans = 0
  let diff = nums[1] - nums[0]
  let n = 0
  for (let i = 2; i < len; i++) {
    if (diff === nums[i] - nums[i - 1]) n++
    else {
      diff = nums[i] - nums[i - 1]
      n = 0
    }
    ans += n
  }
  return ans
}
