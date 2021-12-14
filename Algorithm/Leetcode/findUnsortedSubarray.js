/**
 * @filename    findUnsortedSubarray.js
 * @author      56
 * @description https://leetcode-cn.com/problems/shortest-unsorted-continuous-subarray/
 */

/**
 * 因为最终是需要将整个数组进行升序排列. 故我们有两种做法.
 * 1. 直接将原数组升序排列后, 与 旧数组做比较. 发生变动的地区即为我们所求的连续子数组 但不符合题目的O(n)复杂度
 * 2. 我们可以用双指针, 找寻未排序的区域. 即将数组分成 [左, 中, 右] 三段
 *    左段 与 右段 都将保持升序
 *    中段 部分中的任意元素 n 将会小于 右段的最小值. 大于 左端的最大值.
 * 3. 基于上述特性, 我们可以寻找到对应的左右边界.
 * -  如寻找右边界. 我们设定变量 max. 代表 在 [0, i]区间的最大值.
 *   - 如 nums[j] 大于 max. 则 j 处于可升序段. 此时我们更新最大值
 *   - 如 nums[j] 小于 max 则 [0, j] 不处于右段(因为右端中的任一元素 皆大于 左/中 段内的元素), 更新中段的右边界 r = j
 *   - 同理 中段左边界 则从右向左, 通过 min 变量来寻找
 * @param {number[]} nums
 * @return {number}
 */
var findUnsortedSubarray = function (nums) {
  const len = nums.length
  let [l, r] = [-1, -1] // -1 表示未寻找到对应的边界
  let [min, max] = [Number.MAX_SAFE_INTEGER, Number.MIN_SAFE_INTEGER]
  for (let i = 0; i < len; i++) {
    // 寻找右边界
    if (nums[i] < max) r = i
    else max = nums[i]

    // 寻找左边界
    if (nums[len - i - 1] > min) l = len - i - 1
    else min = nums[len - i - 1]
  }

  return l === -1 || r === -1 ? 0 : r - l + 1
}

console.info(findUnsortedSubarray([2, 6, 4, 8, 10, 9, 15]))
console.info(findUnsortedSubarray([1, 2, 3, 4]))
console.info(findUnsortedSubarray([1]))
console.info(findUnsortedSubarray([2, 1]))
console.info(findUnsortedSubarray([4, 3, 2, 1]))
