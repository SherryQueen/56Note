/**
 * @filename    minSubsequence.js
 * @author      56
 * @description https://leetcode.cn/problems/minimum-subsequence-in-non-increasing-order/
 */

/**
 *
 * @param {number[]} nums
 * @return {number[]}
 */
var minSubsequence = function (nums) {
  const sum = nums.reduce((p, c) => p + c, 0);
  const half = Math.floor(sum / 2);

  const arr = nums.sort((a, b) => b - a);
  let ans = 0;
  let i = 0;
  for (; ans <= half; i++) ans += arr[i];
  return arr.slice(0, i);
};
