/**
 * @filename    minMoves.js
 * @author      56
 * @description https://leetcode-cn.com/problems/minimum-moves-to-equal-array-elements/
 */

// 根据题意: 每次变化使得n-1个元素+1. 可以换算为1个元素-1
// 故我们可以将题目转变为. 求所有元素变为当前最小元素的值需要几步(一次只能将一个元素-1)

/**
 * @param {number[]} nums
 * @return {number}
 */
var minMoves = function (nums) {
  const min = Math.min(...nums)
  return nums.reduce((c, p) => c + (p - min), 0)
}
