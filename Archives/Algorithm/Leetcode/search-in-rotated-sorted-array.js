/**
 * @filename    search-in-rotated-sorted-array.js
 * @author      56
 * @description https://leetcode-cn.com/problems/search-in-rotated-sorted-array/
 */

/**
 * 1. 因为在数组中的某一点旋转. 故数组必然呈现两个单调区间 若旋转点为 k 则 l~k 单调递增 k+1~r 单调递增 且 k+1~r < l~k
 * 2. 根据1, 对于数组中的任一点 mid 数组在l -> mid mid -> r 两个区间至少存在一个单调区间
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var search = function (nums, target) {
  const len = nums.length
  let l = 0
  let r = len - 1

  while (l <= r) {
    if (nums[l] === target) return l
    if (nums[r] === target) return r
    const mid = Math.floor((l + r) / 2)
    if (nums[mid] === target) return mid

    // l -> mid 单调递增
    if (nums[l] < nums[mid]) {
      if (nums[l] < target && target < nums[mid]) {
        l++
        r = mid - 1
      } else {
        l = mid + 1
        r--
      }
    }
    // mid -> r 单调递增
    else {
      if (nums[mid] < target && target < nums[r]) {
        l = mid + 1
        r--
      } else {
        l++
        r = mid - 1
      }
    }
  }

  return -1
}

console.info(search([1], 1))
// console.info(search([4, 5, 6, 7, 8, 1, 2, 3], 8))
