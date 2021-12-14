/**
 * @filename    maximalRectangle.js
 * @author      56
 * @description https://leetcode-cn.com/problems/maximal-rectangle/
 */

/**
 * 参考题解:
 *  1. arr[i][j] 表示 该坐标 该行的左边连续1的数量
 *  2. 以arr[i][j] 为矩形的右下角节点, 遍历计算最大值
 * @param {character[][]} matrix
 * @return {number}
 */
var maximalRectangle = function (matrix) {
  const rows = matrix.length
  if (!rows) return 0
  const cols = matrix[0].length
  if (!cols) return 0

  // * 计算左边连续为1的数量
  const arr = []
  for (let i = 0; i < rows; i++) {
    arr[i] = [matrix[i][0] === '0' ? 0 : 1]
    for (let j = 1; j < cols; j++) {
      arr[i][j] = matrix[i][j] === '0' ? 0 : arr[i][j - 1] + 1
    }
  }

  // * 计算最大面积值
  let area = 0
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      let width = arr[i][j]
      area = Math.max(area, width)

      for (let k = i - 1; k >= 0; k--) {
        if (arr[k][j] === 0) break
        width = Math.min(width, arr[k][j])
        area = Math.max(area, width * (i - k + 1))
      }
    }
  }
  return area
}

test('maximalRectangle', () => {
  expect(maximalRectangle([])).toBe(0)
  expect(maximalRectangle([['0']])).toBe(0)
  expect(maximalRectangle([['1']])).toBe(1)
  expect(maximalRectangle([['0', '0']])).toBe(0)
  expect(
    maximalRectangle([
      ['1', '0', '1', '0', '0'],
      ['1', '0', '1', '1', '1'],
      ['1', '1', '1', '1', '1'],
      ['1', '0', '0', '1', '0'],
    ]),
  ).toBe(6)
})
