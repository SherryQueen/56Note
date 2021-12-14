/**
 * @filename    removeElement.js
 * @author      56
 * @description https://leetcode-cn.com/problems/remove-element
 */

/**
 * @param {number[]} nums
 * @param {number} val
 * @return {number}
 */
var removeElement = function (nums, val) {
  const len = nums.length
  let i = 0
  let j = 0
  while (j < len) {
    if (nums[j] === val) j++
    else nums[i++] = nums[j++]
  }
  return i
}
