/**
 * @filename    twoSum.js
 * @author      56
 * @description https://leetcode-cn.com/problems/two-sum/
 */

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
const twoSum = function (nums, target) {
  const map = {}
  for (let i = 0, len = nums.length; i < len; i++) {
    const n = nums[i]
    if (map[n] !== undefined) return [map[n], i]
    map[target - n] = i
  }
  return []
}
