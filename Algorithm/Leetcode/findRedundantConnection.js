/**
 * @filename    findRedundantConnection.js
 * @author      56
 * @description https://leetcode-cn.com/problems/redundant-connection/
 */

class UnionFind {
  constructor(n) {
    this.ancestors = [...Array(n)].map((_, i) => i)
  }
  find(t) {
    return this.ancestors[t] === t ? t : (this.ancestors[t] = this.find(this.ancestors[t])) // 压缩路径
  }

  union(a, b) {
    const r1 = this.find(a)
    const r2 = this.find(b)
    if (r1 === r2) return
    this.ancestors[r1] = r2
  }
}

/**
 * 基于并查集, 若当前节点的祖先节点为自己,则为附加边
 * @param {number[][]} edges
 * @return {number[]}
 */
var findRedundantConnection = function (edges) {
  const union = new UnionFind(edges.length + 1)
  for (let edge of edges) {
    const r1 = union.find(edge[0])
    const r2 = union.find(edge[1])
    if (r1 === r2) return edge
    union.union(r1, r2)
  }
  return []
}

jest('findRedundantConnection', () => {
  expect(
    findRedundantConnection([
      [1, 2],
      [1, 3],
      [2, 3],
    ]),
  ).toEqual([2, 3])
  expect(
    findRedundantConnection([
      [
        [1, 2],
        [2, 3],
        [3, 4],
        [1, 4],
        [1, 5],
      ],
    ]),
  ).toEqual([1, 4])
})
