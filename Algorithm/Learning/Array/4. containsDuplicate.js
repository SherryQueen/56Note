/**
 * @filename    4. containsDuplicate.js
 * @author      56
 * @description https://leetcode-cn.com/problems/contains-duplicate/
 */
/**
 * 1. 通过哈希标记数字是否已出现
 * @param {*} nums
 */
var containsDuplicate = function (nums) {
  const map = {}
  for (let i = 0, len = nums.length; i < len; i++) {
    const n = nums[i]
    if (map[n]) return true
    map[n] = true
  }
  return false
}
