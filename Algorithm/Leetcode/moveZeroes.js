/**
 * @filename    moveZeroes.js
 * @author      56
 * @description https://leetcode-cn.com/problems/move-zeroes/
 */

/**
 * 双指针: i指针遍历 zero表示非0的个数，一开始用于表示非0元素的左移位置 遍历完成后表示需补0的位置
 * @param {number[]} nums
 */
const moveZeroes = function (nums) {
  const len = nums.length
  let zero = 0
  for (let i = 0; i < len; i++) {
    if (nums[i] === 0) continue
    else nums[zero++] = nums[i]
  }
  while (zero < len) nums[zero++] = 0
  return nums
}

console.info(moveZeroes([0, 1, 0, 3, 12]))
