/**
 * @filename    peakIndexInMountainArray.js
 * @author      56
 * @description https://leetcode-cn.com/problems/B1IidL/
 */

/*
题目给定的arr一定是个arr数组. 则一定存在唯一下标 i 符合 arr[i] 为数组最大.
故我们可以直接循环枚举, 找到第一个 i 满足 arr[i] > arr[i-1] && arr[i] > arr[i+1] 即可
或者通过二分查找来加速这个查找过程.
 */

/**
 * @param {number[]} arr
 * @return {number}
 */
var peakIndexInMountainArray = function (arr) {
  let l = 1
  let r = arr.length - 2
  while (l < r) {
    const mid = Math.floor((l + r) / 2)
    /* 是目标值 */ if (arr[mid] > arr[mid - 1] && arr[mid] > arr[mid + 1]) return mid
    /* l -> mid+1 为递增, 目标 >= mid */ else if (arr[mid] > arr[mid - 1]) l = mid + 1
    /* mid-1 -> r 为递减 目标 <= mid */ else r = mid - 1
  }
  return l
}
