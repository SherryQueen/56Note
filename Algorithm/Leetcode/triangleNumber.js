/**
 * @filename    triangleNumber.js
 * @author      56
 * @description https://leetcode-cn.com/problems/valid-triangle-number/
 */

/**
 * 构成三角形的三条边需要符合两边之和大于第三边.
 * 故 我们可以对输入的数组进行排序使数组有序. 当我们从大到小 固定最大边i时, 可将题目转变为在 [0, i)中, 寻找到 j, k使得  nums[i] < nums[j] + nums[k]. 即 两数之和大于目标值的题目
 * 针对两数之和大于目标值. 我们可以从大到小依次确定大值k 遍历[0,k)找出符合条件的最小 j. 通过 k-j+1 确定当前次大边k下符合条件的三角形个数
 * @param {number[]} nums
 * @return {number}
 */
var triangleNumber = function (nums) {
  let result = 0
  const len = nums.length
  if (len < 3) return 0

  nums = nums.sort((a, b) => a - b)
  // 确定目标值
  for (let i = len - 1; i > 1; i--) {
    // 转为 求两数之和大于目标值的题目
    for (let k = i - 1; k > 0; k--) {
      let j = 0
      for (; j < k && nums[j] + nums[k] <= nums[i]; j++);
      if (j < k) result += k - j
    }
  }
  return result
}
