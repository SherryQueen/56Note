/**
 * @filename    9. twoSum.js
 * @author      56
 * @description https://leetcode-cn.com/problems/two-sum/
 */

/**
 * 1. 哈希表 记录每一位的对应差值. 即 [target - nums[i]]: i
 * 2. 当遍历到 nums[j] = target - nums[i] 时, 即找到目标值
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function (nums, target) {
  const map = new Map()
  for (let i = 0, len = nums.length; i < len; i++) {
    const n = nums[i]
    if (map.has(n)) return [map.get(n), i]
    map.set(target - n, i)
  }
}
