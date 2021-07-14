/**
 * @filename    minAbsoluteSumDiff.js
 * @author      56
 * @description https://leetcode-cn.com/problems/minimum-absolute-sum-difference/
 */

/**
 * 解法: nums1 nums2 在 i 位时, 计算 Math.abs(nums[i] - nums2[i]) 与 移动位后 Math.abs(x - nums2[i])的最小值, 即为目标的差值 原来的总和减去差值即为答案
 * 查找过程 可通过二分查找 来 优化查询过程 
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
var minAbsoluteSumDiff = function (nums1, nums2) {
  const array = [...nums1].sort((a, b) => a - b)
  let max = 0
  let sum = 0
  for (let i = 0, len = nums1.length; i < len; i++) {
    const ans = Math.abs(nums1[i] - nums2[i])
    sum += ans
    const k = binarySearch(array, nums2[i])
    if (k < ans) max = Math.max(max, ans - k)
  }
  return (sum - max) % 1000000007
}

const binarySearch = (array, target) => {
  let [l, r] = [0, array.length - 1]
  let [lv, rv] = [array[0], array[r]]
  if (array[r] < target) return Math.abs(array[r] - target)
  while (l < r) {
    const mid = (l + r) >> 1
    if (array[mid] === target) return 0
    else if (array[mid] < target) {
      l = mid + 1
      lv = array[mid]
    } else {
      r = mid
      rv = array[mid]
    }
  }
  return Math.min(Math.abs(lv - target), Math.abs(rv - target))
}

console.info(
  minAbsoluteSumDiff(
    [
      81, 59, 66, 42, 90, 53, 2, 100, 48, 61, 31, 88, 24, 15, 57, 33, 54, 98, 15, 38, 93, 63, 85, 76, 39, 48, 84, 66,
      13, 90, 80, 20, 21, 35, 39, 45, 43, 77, 32, 85, 59, 17, 69, 16, 66, 37, 5, 4, 89, 87, 26, 39, 97, 35, 52, 39, 69,
      92, 76, 8, 67, 56, 26, 82, 95, 48, 71, 60, 98, 93, 96, 14, 13, 46, 70, 51, 55, 91, 51, 76, 31, 67, 43, 12, 83, 23,
      57, 54, 30, 65, 58, 18, 95, 7, 57, 16, 12, 41, 86, 3,
    ],
    [
      73, 2, 7, 44, 82, 86, 24, 7, 54, 74, 91, 77, 75, 25, 77, 19, 16, 15, 73, 23, 80, 43, 83, 10, 39, 39, 68, 84, 5,
      71, 64, 76, 35, 42, 7, 45, 55, 47, 20, 14, 24, 73, 61, 71, 76, 72, 93, 53, 53, 26, 5, 42, 36, 7, 28, 43, 65, 34,
      19, 72, 65, 97, 1, 91, 58, 1, 39, 18, 78, 11, 14, 88, 12, 96, 36, 28, 74, 62, 27, 2, 62, 85, 94, 48, 66, 7, 90,
      79, 47, 88, 54, 79, 37, 39, 63, 34, 46, 83, 65, 10,
    ],
  ),
)
