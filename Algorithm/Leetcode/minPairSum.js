/**
 * @filename    minPairSum.js
 * @author      56
 * @description https://leetcode-cn.com/problems/minimize-maximum-pair-sum-in-array/
 */

/**
 * @param {number[]} nums
 * @return {number}
 */
var minPairSum = function (nums) {
  nums = nums.sort((a, b) => a - b)
  const len = nums.length
  let max = 0
  for (let i = 0, mid = (len >> 1) + 1; i < mid; i++) {
    max = Math.max(max, nums[i] + nums[len - 1 - i])
  }
  return max
}
