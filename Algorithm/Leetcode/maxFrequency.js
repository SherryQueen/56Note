/**
 * @filename    maxFrequency.js
 * @author      56
 * @description https://leetcode-cn.com/problems/frequency-of-the-most-frequent-element/
 */

/**
 * 需要k次操作后变成 一个长度为len,且值相等的 [l,r] 区间
 * 为了更少的次数变动更多的数为目标值, 需要优先变动接近目标值的数.即 nums[i]<nums[j]<target 则我们先变动 nums[j] 为target 再考虑 nums[i]
 * 因为频次最高的数不一定是最大的值. 故我们可以考虑滑动窗口模式进行遍历. 通过前缀和判断操作次数是否超过k
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var maxFrequency = function (nums, k) {
  nums = nums.sort((a, b) => a - b)
  const length = nums.length
  let [ans, max, l] = [0, 1, 0]
  for (let r = 1; r < length; r++) {
    ans += (nums[r] - nums[r - 1]) * (r - l)
    while (ans > k) {
      ans -= nums[r] - nums[l]
      l++
    }
    max = Math.max(max, r - l + 1)
  }
  return max
}
