/**
 * @filename    isToeplitzMatrix.js
 * @author      56
 * @description https://leetcode-cn.com/problems/toeplitz-matrix/
 */

/**
 * 1. 根据题意, 我们可知  第二行应该是第一行右移一位的结果.(去除第一行的队尾 和 第二行的队头)
 * @param {number[][]} matrix
 * @return {boolean}
 */
var isToeplitzMatrix = function (matrix) {
  const rows = matrix.length
  const cols = matrix[0].length
  if (rows === 1 || cols === 1) return true

  let arr = matrix[0]
  for (let i = 1; i < rows; i++) {
    const array = matrix[i]
    for (let j = 0, len = cols - 1; j < len; j++) {
      if (arr[j] !== array[j + 1]) return false
    }
    arr = array
  }
  return true
}

console.info(
  isToeplitzMatrix([
    [1, 2],
    [2, 2],
  ])
)
