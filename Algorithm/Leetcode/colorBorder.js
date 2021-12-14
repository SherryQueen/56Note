/**
 * @filename    colorBorder.js
 * @author      56
 * @description https://leetcode-cn.com/problems/coloring-a-border/
 */

/*
根据题意, 我们需要根据给定的坐标值, 找到一个在矩阵中值与坐标值相等的连通区域.
通过DFS寻找到连通区域的边界.
判断方式 从[x,y] 的四周是否超出矩阵范围. 若在范围内,则当前坐标值是否等同初始坐标值. 若满足两个条件之一. 则为连通区域的边界
*/

/**
 * @param {number[][]} grid
 * @param {number} row
 * @param {number} col
 * @param {number} color
 * @return {number[][]}
 */
var colorBorder = function (grid, row, col, color) {
  const rows = grid.length
  if (!rows) return grid
  const cols = grid[0].length
  if (!cols) return grid

  const visited = [...Array(rows)].map(() => Array(cols).fill(0))
  visited[row][col] = 1
  const originalColor = grid[row][col]
  const directions = [
    [-1, 0] /* 左 */,
    [1, 0] /* 右*/,
    [0, -1] /* 上 */,
    [0, 1] /* 下 */,
  ]

  const borders = []

  const dfs = (x, y) => {
    let isBorder = false
    for (let i = 0; i < 4; i++) {
      const nx = x + directions[i][0]
      const ny = y + directions[i][1]
      if (!(nx >= 0 && nx < rows && ny >= 0 && ny < cols && grid[nx][ny] === originalColor)) isBorder = true
      else if (!visited[nx][ny]) {
        visited[nx][ny] = 1
        dfs(nx, ny)
      }
    }
    if (isBorder) borders.push([x, y])
  }
  dfs(row, col)
  borders.forEach(([x, y]) => (grid[x][y] = color))
  return grid
}
