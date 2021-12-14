/**
 * @filename    zai-pai-xu-shu-zu-zhong-cha-zhao-shu-zi-lcof.js
 * @author      56
 * @description https://leetcode-cn.com/problems/zai-pai-xu-shu-zu-zhong-cha-zhao-shu-zi-lcof/
 */
/**
 * 找寻左边界. 可通过二分优化查找过程
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var search = function (nums, target) {
  const len = nums.length
  let [l, r] = [0, len - 1]
  let count = 0
  while (l < r) {
    const mid = (l + r) >> 1
    if (nums[mid] < target) l = mid + 1
    else r = mid

    while (count++ > 10) break
  }
  let res = 0
  while (l < len && nums[l] === target) {
    res++
    l++
  }
  return res
}

console.info(search([5, 7, 7, 8, 8, 10], 6))
console.info(search([5, 7, 7, 8, 8, 10], 8))
