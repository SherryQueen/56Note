/**
 * @filename    nextGreaterElement.js
 * @author      56
 * @description https://leetcode-cn.com/problems/next-greater-element-i/
 */

/*
一开始想的是直接暴力搜索. 两次循环即可搞定
后来看道题解可以用栈来优化, 总结下优化的思路.
题目要要求找到nums1[i] 在 nums2[x] (i<x)中的大于nums[i]的元素
我们可以对nums2 从右往左搜索. 构成一个单调栈. 来记录每个对应下标下对应的最大元素是多少
notice: nums1 中的所有整数同样出现在 nums2 中 所以我们可以用nums2的值作为key. 用来记录nums1对应元素的结果值
 */

/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 */
var nextGreaterElement = function (nums1, nums2) {
  const map = new Map()
  const stack = []
  for (let i = nums2.length - 1; i >= 0; i--) {
    const n = nums2[i]
    while (stack.length && n > stack[stack.length - 1]) /* 如果当前栈内数据小于n. 则弹出 */ stack.pop()
    map.set(n, stack.length ? stack[stack.length - 1] : -1) /* 如果栈为空, 则说明右侧没有比n大的数 */
    stack.push(n)
  }
  return nums1.map((n) => map.get(n))
}
