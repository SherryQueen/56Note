/**
 * @filename    longestOnes.js
 * @author      56
 * @description https://leetcode-cn.com/problems/max-consecutive-ones-iii/
 */

/**
 * 1. 滑动窗口. 若右指针遇到0. 则按照 是否可以继续转换/是否可以通过增大左指针得到一个可转换名额 来保证窗口持续向右遍历
 * @param {number[]} A
 * @param {number} K
 * @return {number}
 */
var longestOnes = function (A, K) {
  let [l, r, len] = [0, 0, A.length]
  let max = 0
  let transform = 0

  while (r < len) {
    if (A[r] === 0) {
      if (transform < K) transform++
      else {
        if (r - l > max) max = r - l
        if (transform === 0) l = r + 1
        else {
          while (A[l] === 1) l++
          l++
        }
      }
    }
    r++
  }
  if (r - l > max) max = r - l
  return max
}

console.info(longestOnes([0, 0, 0], 0))
console.info(longestOnes([0, 0, 0], 1))
console.info(longestOnes([0, 0, 1], 1))
console.info(longestOnes([1, 0, 0], 1))
console.info(longestOnes([1, 0, 1], 1))
