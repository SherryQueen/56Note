/**
 * @filename    NumArray.js
 * @author      56
 * @description https://leetcode-cn.com/problems/range-sum-query-immutable/
 */
/**
 * @param {number[]} nums
 */
var NumArray = function (nums) {
  this.nums = nums
  const sums = [0]
  this.sums = sums
  for (let i = 1, len = nums.length + 1; i < len; i++) {
    sums[i] = sums[i - 1] + nums[i - 1]
  }
}

/**
 * 1. 看了题解. 用前缀和来优化
 * @param {number} i
 * @param {number} j
 * @return {number}
 */
NumArray.prototype.sumRange = function (i, j) {
  return this.sums[j + 1] - this.sums[i]
  // const nums = this.nums
  // if (!Array.isArray(nums)) return 0
  // const len = this.nums.length
  // if (len === 0 || i > len) return 0
  // let sum = 0
  // for (let k = i; k <= j && k < len; k++) sum += nums[k]
  // return sum
}

/**
 * Your NumArray object will be instantiated and called as such:
 * var obj = new NumArray(nums)
 * var param_1 = obj.sumRange(i,j)
 */
console.info(new NumArray([1, 2, 3, 4]).sumRange(1, 2))
