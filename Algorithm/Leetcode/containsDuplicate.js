/**
 * @filename    containsDuplicate.js
 * @author      56
 * @description https://leetcode-cn.com/problems/contains-duplicate/
 */

/**
 * @param {number[]} nums
 * @return {boolean}
 */
var containsDuplicate = function (nums) {
  const map = {};
  for (let i = 0, len = nums.length; i < len; i++) {
    const n = nums[i];
    if (map[n]) return true;
    map[n] = true;
  }
  return false;
};
