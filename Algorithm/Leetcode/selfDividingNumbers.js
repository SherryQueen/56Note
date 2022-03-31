/**
 * @filename    selfDividingNumbers.js
 * @author      56
 * @description https://leetcode-cn.com/problems/self-dividing-numbers/
 */

/**
 * @param {number} left
 * @param {number} right
 * @return {number[]}
 */
var selfDividingNumbers = function (left, right) {
  const isTarget = (num) => {
    let ans = num
    while (ans > 0) {
      const digit = ans % 10
      if (digit === 0 || num % digit !== 0) return false
      ans = Math.floor(ans / 10)
    }
    return true
  }

  const result = []
  for (let i = left; i <= right; i++) {
    if (isTarget(i)) result.push(i)
  }

  return result
}
