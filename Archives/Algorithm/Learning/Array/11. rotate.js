/**
 * @filename    11. rotate.js
 * @author      56
 * @description https://leetcode-cn.com/problems/rotate-image/
 */

/**
 * 1. 顺时针旋转90度: 即  matrix[i][j] --> matrix[j][n-1-i]、
 * 2. 水平翻转   matrix[i][j] = matrix[n-1-i][j]
 * 3. 对角线翻转 matrix[i][j] = matrix[j][i]
 * 4. 故 先水平后对角线 两次翻转 matrix[i][j] => matrix[j][n-1-i]
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 */
var rotate = function (matrix) {
  const n = matrix.length
  if (n === 1) return matrix

  // 水平
  for (let i = 0, end = Math.ceil(n / 2); i < end; i++) {
    for (let j = 0; j < n; j++) {
      ;[matrix[i][j], matrix[n - 1 - i][j]] = [matrix[n - 1 - i][j], matrix[i][j]]
    }
  }

  // 对角线
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      ;[matrix[i][j], matrix[j][i]] = [matrix[j][i], matrix[i][j]]
    }
  }
  return matrix
}
