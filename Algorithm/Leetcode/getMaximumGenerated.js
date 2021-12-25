/**
 * @filename    getMaximumGenerated.js
 * @author      56
 * @description https://leetcode-cn.com/problems/get-maximum-in-generated-array/
 */

/*
根据题意生成对应的数, 并返回其中的最大值即可
需要注意下当 n为0时的情况.
可以通过位运算来加速一下
*/

/**
 * @param {number} n
 * @return {number}
 */
var getMaximumGenerated = function (n) {
  if (n === 0) return 0
  if (n === 1) return 1
  const nums = [0, 1]
  for (let i = 2; i <= n; i++) {
    if (i & 1) {
      const idx = i >> 1
      nums[i] = nums[idx] + nums[idx + 1]
    } else nums[i] = nums[i / 2]
  }
  return Math.max(...nums)
}
