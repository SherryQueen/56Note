/**
 * @filename    search-in-rotated-sorted-array-ii.js
 * @author      56
 * @description https://leetcode-cn.com/problems/search-in-rotated-sorted-array-ii/
 */

/**
 * 1. 因为有序, 故考虑二分.
 * 2. 因为出现旋转. 故分隔符两边至少有一边是有序的
 * @param {number[]} nums
 * @param {number} target
 * @return {boolean}
 */
var search = function (nums, target) {
  const len = nums.length
  if (len === 0) return false
  if (len === 1) return nums[0] === target

  let l = 0
  let r = len - 1
  while (l < r) {
    const mid = Math.floor((l + r) / 2)
    if (target === nums[mid] || target === nums[l] || target === nums[r]) return true

    // 因为数组可以有重复, 故需要考虑比对是否重复. 确保mid两边至少一边有序
    if (nums[l] === nums[mid] && nums[mid] === nums[r]) {
      l++
      r--
      continue
    }

    if (nums[l] <= nums[mid]) {
      if (nums[l] < target && target < nums[mid]) r = mid - 1
      else l = mid + 1
    } else {
      if (nums[mid] < target && target < nums[r]) l = mid + 1
      else r = mid - 1
    }
  }
  return false
}

console.info(search([], 0))
console.info(search([0], 0))
console.info(search([1], 0))
console.info(search([2, 5, 6, 0, 0, 1, 2], 0))
