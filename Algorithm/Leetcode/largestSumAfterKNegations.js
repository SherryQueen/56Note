/**
 * @filename    largestSumAfterKNegations.js
 * @author      56
 * @description https://leetcode-cn.com/problems/maximize-sum-of-array-after-k-negations/
 */

/*
因为最终是求最大化的和. 那么即优先将负数变为正数. 若都为非负数了, 则取最小值一直反转即可
故我么可以先排序, 然后按上述规则进行取反
注意: -1 2 这种情况. 因一直反转 -1 所在的下标. 而非接着反转2
*/

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var largestSumAfterKNegations = function (nums, k) {
  nums = nums.sort((a, b) => a - b)
  let idx = 0 // 待反转的下标
  let remain = k

  // 反转负数
  for (let i = 0, len = nums.length; i < len && remain && nums[i] < 0; i++) {
    remain--
    idx = i
    nums[i] = -nums[i]
  }

  // 反转0或正数
  if (remain) {
    idx = nums[idx + 1] === undefined ? idx : nums[idx] > nums[idx + 1] ? idx + 1 : idx
    if (remain % 2) nums[idx] = -nums[idx] // 如果剩余次数为奇数, 则取反
  }

  return nums.reduce((p, c) => p + c, 0)
}
