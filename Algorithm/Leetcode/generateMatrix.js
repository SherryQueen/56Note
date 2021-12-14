/**
 * @filename    generateMatrix.js
 * @author      56
 * @description https://leetcode-cn.com/problems/spiral-matrix-ii/
 */

/**
 * @param {number} n
 * @return {number[][]}
 */
var generateMatrix = function (n) {
  const target = n * n
  let i = 0
  const res = [...Array(n)].map(() => [...Array(n)].fill(0))
  const directions = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0],
  ]
  let x = 0
  let y = 0
  let d = 0
  while (i++ < target) {
    res[x][y] = i
    nx = x + directions[d][0]
    ny = y + directions[d][1]
    if (nx === n || nx < 0 || ny === n || ny < 0 || res[nx][ny]) {
      d = (d + 1) % 4
    }
    x += directions[d][0]
    y += directions[d][1]
    console.info(x, y, d, directions[d])
  }
  return res
}

console.info(generateMatrix(2))
