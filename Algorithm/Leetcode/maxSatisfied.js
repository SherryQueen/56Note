/**
 * @filename    maxSatisfied.js
 * @author      56
 * @description https://leetcode-cn.com/problems/grumpy-bookstore-owner/
 */

/**
 * 1. 抽象成滑动窗口
 * 2. 我们可知窗口大小 X. 移动窗口, 找到不满意最大的窗口不生气
 * 3. 我们计算两个纬度, 一是正常的 不生气时的满意度之和.  一是 滑动窗口滑动过程中,不满意导致的损失的满意度最大值.  预期的最大值 即二者相加即可
 * @param {number[]} customers
 * @param {number[]} grumpy
 * @param {number} X
 * @return {number}
 */
var maxSatisfied = function (customers, grumpy, X) {
  let all = 0
  let current = 0
  let max = 0

  let i = 0
  const len = customers.length
  for (; i < X && i < len; i++) {
    grumpy[i] ? (current += customers[i]) : (all += customers[i])
  }
  max = current

  for (; i < len; i++) {
    if (!grumpy[i]) all += customers[i]
    else current += customers[i]
    if (grumpy[i - X]) current -= customers[i - X]
    if (current > max) max = current
  }
  return all + max
}

console.info(maxSatisfied([1, 0, 1, 2, 1, 1, 7, 5], [0, 1, 0, 1, 0, 1, 0, 1], 3))
