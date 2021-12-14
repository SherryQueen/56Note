/**
 * @filename    wiggleMaxLength.js
 * @author      56
 * @description https://leetcode-cn.com/problems/wiggle-subsequence/
 */

/**
 * @param {number[]} nums
 * @return {number}
 */
const wiggleMaxLength = function (nums) {
  const len = nums.length
  if (len < 2) return len

  // [1,1,1, ...] 这种情况
  let i = 1
  while (i < len && nums[i] === nums[i - 1]) i++
  if (i === len) return 1

  // 计算起始的差值和最大个数
  let max = 2
  let diff = nums[i - 1] < nums[i]
  let last = i // 记录上一位比较的下标。 避免 [1,2,2] 判断错误的情形
  while (++i < len) {
    if (nums[i] === nums[last]) continue
    if ((nums[last] < nums[i]) ^ diff) {
      diff = !diff
      max++
    }
    last = i // [6, 5, 3, 4] 和 [1, 2, 5, 3] 需要更新last下标 避免出现前述两种情况
  }
  return max
}

console.info(wiggleMaxLength([]))
console.info(wiggleMaxLength([1]))
console.info(wiggleMaxLength([1, 1]))
console.info(wiggleMaxLength([1, 1, 1, 1, 1]))
console.info(wiggleMaxLength([1, 1, 2, 1, 1]))
console.info(wiggleMaxLength([1, 7, 4, 9, 2, 5]))
console.info(wiggleMaxLength([1, 17, 5, 10, 13, 15, 10, 5, 16, 8]))
console.info(wiggleMaxLength([1, 2, 3, 4, 5, 6, 7, 8, 9]))
console.info(wiggleMaxLength([1, 1, 2, 2, 2, 3, 3]))
console.info(wiggleMaxLength([1, 3, 5, 4]))
