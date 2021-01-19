/**
 * @filename    minCostConnectPoints.js
 * @author      56
 * @description https://leetcode-cn.com/problems/min-cost-to-connect-all-points/
 */

class UnionFind {
  constructor(n) {
    this.ancestors = [...Array(n)].map((_, idx) => idx)
  }
  find(t) {
    return this.ancestors[t] === t ? t : (this.ancestors[t] = this.find(this.ancestors[t]))
  }
  union(t1, t2) {
    const r1 = this.find(t1)
    const r2 = this.find(t2)
    if (r1 === r2) return false
    this.ancestors[r1] = r2
    return true
  }
}

/**
 * @param {number[][]} points
 * @return {number}
 */
var minCostConnectPoints = function (points) {
  const len = points.length
  if (len <= 1) return 0
  const edges = []
  for (let i = 0; i < len; i++) {
    const p1 = points[i]
    for (let j = i + 1; j < len; j++) {
      const p2 = points[j]
      edges.push([Math.abs(p1[0] - p2[0]) + Math.abs(p1[1] - p2[1]), i, j])
    }
  }
  edges.sort((a, b) => a[0] - b[0])

  let result = 0
  let n = 1
  const uf = new UnionFind(len)
  for (let [l, a, b] of edges) {
    if (uf.union(a, b)) {
      result += l
      n += 1
      if (n === len) break
    }
  }
  return result
}

jest('minCostConnectPoints', () => {
  expect(
    minCostConnectPoints([
      [3, 12],
      [-2, 5],
      [-4, 1],
    ]),
  ).toBe(18)
  expect(
    minCostConnectPoints([
      [0, 0],
      [1, 1],
      [1, 0],
      [-1, 1],
    ]),
  ).toBe(4)
})
