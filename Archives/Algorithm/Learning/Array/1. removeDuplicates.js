/**
 * @filename    1. removeDuplicates.js
 * @author      56
 * @description https://leetcode-cn.com/problems/remove-duplicates-from-sorted-array/
 */

/**
 * 1. 有序数组, 即可考虑双指针来表示重复数的范围
 * 2. 要去除重复项, 可通过将快指针指向的值赋值给慢指针指向的值(需要提前+1), 从而实现中间重复数的去除
 * @param {number[]} nums
 * @return {number}
 */
var removeDuplicates = function (nums) {
  const len = nums.length
  let prev = 0
  for (let i = 1; i < len; i++) {
    if (nums[prev] !== nums[i]) nums[++prev] = nums[i]
  }
  return prev + 1
}
