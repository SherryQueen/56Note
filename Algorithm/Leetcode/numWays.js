/**
 * @filename    numWays.js
 * @author      56
 * @description https://leetcode-cn.com/problems/chuan-di-xin-xi/
 */

/**
 * @param {number} n
 * @param {number[][]} relation
 * @param {number} k
 * @return {number}
 */
var numWays = function (n, relation, k) {
  const graph = {}
  relation.forEach((r) => {
    const [from, to] = r
    const array = graph[from] || []
    array.push(to)
    graph[from] = array
  })

  let queue = graph[0]
  while (--k) {
    const q = []
    queue.forEach((n) => q.push(...(graph[n] || [])))
    queue = q
  }
  return queue.filter((a) => a === n - 1).length
}

console.info(
  numWays(
    5,
    [
      [0, 2],
      [2, 1],
      [3, 4],
      [2, 3],
      [1, 4],
      [2, 0],
      [0, 4],
    ],
    3
  )
)
