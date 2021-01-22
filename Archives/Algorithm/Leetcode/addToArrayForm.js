/**
 * @filename    addToArrayForm.js
 * @author      56
 * @description https://leetcode-cn.com/problems/add-to-array-form-of-integer/
 */

/**
 * @param {number[]} A
 * @param {number} K
 * @return {number[]}
 */
var addToArrayForm = function (A, K) {
  if (K === 0) return A
  const len = A.length
  let carry = K
  for (let i = len - 1; i >= 0; i--) {
    A[i] += carry
    carry = Math.floor(A[i] / 10)
    A[i] = A[i] % 10
  }
  while (carry) {
    A.unshift(carry % 10)
    carry = Math.floor(carry / 10)
  }
  return A
}

console.info(addToArrayForm([1, 2, 0, 0], 34))
console.info(addToArrayForm([1, 2, 0, 0], 34000))
