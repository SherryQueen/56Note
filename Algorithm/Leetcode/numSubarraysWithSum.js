/**
 * @filename    numSubarraysWithSum.js
 * @author      56
 * @description https://leetcode-cn.com/problems/binary-subarrays-with-sum/
 */

/**
 * 1. 因为是子数组(连续的) 故我们可以将题目抽象为 [0, i] 和 [0, j] 和之差是否为 目标值
 * @param {number[]} nums
 * @param {number} goal
 * @return {number}
 */
var numSubarraysWithSum = function (nums, goal) {
  let sum = 0
  const map = new Map()
  let result = 0
  for (const num of nums) {
    map.set(sum, (map.get(sum) || 0) + 1) // 记录前缀和 为 sum 的数量
    sum += num // 更新前缀和
    result += map.get(sum - goal) || 0 // 计算右边界为j时, 符合要求的数量
  }
  return result
}
