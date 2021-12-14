/**
 * @filename    maximumProduct.js
 * @author      56
 * @description https://leetcode-cn.com/problems/maximum-product-of-three-numbers/
 */

/**
 * @param {number[]} nums
 * @return {number}
 */
var maximumProduct = function (nums) {
  const arr = nums.sort((a, b) => a - b)
  let i = 0
  let j = arr.length - 1
  // [1,2,3,4]   [-4,-3,-2,-1]
  if (arr[i] >= 0 || arr[j] <= 0) return nums[j] * nums[j - 1] * nums[j - 2]
  return arr[j] * Math.max(arr[j - 1] * arr[j - 2], arr[i] * arr[i + 1])
}

console.info(maximumProduct([-10, -9, 0, 5, 8, 10]))
