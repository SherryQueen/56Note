/**
 * @filename    findMin.js
 * @author      56
 * @description https://leetcode-cn.com/problems/find-minimum-in-rotated-sorted-array/
 */

/**
 * 1. 旋转完成后, 数组会根据 mid 形成两边各自升序的情况. 故直接使用二分查找
 * 2. min 的右部 小于 min 的左部.
 * 2.1. 当 mid < r  mid在右部中, 则min 存在于左部之中
 * 2.2. 当 mid > r  mid在左部中, 则min 存在于右部之中
 * @param {number[]} nums
 * @return {number}
 */
var findMin = function (nums) {
  const len = nums.length
  if (len === 1) return nums[0]

  let l = 0
  let r = len - 1
  while (l < r) {
    const mid = (r + l) >> 1
    if (nums[mid] < nums[r]) r = mid
    else l = mid + 1
  }
  return nums[l]
}
console.info(findMin([4, 5, 6, 1, 2, 3]))
