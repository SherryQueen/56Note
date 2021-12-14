/**
 * @filename    searchMatrix.js
 * @author      56
 * @description https://leetcode-cn.com/problems/search-a-2d-matrix-ii/
 */

/*
根据题意. 矩阵每一行(列)符合递增. 即, 如果每一行(列)的最后一项小于目标值, 即, 当前行(列)不存在目标值
我们从 矩阵的右上角[0, cols-1]开始搜索
如果 matrix[x][y] === target 则找到目标值
如果 matrix[x][y]  <  target 因为x行是递增的(且从右上角开始,当前x为当前行最大值)则当前x行的元素都小于target. 则 x + 1
如果 matrix[x][y]  >  target 因为y列是递增的(且从右上角开始,当前y为当前列最小值)则当前y列的元素都大于target. 则 y - 1
*/

/**
 * @param {number[][]} matrix
 * @param {number} target
 * @return {boolean}
 */
var searchMatrix = function (matrix, target) {
  const rows = matrix.length // 行数
  if (rows === 0) return false
  const cols = matrix[0].length // 列数
  if (cols === 0) return false

  let [x, y] = [0, cols - 1]
  while (x < rows && y >= 0) {
    if (matrix[x][y] === target) return true
    matrix[x][y] < target ? (x += 1) : (y -= 1)
  }
  return false
}
