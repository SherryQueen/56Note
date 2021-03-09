/**
 * @filename    arrayPairSum.js
 * @author      56
 * @description https://leetcode-cn.com/problems/array-partition-i/
 */

/**
 * 1. 根据题意, 我们可知要让结果尽可能的大. 那么就是将小的数与小的数放一起, 大的数与大的数放一起
 * 2. 故先排序, 从小到大 按2位分组 即可得结果
 * @param {number[]} nums
 * @return {number}
 */
var arrayPairSum = function (nums) {
  nums = nums.sort((a, b) => a - b)
  let res = 0
  for (let i = 0, len = nums.length; i < len; i += 2) res += nums[i]
  return res
}
