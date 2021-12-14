/**
 * @filename    totalHammingDistance.js
 * @author      56
 * @description https://leetcode-cn.com/problems/total-hamming-distance/
 */
/**
 * @param {number[]} nums
 * @return {number}
 */
var totalHammingDistance = function (nums) {
  let count = 0
  const n = nums.length

  for (let i = 0; i < 30; i++) {
    let ans = 0
    for (let j = 0; j < n; j++) {
      ans += (nums[j] >> i) & 1
    }
    count += ans * (n - ans)
  }
  return count
}
