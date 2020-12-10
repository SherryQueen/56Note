/**
 * @filename    allCellsDistOrder.js
 * @author      56
 * @description https://leetcode-cn.com/problems/matrix-cells-in-distance-order/
 */
const allCellsDistOrder = function (R, C, r0, c0) {
  result = [];

  for (let r = 0; r < R; r++) {
    for (let c = 0; c < C; c++) {
      result.push([r, c]);
    }
  }

  const getDistance = (p) => Math.abs(p[0] - r0) + Math.abs(p[1] - c0);
  return result.sort((a, b) => getDistance(a) - getDistance(b));
};

console.info(allCellsDistOrder(2, 2, 1, 0));
