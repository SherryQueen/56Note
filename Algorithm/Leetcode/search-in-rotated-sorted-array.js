/**
 * @filename    search-in-rotated-sorted-array.js
 * @author      56
 * @description https://leetcode-cn.com/problems/search-in-rotated-sorted-array/
 */

/**
 * 1. 根据题意. 我们可知. 对于任一节点 k. 在[0, k) 和 (k, len) 两个区间必有一个递增.
 * 2. 当 其中一个区间处于非递增时, 如:
 *    [0, k)非递增, 则有 nums[k] < nums[0] && nums[k] < nums[len] 且在 (k, len) 递增
 *    当 target > nums[len-1] 时, 则 target 存在于 [0,k)
 *    当 target > nums[k] 且 target < nums[len-1] 则 target 存在于 (k, len)
 *    当 target < nums[k] 且 target < nums[len-1] 则 target 存在于 [0, k)
 * 3. 基于2 我们可以采用二分对整个数组进行搜索, 直到查找到结果
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var search = function (nums, target) {
  if (nums.length === 1) return nums[0] === target ? 0 : -1
  let l = 0
  let r = nums.length - 1
  while (l < r) {
    const mid = (l + r) >> 1
    if (target === nums[l]) return l
    if (target === nums[r]) return r
    if (target === nums[mid]) return mid
    // l -> mid 非递增 mid -> r 递增
    if (nums[l] > nums[mid]) {
      if (target > nums[r]) r = mid - 1
      else if (target > nums[mid]) l = mid + 1
      else r = mid - 1
    } else {
      // l -> mid 递增
      if (target > nums[mid]) l = mid + 1
      else if (target > nums[l]) r = mid - 1
      else l = mid + 1
    }
  }
  return -1
}
console.info(search([1], 1))
console.info(search([1], 0))
console.info(search([4, 5, 6, 7, 0, 1, 2], 0))
console.info(search([4, 5, 6, 7, 0, 1, 2], 3))
console.info(search([4, 5, 6, 7, 0, 1, 2], 5))
console.info(search([4, 5, 6, 7, 0, 1, 2], 8))
