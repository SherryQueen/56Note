/**
 * @filename    findMinArrowShots.js
 * @author      56
 * @description https://leetcode-cn.com/problems/minimum-number-of-arrows-to-burst-balloons/
 */

/**
 * @param {number[][]} points
 * @return {number}
 */
const findMinArrowShots = function (points) {
  if (!points || !points.length) return 0;
  if (points.length === 1) return 1;

  points = points.sort((a, b) => a[0] - b[0]);
  const result = [points[0]];
  for (let i = 1, len = points.length; i < len; i++) {
    const now = points[i];
    const p = result[result.length - 1];
    if (p[1] < now[0]) result.push(now);
    else p[1] = Math.min(p[1], now[1]); // 保留交集
  }
  return result.length;
};

console.info(
  findMinArrowShots([
    [1, 2],
    [3, 4],
    [1, 4],
  ])
);
