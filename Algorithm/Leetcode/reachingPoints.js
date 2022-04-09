/**
 * @filename    reachingPoints.js
 * @author      56
 * @description https://leetcode-cn.com/problems/reaching-points/
 */

/**
 * @param {number} sx
 * @param {number} sy
 * @param {number} tx
 * @param {number} ty
 * @return {boolean}
 */
var reachingPoints = function (sx, sy, tx, ty) {
  while (sx < tx && sy < ty && tx !== ty) {
    if (tx > ty) tx %= ty
    else ty %= tx
  }

  if (tx === sx && ty === sy) return true
  if (tx === sx) return ty > sy && (ty - sy) % tx === 0
  if (ty === sy) return tx > sx && (tx - sx) % ty === 0
  return false
}

console.info(reachingPoints(2, 3, 4, 7))
