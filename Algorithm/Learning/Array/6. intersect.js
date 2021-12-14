/**
 * @filename    6. intersect.js
 * @author      56
 * @description https://leetcode-cn.com/problems/intersection-of-two-arrays-ii/
 */
/**
 * 1. 将其中一个数组以哈希形式记录每个元素的出现个数.
 * 2. 遍历第二个数组, 根据哈希中的出现个数来找出并集的结果
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 */
var intersect = function (nums1, nums2) {
  const len1 = nums1.length
  const len2 = nums2.length
  if (!len1 || !len2) return []

  const result = []
  const map = new Map()
  for (let i = 0; i < len1; i++) {
    const n = nums1[i]
    map.set(n, (map.get(n) || 0) + 1)
  }
  for (let i = 0; i < len2; i++) {
    const n = nums2[i]
    if (!map.get(n)) continue
    map.set(n, map.get(n) - 1)
    result.push(n)
  }
  return result
}

/**
 * 1. 若有序, 可以考虑双指针.
 * 2. 因为是单调递增, 故双指针分别从小到大指向两个数组. 若值相等,则加入交集
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 */
var intersect = function (nums1, nums2) {
  const len1 = nums1.length
  const len2 = nums2.length
  if (!len1 || !len2) return []

  nums1 = nums1.sort((a, b) => a - b)
  nums2 = nums2.sort((a, b) => a - b)

  const result = []
  let i = 0
  let j = 0

  while (i < len1 && j < len2) {
    if (nums1[i] === nums2[j]) {
      result.push(nums1[i])
      i++
      j++
    } else if (nums1[i] > nums2[j]) j++
    else i++
  }
  return result
}
