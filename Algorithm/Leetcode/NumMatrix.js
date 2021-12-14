/**
 * @filename    NumMatrix.js
 * @author      56
 * @description https://leetcode-cn.com/problems/range-sum-query-2d-immutable/
 */

/**
 * 1. 与昨日题目一致. 考虑前缀和减少计算次数.
 * 2. 即矩阵生成时, 对每一坐标位计算其 [0,0,x,y]的子矩阵和.
 * @param {number[][]} matrix
 */
var NumMatrix = function (matrix) {
  const rows = matrix.length
  if (rows === 0) {
    this.cache = []
    return
  }
  const cols = matrix[0].length
  const cache = [...Array(rows + 1)].map(() => [...Array(cols + 1)].fill(0))
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      cache[i + 1][j + 1] = matrix[i][j] + cache[i + 1][j] + cache[i][j + 1] - cache[i][j]
    }
  }
  this.cache = cache
}

/**
 * @param {number} row1
 * @param {number} col1
 * @param {number} row2
 * @param {number} col2
 * @return {number}
 */
NumMatrix.prototype.sumRegion = function (row1, col1, row2, col2) {
  return (
    this.cache[row2 + 1][col2 + 1] - this.cache[row1][col2 + 1] - this.cache[row2 + 1][col1] + this.cache[row1][col1]
  )
}

/**
 * Your NumMatrix object will be instantiated and called as such:
 * var obj = new NumMatrix(matrix)
 * var param_1 = obj.sumRegion(row1,col1,row2,col2)
 */
