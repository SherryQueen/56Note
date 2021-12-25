/**
 * @filename    searchRange.js
 * @author      56
 * @description https://leetcode-cn.com/problems/find-first-and-last-position-of-element-in-sorted-array/
 */

function binarySearch(nums, target) {
  let [l, r] = [0, nums.length]
  while (l <= r) {
    const mid = Math.ceil((l + r) / 2)
    if (nums[mid] === target) return mid
    else if (nums[mid] < target) l = mid + 1
    else r = mid - 1
  }
  return -1
}

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var searchRange = function (nums, target) {
  const len = nums.length
  if (!len) return [-1, -1]
  const mid = binarySearch(nums, target)
  let [l, r] = [mid, mid]
  while (nums[--l] === target);
  while (nums[++r] === target);
  return [l + 1, r - 1]
}

console.info(searchRange([], 1))
console.info(searchRange([1], 1))
console.info(searchRange([2], 1))
console.info(searchRange([1, 2, 3, 4, 5, 5], 6))
console.info(searchRange([1, 2, 3, 3, 4, 7, 8], 3))
