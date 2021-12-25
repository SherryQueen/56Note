/**
 * @filename    isRectangleCover.js
 * @author      56
 * @description https://leetcode-cn.com/problems/perfect-rectangle/
 */

/*
要构成完美矩形, 则所有矩形将构成一个无重复的,完整的矩形区域. 即所有矩形的面积等于完美矩形的面积
要确保重复, 则除了完美矩形的4个点,其他点则必出现2次或4次. 可以通过set来记录不重复出现的点的个数
 */

/**
 * @param {number[][]} rectangles
 * @return {boolean}
 */
var isRectangleCover = function (rectangles) {
  let area = 0
  const points = new Set()
  let minX = Infinity
  let minY = Infinity
  let maxX = -Infinity
  let maxY = -Infinity

  rectangles.forEach(([x, y, a, b]) => {
    minX = Math.min(minX, x)
    minY = Math.min(minY, y)
    maxX = Math.max(maxX, a)
    maxY = Math.max(maxY, b)
    area += (a - x) * (b - y)
    ;[`${x}|${y}`, `${x}|${b}`, `${a}|${y}`, `${a}|${b}`].forEach((p) =>
      points.has(p) ? points.delete(p) : points.add(p)
    )
  })

  return (
    points.size === 4 &&
    (maxX - minX) * (maxY - minY) === area &&
    [`${maxX}|${minY}`, `${maxX}|${maxY}`, `${minX}|${minY}`, `${minX}|${maxY}`].every((p) => points.has(p))
  )
}

console.info(
  isRectangleCover([
    [0, 0, 4, 1],
    [7, 0, 8, 2],
    [6, 2, 8, 3],
    [5, 1, 6, 3],
    [4, 0, 5, 1],
    [6, 0, 7, 2],
    [4, 2, 5, 3],
    [2, 1, 4, 3],
    [0, 1, 2, 2],
    [0, 2, 2, 3],
    [4, 1, 5, 2],
    [5, 0, 6, 1],
  ])
)
