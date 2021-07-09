/**
 * @filename    majorityElement.js
 * @author      56
 * @description https://leetcode-cn.com/problems/find-majority-element-lcci/
 */

/**
 * 1. 投票算法. 两两抵消之后, 剩余的即为众数
 * @param {number[]} nums
 * @return {number}
 */
var majorityElement = function (nums) {
  let candidate = 0
  let count = 0
  for (const num of nums) {
    if (count === 0) {
      candidate = num
      count = 1
    } else if (num === candidate) count++
    else count--
  }

  count = 0
  nums.forEach((n) => {
    if (n === candidate) count++
  })
  return count * 2 > nums.length ? candidate : -1
  // const map = new Map()
  // const len = nums.length
  // const half = Math.floor(len / 2) + 1
  // for (let i = 0; i < len; i++) {
  //   const n = nums[i]
  //   const count = (map.get(n) || 0) + 1
  //   if (count >= half) return n
  //   map.set(n, count)
  // }
  // return -1
}

majorityElement([3, 3, 4])
