/**
 * @filename    findErrorNums.js
 * @author      56
 * @description https://leetcode-cn.com/problems/set-mismatch/
 */

/**
 * @param {number[]} nums
 * @return {number[]}
 */
var findErrorNums = function (nums) {
  const array = Array(nums.length).fill(0)
  nums.forEach((n) => {
    array[n - 1]++
  })
  let mis = -1
  let duplicate = -1
  for (let i = 0, len = array.length; i < len; i++) {
    if (array[i] === 0) {
      mis = i + 1
    }
    if (array[i] === 2) {
      duplicate = i + 1
    }
    if (mis !== -1 && duplicate !== -1) return [duplicate, mis]
  }
  return [duplicate, mis]
}
