/**
 * @filename    binarySearch.js
 * @author      56
 * @description https://leetcode-cn.com/problems/binary-search/
 */

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var search = function (nums, target) {
  let l = 0
  let r = nums.length - 1
  while (l <= r) {
    const mid = (l + r) >> 1
    if (target === nums[mid]) return mid
    if (target < nums[mid]) r = mid - 1
    if (target > nums[mid]) l = mid + 1
  }
  return -1
}
