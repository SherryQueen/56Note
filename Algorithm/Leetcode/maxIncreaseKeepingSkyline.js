/**
 * @filename    maxIncreaseKeepingSkyline.js
 * @author      56
 * @description https://leetcode-cn.com/problems/max-increase-to-keep-city-skyline/
 */

/*
根据题意, 确保4个方向的最高点保持不变即可
抽象而来. 确保每行的最大值依然是原最大值. 每列的最大值依然是原最大值.
我们要做的就是找到原行/列的最值. 并且将[i][j]的值变为Min(i行的最值, j列的最值)
*/

/**
 * @param {number[][]} grid
 * @return {number}
 */
var maxIncreaseKeepingSkyline = function (grid) {
  const rows = grid.length
  const cols = grid[0].length
  const rowsMax = Array(rows).fill(0)
  const colsMax = Array(cols).fill(0)

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      rowsMax[i] = Math.max(rowsMax[i], grid[i][j])
      colsMax[j] = Math.max(colsMax[j], grid[i][j])
    }
  }

  let ans = 0
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      ans += Math.min(rowsMax[i], colsMax[j]) - grid[i][j]
    }
  }
  return ans
}
