/**
 * @filename    5. singleNumber.js
 * @author      56
 * @description https://leetcode-cn.com/problems/single-number/
 */
/**
 * 1. 第一想法 哈希. 但题目要求不用额外空间
 * 2. 因为每个重复的元素只出现两次, 故可以考虑异或  a^a = 0,  a^a^b = b
 * @param {number[]} nums
 * @return {number}
 */
var singleNumber = function (nums) {
  return nums.reduce((p, c) => p ^ c, 0)
}
