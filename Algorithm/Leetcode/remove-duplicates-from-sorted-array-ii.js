/**
 * @filename    remove-duplicates-from-sorted-array-ii.js
 * @author      56
 * @description https://leetcode-cn.com/problems/remove-duplicates-from-sorted-array-ii/
 */

/**
 * 1. 数组已有序. 单个数字最多出现二次. 故通过一个变量记录当前数字出现次数. 若出现二次以上, 则覆盖前面的空闲值.
 * 2. @notice 快慢指针
 * @param {number[]} nums
 * @return {number}
 */
var removeDuplicates = function (nums) {
  if (nums.length < 2) return nums

  let l = 2
  let f = 2
  while (f < nums.length) {
    if (nums[f] !== nums[l - 2]) {
      nums[l] = nums[f]
      l++
    }
    f++
  }
  return l
}
