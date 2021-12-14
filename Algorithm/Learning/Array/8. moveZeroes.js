/**
 * @filename    8. moveZeroes.js
 * @author      56
 * @description https://leetcode-cn.com/problems/move-zeroes/
 */

/**
 * 1. 因为要求0 移动到最后末尾. 故考虑交换0到末尾
 * 2. 因为要求其他元素顺序不变, 且0 是在末尾. 所以可以参照插入排序
 * 3. 用j标记非0数字应该前移到的位置. 当数组遍历完成后, 若遍历的数组中含0 则 j < i . 则我们将剩下的 len-j 位按0填充即可
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var moveZeroes = function (nums) {
  const len = nums.length
  if (!len) return

  let j = 0
  for (let i = 0; i < len; i++) {
    if (nums[i] !== 0) {
      nums[j] = nums[i]
      j++
    }
  }
  for (; j < len; j++) nums[j] = 0
}
